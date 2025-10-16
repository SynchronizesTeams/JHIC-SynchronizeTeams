<template>
  <div class="bg-primary-gray p-4 sm:p-6">
    <!-- Post Header -->
    <div class="flex items-start gap-3">
      <img
        :src="post.author.avatar"
        :alt="post.author.name"
        class="w-12 h-12 rounded-full flex-shrink-0"
      >
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-primary-white text-base">{{ post.author.name }}</span>
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
        <div class="flex items-center gap-2 text-sm text-primary-white/60">
          <span>@{{ post.author.username }}</span>
          <span>·</span>
          <span>{{ formatTime(post.createdAt) }}</span>
        </div>
        <div class="mt-1 inline-flex items-center gap-1.5 text-xs text-primary-white/50">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          <span class="capitalize font-medium">{{ post.channel }}</span>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="mt-5">
      <p class="text-primary-white text-base leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>

      <!-- Post Images -->
      <div
        v-if="post.images && post.images.length > 0"
        class="mt-4 grid gap-3 rounded-2xl overflow-hidden"
        :class="getPostImageGrid(post.images.length)"
      >
        <img
          v-for="(image, index) in post.images"
          :key="index"
          :src="image"
          :alt="`Post image ${index + 1}`"
          class="w-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
          :class="getImageHeight(post.images.length)"
          @click="openImage(image)"
        />
      </div>
    </div>

    <!-- Post Stats & Actions -->
    <div class="mt-6 pt-4 border-t border-primary-white/10">
      <div class="flex items-center gap-1">
        <!-- Upvote Button -->
        <button
          @click="$emit('upvote', post.id)"
          class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-secondary-red/10 transition-colors group"
          :class="post.userVote === 'up' ? 'text-secondary-red' : 'text-primary-white/60'"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
          </svg>
          <span class="text-sm font-bold">{{ post.upvotes }}</span>
        </button>

        <!-- Downvote Button -->
        <button
          @click="$emit('downvote', post.id)"
          class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary-white/10 transition-colors"
          :class="post.userVote === 'down' ? 'text-primary-white' : 'text-primary-white/60'"
        >
          <svg class="w-6 h-6 rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
          </svg>
          <span class="text-sm font-bold">{{ post.downvotes }}</span>
        </button>

        <!-- Comment Info -->
        <div class="flex items-center gap-2 px-4 py-2 text-primary-white/60">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span class="text-sm font-bold">{{ post.commentsCount }}</span>
        </div>

        <!-- Share Button -->
        <button class="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary-white/10 transition-colors text-primary-white/60 ml-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/types/forum'

const props = defineProps<{
  post: Post
}>()

defineEmits<{
  upvote: [postId: string]
  downvote: [postId: string]
}>()

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
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPostImageGrid = (imageCount: number) => {
  if (imageCount === 1) return 'grid-cols-1'
  if (imageCount === 2) return 'grid-cols-2'
  return 'grid-cols-2'
}

const getImageHeight = (imageCount: number) => {
  if (imageCount === 1) return 'h-64'
  return 'h-48'
}

const openImage = (imageUrl: string) => {
  console.log('Open image:', imageUrl)
}
</script>
