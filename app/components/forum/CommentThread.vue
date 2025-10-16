<template>
  <div class="border-b border-primary-white/10 p-4 hover:bg-button-gray/10 transition-colors">
    <!-- Main Comment -->
    <div class="flex gap-3">
      <img
        :src="comment.author.avatar"
        :alt="comment.author.name"
        class="w-9 h-9 rounded-full flex-shrink-0"
      >
      <div class="flex-1 min-w-0">
        <!-- Author Info -->
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-primary-white text-sm">{{ comment.author.name }}</span>
          <span class="text-primary-white/50 text-xs">@{{ comment.author.username }}</span>
          <span class="text-primary-white/40 text-xs">· {{ formatTime(comment.createdAt) }}</span>
        </div>

        <!-- Comment Content -->
        <p class="text-primary-white text-sm leading-relaxed mb-3">{{ comment.content }}</p>

        <!-- Comment Actions -->
        <div class="flex items-center gap-0.5">
          <!-- Upvote Button -->
          <button
            @click="$emit('upvote', comment.id)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-secondary-red/10 transition-colors"
            :class="comment.userVote === 'up' ? 'text-secondary-red' : 'text-primary-white/60'"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
            </svg>
            <span class="text-xs font-semibold">{{ comment.upvotes }}</span>
          </button>

          <!-- Downvote Button -->
          <button
            @click="$emit('downvote', comment.id)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-primary-white/10 transition-colors"
            :class="comment.userVote === 'down' ? 'text-primary-white' : 'text-primary-white/60'"
          >
            <svg class="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
            </svg>
            <span class="text-xs font-semibold">{{ comment.downvotes }}</span>
          </button>

          <!-- Reply Button -->
          <button
            @click="showReplyForm = !showReplyForm"
            class="px-3 py-1 text-primary-white/60 hover:text-primary-white hover:bg-primary-white/10 rounded-full transition-colors text-xs font-semibold"
          >
            Balas
          </button>
        </div>
      </div>
    </div>

    <!-- Reply Form -->
    <div v-if="showReplyForm" class="mt-3 ml-12">
      <div class="bg-button-gray/30 border border-primary-white/10 rounded-xl p-3">
        <div class="flex gap-2">
          <img
            :src="currentUser.avatar"
            :alt="currentUser.name"
            class="w-7 h-7 rounded-full flex-shrink-0"
          >
          <div class="flex-1">
            <textarea
              v-model="replyContent"
              placeholder="Tulis balasan..."
              class="w-full px-3 py-2 text-xs bg-primary-gray text-primary-white border border-primary-white/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-secondary-red/50 placeholder:text-primary-white/40"
              rows="2"
              maxlength="200"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs text-primary-white/50">{{ replyContent.length }}/200</span>
              <div class="flex gap-2">
                <button
                  @click="cancelReply"
                  class="px-3 py-1 text-xs text-primary-white/60 hover:text-primary-white rounded-lg hover:bg-primary-white/10 transition-colors"
                >
                  Batal
                </button>
                <button
                  @click="handleSubmitReply"
                  :disabled="!replyContent.trim()"
                  class="px-3 py-1 text-xs bg-secondary-red/20 hover:bg-secondary-red/30 border border-secondary-red/40 text-secondary-red rounded-lg font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Balas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Replies (Nested Comments) -->
    <div v-if="replies && replies.length > 0" class="mt-3 ml-12 space-y-0 border-l border-primary-white/10 pl-4">
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

<script lang="ts" setup>
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
