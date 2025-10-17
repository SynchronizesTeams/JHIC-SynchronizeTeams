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

// SEO Meta Tags
useSeoMeta({
  title: 'Berita & Pengumuman',
  description: 'Temukan berita dan pengumuman terbaru seputar SMK Plus Pelita Nusantara. Informasi terkini tentang kegiatan sekolah, prestasi siswa, dan program pendidikan.',
  ogTitle: 'Berita & Pengumuman - SMK Plus Pelita Nusantara',
  ogDescription: 'Informasi terbaru tentang kegiatan, prestasi, dan program pendidikan SMK Plus Pelita Nusantara.',
  ogImage: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
  ogUrl: 'https://smkpluspelitanusantara.sch.id/news',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Berita & Pengumuman - SMK Plus Pelita Nusantara',
  twitterDescription: 'Informasi terbaru tentang kegiatan, prestasi, dan program pendidikan SMK Plus Pelita Nusantara.',
  twitterImage: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://smkpluspelitanusantara.sch.id/news' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Berita & Pengumuman',
        'description': 'Kumpulan berita dan pengumuman terbaru SMK Plus Pelita Nusantara',
        'url': 'https://smkpluspelitanusantara.sch.id/news',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Beranda',
              'item': 'https://smkpluspelitanusantara.sch.id'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Berita',
              'item': 'https://smkpluspelitanusantara.sch.id/news'
            }
          ]
        }
      })
    }
  ]
})

const { newsList } = useNews();
const mainNews = computed<News>(() => newsList.value[0]!);
</script>
