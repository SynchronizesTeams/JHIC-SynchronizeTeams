<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <!-- Back Button -->
      <NuxtLink
        :to="`/dashboard/${user?.name || 'user'}`"
        class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Dashboard
      </NuxtLink>

      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
        <p class="text-gray-600">Update informasi profil Anda</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-lg p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <!-- No Induk -->
          <div>
            <label for="no_induk" class="block text-sm font-medium text-gray-700 mb-1">
              No. Induk
            </label>
            <input
              id="no_induk"
              v-model="formData.no_induk"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="232410001"
            />
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              v-model="formData.role"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih Role</option>
              <option value="siswa">Siswa</option>
              <option value="alumni">Alumni</option>
              <option value="guru">Guru</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
              Telepon
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="08123456789"
            />
          </div>

          <!-- Tahun Ajaran Mulai -->
          <div>
            <label for="tahun_ajaran_mulai" class="block text-sm font-medium text-gray-700 mb-1">
              Tahun Ajaran Mulai
            </label>
            <input
              id="tahun_ajaran_mulai"
              v-model="formData.tahun_ajaran_mulai"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2025"
            />
          </div>

          <!-- Jabatan -->
          <div>
            <label for="jabatan" class="block text-sm font-medium text-gray-700 mb-1">
              Jabatan
            </label>
            <input
              id="jabatan"
              v-model="formData.jabatan"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Siswa/Guru/Staff"
            />
          </div>

          <!-- Alamat (full width) -->
          <div class="md:col-span-2">
            <label for="alamat" class="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              id="alamat"
              v-model="formData.alamat"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jl. Contoh No. 123"
            ></textarea>
          </div>

          <!-- Photo Upload -->
          <div class="md:col-span-2">
            <label for="photo" class="block text-sm font-medium text-gray-700 mb-1">
              Foto Profil
            </label>
            <div class="mt-1 flex items-center">
              <div class="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-4">
                <svg v-if="!photoPreview" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <img v-else :src="photoPreview" alt="Preview" class="h-20 w-20 rounded-full object-cover" />
              </div>
              <input
                id="photo"
                type="file"
                accept="image/*"
                @change="handlePhotoChange"
                class="hidden"
              />
              <label
                for="photo"
                class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Pilih Foto
              </label>
            </div>
          </div>

          <!-- Password Section -->
          <div class="md:col-span-2 border-t pt-6 mt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Ubah Password (Opsional)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                  Password Baru
                </label>
                <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label for="password_confirm" class="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <input
                  id="password_confirm"
                  v-model="passwordConfirm"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-600">{{ successMessage }}</p>
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4 mt-8">
          <NuxtLink
            :to="`/dashboard/${user?.name || 'user'}`"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-center"
          >
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { user, token, editProfile } = useAuth()
const { showNotification } = useNotification()

// Check authentication
onMounted(() => {
  if (!token.value) {
    router.push('/login')
  }
})

// Form state
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const photoPreview = ref('')
const passwordConfirm = ref('')

// Form data - initialize with current user data
const formData = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  no_induk: user.value?.no_induk || '',
  role: user.value?.role || '',
  phone: user.value?.phone || '',
  alamat: user.value?.alamat || '',
  tahun_ajaran_mulai: user.value?.tahun_ajaran_mulai || '',
  jabatan: user.value?.jabatan || '',
  password: '',
  photo_url: null as File | null
})

// Watch for user data changes
watch(user, (newUser) => {
  if (newUser) {
    formData.value = {
      ...formData.value,
      name: newUser.name || '',
      email: newUser.email || '',
      no_induk: newUser.no_induk || '',
      role: newUser.role || '',
      phone: newUser.phone || '',
      alamat: newUser.alamat || '',
      tahun_ajaran_mulai: newUser.tahun_ajaran_mulai || '',
      jabatan: newUser.jabatan || ''
    }
  }
})

// Handle photo change
const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    formData.value.photo_url = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Handle form submission
const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validate password confirmation
  if (formData.value.password && formData.value.password !== passwordConfirm.value) {
    errorMessage.value = 'Password dan konfirmasi password tidak cocok'
    return
  }

  isSubmitting.value = true

  try {
    // Prepare data - only include non-empty fields
    const updateData: any = {}
    Object.entries(formData.value).forEach(([key, value]) => {
      if (value && value !== '') {
        updateData[key] = value
      }
    })

    const result = await editProfile(updateData)

    if (result.success) {
      successMessage.value = 'Profil berhasil diperbarui'
      showNotification({
        type: 'success',
        title: 'Berhasil',
        message: 'Profil Anda telah diperbarui'
      })

      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/dashboard/${result.data?.name || user.value?.name || 'user'}`)
      }, 1500)
    } else {
      errorMessage.value = result.error || 'Gagal memperbarui profil'
      showNotification({
        type: 'error',
        title: 'Gagal',
        message: result.error || 'Gagal memperbarui profil'
      })
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Terjadi kesalahan'
    showNotification({
      type: 'error',
      title: 'Error',
      message: 'Terjadi kesalahan saat memperbarui profil'
    })
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Edit Profile - Dashboard',
  description: 'Edit informasi profil Anda'
})
</script>
