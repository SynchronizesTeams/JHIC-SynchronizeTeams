<template>
  <div class="bg-primary-gray border-b border-primary-white/10 p-3 sm:p-4">
    <!-- Main Comment -->
    <div class="flex space-x-3">
      <img 
        :src="comment.author.avatar" 
        :alt="comment.author.name"
        class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
      >
      <div class="flex-1">
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-primary-text text-xs sm:text-sm">{{ comment.author.name }}</span>
          <span class="text-primary-white/60 text-xs">@{{ comment.author.username }}</span>
          <span class="text-primary-white/40 text-xs">· {{ formatTime(comment.createdAt) }}</span>
        </div>
        
        <p class="text-primary-text mt-1 text-xs sm:text-sm leading-relaxed">{{ comment.content }}</p>
        
        <!-- Comment Actions -->
        <div class="flex items-center space-x-4 mt-2">
          <!-- Vote Buttons -->
          <div class="flex items-center space-x-1">
            <button
              @click="$emit('upvote', comment.id)"
              class="flex items-center space-x-1 text-primary-white/60 hover:text-secondary-red transition-colors text-xs active:scale-95"
              :class="{ 'text-secondary-red': comment.userVote === 'up' }"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              <span>{{ comment.upvotes }}</span>
            </button>
            
            <button
              @click="$emit('downvote', comment.id)"
              class="flex items-center space-x-1 text-primary-white/60 hover:text-primary-white transition-colors text-xs active:scale-95"
              :class="{ 'text-primary-white': comment.userVote === 'down' }"
            >
              <svg class="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
              </svg>
              <span>{{ comment.downvotes }}</span>
            </button>
          </div>

          <!-- Reply Button -->
          <button
            @click="showReplyForm = !showReplyForm"
            class="text-primary-white/60 hover:text-primary-text transition-colors text-xs active:scale-95"
          >
            Balas
          </button>
        </div>
      </div>
    </div>

    <!-- Reply Form -->
    <div v-if="showReplyForm" class="mt-3 ml-10 sm:ml-11">
      <div class="bg-button-gray rounded-lg p-2 sm:p-3">
        <div class="flex space-x-2">
          <img 
            :src="currentUser.avatar" 
            :alt="currentUser.name"
            class="w-6 h-6 rounded-full flex-shrink-0"
          >
          <div class="flex-1">
            <textarea
              v-model="replyContent"
              placeholder="Tulis balasan..."
              class="w-full p-2 text-xs sm:text-sm bg-primary-gray text-primary-text border border-primary-white/20 rounded resize-none focus:outline-none focus:ring-2 focus:ring-secondary-red"
              rows="2"
              maxlength="200"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs text-primary-white/60">{{ replyContent.length }}/200</span>
              <div class="space-x-2">
                <button
                  @click="cancelReply"
                  class="px-2 py-1 text-xs text-primary-white/60 hover:text-primary-text"
                >
                  Batal
                </button>
                <button
                  @click="handleSubmitReply"
                  :disabled="!replyContent.trim()"
                  class="px-2 py-1 text-xs bg-secondary-red text-primary-text rounded hover:bg-secondary-red/80 disabled:bg-button-gray disabled:cursor-not-allowed"
                >
                  Balas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Replies -->
    <div v-if="replies && replies.length > 0" class="mt-3 ml-10 sm:ml-11 space-y-0">
      <CommentThread 
        v-for="reply in replies" 
        :key="reply.id"
        :comment="reply"
        :replies="getRepliesForReply(reply.id)"
        @upvote="$emit('upvote', $event)"
        @downvote="$emit('downvote', $event)"
        @reply="$emit('reply', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import type { Comment } from '~/types/forum'

const props = defineProps<{
  comment: Comment
  replies?: Comment[]
}>()

const emit = defineEmits<{
  upvote: [commentId: string]
  downvote: [commentId: string]
  reply: [parentId: string, content: string]
}>()

const showReplyForm = ref(false)
const replyContent = ref('')

// Mock current user
const currentUser = ref({
  id: '1',
  name: 'John Doe',
  username: 'john_doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
})

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

const cancelReply = () => {
  showReplyForm.value = false
  replyContent.value = ''
}

const handleSubmitReply = () => {
  if (!replyContent.value.trim()) return
  
  emit('reply', props.comment.id, replyContent.value.trim())
  showReplyForm.value = false
  replyContent.value = ''
}

const getRepliesForReply = (parentId: string): Comment[] => {
  return props.replies?.filter(reply => reply.parentId === parentId) || []
}
</script>
