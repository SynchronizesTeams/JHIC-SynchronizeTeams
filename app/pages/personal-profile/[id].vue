<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-2xl mx-auto px-4 py-8 text-center">
      <div class="animate-pulse">
        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div class="h-6 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
      </div>
      <p class="text-primary-gray/60 mt-4">Memuat profile...</p>
    </div>

    <div v-else class="max-w-2xl mx-auto px-4 py-8">
      <!-- Profile Section -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg mb-6 hover:shadow-xl transition-shadow">
        <!-- Cover Image -->
        <div v-if="profile?.coverImage" class="h-32 bg-gradient-to-r from-secondary-red/20 to-secondary-red/10 relative">
          <NuxtImg
            :src="profile.coverImage"
            alt="Cover"
            class="w-full h-full object-cover opacity-20"
          />
        </div>

        <!-- Profile Info -->
        <div class="px-6 py-8 text-center">
          <!-- Avatar -->
          <div class="flex justify-center mb-4">
            <div class="relative" :class="profile?.coverImage ? '-mt-16' : ''">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-red/20 to-primary-gray/10 absolute inset-0"></div>
              <img
                :src="profile?.avatar || '/penus-icon.webp'"
                :alt="profile?.name"
                class="w-24 h-24 object-cover rounded-full border-4 border-primary-white shadow-lg relative z-10"
              />
            </div>
          </div>

          <!-- Name & Username -->
          <h1 class="text-2xl font-bold text-primary-gray mb-1">{{ profile?.name }}</h1>
          <p class="text-secondary-red text-sm mb-2">@{{ profile?.username }}</p>

          <!-- Bio -->
          <p v-if="profile?.bio" class="text-primary-gray/60 text-sm mb-4 max-w-md mx-auto">
            {{ profile.bio }}
          </p>

          <!-- Contact Info -->
          <div class="flex flex-col sm:flex-row gap-2 justify-center items-center text-xs text-primary-gray/60 mb-6">
            <a :href="`mailto:${profile?.email}`" class="flex items-center gap-1 hover:text-secondary-red transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {{ profile?.email }}
            </a>
            <span class="hidden sm:inline">•</span>
            <a :href="`tel:${profile?.phone}`" class="flex items-center gap-1 hover:text-secondary-red transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {{ profile?.phone }}
            </a>
          </div>

          <!-- Share Buttons -->
          <div class="flex gap-3 justify-center">
            <button
              @click="copyProfileLink"
              class="flex items-center gap-2 px-4 py-2 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-full text-sm font-semibold hover:bg-primary-gray/5 hover:border-secondary-red/30 hover:text-secondary-red transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              {{ copied ? 'Tersalin!' : 'Salin Link' }}
            </button>

            <button
              @click="shareProfile"
              class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full text-sm font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              Bagikan
            </button>
          </div>
        </div>
      </div>

      <!-- Links Container -->
      <div v-if="activeLinks.length > 0" class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow mb-6">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-primary-gray/10 bg-gradient-to-r from-secondary-red/5 to-transparent">
          <h2 class="text-lg font-bold text-primary-gray">Links</h2>
        </div>

        <!-- Links List -->
        <div class="divide-y divide-primary-gray/10">
          <a
            v-for="link in activeLinks"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackLinkClick(link.id)"
            class="flex items-center gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-secondary-red/5 hover:to-transparent transition-all group"
          >
            <!-- Icon -->
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-red/10 to-primary-gray/10 flex items-center justify-center text-2xl group-hover:from-secondary-red/20 group-hover:to-primary-gray/20 transition-all">
                {{ link.icon || '🔗' }}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-primary-gray text-sm group-hover:text-secondary-red transition-colors">
                {{ link.title }}
              </h3>
              <p class="text-primary-gray/60 text-xs mt-0.5 truncate">{{ link.url }}</p>
            </div>

            <!-- Arrow Icon -->
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-primary-gray/40 group-hover:text-secondary-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-primary-gray/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
        </svg>
        <p class="text-primary-gray/60 text-sm">Belum ada link yang ditambahkan</p>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-primary-gray/60 text-xs">
        <p>SMK Plus Pelita Nusantara Personal Profile</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SOCIAL_ICONS } from '~/utils/socialIcons'

const route = useRoute()
const api = useApi()
const config = useRuntimeConfig()
const BASE_URL = config.public.apiBaseUrl.replace('/api', '')

const userIdParam = computed(() => parseInt(route.params.id as string))

// State
const profileData = ref<any>(null)
const links = ref<any[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Computed profile from response
const profile = computed(() => {
  if (!profileData.value) return null

  const user = profileData.value.user || {}
  return {
    name: user.name || 'User',
    username: user.name?.split(' ')[0]?.toLowerCase() || 'user',
    email: user.email || '',
    phone: user.phone || '',
    jabatan: user.jabatan || '',
    avatar: user.photo_url && user.photo_url !== ''
      ? (user.photo_url.startsWith('http') ? user.photo_url : `${BASE_URL}/${user.photo_url}`)
      : '/penus-icon.webp',
    bio: user.jabatan || 'Member'
  }
})

// Active links from API
const activeLinks = computed(() => {
  return links.value.map(link => ({
    ...link,
    icon: link.icon && !link.icon.startsWith('http')
      ? SOCIAL_ICONS.find(i => i.id === link.icon)?.icon || '🔗'
      : link.icon
  }))
})

// Fetch profile and links by user ID
const fetchProfile = async (userId: number) => {
  isLoading.value = true
  error.value = null

  try {
    const response: any = await api.userLinks.getByUserId(userId)

    if (response && response.length > 0) {
      profileData.value = response[0]
      links.value = response.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        icon: item.icon
      }))
    } else {
      error.value = 'Profile not found'
    }
  } catch (err: any) {
    console.error('Error fetching profile:', err)
    error.value = err.message || 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
}

// Copy to clipboard
const copied = ref(false)
const copyProfileLink = async () => {
  const profileUrl = `${window.location.origin}/personal-profile/${userIdParam.value}`

  try {
    await navigator.clipboard.writeText(profileUrl)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
    alert('Gagal menyalin link')
  }
}

// Share profile
const shareProfile = async () => {
  if (!profile.value) return

  const profileUrl = `${window.location.origin}/personal-profile/${userIdParam.value}`
  const shareData = {
    title: `${profile.value.name} - Personal Profile`,
    text: profile.value.bio || `Check out ${profile.value.name}'s profile`,
    url: profileUrl
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(profileUrl)
      alert('Link berhasil disalin ke clipboard!')
    }
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(profileUrl)
        alert('Link berhasil disalin ke clipboard!')
      } catch (clipboardErr) {
        console.error('Failed to copy:', clipboardErr)
      }
    }
  }
}

// Track link clicks
const trackLinkClick = (linkId: number) => {
  console.log(`Link clicked: ${linkId}`)
}

// On mount, fetch profile by user ID
onMounted(async () => {
  const userId = userIdParam.value

  if (isNaN(userId) || userId <= 0) {
    error.value = 'Invalid user ID'
  } else {
    await fetchProfile(userId)
  }

  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: error.value
    })
  }
})

// SEO Meta
watch(profile, (newProfile) => {
  if (newProfile) {
    useSeoMeta({
      title: `${newProfile.name} - Personal Profile`,
      description: newProfile.bio || `${newProfile.name}'s personal profile`
    })
  }
}, { immediate: true })
</script>
