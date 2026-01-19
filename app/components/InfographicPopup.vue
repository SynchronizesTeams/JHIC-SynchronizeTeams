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
          class="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-auto"
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
            <img
              ref="infographicImage"
              :src="imageSrc"
              alt="Infografis SMK PLUS PELITA NUSANTARA"
              class="w-full max-w-2xl mx-auto h-auto rounded-t-2xl"
              format="webp"
              quality="80"
              loading="lazy"
              @load="handleImageLoad"
              @error="handleImageError"
            />

            <div v-if="showFooter" class="p-6 text-center">
              <h3 class="text-2xl font-bold text-primary-gray mb-2">
                Selamat Datang di SMK PLUS PELITA NUSANTARA
              </h3>
              <p class="text-primary-gray/80">
               Daftar sekarang melalui portal SPMB resmi kami dan jadilah bagian dari keluarga besar SMK Plus PNB
              </p>
              <button
                @click="goToPPDB"
                class="mt-4 px-6 py-2 bg-secondary-red text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Daftar Sekarang
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
import { useRouter } from 'vue-router'

interface Props {
  modelValue?: boolean
  imageSrc?: string
  autoShow?: boolean
  showFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  imageSrc: '/images/popup/foto1.jpg',
  autoShow: true,
  showFooter: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
  'imageLoad': []
  'imageError': []
}>()
const router = useRouter()
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
}

const goToPPDB = () => {
  closePopup()
  router.push('/spmb')
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

onMounted(() => {
  isVisible.value = true
  emit('open')
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
