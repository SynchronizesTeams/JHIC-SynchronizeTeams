import type { NotificationPayload, NotificationPermissionState } from '~/types/notification'

export const useNotification = () => {
  const config = useRuntimeConfig()
  const registration = ref<ServiceWorkerRegistration | null>(null)
  const permissionState = ref<NotificationPermissionState>({
    permission: 'default',
    isSupported: false,
    isSubscribed: false
  })

  // Check if notifications are supported
  const checkSupport = () => {
    if (process.client) {
      permissionState.value.isSupported =
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window

      if (permissionState.value.isSupported) {
        permissionState.value.permission = Notification.permission
      }
    }
    return permissionState.value.isSupported
  }

  // Register service worker
  const registerServiceWorker = async () => {
    if (!process.client || !checkSupport()) return null

    try {
      const reg = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      registration.value = reg
      console.log('Service Worker registered successfully:', reg)

      // Check if already subscribed
      const subscription = await reg.pushManager.getSubscription()
      permissionState.value.isSubscribed = subscription !== null

      return reg
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return null
    }
  }

  // Request notification permission
  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!checkSupport()) {
      throw new Error('Notifications not supported')
    }

    try {
      const permission = await Notification.requestPermission()
      permissionState.value.permission = permission

      if (permission === 'granted') {
        // Register service worker if not already done
        if (!registration.value) {
          await registerServiceWorker()
        }
      }

      return permission
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      throw error
    }
  }

  // Show local notification (doesn't require subscription)
  const showNotification = async (payload: NotificationPayload) => {
    if (permissionState.value.permission !== 'granted') {
      console.warn('Notification permission not granted')
      return
    }

    if (!registration.value) {
      await registerServiceWorker()
    }

    if (registration.value) {
      await registration.value.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/penus-icon.webp',
        badge: payload.badge || '/penus-icon.webp',
        tag: payload.tag || 'notification',
        requireInteraction: payload.requireInteraction || false,
        data: {
          url: payload.url || '/'
        }
      })
    }
  }

  // Subscribe to push notifications (for server-sent notifications)
  const subscribeToPush = async () => {
    if (!registration.value) {
      await registerServiceWorker()
    }

    if (!registration.value) {
      throw new Error('Service Worker not registered')
    }

    try {
      const vapidPublicKey = config.public.vapidPublicKey

      if (!vapidPublicKey) {
        throw new Error('VAPID public key not configured')
      }

      const subscription = await registration.value.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      })

      permissionState.value.isSubscribed = true

      // Send subscription to your server (if using server-side push in future)
      // await $fetch('/api/notifications/subscribe', {
      //   method: 'POST',
      //   body: subscription
      // })

      console.log('Push subscription:', subscription)
      return subscription
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      throw error
    }
  }

  // Unsubscribe from push notifications
  const unsubscribeFromPush = async () => {
    if (!registration.value) return

    try {
      const subscription = await registration.value.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        permissionState.value.isSubscribed = false

        // Notify your server
        // await $fetch('/api/notifications/unsubscribe', {
        //   method: 'POST',
        //   body: { endpoint: subscription.endpoint }
        // })

        console.log('Unsubscribed from push notifications')
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error)
      throw error
    }
  }

  // Helper function to convert VAPID key
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Initialize on mount
  onMounted(() => {
    checkSupport()
    if (permissionState.value.isSupported) {
      registerServiceWorker()
    }
  })

  return {
    permissionState: readonly(permissionState),
    checkSupport,
    registerServiceWorker,
    requestPermission,
    showNotification,
    subscribeToPush,
    unsubscribeFromPush
  }
}
