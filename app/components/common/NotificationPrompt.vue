<template>
  <transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="showModal"
      class="fixed bottom-4 right-4 z-50 max-w-sm w-full mx-4 sm:mx-0"
    >
      <div class="bg-white rounded-2xl shadow-2xl border border-primary-gray/20 overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-secondary-red/10 to-transparent border-b border-primary-gray/10">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 bg-secondary-red/10 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-secondary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-primary-gray text-sm">Aktifkan Notifikasi</h3>
                <p class="text-xs text-primary-gray/60 mt-1">
                  Dapatkan update terbaru tentang berita, acara, dan pengumuman penting dari sekolah
                </p>
              </div>
            </div>
            <button
              @click="dismissModal"
              class="flex-shrink-0 text-primary-gray/40 hover:text-primary-gray transition-colors ml-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-4">
          <div class="space-y-2 mb-4">
            <div class="flex items-start gap-2 text-xs text-primary-gray/70">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-secondary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Berita & pengumuman terbaru</span>
            </div>
            <div class="flex items-start gap-2 text-xs text-primary-gray/70">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-secondary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Jadwal acara & kegiatan sekolah</span>
            </div>
            <div class="flex items-start gap-2 text-xs text-primary-gray/70">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-secondary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Update prestasi siswa</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button
              @click="dismissModal"
              class="flex-1 px-4 py-2.5 bg-white border-2 border-primary-gray/20 text-primary-gray text-sm font-semibold rounded-xl hover:bg-primary-gray/5 transition-all"
            >
              Nanti Saja
            </button>
            <button
              @click="enableNotifications"
              :disabled="isRequesting"
              class="flex-1 px-4 py-2.5 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-white text-sm font-semibold rounded-xl hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isRequesting">Aktifkan</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const { requestPermission, permissionState, showNotification } = useNotification()

const showModal = ref(false)
const isRequesting = ref(false)

// Check if user has already decided about notifications
const checkShouldShow = () => {
  if (!process.client) return false

  // Don't show if not supported
  if (!permissionState.value.isSupported) return false

  // Don't show if already granted or denied
  if (permissionState.value.permission !== 'default') return false

  // Check if user has dismissed before (with 7 days cooldown)
  const dismissedAt = localStorage.getItem('notification-dismissed')
  if (dismissedAt) {
    const dismissedTime = new Date(dismissedAt).getTime()
    const now = new Date().getTime()
    const daysSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60 * 24)

    // Show again after 7 days
    if (daysSinceDismissed < 7) return false
  }

  return true
}

const enableNotifications = async () => {
  isRequesting.value = true

  try {
    const permission = await requestPermission()

    if (permission === 'granted') {
      // Show success notification
      await showNotification({
        title: 'Notifikasi Aktif! 🎉',
        body: 'Anda akan menerima update terbaru dari SMK Plus Pelita Nusantara',
        tag: 'welcome'
      })

      showModal.value = false

      // Save that user has enabled notifications
      localStorage.setItem('notification-enabled', 'true')
    } else {
      alert('Notifikasi tidak dapat diaktifkan. Silakan aktifkan dari pengaturan browser.')
    }
  } catch (error) {
    console.error('Error enabling notifications:', error)
    alert('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isRequesting.value = false
  }
}

const dismissModal = () => {
  showModal.value = false
  // Save dismissed time
  localStorage.setItem('notification-dismissed', new Date().toISOString())
}

// Show modal after a delay when component is mounted
onMounted(() => {
  setTimeout(() => {
    if (checkShouldShow()) {
      showModal.value = true
    }
  }, 3000) // Show after 3 seconds
})
</script>
