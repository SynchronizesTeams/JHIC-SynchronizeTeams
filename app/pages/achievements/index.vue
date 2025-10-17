<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">

    <!-- Hero Section -->
    <section
      class="relative flex items-center justify-center h-[40vh] overflow-hidden bg-black text-white ">
      <NuxtImg
        src="/images/PEKAN IT_22.jpg"
        alt="Hero background"
        class="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Prestasi
        </h1>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto">
          Koleksi prestasi dan penghargaan yang telah diraih SMK Plus Pelita Nusantara
        </p>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-primary-gray mb-2">Semua Prestasi</h2>
        <p class="text-primary-gray/60">Pencapaian dan penghargaan yang membanggakan</p>
      </div>

      <!-- Achievements Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="achievement in achievements"
          :key="achievement.id"
          :to="`/news/${achievement.News.slug}`"
          class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
          <div class="relative h-48 overflow-hidden">
            <NuxtImg
              :src="achievement.image"
              :alt="achievement.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 p-4">
              <h3 class="text-xl font-bold text-white mb-1">
                {{ achievement.title }}
              </h3>
              <p class="text-sm text-white/80">
                {{ formatDate(achievement.achievement_date) }}
              </p>
            </div>
          </div>

          <div class="p-6">
            <p class="text-primary-gray/80 text-sm line-clamp-3 mb-4">
              {{ achievement.News.excerpt }}
            </p>
            <div class="flex items-center gap-2 text-secondary-red text-sm font-semibold group-hover:gap-3 transition-all">
              <span>Baca Selengkapnya</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Back to Home Button -->
      <div class="flex justify-center mt-12">
        <NuxtLink
          to="/#achievment"
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
import NavigationBar from '~/components/common/NavigationBar.vue'
import { mockAchievements } from '~/utils/mockData'
import type { Achievement } from '~/types/achievement'

const achievements = ref<Achievement[]>(mockAchievements)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Enhanced SEO Meta Tags
useSeoMeta({
  title: 'Prestasi & Penghargaan',
  description: 'Koleksi prestasi dan penghargaan yang telah diraih oleh siswa dan guru SMK Plus Pelita Nusantara. Berbagai penghargaan akademik dan non-akademik tingkat lokal, nasional, dan internasional.',
  ogTitle: 'Prestasi & Penghargaan - SMK Plus Pelita Nusantara',
  ogDescription: 'Lihat berbagai prestasi membanggakan yang diraih oleh keluarga besar SMK Plus Pelita Nusantara.',
  ogImage: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
  ogUrl: 'https://smkpluspelitanusantara.sch.id/achievements',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Prestasi & Penghargaan - SMK Plus Pelita Nusantara',
  twitterDescription: 'Lihat berbagai prestasi membanggakan yang diraih oleh keluarga besar SMK Plus Pelita Nusantara.',
  twitterImage: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://smkpluspelitanusantara.sch.id/achievements' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Prestasi & Penghargaan',
        'description': 'Koleksi prestasi dan penghargaan SMK Plus Pelita Nusantara',
        'url': 'https://smkpluspelitanusantara.sch.id/achievements',
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
              'name': 'Prestasi',
              'item': 'https://smkpluspelitanusantara.sch.id/achievements'
            }
          ]
        }
      })
    }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
