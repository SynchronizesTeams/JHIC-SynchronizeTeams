<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Back Button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </NuxtLink>

      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {{ userInitial }}
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ username }}</h1>
              <p v-if="userData" class="text-gray-600">{{ userData.email }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <NuxtLink
              to="/dashboard/edit-profile"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </NuxtLink>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Profile Info -->
      <div v-if="userData" class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Informasi Profil</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <p class="text-gray-900">{{ userData.name || '-' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-gray-900">{{ userData.email || '-' }}</p>
          </div>
          <div v-if="userData.no_induk">
            <label class="block text-sm font-medium text-gray-700 mb-1">No. Induk</label>
            <p class="text-gray-900">{{ userData.no_induk }}</p>
          </div>
          <div v-if="userData.role">
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p class="text-gray-900 capitalize">{{ userData.role }}</p>
          </div>
          <div v-if="userData.phone">
            <label class="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
            <p class="text-gray-900">{{ userData.phone }}</p>
          </div>
          <div v-if="userData.alamat" class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <p class="text-gray-900">{{ userData.alamat }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          to="/forums"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Forum Diskusi</h3>
          <p class="text-gray-600 text-sm">Ikuti diskusi dan berbagi pengalaman</p>
        </NuxtLink>
        <NuxtLink
          to="/news"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Berita & Pengumuman</h3>
          <p class="text-gray-600 text-sm">Lihat informasi terbaru sekolah</p>
        </NuxtLink>
        <NuxtLink
          to="/portals"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Portal Layanan</h3>
          <p class="text-gray-600 text-sm">Akses berbagai layanan sekolah</p>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/links"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Kelola Link</h3>
          <p class="text-gray-600 text-sm">Tambah dan kelola link personal</p>
        </NuxtLink>
        <NuxtLink
          v-if="userData?.role === 'admin'"
          to="/admin/portals"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-blue-200"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Admin: Portal Sekolah</h3>
          <p class="text-gray-600 text-sm">Kelola portal resmi sekolah</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const route = useRoute()
const router = useRouter()
const api = useApi()
const { user, logout, token } = useAuth()

const username = computed(() => route.params.username as string)
const userData = ref<User | null>(null)

const userInitial = computed(() => {
  if (userData.value?.name) {
    return userData.value.name.charAt(0).toUpperCase()
  }
  return username.value.charAt(0).toUpperCase()
})

const handleLogout = () => {
  logout()
  router.push('/login')
}

// Fetch user profile
onMounted(async () => {
  try {
    if (token.value) {
      const response: any = await api.auth.profile()
      userData.value = response.data || response
    } else {
      // Redirect to login if no token
      router.push('/login')
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    // Jika gagal fetch profile, gunakan data dari useAuth
    if (user.value) {
      userData.value = user.value
    } else {
      router.push('/login')
    }
  }
})
</script>
