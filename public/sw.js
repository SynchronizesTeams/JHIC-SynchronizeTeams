// Service Worker for Push Notifications
const CACHE_VERSION = 'v1'
const CACHE_NAME = `smk-pnb-${CACHE_VERSION}`

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')

  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    }).then(() => clients.claim())
  )
})

// Handle push notification
self.addEventListener('push', (event) => {
  console.log('Push notification received', event)

  let notificationData = {
    title: 'SMK Plus Pelita Nusantara',
    body: 'Ada update baru di website!',
    icon: '/penus-icon.webp',
    badge: '/penus-icon.webp',
    tag: 'notification',
    requireInteraction: false,
    data: {
      url: '/'
    }
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        tag: data.tag || notificationData.tag,
        requireInteraction: data.requireInteraction || false,
        data: {
          url: data.url || '/'
        }
      }
    } catch (e) {
      console.error('Error parsing notification data:', e)
    }
  }

  const promiseChain = self.registration.showNotification(
    notificationData.title,
    {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: notificationData.data
    }
  )

  event.waitUntil(promiseChain)
})

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked', event)

  event.notification.close()

  const urlToOpen = new URL(event.notification.data?.url || '/', self.location.origin).href

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open with the same URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }
        // If no existing tab, open a new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
      .catch((error) => {
        console.error('Error handling notification click:', error)
      })
  )
})
