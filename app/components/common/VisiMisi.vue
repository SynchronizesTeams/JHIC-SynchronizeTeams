<template>
  <div v-if="content">
    <!-- Tagline -->
    <div class="text-center max-w-2xl mx-auto my-6">
      <div
        class="w-32 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded"></div>

      <blockquote
        class="relative text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed italic tracking-tight">
        <p v-for="(line, i) in content.tagline.lines" :key="i" class="mt-1">
          {{ line }}
        </p>
      </blockquote>

      <p class="mt-8 text-sm font-medium italic text-gray-500">
        {{ content.tagline.footer }}
      </p>

      <div
        class="w-28 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mt-8 mb-8 rounded"></div>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-12">
      <div
        v-for="card in content.cards"
        :key="card.title"
        class="bg-white rounded-2xl overflow-visible shadow-lg hover:shadow-2xl transition-all duration-300 group relative">
        <div
          class="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          <NuxtImg
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div
          class="absolute inset-x-0 top-[176px] flex justify-center px-4 z-30">
          <span
            class="bg-white px-4 py-2 rounded-full shadow-xl font-bold text-gray-800 text-xs sm:text-sm whitespace-nowrap max-w-[85%] overflow-hidden text-ellipsis text-secondary-red">
            {{ card.title }}
          </span>
        </div>

        <div class="px-6 pt-8 pb-6 text-center relative z-0">
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Profile -->
    <div
      class="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-md">
      <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">
        {{ content.profile.title }}
      </h3>
      <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        <p
          v-for="(paragraph, i) in content.profile.paragraphs"
          :key="i"
          v-html="paragraph"
          class="mb-4"></p>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-8 text-gray-500">Memuat konten...</div>
</template>

<script setup lang="ts">
import type { SchoolProfileContent } from "~/types/info"
import profileDataJson from "~/contents/visimisi.json"

const content = ref<SchoolProfileContent>(profileDataJson as SchoolProfileContent)
</script>

<style scoped>
@media (max-width: 640px) {
  blockquote {
    font-size: 1rem;
  }
}

.prose p {
  text-align: justify;
}
</style>
