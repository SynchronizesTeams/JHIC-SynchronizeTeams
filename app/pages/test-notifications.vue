<template>
  <div class="p-8 max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-2xl font-bold text-primary-gray mb-4">🔔 Test Notifications</h2>

      <!-- Permission Status -->
      <div class="mb-6 p-4 bg-primary-gray/5 rounded-xl">
        <h3 class="font-semibold text-primary-gray mb-2">Status Notifikasi</h3>
        <div class="space-y-2 text-sm">
          <p>
            <span class="font-medium">Support:</span>
            <span :class="permissionState.isSupported ? 'text-green-600' : 'text-red-600'">
              {{ permissionState.isSupported ? '✓ Supported' : '✗ Not Supported' }}
            </span>
          </p>
          <p>
            <span class="font-medium">Permission:</span>
            <span :class="{
              'text-green-600': permissionState.permission === 'granted',
              'text-yellow-600': permissionState.permission === 'default',
              'text-red-600': permissionState.permission === 'denied'
            }">
              {{ permissionState.permission }}
            </span>
          </p>
          <p>
            <span class="font-medium">Subscribed:</span>
            <span :class="permissionState.isSubscribed ? 'text-green-600' : 'text-gray-600'">
              {{ permissionState.isSubscribed ? '✓ Yes' : '✗ No' }}
            </span>
          </p>
        </div>
      </div>

      <!-- Request Permission Button -->
      <div v-if="permissionState.permission === 'default'" class="mb-6">
        <button
          @click="requestPermission"
          class="w-full px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-white font-semibold rounded-xl hover:from-secondary-red/90 hover:to-secondary-red transition-all"
        >
          Request Notification Permission
        </button>
      </div>

      <!-- Test Buttons -->
      <div v-if="permissionState.permission === 'granted'" class="space-y-3">
        <h3 class="font-semibold text-primary-gray mb-3">Test Notifications:</h3>

        <button
          @click="sendBasicNotification"
          class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors text-left"
        >
          📢 Basic Notification
        </button>

        <button
          @click="sendNewsNotification"
          class="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors text-left"
        >
          📰 News Notification
        </button>

        <button
          @click="sendEventNotification"
          class="w-full px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors text-left"
        >
          📅 Event Notification
        </button>

        <button
          @click="sendAchievementNotification"
          class="w-full px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors text-left"
        >
          🏆 Achievement Notification
        </button>

        <button
          @click="sendAnnouncementNotification"
          class="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors text-left"
        >
          🚨 Important Announcement
        </button>
      </div>

      <!-- Denied Message -->
      <div v-if="permissionState.permission === 'denied'" class="p-4 bg-red-50 border border-red-200 rounded-xl">
        <p class="text-red-700 text-sm">
          ⚠️ Notifikasi diblokir. Silakan aktifkan dari pengaturan browser.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notificationTemplates } from '~/utils/notificationUtils'

const { permissionState, requestPermission, showNotification } = useNotification()

const sendBasicNotification = async () => {
  await showNotification({
    title: '👋 Halo!',
    body: 'Ini adalah notifikasi test dari SMK Penerbangan Bandung',
    tag: 'test',
    url: '/'
  })
}

const sendNewsNotification = async () => {
  await showNotification(
    notificationTemplates.newNews(
      'Juara 1 Lomba Coding Competition Nasional 2025',
      'juara-1-coding-competition'
    )
  )
}

const sendEventNotification = async () => {
  await showNotification(
    notificationTemplates.newEvent(
      'Workshop AI & Machine Learning',
      '25 Oktober 2025'
    )
  )
}

const sendAchievementNotification = async () => {
  await showNotification(
    notificationTemplates.newAchievement(
      'Tim Robotik Raih Medali Emas Internasional',
      'robotik-medali-emas'
    )
  )
}

const sendAnnouncementNotification = async () => {
  await showNotification(
    notificationTemplates.announcement(
      'Libur sekolah diperpanjang hingga 30 Oktober 2025'
    )
  )
}

useHead({
  title: 'Test Notifications - Dashboard'
})
</script>
