<template>
  <div class="min-h-screen text-gray-900">
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
          Galery
        </h1>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto">
          Jelajahi momen dan kegiatan terbaik dari SMK Plus Pelita Nusantara.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-16">
      <SectionGalery :display-count="20" :images="galleryImages" />
    </section>
  </div>
</template>

<script lang="ts" setup>
const galleryImages = ref<
  { id: number; src: string; alt: string; title: string }[]
>([]);

for (let i = 1; i <= 20; i++) {
  galleryImages.value.push({
    id: i,
    src: `https://picsum.photos/seed/${i}/800/600`,
    alt: `Gambar Literasi ${i}`,
    title: `Literasi Pagi #${i}`,
  });
}
</script>

<style></style>
