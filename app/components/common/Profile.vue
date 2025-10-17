<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
    <!-- Image -->
    <div
      class="h-64 md:h-80 rounded-lg overflow-hidden relative bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 shadow-inner flex items-center justify-center">
      <div class="w-full h-full flex items-center justify-center">
        <NuxtImg
          class="hover:scale-110 transition-all duration-500"
          :src="content.image"
          :alt="content.title" />
      </div>
    </div>

    <div class="flex flex-col justify-center">
      <h2 class="text-xl md:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
        <span class="text-red-700">|</span>
        {{ content.title }}
      </h2>

      <div class="mt-4 text-gray-700 prose prose-sm max-w-none" v-html="content.description"></div>

      <NuxtLink
        v-if="content.linkUrl"
        :to="content.linkUrl"
        class="mt-6 inline-flex items-center gap-2 font-medium text-red-600 transition-all hover:translate-x-1">
        {{ content.linkText }}
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
  </div>
</template>

<script lang="ts" setup>
import type { SectionProfileContent } from '~/types/info';
import profileJson from "~/contents/profilesection.json"

const content: SectionProfileContent = profileJson.profile
</script>