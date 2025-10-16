<template>
  <div
    class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-xl">
    <NuxtLink :to="`/news/${mainNews.slug}`">
      <div
        class="mb-8 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl">
        <div
          class="relative w-full h-80 bg-gray-300 group cursor-pointer"
          :style="`background-image: url(${mainNews.cover}); background-size: cover; background-position: center;`">
          <div
            class="absolute inset-0 bg-black/40 flex items-end p-6 transition-all duration-300 group-hover:bg-black/60">
            <div class="text-white w-full">
              <h1
                class="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 leading-tight">
                {{ mainNews.title }}
              </h1>
              <p
                class="text-lg font-medium max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 line-clamp-3">
                {{ mainNews.excerpt }}
              </p>
              <span
                class="block mt-2 text-sm font-semibold text-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >Baca Selengkapnya →</span
              >
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <NuxtLink v-for="news in secondaryNews" :key="news.title" :to="`/news/${news.slug}`">
        <div
          class="rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
          <div
            class="relative w-full aspect-square bg-gray-300 group cursor-pointer"
            :style="`background-image: url(${news.cover}); background-size: cover; background-position: center;`">
            <div
              class="absolute inset-0 bg-black/40 flex items-end p-4 transition-all duration-300 group-hover:bg-black/70">
              <div class="text-white w-full">
                <h2
                  class="text-xl font-bold mb-1 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-red-300">
                  {{ news.title }}
                </h2>
                <p
                  class="text-sm max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100 line-clamp-2">
                  {{ news.excerpt }}
                </p>
                <span
                  class="block mt-1 text-xs font-medium text-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >Lihat Detail →</span
                >
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { News } from "~/types/news";

const { mainNews, secondaryNews } = withDefaults(
  defineProps<{
    mainNews: News;
    secondaryNews?: News[];
  }>(),
  {
    secondaryNews: () => [],
  }
);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
