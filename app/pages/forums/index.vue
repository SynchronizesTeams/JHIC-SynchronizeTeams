<template>
  <section class="bg-primary-gray py-16 px-4 rounded-2xl">
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

      <div class="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="channel in channels"
          :key="channel.id"
          :to="`/forums/${channel.slug}`"
          class="group block h-full"
        >
          <div class="flex h-full flex-col rounded-2xl bg-primary-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
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
                {{ getChannelPostCount(channel.slug) }} postingan
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
import { mockPosts, mockChannels } from '~/utils/mockData'

const channels = computed(() => mockChannels)

// Get posts sorted by creation date, limited to recent ones
const recentPosts = computed(() =>
  [...mockPosts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
)

const getChannelPostCount = (channelSlug: string) => {
  return mockPosts.filter(post => post.channel === channelSlug).length
}

const getChannelColorClasses = (color: string) => {
  const colorMap = {
    blue: 'bg-secondary-red',
    green: 'bg-button-gray',
    purple: 'bg-primary-gray'
  }
  return colorMap[color as keyof typeof colorMap] || 'bg-button-gray'
}

const getAccessBadgeClasses = (access: string) => {
  return access === 'public'
    ? 'bg-secondary-red text-primary-text'
    : 'bg-button-gray text-primary-text'
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Baru saja'
  if (diffInHours < 24) return `${diffInHours} jam lalu`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} hari lalu`

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>
