<template>
  <div class="w-full rounded-lg p-4 md:p-8">
    <div class="flex space-x-2 mb-6 border-b border-gray-300 w-full items-center justify-center">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 font-medium transition-colors duration-300 rounded-full cursor-pointer',
          activeTab === tab.id 
            ? 'text-primary-white bg-red-900' 
            : 'text-gray-600 hover:text-gray-800'
        ]">
        {{ tab.label }}
      </button>
    </div>

    
    <div v-if="activeTab === 'visimisi'" class="text-center max-w-xl mx-auto my-6">
      <div class="w-28 h-0.5 bg-black/25 mx-auto mb-8"></div>

      <blockquote
        class="text-xl font-semibold text-gray-800 leading-snug italic tracking-tight">
        <p>"Succeeded By Character!</p>
        <p class="mt-1">We Are Different!</p>
        <p class="mt-1">The Future is Ours!"</p>
      </blockquote>

      <p class="mt-8 text-sm font-medium italic text-gray-500">
        SMK Plus Pelita Nusantara
      </p>

      <div class="w-28 h-0.5 bg-black/25 mx-auto mt-8 mb-8"></div>
    </div>
    
    <div v-if="activeTab !== 'visimisi'" class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <div class="h-64 md:h-80 rounded-md bg-[#C4C4C4]">
      </div>
      
      <div class="flex flex-col justify-center">
        <h2 class="text-xl md:text-2xl font-bold text-gray-800">
          | {{ currentTabContent.title }}
        </h2>
        <div class="mt-4 text-gray-700" v-html="currentTabContent.description"></div>
        
        <a
          v-if="currentTabContent.linkUrl"
          :href="currentTabContent.linkUrl"
          class="mt-6 inline-flex items-center font-medium text-red-600 transition-colors hover:text-red-800">
          {{ currentTabContent.linkText }}
          <svg
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
    
    <div v-if="activeTab !== 'profile'" class="flex items-center justify-center gap-4 mt-8">
      <div 
        v-for="info in currentTabContent.infoBoxes" 
        :key="info.title"
        class="shadow-md rounded-md p-4 h-32 w-full flex flex-col justify-center items-center">
        <h3 class="text-lg font-bold text-gray-800">{{ info.title }}</h3>
        <p class="text-sm text-gray-600 mt-2 text-center">{{ info.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

type TabKey = 'profile' | 'visimisi' | 'sapras';

const activeTab = ref<TabKey>('profile');

const tabs: { id: TabKey; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'visimisi', label: 'Visi & Misi' },
  { id: 'sapras', label: 'Sapras' }
];

const tabContent: Record<TabKey, {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  infoBoxes: { title: string; content: string }[];
}> = {
  profile: {
    title: 'Profile PENUS',
    description: `
      <p class="mb-2"><b>Sekolah Menengah Kejuruan</b> Plus Pelita Nusantara</p>
      <p>Menjadi Sekolah Menengah Kejuruan Unggulan yang menghasilkan sumber daya manusia <b>Terampil</b>, <b>Entrepreneur</b>, dan <b>Religius</b>.</p>
    `,
    linkText: 'Selengkapnya',
    linkUrl: '#',
    infoBoxes: [
      { title: 'Sejarah', content: 'Berdiri sejak tahun 2010' },
      { title: 'Lokasi', content: 'Jl. Pendidikan No. 123' },
      { title: 'Kontak', content: 'info@pelitanusantara.sch.id' }
    ]
  },
  visimisi: {
    title: 'Visi dan Misi',
    description: `
      <p class="mb-2"><b>Visi:</b> Menjadi sekolah unggulan dalam bidang kejuruan yang menghasilkan lulusan berkarakter dan berdaya saing global.</p>
      <p class="mb-2"><b>Misi:</b> Menyelenggarakan pendidikan berkualitas dengan kurikulum relevan, mengembangkan potensi siswa, dan membangun karakter yang kuat.</p>
      <p><b>Slogan:</b> Success by character, we are different</p>
    `,
    linkText: 'Pelajari Lebih Lanjut',
    linkUrl: '#',
    infoBoxes: [
      { title: 'Visi', content: 'Menjadi sekolah unggulan' },
      { title: 'Misi', content: 'Pendidikan berkualitas' },
    ]
  },
  sapras: {
    title: 'Sarana Prasarana PENUS',
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
    linkText: 'Lihat Fasilitas',
    linkUrl: '#',
    infoBoxes: [
      { title: 'Lab Komputer', content: '30 unit PC terbaru' },
      { title: 'Workshop', content: 'Peralatan praktikum lengkap' },
      { title: 'Perpustakaan', content: 'Koleksi digital dan fisik' }
    ]
  }
};

const currentTabContent = computed(() => tabContent[activeTab.value]);
</script>