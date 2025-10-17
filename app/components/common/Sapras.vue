<template>
  <div class="relative w-full overflow-hidden py-4">
    <div
      v-if="saprasList.length === 0"
      class="text-center text-gray-500 py-20 text-lg font-medium">
      Memuat data...
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">
      <!-- Gambar -->
      <div class="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        <transition name="fade" mode="out-in">
          <img
            :key="currentSapras.image"
            :src="currentSapras.image"
            alt="sapras image"
            class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out" />
        </transition>
        <div
          class="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
      </div>

      <!-- Deskripsi -->
      <div class="relative">
        <transition name="slide" mode="out-in">
          <div :key="currentSapras.title" class="space-y-4">
            <h2
              class="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <span class="text-red-700">|</span>
              {{ currentSapras.title }}
            </h2>

            <div
              class="text-gray-700 prose prose-sm max-w-none"
              v-html="currentSapras.description"></div>

            <NuxtLink
              v-if="currentSapras.linkUrl"
              :to="currentSapras.linkUrl"
              class="inline-flex items-center gap-2 font-medium text-red-600 transition-all hover:translate-x-1">
              {{ currentSapras.linkText }}
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
            </NuxtLink>
          </div>
        </transition>
      </div>
    </div>

    <!-- Pagination Button -->
    <div class="flex justify-center gap-3 mt-6">
      <button
        v-for="(item, index) in saprasList"
        :key="index"
        @click="currentIndex = index"
        class="w-4 h-4 rounded-full transition-all cursor-pointer"
        :class="
          index === currentIndex
            ? 'bg-red-600 scale-110'
            : 'bg-gray-300 hover:bg-gray-400'
        "></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SaprasItem } from "~/types/info";
import saprasDataJson from "~/contents/sapras.json";

const defaultSapras: SaprasItem = {
  title: 'Memuat...',
  description: '',
  linkText: '',
  linkUrl: '',
  image: '',
}

const saprasList = ref<SaprasItem[]>(saprasDataJson);
const currentIndex = ref(0);

let interval: ReturnType<typeof setInterval>;
onMounted(() => {
  interval = setInterval(() => {
    const length = saprasList.value.length;
    if (length === 0) return;
    currentIndex.value = (currentIndex.value + 1) % length;
  }, 5000);
});
onUnmounted(() => clearInterval(interval));

const currentSapras = computed<SaprasItem>(
  () => saprasList.value[currentIndex.value] ?? defaultSapras
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
