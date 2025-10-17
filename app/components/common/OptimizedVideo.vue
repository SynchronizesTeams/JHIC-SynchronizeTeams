<template>
  <div ref="containerRef" class="optimized-video-container" :class="containerClass">
    <!-- Poster/Thumbnail -->
    <div
      v-if="!isLoaded && poster"
      class="video-poster"
      :style="{ backgroundImage: `url(${poster})` }"
      @click="loadVideo"
    >
      <button class="play-button" aria-label="Play video">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    </div>

    <!-- Actual Video -->
    <video
      v-show="isLoaded"
      ref="videoRef"
      :poster="poster"
      :controls="controls"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      :class="videoClass"
      :preload="preloadType"
      @loadeddata="handleLoaded"
      @error="handleError"
    >
      <source v-if="isLoaded" :src="src" :type="getVideoType(src)" />
      <p>Your browser doesn't support HTML5 video.</p>
    </video>

    <!-- Error state -->
    <div v-if="hasError" class="error-state">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      <p class="text-sm text-gray-500 mt-2">Video gagal dimuat</p>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading-indicator">
      <svg class="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  poster?: string
  controls?: boolean
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  eager?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  containerClass?: string
  videoClass?: string
}

const {
  src,
  poster,
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  eager = false,
  preload = 'none',
  containerClass = '',
  videoClass = ''
} = defineProps<Props>()

const containerRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const isLoaded = ref(false)
const isLoading = ref(false)
const hasError = ref(false)

const preloadType = computed(() => {
  return eager ? 'auto' : preload
})

const getVideoType = (src: string): string => {
  const extension = src.split('.').pop()?.toLowerCase()
  const typeMap: Record<string, string> = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg'
  }
  return typeMap[extension || 'mp4'] || 'video/mp4'
}

const loadVideo = () => {
  if (!isLoaded.value && !isLoading.value) {
    isLoading.value = true
    isLoaded.value = true

    nextTick(() => {
      if (videoRef.value) {
        videoRef.value.load()
        if (autoplay) {
          videoRef.value.play().catch((error) => {
            console.error('Autoplay failed:', error)
          })
        }
      }
    })
  }
}

const handleLoaded = () => {
  isLoading.value = false
  hasError.value = false
}

const handleError = (error: Event) => {
  hasError.value = true
  isLoading.value = false
  console.error('Failed to load video:', error)
}

// Lazy load using Intersection Observer
onMounted(() => {
  if (!eager && containerRef.value) {
    const { observeElement } = useLazyLoad()

    observeElement(containerRef.value, () => {
      // Load video when it enters viewport
      loadVideo()
    }, {
      rootMargin: '50px' // Less aggressive than images
    })
  } else if (eager) {
    loadVideo()
  }
})
</script>

<style scoped>
.optimized-video-container {
  position: relative;
  width: 100%;
  background-color: #000;
  overflow: hidden;
}

.video-poster {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: rgba(239, 68, 68, 0.9);
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.play-button:hover {
  background-color: rgba(239, 68, 68, 1);
  transform: scale(1.1);
}

.optimized-video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-center;
  background-color: #1f2937;
  color: white;
}

.loading-indicator {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}
</style>
