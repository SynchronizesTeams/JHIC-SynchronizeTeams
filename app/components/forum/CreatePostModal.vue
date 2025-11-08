<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-3 sm:p-4 z-50">
    <div class="bg-button-gray rounded-xl w-full max-w-lg">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-3 sm:p-4 border-b border-primary-white/10">
        <h2 class="text-base sm:text-lg font-semibold text-primary-text">Buat Post Baru</h2>
        <button
          @click="$emit('close')"
          class="text-primary-white/60 hover:text-primary-text"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-3 sm:p-4">
        <!-- User Info -->
        <div class="flex items-center space-x-3 mb-4">
          <NuxtImg
            :src="currentUser?.avatar"
            :alt="currentUser?.name"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
          />
          <div>
            <div class="font-semibold text-sm sm:text-base text-primary-text">{{ currentUser?.name }}</div>
            <div class="text-xs sm:text-sm text-primary-white/60">Posting di <span class="capitalize">{{ channel }}</span></div>
          </div>
        </div>

        <!-- Post Title -->
        <input
          v-model="title"
          placeholder="Judul Post"
          class="w-full p-2 sm:p-3 text-sm bg-primary-gray text-primary-text border border-primary-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-red mb-3"
          maxlength="100"
        >

        <!-- Post Content -->
        <textarea
          v-model="content"
          placeholder="Apa yang ingin Anda bagikan?"
          class="w-full h-28 sm:h-32 p-2 sm:p-3 text-sm bg-primary-gray text-primary-text border border-primary-white/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-secondary-red"
          maxlength="500"
        ></textarea>

        <div class="text-right text-xs sm:text-sm text-primary-white/60 mt-1">
          {{ content.length }}/500
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-3 p-2 sm:p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p class="text-xs sm:text-sm text-red-500">{{ error }}</p>
        </div>

        <!-- Image Upload -->
        <div class="mt-4">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="handleImageUpload"
          >

          <!-- Image Preview -->
          <div v-if="images.length > 0" class="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="relative"
            >
              <NuxtImg
                :src="image.preview"
                :alt="`Upload ${index + 1}`"
                class="w-full h-24 sm:h-32 object-cover rounded-lg"
              />
              <button
                @click="removeImage(index)"
                class="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Upload Button -->
          <button
            v-if="images.length < 4"
            @click="$refs.fileInput.click()"
            class="flex items-center space-x-2 text-primary-white/60 hover:text-primary-text transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span class="text-sm">Tambah Gambar</span>
          </button>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-between p-3 sm:p-4 border-t border-primary-white/10">
        <div class="text-xs sm:text-sm text-primary-white/60">
          Channel: <span class="font-medium capitalize text-primary-text">{{ channel }}</span>
        </div>
        <div class="flex space-x-3">
          <button
            @click="$emit('close')"
            class="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-primary-white/60 hover:text-primary-text transition-colors"
          >
            Batal
          </button>
          <button
            @click="handleSubmit"
            :disabled="!title.trim() || !content.trim() || submitting"
            class="px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-secondary-red text-primary-text rounded-lg hover:bg-secondary-red/80 disabled:bg-primary-gray disabled:cursor-not-allowed transition-colors"
          >
            {{ submitting ? 'Posting...' : 'Post' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  channel: string
  sectionId: number
}>()

const { forumPost } = useApi()

const emit = defineEmits<{
  close: []
  post: [data: any]
}>()

const title = ref('')
const content = ref('')
const images = ref<Array<{file: File, preview: string}>>([])
const submitting = ref(false)
const fileInput = ref<HTMLInputElement>()
const error = ref('')

// Get current user from auth or localStorage
const auth = useAuth()
const currentUser = computed(() => {
  if (auth.user.value) {
    return {
      id: auth.user.value.id,
      name: auth.user.value.name,
      avatar: auth.user.value.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.user.value.name}`
    }
  }

  // Fallback to localStorage
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')

  return {
    id: userId || '1',
    name: userName || 'User',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName || 'User'}`
  }
})

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  files.forEach(file => {
    if (file.type.startsWith('image/') && images.value.length < 4) {
      const reader = new FileReader()
      reader.onload = (e) => {
        images.value.push({
          file,
          preview: e.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

const handleSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) return

  submitting.value = true
  error.value = ''

  try {
    // Prepare post data
    const postData: any = {
      section_id: props.sectionId,
      title: title.value.trim(),
      content: content.value.trim()
    }

    // Add first image if exists (API only supports single image)
    if (images.value.length > 0) {
      postData.image = images.value[0].file
    }

    // Create post using API
    const response = await forumPost.create(postData)

    // Emit success
    emit('post', response.data)

    // Close modal
    emit('close')
  } catch (err: any) {
    console.error('Error creating post:', err)
    error.value = err.data?.message || 'Gagal membuat post. Silakan coba lagi.'
  } finally {
    submitting.value = false
  }
}
</script>
