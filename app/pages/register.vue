<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo dan Header -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <img
            src="/images/penus/main-logo.png"
            alt="SMK Plus Pelita Nusantara"
            class="h-20 mx-auto"
            format="webp"
            loading="lazy"
          />
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Daftar Akun Baru
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Buat akun untuk mengakses portal dan layanan sekolah
        </p>
      </div>

      <!-- Form Register -->
      <div class="bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              autocomplete="name"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Nama Lengkap Anda"
              :disabled="loading"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
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
              v-model="formData.password"
              type="password"
              required
              autocomplete="new-password"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Minimal 8 karakter"
              :disabled="loading"
              minlength="8"
            />
            <p class="mt-1 text-xs text-gray-500">Minimal 8 karakter</p>
          </div>

          <!-- Confirm Password Input -->
          <!-- <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              autocomplete="new-password"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Ulangi password"
              :disabled="loading"
              minlength="8"
            />
          </div> -->

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {{ success }}
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
            <span v-else>Daftar</span>
          </button>
        </form>

        <!-- Links -->
        <div class="text-center space-y-2">
          <p class="text-sm text-gray-600">
            Sudah punya akun?
            <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Masuk sekarang
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

const formData = ref({
  name: '',
  email: '',
  password: '',
  // confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = ''

    // Validasi password match
    // if (formData.value.password !== formData.value.confirmPassword) {
    //   error.value = 'Password dan konfirmasi password tidak cocok'
    //   return
    // }

    // Validasi minimal password
    if (formData.value.password.length < 8) {
      error.value = 'Password minimal 8 karakter'
      return
    }

    // Register API call
    const response: any = await api.auth.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })

    // Jika response berhasil
    if (response) {
      success.value = 'Pendaftaran berhasil! Mengalihkan ke halaman login...'

      // Reset form
      formData.value = {
        name: '',
        email: '',
        password: '',
        // confirmPassword: ''
      }

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = 'Pendaftaran gagal. Silakan coba lagi.'
    }
  } catch (err: any) {
    console.error('Register error:', err)
    error.value = err.data?.message || err.message || 'Pendaftaran gagal. Email mungkin sudah terdaftar.'
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
