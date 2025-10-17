<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">

    <!-- Hero Section -->
    <section
      class="relative flex items-center justify-center h-[40vh] overflow-hidden bg-black text-white mt-20">
      <NuxtImg
        src="/images/PEKAN IT_22.jpg"
        alt="Hero background"
        class="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Galeri
        </h1>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto">
          Jelajahi momen dan kegiatan terbaik dari SMK Plus Pelita Nusantara
        </p>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-primary-gray mb-2">Semua Galeri</h2>
        <p class="text-primary-gray/60">Koleksi lengkap foto kegiatan dan momen berharga</p>
      </div>

      <Galery :display-count="galleryImages.length" :images="galleryImages" />

      <div class="flex justify-center mt-12">
        <NuxtLink
          to="/#galery"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-full font-semibold hover:bg-primary-gray/5 hover:border-secondary-red/30 hover:text-secondary-red transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Kembali ke Beranda</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import galleryDataJson from '~/contents/gallery.json'

const galleryImages = ref<{ id: number; src: string; alt: string; title: string }[]>(
  galleryDataJson as any
);

// SEO
useHead({
  title: 'Galeri - SMK Plus Pelita Nusantara',
  meta: [
    { name: 'description', content: 'Galeri foto kegiatan dan momen berharga SMK Plus Pelita Nusantara' }
  ]
})
</script>

<style></style>
