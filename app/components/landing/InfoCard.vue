<template>
  <div class="w-full rounded-lg p-8">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      <div class="h-64 rounded-md bg-[#C4C4C4]">
        <!-- This harusnya gambar -->
      </div>

      <div class="flex flex-col justify-center">
        <h2 class="text-3xl text-gray-800" v-html="title"></h2>
        <p class="mt-4 text-xl text-gray-700 " v-html="description"></p>
        <a
          v-if="linkUrl"
          :href="linkUrl"
          class="mt-6 inline-flex items-center font-medium text-gray-800 transition-colors hover:text-black">
          {{ linkText }}
          <svg
            v-if="linkUrl"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 h-4 w-4"
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
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    linkText?: string;
    linkUrl?: string;
  }>(),
  {
    title: "<b>Sekolah Menengah Kejuruan</b> <br> Plus Pelita Nusantara",
    description:
      "Menjadi Sekolah Menengah Kejuruan Unggulan yang menghasilkan sumber daya manusia <b>Terampil</b>, <b>Entrepreneur</b>, dan <b>Religius</b>.",
  }
);
</script>
u