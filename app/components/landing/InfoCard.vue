<template>
  <div class="w-full rounded-lg bg-gray-100 p-4 md:p-8">
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Profile Sekolah</h1>
    </div>
    
    <div class="flex space-x-2 mb-6 border-b border-gray-300">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 font-medium transition-colors',
          activeTab === tab.id 
            ? 'text-red-600 border-b-2 border-red-600' 
            : 'text-gray-600 hover:text-gray-800'
        ]">
        {{ tab.label }}
      </button>
    </div>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <div class="h-64 md:h-80 rounded-md bg-[#C4C4C4]">
        <!-- 图片区域 -->
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
    
    <!-- 底部信息模块 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div 
        v-for="info in currentTabContent.infoBoxes" 
        :key="info.title"
        class="bg-gray-300 rounded-md p-4 h-32 flex flex-col justify-center items-center">
        <h3 class="text-lg font-bold text-gray-800">{{ info.title }}</h3>
        <p class="text-sm text-gray-600 mt-2 text-center">{{ info.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const activeTab = ref('profile');

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'visimisi', label: 'Visi & Misi' },
  { id: 'sapras', label: 'Sapras' }
];

const tabContent = {
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
      { title: 'Nilai', content: 'Success by character' }
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