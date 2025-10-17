// Notification utilities for sending notifications
import type { NotificationPayload } from '~/types/notification'

/**
 * Send a notification to all subscribed users
 * This function should be called from your backend/admin panel
 */
export const sendNotificationToAll = async (payload: NotificationPayload) => {
  // In real implementation, this would call your backend API
  // The backend would then send push notifications to all subscribed devices

  // Example:
  // await $fetch('/api/notifications/send', {
  //   method: 'POST',
  //   body: payload
  // })

  console.log('Sending notification to all users:', payload)
}

/**
 * Predefined notification templates
 */
export const notificationTemplates = {
  newNews: (title: string, slug: string) => ({
    title: '📰 Berita Baru',
    body: title,
    tag: 'news',
    url: `/news/${slug}`,
    requireInteraction: false
  }),

  newEvent: (title: string, date: string) => ({
    title: '📅 Acara Mendatang',
    body: `${title} - ${date}`,
    tag: 'event',
    url: '/',
    requireInteraction: false
  }),

  newAchievement: (title: string, slug: string) => ({
    title: '🏆 Prestasi Baru',
    body: title,
    tag: 'achievement',
    url: `/news/${slug}`,
    requireInteraction: false
  }),

  announcement: (message: string) => ({
    title: '📢 Pengumuman Penting',
    body: message,
    tag: 'announcement',
    url: '/',
    requireInteraction: true
  }),

  forumPost: (title: string, channel: string, postId: string) => ({
    title: '💬 Postingan Forum Baru',
    body: `${title} di ${channel}`,
    tag: 'forum',
    url: `/forums/${channel}/${postId}`,
    requireInteraction: false
  })
}

/**
 * Test notification (for development)
 */
export const sendTestNotification = () => {
  const { showNotification, permissionState } = useNotification()

  if (permissionState.value.permission === 'granted') {
    showNotification({
      title: '🧪 Test Notification',
      body: 'This is a test notification from SMK Penerbangan Bandung',
      tag: 'test',
      url: '/'
    })
  } else {
    console.warn('Notification permission not granted')
  }
}
