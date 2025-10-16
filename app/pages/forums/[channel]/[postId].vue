<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <!-- Back Navigation -->
      <button 
        @click="navigateTo(`/forums/${channel}`)"
        class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span>Kembali ke {{ channel }}</span>
      </button>

      <!-- Post Detail -->
      <div v-if="post" class="mb-8">
        <PostDetail 
          :post="post"
          @upvote="handleUpvote(post.id)"
          @downvote="handleDownvote(post.id)"
        />
      </div>

      <!-- Add Comment -->
      <div class="bg-white rounded-lg border border-gray-300 p-4 mb-6">
        <div class="flex space-x-3">
          <img 
            :src="currentUser.avatar" 
            :alt="currentUser.name"
            class="w-10 h-10 rounded-full"
          >
          <div class="flex-1">
            <textarea
              v-model="newComment"
              placeholder="Tulis komentar..."
              class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              maxlength="300"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-500">{{ newComment.length }}/300</span>
              <button
                @click="handleAddComment"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Balas
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ comments.length }} Komentar
        </h2>
      </div>

      <div class="space-y-4">
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
