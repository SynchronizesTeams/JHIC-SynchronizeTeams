<template>
  <div class="bg-button-gray border-b border-primary-white/10 p-3 sm:p-4 hover:bg-button-gray/90 transition-colors">
    <!-- Post Header -->
    <div class="flex items-start space-x-3">
      <NuxtImg 
        :src="post.author.avatar" 
        :alt="post.author.name"
        class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center flex-wrap gap-x-2 gap-y-1">
          <span class="font-semibold text-primary-text text-sm sm:text-base">{{ post.author.name }}</span>
          <span class="text-primary-white/60 text-xs sm:text-sm">@{{ post.author.username }}</span>
          <span class="text-primary-white/40 text-xs sm:text-sm">· {{ formatTime(post.createdAt) }}</span>
          <span 
            v-if="post.isPinned"
            class="bg-secondary-red/20 text-secondary-red text-xs px-2 py-0.5 rounded-full"
          >
            📌 Dipin
          </span>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="mt-2 sm:mt-3 ml-12 sm:ml-13">
      <p class="text-primary-text text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{{ post.content }}</p>
      
      <!-- Post Images -->
      <div 
        v-if="post.images && post.images.length > 0"
        class="mt-2 sm:mt-3 grid gap-1.5 sm:gap-2"
        :class="post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'"
      >
        <NuxtImg 
          v-for="(image, index) in post.images" 
          :key="index"
          :src="image" 
          :alt="`Post image ${index + 1}`"
          class="rounded-lg w-full h-40 sm:h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
          @click="openImage(image)"
        />
      </div>
    </div>

    <!-- Post Actions -->
    <div class="mt-3 sm:mt-4 ml-12 sm:ml-13 flex items-center space-x-4 sm:space-x-6">
      <!-- Vote Buttons -->
      <div class="flex items-center space-x-1 sm:space-x-2">
        <button
          @click.stop="$emit('upvote', post.id)"
          class="flex items-center space-x-1 text-primary-white/60 hover:text-secondary-red transition-colors active:scale-95"
          :class="{ 'text-secondary-red': post.userVote === 'up' }"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
          </svg>
          <span class="text-xs sm:text-sm font-medium">{{ post.upvotes }}</span>
        </button>
        
        <button
          @click.stop="$emit('downvote', post.id)"
          class="flex items-center space-x-1 text-primary-white/60 hover:text-primary-white transition-colors active:scale-95"
          :class="{ 'text-primary-white': post.userVote === 'down' }"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
          </svg>
          <span class="text-xs sm:text-sm font-medium">{{ post.downvotes }}</span>
        </button>
      </div>

      <!-- Comment Button -->
      <button
        @click.stop="$emit('comment', post.id)"
        class="flex items-center space-x-1 text-primary-white/60 hover:text-primary-text transition-colors active:scale-95"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span class="text-xs sm:text-sm font-medium">{{ post.commentsCount }}</span>
      </button>

      <!-- Share Button -->
      <button class="flex items-center space-x-1 text-primary-white/60 hover:text-primary-text transition-colors active:scale-95">
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-4.732 2.684m4.732-2.684a3 3 0 00-4.732-2.684M3 12a3 3 0 106 0 3 3 0 00-6 0z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/forum'

const props = defineProps<{
  post: Post
}>()

defineEmits<{
  upvote: [postId: string]
  downvote: [postId: string]
  comment: [postId: string]
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
    month: 'short', 
    year: 'numeric' 
  })
}

const openImage = (imageUrl: string) => {
  // TODO: Implement image modal
  console.log('Open image:', imageUrl)
}
</script>
