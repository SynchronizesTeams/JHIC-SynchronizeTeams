<template>
  <div class="min-h-screen bg-primary-gray">
    <div class="max-w-2xl mx-auto">
      <!-- Header with Back Button -->
      <div class="sticky top-0 z-10 bg-primary-gray/95 backdrop-blur-sm border-b border-primary-white/10 px-4 py-3">
        <button
          @click="navigateTo(`/forums/${channel}`)"
          class="flex items-center gap-2 text-primary-white/70 hover:text-primary-white transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span class="text-sm font-medium">Kembali ke {{ channel }}</span>
        </button>
      </div>

      <!-- Post Detail -->
      <div v-if="post" class="border-b-8 border-primary-gray/50">
        <PostDetail
          :post="post"
          @upvote="handleUpvote(post.id)"
          @downvote="handleDownvote(post.id)"
        />
      </div>

      <!-- Add Comment Section -->
      <div class="border-b border-primary-white/10 p-4">
        <div class="flex gap-3">
          <img
            :src="currentUser.avatar"
            :alt="currentUser.name"
            class="w-10 h-10 rounded-full flex-shrink-0"
          >
          <div class="flex-1">
            <textarea
              v-model="newComment"
              placeholder="Tulis komentar..."
              class="w-full px-3 py-2.5 bg-button-gray/50 text-primary-white border border-primary-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-transparent placeholder:text-primary-white/40 text-sm"
              rows="3"
              maxlength="300"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs text-primary-white/50">{{ newComment.length }}/300</span>
              <button
                @click="handleAddComment"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-secondary-red/20 hover:bg-secondary-red/30 border border-secondary-red/40 text-secondary-red rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-secondary-red/20"
              >
                Balas
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Header -->
      <div v-if="comments.length > 0" class="px-4 py-3 border-b border-primary-white/10">
        <h2 class="text-base font-bold text-primary-white">
          {{ comments.length }} Komentar
        </h2>
      </div>

      <!-- Comments Section -->
      <div v-if="topLevelComments.length > 0">
        <CommentThread
          v-for="comment in topLevelComments"
          :key="comment.id"
          :comment="comment"
          :replies="getReplies(comment.id)"
          @upvote="handleCommentUpvote"
          @downvote="handleCommentDownvote"
          @reply="handleReplyComment"
        />
      </div>

      <!-- Empty Comments State -->
      <div v-else class="text-center py-12 px-4">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-button-gray/50 mb-3">
          <svg class="w-7 h-7 text-primary-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <p class="text-primary-white/60 text-sm">Belum ada komentar</p>
        <p class="text-primary-white/40 text-xs mt-1">Jadilah yang pertama berkomentar!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockPosts, mockComments } from '~/utils/mockData'

const route = useRoute()
const channel = computed(() => route.params.channel as string)
const postId = computed(() => route.params.postId as string)

const post = computed(() =>
  mockPosts.find(p => p.id === postId.value)
)

const comments = computed(() =>
  mockComments.filter(c => c.postId === postId.value)
)

const topLevelComments = computed(() =>
  comments.value.filter(c => !c.parentId)
)

const getReplies = (parentId: string) => {
  return comments.value.filter(c => c.parentId === parentId)
}

// Mock current user
const currentUser = ref({
  id: '1',
  name: 'John Doe',
  username: 'john_doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
})

const newComment = ref('')

const handleUpvote = (postId: string) => {
  console.log('Upvote post:', postId)
}

const handleDownvote = (postId: string) => {
  console.log('Downvote post:', postId)
}

const handleAddComment = () => {
  console.log('Add comment:', newComment.value)
  newComment.value = ''
}

const handleCommentUpvote = (commentId: string) => {
  console.log('Upvote comment:', commentId)
}

const handleCommentDownvote = (commentId: string) => {
  console.log('Downvote comment:', commentId)
}

const handleReplyComment = (parentId: string, content: string) => {
  console.log('Reply to comment:', parentId, content)
}
</script>
