<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo dan Header -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <NuxtImg
            src="/images/penus/Logo.png"
            alt="SMK Plus Pelita Nusantara"
            class="h-20 mx-auto"
          />
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Masuk ke Akun Anda
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Akses portal dan layanan sekolah
        </p>
      </div>

      <!-- Form Login -->
      <div class="bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              required
              autocomplete="email"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="nama@email.com"
              :disabled="loading"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              autocomplete="current-password"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
              :disabled="loading"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
            <span v-else>Masuk</span>
          </button>
        </form>

        <!-- Links -->
        <div class="text-center space-y-2">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Daftar sekarang
            </NuxtLink>
          </p>
          <NuxtLink to="/" class="block text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Kembali ke Beranda
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const api = useApi()
const { setToken, setUser } = useAuth()

const credentials = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    // Login API call
    const response: any = await api.auth.login({
      email: credentials.value.email,
      password: credentials.value.password
    })

    // Jika response berhasil, simpan token dan user data
    if (response.token) {
      setToken(response.token)

      // Fetch user profile
      try {
        const profileResponse: any = await api.auth.profile()
        setUser(profileResponse.data || profileResponse)

        // Redirect ke dashboard dengan username
        const username = profileResponse.data?.name || profileResponse.name || 'profile'
        await router.push(`/dashboard/${username}`)
      } catch (profileError) {
        console.error('Error fetching profile:', profileError)
        // Tetap redirect meskipun gagal fetch profile
        await router.push('/forums')
      }
    } else {
      error.value = 'Login gagal. Silakan coba lagi.'
    }
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err.data?.message || err.message || 'Email atau password salah. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom scrollbar untuk browser yang support */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
