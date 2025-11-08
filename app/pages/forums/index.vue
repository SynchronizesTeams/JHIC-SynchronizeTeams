<template>
  <section class="bg-primary-gray py-16 mx-6 rounded-2xl">
    <div class="mx-auto flex max-w-5xl flex-col items-center text-center text-primary-text">
      <div class="mb-12 space-y-3">
        <span class="inline-flex items-center rounded-full border border-primary-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
          Forum
        </span>
        <h1 class="text-3xl font-bold sm:text-4xl">Member Area</h1>
        <p class="max-w-3xl text-sm opacity-80 sm:text-base">
          <span class="font-semibold">Selamat datang di forum.</span> Tempat berbagi informasi dan diskusi untuk alumni dan siswa.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="w-full px-5 md:px-0">
        <div class="flex items-center justify-center py-12">
          <svg class="animate-spin h-12 w-12 text-secondary-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="w-full px-5 md:px-0">
        <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {{ error }}
        </div>
      </div>

      <!-- Forum Channels -->
      <div v-else class="grid w-full px-5 md:px-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="channel in channels"
          :key="channel.id"
          :to="`/forums/${channel.slug}`"
          class="group block h-full"
        >
          <div class="flex mx-5 md:mx-0 h-full flex-col rounded-2xl bg-primary-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div class="mb-4 flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl"
                :class="getChannelColorClasses(channel.color)"
              >
                <svg class="h-6 w-6 text-primary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                </svg>
              </div>
              <div class="text-left">
                <h3 class="text-lg font-semibold text-primary-gray transition-colors group-hover:text-secondary-red">
                  {{ channel.name }}
                </h3>
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="getAccessBadgeClasses(channel.access)"
                >
                  {{ channel.access === 'public' ? 'Publik' : 'Member' }}
                </span>
              </div>
            </div>
            <p class="mb-4 text-sm leading-relaxed text-primary-gray opacity-80">{{ channel.description }}</p>
            <div class="mt-auto flex items-center justify-between text-xs font-medium text-button-gray">
              <span>
                {{ getChannelPostCount(channel.id) }} postingan
              </span>
              <svg class="h-4 w-4 text-secondary-red transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Forum Diskusi - Member Area',
  description: 'Forum diskusi untuk alumni dan siswa SMK Plus Pelita Nusantara. Tempat berbagi informasi, pengalaman, dan diskusi seputar pendidikan dan karir.',
  ogTitle: 'Forum Diskusi - SMK Plus Pelita Nusantara',
  ogDescription: 'Bergabung dalam diskusi dengan alumni dan siswa SMK Plus Pelita Nusantara.',
  ogImage: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
  ogUrl: 'https://smkpluspelitanusantara.sch.id/forums',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Forum Diskusi - SMK Plus Pelita Nusantara',
  twitterDescription: 'Bergabung dalam diskusi dengan alumni dan siswa SMK Plus Pelita Nusantara.',
  twitterImage: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://smkpluspelitanusantara.sch.id/forums' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DiscussionForumPosting',
        'name': 'Forum Diskusi SMK Plus Pelita Nusantara',
        'description': 'Forum diskusi untuk alumni dan siswa',
        'url': 'https://smkpluspelitanusantara.sch.id/forums',
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
              'name': 'Forum',
              'item': 'https://smkpluspelitanusantara.sch.id/forums'
            }
          ]
        }
      })
    }
  ]
})

const api = useApi()
const channels = ref<any[]>([])
const posts = ref<any[]>([])
const loading = ref(true)
const error = ref('')

// Fetch forum sections dari API
const fetchForumSections = async () => {
  try {
    loading.value = true
    error.value = ''
    const response: any = await api.forumSection.getAll()
    channels.value = response.data || response || []
  } catch (err: any) {
    console.error('Error fetching forum sections:', err)
    error.value = 'Gagal memuat forum. Silakan coba lagi.'
    // Fallback ke mock data jika API error
    const { mockChannels } = await import('~/utils/mockData')
    channels.value = mockChannels
  } finally {
    loading.value = false
  }
}

// Fetch all posts untuk menghitung jumlah post per section
const fetchAllPosts = async () => {
  try {
    const response: any = await api.forumPost.getAll()
    posts.value = response.data || response || []
  } catch (err: any) {
    console.error('Error fetching posts:', err)
  }
}

// Fetch data saat komponen mounted
onMounted(async () => {
  await fetchForumSections()
  await fetchAllPosts()
})

const getChannelPostCount = (channelId: number) => {
  return posts.value.filter((post: any) => post.section?.id === channelId).length
}

const getChannelColorClasses = (color?: string) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-secondary-red',
    green: 'bg-button-gray',
    purple: 'bg-primary-gray'
  }
  return colorMap[color || 'blue'] || 'bg-button-gray'
}

const getAccessBadgeClasses = (access?: string) => {
  return access === 'public'
    ? 'bg-secondary-red text-primary-text'
    : 'bg-button-gray text-primary-text'
}
</script>
