<template>
  <div class="bg-button-gray rounded-xl border border-primary-white/10 p-4 sm:p-6">
    <!-- Post Header -->
    <div class="flex items-start space-x-3">
      <NuxtImg 
        :src="post.author.avatar" 
        :alt="post.author.name"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
      />
      <div class="flex-1">
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-primary-text text-base sm:text-lg">{{ post.author.name }}</span>
          <span class="text-primary-white/60 text-xs sm:text-sm">@{{ post.author.username }}</span>
          <span class="text-primary-white/40 text-xs sm:text-sm">· {{ formatTime(post.createdAt) }}</span>
          <span 
            v-if="post.isPinned"
            class="bg-secondary-red/20 text-secondary-red text-xs px-2 py-0.5 rounded-full"
          >
            📌 Dipin
          </span>
        </div>
        <div class="mt-1 text-xs sm:text-sm text-primary-white/70">
          Channel: <span class="font-medium capitalize text-primary-text">{{ post.channel }}</span>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="mt-4">
      <p class="text-primary-text text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>
      
      <!-- Post Images -->
      <div 
        v-if="post.images && post.images.length > 0"
        class="mt-3 sm:mt-4 grid gap-2 sm:gap-3"
        :class="getPostImageGrid(post.images.length)"
      >
        <NuxtImg 
          v-for="(image, index) in post.images" 
          :key="index"
          :src="image" 
          :alt="`Post image ${index + 1}`"
          class="rounded-lg w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
          :class="getImageHeight(post.images.length)"
          @click="openImage(image)"
        />
      </div>
    </div>

    <!-- Post Stats -->
    <div class="mt-6 flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <!-- Vote Buttons -->
        <div class="flex items-center space-x-3">
          <button
            @click="$emit('upvote', post.id)"
            class="flex items-center space-x-2 text-primary-white/60 hover:text-secondary-red transition-colors active:scale-95"
            :class="{ 'text-secondary-red': post.userVote === 'up' }"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
            </svg>
            <span class="font-medium">{{ post.upvotes }}</span>
          </button>
          
          <button
            @click="$emit('downvote', post.id)"
            class="flex items-center space-x-2 text-primary-white/60 hover:text-primary-white transition-colors active:scale-95"
            :class="{ 'text-primary-white': post.userVote === 'down' }"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
            </svg>
            <span class="font-medium">{{ post.downvotes }}</span>
          </button>
        </div>

        <div class="flex items-center space-x-1 text-primary-white/60">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span class="font-medium">{{ post.commentsCount }}</span>
          <span class="text-sm">komentar</span>
        </div>

        <!-- Share Button -->
        <button class="flex items-center space-x-2 text-primary-white/60 hover:text-primary-text transition-colors active:scale-95">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-4.732 2.684m4.732-2.684a3 3 0 00-4.732-2.684M3 12a3 3 0 106 0 3 3 0 00-6 0z"/>
          </svg>
          <span class="text-sm">Bagikan</span>
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
