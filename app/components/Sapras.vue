<template>
  <div>
    <div v-if="isLoading" class="text-center text-gray-500">Memuat data...</div>
    <div
      v-else-if="saprasData"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <div
        class="h-64 md:h-80 rounded-lg overflow-hidden relative bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 shadow-inner flex items-center justify-center">
        <div class="w-full h-full flex items-center justify-center"></div>
        <div
          class="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-red-100/40 blur-2xl pointer-events-none"></div>
      </div>

      <div class="flex flex-col justify-center">
        <h2
          class="text-xl md:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          <span class="text-red-700">|</span>
          {{ saprasData.title }}
        </h2>

        <div
          class="mt-4 text-gray-700 prose prose-sm max-w-none"
          v-html="saprasData.description"></div>

        <a
          v-if="saprasData.linkUrl"
          :href="saprasData.linkUrl"
          class="mt-6 inline-flex items-center gap-2 font-medium text-red-600 transition-all hover:translate-x-1">
          {{ saprasData.linkText }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface SaprasData {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const saprasData = ref<SaprasData | null>(null);
const isLoading = ref(true);

const fetchSaprasData = () => {
  setTimeout(() => {
    saprasData.value = {
      title: "Sarana Prasarana PENUS",
      description: `
        <p class="mb-2">SMK Plus Pelita Nusantara dilengkapi dengan fasilitas pendukung pembelajaran yang modern dan memadai:</p>
        <ul class="list-disc pl-5">
          <li>Laboratorium Komputer</li>
          <li>Workshop Praktikum</li>
          <li>Perpustakaan Digital</li>
          <li>Ruang Multimedia</li>
          <li>Lapangan Olahraga</li>
        </ul>
      `,
      linkText: "Lihat Fasilitas",
      linkUrl: "#",
    };
    isLoading.value = false;
  }, 100);
};

onMounted(() => {
  fetchSaprasData();
});
</script>

<style></style>
