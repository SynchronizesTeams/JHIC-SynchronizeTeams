<template>
  <div
    class="w-full max-w-7xl flex flex-col items-center justify-center gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      v-if="displayedImages.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
      <div
        v-for="(image, index) in displayedImages"
        :key="image.id || index"
        :class="[
          'group relative overflow-hidden rounded-xl shadow-lg cursor-pointer aspect-w-4 aspect-h-3',
          index % 5 < 2 ? 'lg:col-span-3' : 'lg:col-span-2',
        ]">
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
        <div class="absolute bottom-0 left-0 p-4">
          <h3 class="text-white text-lg font-bold drop-shadow-md">
            {{ image.title }}
          </h3>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">
        Tidak ada gambar untuk ditampilkan.
      </p>
    </div>
<<<<<<< HEAD
=======
    <NuxtLink
      v-if="useRoute().path === '/'"
      to="/galery"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg">
      <span>Lihat Lainnya</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
      </svg>
    </NuxtLink>
>>>>>>> 7524984969aed5703401a7ca1877c0593401ef37
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },

  displayCount: {
    type: Number,
    default: 10,
  },
});

const displayedImages = computed(() => {
  return props.images.slice(0, props.displayCount);
});
</script>

<style>
/* Plugin Tailwind aspect-ratio diperlukan buat `aspect-w-4 aspect-h-3`.
  Install: npm install -D @tailwindcss/aspect-ratio
  Trs import di main.css (LOW PRIORITY):
  @plugin "@tailwindcss/aspect-ratio"
*/
</style>
