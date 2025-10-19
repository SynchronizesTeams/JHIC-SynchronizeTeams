<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isVisible"
          class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          @click.stop
        >
          <button
            @click="closePopup"
            class="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-gray hover:bg-primary-gray hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Close popup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="p-0 w-auto h-full">
            <NuxtImg
              ref="infographicImage"
              :src="imageSrc"
              alt="Infografis SMK PLUS PELITA NUSANTARA"
              class="w-full h-auto rounded-t-2xl"
              @load="handleImageLoad"
              @error="handleImageError"
            />

            <div v-if="showFooter" class="p-6 text-center">
              <h3 class="text-2xl font-bold text-primary-gray mb-2">
                Selamat Datang di SMK PLUS PELITA NUSANTARA
              </h3>
              <p class="text-primary-gray/80">
                Mari jelajahi lebih lanjut tentang kami
              </p>
              <button
                @click="closePopup"
                class="mt-4 px-6 py-2 bg-secondary-red text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Mulai Eksplorasi
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Props {
  modelValue?: boolean
  imageSrc?: string
  autoShow?: boolean
  showFooter?: boolean
  storageKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  imageSrc: '/images/penus/main-logo.png',
  autoShow: true,
  showFooter: true,
  storageKey: 'infographic-popup-shown'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
  'imageLoad': []
  'imageError': []
}>()

const isVisible = ref(props.modelValue || false)
const infographicImage = ref<HTMLImageElement | null>(null)

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
  if (newVal) {
    emit('open')
  }
})

watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal)
  if (!newVal) {
    emit('close')
  }
})

const closePopup = () => {
  isVisible.value = false
  // if (props.autoShow && props.storageKey) {
  //   localStorage.setItem(props.storageKey, 'true')
  // }
}

const handleBackdropClick = () => {
  closePopup()
}

const handleImageLoad = () => {
  emit('imageLoad')
}

const handleImageError = () => {
  emit('imageError')
  if (!props.imageSrc.includes('Logo.png')) {
    emit('update:modelValue', false)
  }
}

const shouldShowPopup = () => {
  if (props.autoShow && props.storageKey) {
    const hasSeenPopup = localStorage.getItem(props.storageKey) === 'true'
    return !hasSeenPopup
  }
  return props.modelValue || false
}

onMounted(() => {
  if (props.autoShow && shouldShowPopup()) {
    setTimeout(() => {
      isVisible.value = true
      emit('open')
    }, 500)
  } else if (props.modelValue) {
    isVisible.value = true
  }
})

defineExpose({
  close: closePopup,
  open: () => { isVisible.value = true },
  toggle: () => { isVisible.value = !isVisible.value }
})
</script>

<style scoped>
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
