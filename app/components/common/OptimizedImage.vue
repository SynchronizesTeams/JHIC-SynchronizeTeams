<template>
  <div
    ref="containerRef"
    class="optimized-image-container"
    :class="containerClass"
    :style="aspectRatioStyle">
    <!-- Placeholder blur -->
    <div
      v-if="!isLoaded && placeholder"
      class="placeholder"
      :style="{ backgroundImage: `url(${placeholder})` }" />

    <!-- Actual image -->
    <NuxtImg
      v-show="!hasError"
      :src="resolvedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :format="format"
      :quality="quality"
      :sizes="sizes"
      :class="imageClass"
      @load="handleLoad"
      @error="handleError" />

    <!-- Error state -->
    <div v-if="hasError" class="error-state">
      <svg
        class="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-sm text-gray-500 mt-2">Gambar gagal dimuat</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRuntimeConfig } from "#imports";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
  format?: "webp" | "avif" | "png" | "jpg";
  quality?: number;
  sizes?: string;
  eager?: boolean;
  aspectRatio?: string;
  containerClass?: string;
  imageClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  format: "webp",
  quality: 80,
  eager: false,
  aspectRatio: "16/9",
  containerClass: "",
  imageClass: "",
  placeholder: "/penus-icon.webp",
});

const config = useRuntimeConfig();
const BASE_URL = config.public.apiBase;

const containerRef = ref<HTMLElement | null>(null);
const isLoaded = ref(false);
const hasError = ref(false);

const resolvedSrc = computed(() => {
  const src = props.src;
  if (!src) return props.placeholder;

  // URL absolut (API/CDN)
  if (src.startsWith("http")) return src;

  // File dari public (otomatis dibaca dari /public)
  if (src.startsWith("/")) return src;

  // Kalau path relatif, anggap dari API Base URL
  return `${BASE_URL}/${src}`;
});

const aspectRatioStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
}));

const handleLoad = () => {
  isLoaded.value = true;
  hasError.value = false;
};

const handleError = () => {
  hasError.value = true;
  isLoaded.value = false;
  console.error(`Failed to load image: ${props.src}`);
};

onMounted(() => {
  if (props.eager) {
    isLoaded.value = true;
  }
});
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  overflow: hidden;
  background-color: #f3f4f6;
}

.placeholder {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  transform: scale(1.1);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.optimized-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
}

.error-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
