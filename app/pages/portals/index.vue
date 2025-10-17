<template class="">
  <div class="min-h-screen bg-gradient-to-b from-primary-white via-white/50 to-primary-white">

    <div class="max-w-2xl mx-auto px-4 py-8">
      <!-- Profile Section -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg mb-6">
        <!-- Cover Image (optional) -->
        <div v-if="profile.coverImage" class="h-32 bg-gradient-to-r from-secondary-red/20 to-secondary-red/10 relative">
          <NuxtImg
            src="/images/penus/Gedung_Utama.webp"
            alt="Cover"
            lazyload
            class="w-full h-full object-cover opacity-20"
          />
        </div>
        <!-- Profile Info -->
        <div class="px-6 py-8 text-center">
          <!-- Avatar -->
          <div class="flex justify-center mb-4">
            <div class="relative" :class="profile.coverImage ? '-mt-16' : ''">
              <div class="w-24 h-24 rounded-full bg-primary-white absolute inset-0"></div>
              <NuxtImg
                src="/penus-icon.webp"
                lazyload
                :alt="profile.displayName"
                class="w-24 h-24 rounded-full border-4 border-primary-white shadow-lg relative z-10"
              />
            </div>
          </div>

          <!-- Username & Display Name -->
          <h1 class="text-2xl font-bold text-secondary-red mb-1">@{{ profile.username }}</h1>
          <p class="text-primary-gray/60 text-sm mb-4">{{ profile.bio }}</p>
        </div>

      </div>

      <!-- Portal Links Container -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-primary-gray/10">
          <h2 class="text-lg font-bold text-primary-gray">Link Penting</h2>
        </div>

        <!-- Links List -->
        <div class="divide-y divide-primary-gray/10">
          <div
            v-for="portal in portals"
            :key="portal.id"
            class="flex items-center gap-4 px-6 py-4 hover:bg-primary-gray/5 transition-colors group"
          >
            <!-- Icon/Image -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-primary-gray/10 flex items-center justify-center text-2xl">
                {{ portal.icon }}
              </div>
            </div>

            <!-- Content -->
            <a
              :href="portal.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-0"
            >
              <h3 class="font-semibold text-primary-gray text-sm group-hover:text-secondary-red transition-colors">
                {{ portal.name }}
              </h3>
              <p class="text-primary-gray/60 text-xs mt-0.5 truncate">{{ portal.description }}</p>
            </a>

            <!-- Actions -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <!-- External Link Icon -->
              <a
                :href="portal.url"
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 hover:bg-primary-gray/10 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-primary-gray/40 group-hover:text-secondary-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>

              <!-- Three Dots Menu -->
              <button
                @click.stop="openModal(portal)"
                class="p-1.5 hover:bg-primary-gray/10 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5 text-primary-gray/40 hover:text-primary-gray transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="text-center mt-8 text-primary-gray/60 text-xs">
        <p>Portal ini menyediakan akses cepat ke berbagai layanan dan platform resmi</p>
      </div>
    </div>

    <!-- Portal Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeModal"
      >
        <transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isModalOpen && selectedPortal"
            @click.stop
            class="bg-primary-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden relative"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute right-5 top-5 z-10 text-primary-gray/60 hover:text-primary-gray transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Modal Content -->
            <div class="px-6 py-8">
              <!-- Portal Icon -->
              <div class="flex justify-center mb-4">
                <div class="w-20 h-20 rounded-full bg-primary-gray/10 flex items-center justify-center text-4xl shadow-md">
                  {{ selectedPortal.icon }}
                </div>
              </div>

              <!-- Portal Info -->
              <div class="text-center mb-6">
                <h4 class="text-lg font-bold text-primary-gray mb-1">{{ selectedPortal.name }}</h4>
                <p class="text-primary-gray/60 text-sm">{{ selectedPortal.description }}</p>
              </div>

              <!-- Preview Area / QR Code -->
              <div class="bg-primary-gray/5 rounded-2xl p-8 mb-6 border border-primary-gray/10">
                <div class="h-48 flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-16 h-16 mx-auto text-primary-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-2.5">
                <!-- Visit Link Button -->
                <a
                  :href="selectedPortal.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full px-5 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-2xl font-semibold text-sm hover:bg-primary-gray/5 hover:border-primary-gray/30 transition-all text-center"
                >
                  Buka dengan Akun PNB
                </a>

                <!-- Share Button -->
                <button
                  @click="handleSharePortal"
                  class="flex items-center justify-center gap-2.5 w-full px-5 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-2xl font-semibold text-sm hover:bg-primary-gray/5 hover:border-primary-gray/30 transition-all"
                >
                  <span>Bagikan</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { mockPortals, mockPortalProfile } from '~/utils/mockData'
import type { Portal } from '~/types/portal'
import NavigationBar from '~/components/common/NavigationBar.vue'

const profile = ref(mockPortalProfile)
const portals = computed(() => mockPortals.filter(p => p.isActive).sort((a, b) => a.order - b.order))

// Modal state
const isModalOpen = ref(false)
const selectedPortal = ref<Portal | null>(null)

// Modal functions
const openModal = (portal: Portal) => {
  selectedPortal.value = portal
  isModalOpen.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedPortal.value = null
  // Restore body scroll
  document.body.style.overflow = ''
}

const handleSharePortal = async () => {
  if (!selectedPortal.value) return

  const shareData = {
    title: selectedPortal.value.name,
    text: selectedPortal.value.description,
    url: selectedPortal.value.url
  }

  try {
    // Try to use Web Share API (mobile & modern browsers)
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(selectedPortal.value.url)
      alert('Link berhasil disalin ke clipboard!')
    }
  } catch (err: any) {
    // If sharing is cancelled or fails, just copy to clipboard
    if (err.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(selectedPortal.value.url)
        alert('Link berhasil disalin ke clipboard!')
      } catch (clipboardErr) {
        console.error('Failed to copy:', clipboardErr)
      }
    }
  }
}

// Close modal on ESC key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isModalOpen.value) {
      closeModal()
    }
  }
  window.addEventListener('keydown', handleEscape)

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})

// SEO Meta
useHead({
  title: 'Portals - SMK Penerbangan Bandung',
  meta: [
    { name: 'description', content: 'Portal resmi SMK Penerbangan Bandung - Akses cepat ke berbagai layanan dan platform sekolah' }
  ]
})
</script>
