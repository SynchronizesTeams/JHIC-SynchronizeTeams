<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <section
      class="relative flex items-center justify-center h-[60vh] overflow-hidden bg-black text-white mt-36 mx-6 rounded-3xl">
      <NuxtImg
        src="/images/PEKAN IT_22.jpg"
        alt="Hero background"
        class="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          News & Announcements
        </h1>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto">
          Temukan berita dan pengumuman terbaru seputar SMK Plus Pelita
          Nusantara.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-16">
      <SectionAnnouncement :main-news="mainNews" :secondary-news="newsList" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { News } from '../../types/news';

const { newsList } = useNews();
const mainNews = computed<News>(() => newsList.value[0]!);
</script>
