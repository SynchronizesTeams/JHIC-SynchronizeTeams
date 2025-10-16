<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 w-full h-full"
      @click="handleClose"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0;"
    >
      <!-- Close Button -->
      <button
        @click="handleClose"
        class="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Image Container -->
      <div
        class="relative max-w-7xl max-h-full"
        @click.stop
      >
        <img
          :src="displayImageUrl"
          :alt="alt || 'Image'"
          class="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
        >
      </div>

      <!-- Image Counter (if multiple images) -->
      <div
        v-if="images && images.length > 1"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full"
      >
        <button
          @click.stop="previousImage"
          :disabled="currentIndex === 0"
          class="p-1 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <span class="text-white text-sm font-medium">
          {{ currentIndex + 1 }} / {{ images.length }}
        </span>

        <button
          @click.stop="nextImage"
          :disabled="currentIndex === images.length - 1"
          class="p-1 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  imageUrl: string
  alt?: string
  images?: string[]
  initialIndex?: number
}>()

const emit = defineEmits<{
  close: []
}>()

const currentIndex = ref(props.initialIndex || 0)

watch(() => props.imageUrl, () => {
  // Update index when imageUrl changes
  if (props.images) {
    const index = props.images.indexOf(props.imageUrl)
    if (index !== -1) {
      currentIndex.value = index
    }
  }
})

watch(() => props.initialIndex, (newIndex) => {
  if (newIndex !== undefined) {
    currentIndex.value = newIndex
  }
})

const displayImageUrl = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images[currentIndex.value]
  }
  return props.imageUrl
})

const handleClose = () => {
  emit('close')
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextImage = () => {
  if (props.images && currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
}

// Close on ESC key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleClose()
  } else if (e.key === 'ArrowLeft') {
    previousImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  }
}

// Add/remove event listeners
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
