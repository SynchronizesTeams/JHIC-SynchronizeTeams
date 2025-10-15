<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Mitra Industri</h2>

      <div class="relative overflow-visible">
        <div class="flex space-x-8 animate-partner-scroll">
          <div v-for="(partner, index) in partners" :key="index"
               class="flex-shrink-0 w-32 h-20 p-2 bg-white rounded-lg shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105"
               :title="partner.name">
            <img :src="partner.logoUrl" :alt="partner.name" class="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300">
          </div>
          <div v-for="(partner, index) in partners" :key="`duplicate-${index}`"
               class="flex-shrink-0 w-32 h-20 p-2 bg-white rounded-lg shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105"
               :title="partner.name">
            <img :src="partner.logoUrl" :alt="partner.name" class="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const partners = ref([
  { name: 'Mitra A', logoUrl: 'https://via.placeholder.com/128x80?text=Logo+A' },
  { name: 'Mitra B', logoUrl: 'https://via.placeholder.com/128x80?text=Logo+B' },
  { name: 'Mitra C', logoUrl: 'https://via.placeholder.com/128x80?text=Logo+C' },
  { name: 'Mitra D', logoUrl: 'https://via.placeholder.com/128x80?text=Logo+D' },
  { name: 'Mitra E', logoUrl: 'https://via.placeholder.com/128x80?text=Logo+E' },
  { name: 'Mitra F', logoUrl: 'https://via.placeholder.com/128x80?text=Logo+F' },
]);
</script>

<style scoped>
.animate-partner-scroll {
  animation: scroll-left 30s linear infinite; 
  width: max-content; 
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>