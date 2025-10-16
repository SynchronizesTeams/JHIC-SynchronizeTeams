<template>
  <div class="bg-primary-gray border-b border-primary-white/10 p-4 transition-colors">
    <!-- Post Header & Content - Clickable to view detail -->
    <nuxt-link :to="`/forums/${post.channel}/${post.id}`" class="block cursor-pointer hover:bg-button-gray/20 rounded-xl p-2 -m-2 transition-colors" style="text-decoration: none; color: inherit;" @click="console.log('Link clicked:', `/forums/${post.channel}/${post.id}`)">
      <div class="flex items-start gap-3">
        <img
          :src="post.author.avatar"
          :alt="post.author.name"
          class="w-10 h-10 rounded-full flex-shrink-0"
        >
        <div class="flex-1 min-w-0">
          <div class="flex items-center flex-wrap gap-x-2 gap-y-1 mb-1">
            <span class="font-bold text-primary-white text-sm">{{ post.author.name }}</span>
            <span class="text-primary-white/50 text-xs">@{{ post.author.username }}</span>
            <span class="text-primary-white/40 text-xs">· {{ formatTime(post.createdAt) }}</span>
            <span
              v-if="post.isPinned"
              class="inline-flex items-center gap-1 bg-secondary-red/20 text-secondary-red text-xs px-2 py-0.5 rounded-full font-semibold"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78-.03 1.631.49 2.138A3.989 3.989 0 007.343 16H6.5a1 1 0 110-2h.843a1.989 1.989 0 00.636-.27.989.989 0 00.302-.52l.295-.92-1.788-.716a1 1 0 01.894-1.788l1.599.799L11 9.323V3a1 1 0 00-2 0v5.274z"/>
              </svg>
              Dipin
            </span>
          </div>

          <!-- Post Content -->
          <div class="mt-2">
            <p class="text-primary-white text-[15px] leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>

            <!-- Post Images -->
            <div
              v-if="post.images && post.images.length > 0"
              class="mt-3 grid gap-2 rounded-2xl overflow-hidden"
              :class="post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'"
            >
              <img
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                :alt="`Post image ${index + 1}`"
                class="w-full object-cover hover:opacity-95 transition-opacity"
                :class="post.images.length === 1 ? 'h-64 sm:h-80' : 'h-48'"
                @click.stop.prevent="openImage(image)"
              >
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>

    <!-- Post Actions - Not clickable to detail -->
    <div class="mt-4 flex items-center gap-1 pl-[52px]">
      <!-- Upvote Button -->
      <button
        @click.stop="emit('upvote', post.id)"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary-red/10 transition-colors group"
        :class="post.userVote === 'up' ? 'text-secondary-red' : 'text-primary-white/60'"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
        </svg>
        <span class="text-xs font-semibold">{{ post.upvotes }}</span>
      </button>

      <!-- Downvote Button -->
      <button
        @click.stop="emit('downvote', post.id)"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary-white/10 transition-colors"
        :class="post.userVote === 'down' ? 'text-primary-white' : 'text-primary-white/60'"
      >
        <svg class="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
        </svg>
        <span class="text-xs font-semibold">{{ post.downvotes }}</span>
      </button>

      <!-- Comment Button - Opens detail -->
      <a href="#" @click.prevent.stop="navigateToDetail" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary-white/10 transition-colors text-primary-white/60 hover:text-primary-white" title="Lihat detail dan komentar">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span class="text-xs font-semibold">{{ post.commentsCount }}</span>
      </a>

      <!-- Share Button -->
      <button
        @click.stop
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary-white/10 transition-colors text-primary-white/60"
        title="<Ba>gikan post"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
        </svg>
      </button>

      <!-- View Count -->
      <div class="ml-auto flex items-center gap-1.5 text-primary-white/50 text-xs">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span class="font-medium">{{ formatViews(post.views) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/forum'

const props = defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  upvote: [postId: string]
  downvote: [postId: string]
}>()

const navigateToDetail = () => {
  console.log('Navigate to detail:', props.post.channel, props.post.id)
  // window.location.href = `/forums/${props.post.channel}/${props.post.id}`
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

const openImage = (imageUrl: string) => {
  // TODO: Implement image modal
  console.log('Open image:', imageUrl)
}

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}
</script>
