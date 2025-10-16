<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="displayedImages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
      
      <div
        v-for="(image, index) in displayedImages"
        :key="image.id || index"
        :class="[
          'group relative overflow-hidden rounded-xl shadow-lg cursor-pointer aspect-w-4 aspect-h-3',
          (index % 5 < 2) ? 'lg:col-span-3' : 'lg:col-span-2'
        ]"
      >
        <img 
          :src="image.src" 
          :alt="image.alt" 
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
        <div class="absolute bottom-0 left-0 p-4">
          <h3 class="text-white text-lg font-bold drop-shadow-md">{{ image.title }}</h3>
        </div>
      </div>

    </div>
    <div v-else>
      <p class="text-center text-gray-500">Tidak ada gambar untuk ditampilkan.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },

  displayCount: {
    type: Number,
    default: 10
  }
});

const displayedImages = computed(() => {
  return props.images.slice(0, props.displayCount);
});
</script>

<style>
/* Plugin Tailwind aspect-ratio diperlukan untuk `aspect-w-4 aspect-h-3`.
  Jika belum terinstall, jalankan: npm install -D @tailwindcss/aspect-ratio
  Lalu tambahkan di `tailwind.config.js` pada bagian plugins:
  
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
*/
</style>