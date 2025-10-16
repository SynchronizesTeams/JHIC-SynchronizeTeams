<template>
  <div
    class="w-full rounded-2xl p-4 md:p-8 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm">
    <div class="flex items-center justify-center mb-6">
      <div class="inline-flex gap-3">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :aria-pressed="activeTab === tab.id"
          :class="[
            'px-4 py-2 font-semibold transition-all duration-300 rounded-full focus:outline-none select-none',
            activeTab === tab.id
              ? 'bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg transform scale-105'
              : 'text-gray-600 hover:text-gray-800 hover:shadow-sm',
          ]">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div
      v-if="activeTab === 'visimisi'"
      class="text-center max-w-2xl mx-auto my-6">
      <div
        class="w-32 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded"></div>

      <blockquote
        class="relative text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed italic tracking-tight">
        <p class="mb-1">"Succeeded By Character!</p>
        <p class="mt-1">We Are Different!</p>
        <p class="mt-1">The Future is Ours!"</p>
      </blockquote>

      <p class="mt-8 text-sm font-medium italic text-gray-500">
        SMK Plus Pelita Nusantara
      </p>

      <div
        class="w-28 h-0.5 bg-gradient-to-r from-red-500 to-red-900 mx-auto mt-8 mb-8 rounded"></div>
    </div>

    <div
      v-if="activeTab === 'profile'"
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
          {{ currentTabContent.title }}
        </h2>

        <div
          class="mt-4 text-gray-700 prose prose-sm max-w-none"
          v-html="currentTabContent.description"></div>

        <a
          v-if="currentTabContent.linkUrl"
          :href="currentTabContent.linkUrl"
          class="mt-6 inline-flex items-center gap-2 font-medium text-red-600 transition-all hover:translate-x-1">
          {{ currentTabContent.linkText }}
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

    <Sapras v-if="activeTab === 'sapras'" />

    <div
      v-if="activeTab === 'visimisi'"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      <div
        v-for="info in currentTabContent.infoBoxes"
        :key="info.title"
        class="group bg-white/60 backdrop-blur-sm rounded-xl p-4 h-fit flex flex-col justify-center items-center text-center shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
        <div
          class="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-3">
          <svg
            class="w-6 h-6 text-red-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
          </svg>
        </div>

        <h3 class="text-lg font-bold text-gray-800">{{ info.title }}</h3>
        <p class="text-sm text-gray-600 mt-2">{{ info.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sapras from "@/components/Sapras.vue";

type TabKey = "profile" | "visimisi" | "sapras";

const activeTab = ref<TabKey>("profile");

const tabs: { id: TabKey; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "visimisi", label: "Visi & Misi" },
  { id: "sapras", label: "Sapras" },
];

const tabContent: Record<
  TabKey,
  {
    title?: string;
    description?: string;
    linkText?: string;
    linkUrl?: string;
    infoBoxes?: { title: string; content: string }[];
  }
> = {
  profile: {
    title: "Profile PENUS",
    description: `
      <p class="mb-2"><b>Sekolah Menengah Kejuruan</b> Plus Pelita Nusantara</p>
      <p>Menjadi Sekolah Menengah Kejuruan Unggulan yang menghasilkan sumber daya manusia <b>Terampil</b>, <b>Entrepreneur</b>, dan <b>Religius</b>.</p>
    `,
    linkText: "Selengkapnya",
    linkUrl: "#",
  },
  visimisi: {
    title: "Visi dan Misi",
    description: `
      <p class="mb-2"><b>Visi:</b> Menjadi sekolah unggulan dalam bidang kejuruan yang menghasilkan lulusan berkarakter dan berdaya saing global.</p>
      <p class="mb-2"><b>Misi:</b> Menyelenggarakan pendidikan berkualitas dengan kurikulum relevan, mengembangkan potensi siswa, dan membangun karakter yang kuat.</p>
      <p><b>Slogan:</b> Success by character, we are different</p>
    `,
    linkText: "Pelajari Lebih Lanjut",
    linkUrl: "#",
    infoBoxes: [
      {
        title: "Visi",
        content:
          "Mewujudkan SMK yang unggul dalam mutu dan prestasi menghasilkan peserta didik yang berkarakter terampil, entrepreneur dan religius.",
      },
      { title: "Misi", content: "Pendidikan berkualitas" },
    ],
  },
  sapras: {},
};

const currentTabContent = computed(() => tabContent[activeTab.value]);
</script>

<style scoped>
@media (max-width: 640px) {
  blockquote {
    font-size: 1rem;
  }
}
</style>
