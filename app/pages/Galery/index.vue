<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">
    <!-- Hero Section -->
    <section
      class="relative flex items-center justify-center h-[40vh] overflow-hidden bg-black text-white mt-20">
      <img
        loading="lazy"
        src="/images/pekanit.jpg"
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
        <p class="text-primary-gray/60">
          Koleksi lengkap foto kegiatan dan momen berharga
        </p>
        <div v-if="loading" class="text-sm text-primary-gray/60 mt-2">
          Memuat galeri...
        </div>
        <div v-else-if="error" class="text-sm text-secondary-red mt-2">
          Gagal memuat galeri: {{ error }}
        </div>
      </div>

      <SectionGalery :display-count="galleryImages.length" :images="galleryImages" />

      <div class="flex justify-center mt-12">
        <NuxtLink
          to="/#galery"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-full font-semibold hover:bg-primary-gray/5 hover:border-secondary-red/30 hover:text-secondary-red transition-all">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7" />
          </svg>
          <span>Kembali ke Beranda</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import OptimizedImage from '~/components/common/OptimizedImage.vue';

const { galleryImages, loading, error } = useGallery();

// Enhanced SEO Meta Tags
useSeoMeta({
  title: "Galeri Foto & Video",
  description:
    "Galeri foto dan dokumentasi kegiatan SMK Plus Pelita Nusantara. Jelajahi momen-momen berharga, kegiatan sekolah, prestasi siswa, dan berbagai acara yang telah dilaksanakan.",
  ogTitle: "Galeri Foto & Video - SMK Plus Pelita Nusantara",
  ogDescription:
    "Jelajahi dokumentasi visual kegiatan dan momen berharga di SMK Plus Pelita Nusantara.",
  ogImage: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
  ogUrl: "https://smkpluspelitanusantara.sch.id/Galery",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Galeri Foto & Video - SMK Plus Pelita Nusantara",
  twitterDescription:
    "Jelajahi dokumentasi visual kegiatan dan momen berharga di SMK Plus Pelita Nusantara.",
  twitterImage: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
});

useHead({
  link: [
    { rel: "canonical", href: "https://smkpluspelitanusantara.sch.id/Galery" },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Galeri SMK Plus Pelita Nusantara",
        description: "Dokumentasi kegiatan dan momen berharga",
        url: "https://smkpluspelitanusantara.sch.id/Galery",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: "https://smkpluspelitanusantara.sch.id",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Galeri",
              item: "https://smkpluspelitanusantara.sch.id/Galery",
            },
          ],
        },
      }),
    } as any,
  ],
});
</script>

<style></style>
