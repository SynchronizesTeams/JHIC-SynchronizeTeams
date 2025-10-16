<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white py-4 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg min-h-screen">
        <!-- Header with Back Button -->
        <div class="sticky top-4 z-10 bg-primary-white/95 backdrop-blur-sm border-b border-primary-gray/10 px-6 py-4 pb-6 flex items-center justify-center relative">
          <button
            @click="router.back()"
            class="absolute left-6 flex items-center gap-2 text-primary-gray/70 hover:text-primary-gray transition-colors p-2 hover:bg-primary-gray/10 rounded-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="font-medium">Kembali</span>
          </button>
          <div class="flex flex-col items-center">
            <h1 class="text-xl font-bold text-primary-gray capitalize">{{ channelData?.name || channel }}</h1>
            <div v-if="post" class="flex items-center gap-1 text-primary-gray/60 text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span class="font-medium">{{ formatViews(post.views) }}</span>
            </div>
          </div>
        </div>

      <!-- Main Post - Threads Style -->
      <div v-if="post" class="border-b border-primary-gray/10">
        <!-- Post Content -->
        <div class="p-6 hover:bg-primary-gray/5 transition-colors">
          <div class="flex gap-3">
            <img
              :src="post.author.avatar"
              :alt="post.author.name"
              class="w-10 h-10 rounded-full flex-shrink-0"
            >
            <div class="flex-1 min-w-0">
              <!-- Author Info -->
              <div class="flex items-center gap-1 mb-2">
                <span class="font-bold text-primary-gray text-sm">{{ post.author.name }}</span>
                <span class="text-primary-gray/60 text-sm">@{{ post.author.username }}</span>
                <span class="text-primary-gray/40 text-sm">·</span>
                <span class="text-primary-gray/40 text-sm">{{ formatTime(post.createdAt) }}</span>
                <span v-if="post.isPinned" class="inline-flex items-center gap-1 bg-secondary-red/10 text-secondary-red text-xs px-2 py-0.5 rounded-full">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                  </svg>
                  Dipin
                </span>
              </div>

              <!-- Post Content -->
              <div class="mt-1">
                <p class="text-primary-gray text-[15px] leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>

                <!-- Post Images -->
                <div
                  v-if="post.images && post.images.length > 0"
                  class="mt-3 space-y-2"
                >
                  <div
                    v-for="(image, index) in post.images"
                    :key="index"
                    class="rounded-2xl overflow-hidden border border-primary-gray/10"
                  >
                    <img
                      :src="image"
                      :alt="`Post image ${index + 1}`"
                      class="w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      :class="post.images.length === 1 ? 'h-64' : 'h-48'"
                      @click="openImage(image)"
                    >
                  </div>
                </div>
              </div>

              <!-- Post Actions -->
              <div class="flex items-center gap-2 mt-4">
                <!-- Reply -->
                <button
                  @click="focusCommentInput"
                  class="flex items-center gap-1.5 px-3 py-1.5 text-primary-gray/70 hover:text-primary-gray hover:bg-primary-gray/10 rounded-full transition-all"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ post.commentsCount }}</span>
                </button>

                <!-- Upvote -->
                <button
                  @click="handleUpvote(post.id)"
                  :class="post.userVote === 'up' ? 'text-secondary-red' : 'text-primary-gray/70'"
                  class="flex items-center gap-1.5 px-3 py-1.5 hover:text-secondary-red hover:bg-secondary-red/10 rounded-full transition-all"
                >
                  <svg class="w-5 h-5" :class="post.userVote === 'up' ? 'text-secondary-red fill-current' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7"/>
                  </svg>
                  <span class="text-sm font-medium">{{ post.upvotes }}</span>
                </button>

                <!-- Share -->
                <button @click="handleShare" class="flex items-center gap-1.5 px-3 py-1.5 text-primary-gray/70 hover:text-primary-gray hover:bg-primary-gray/10 rounded-full transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reply Input -->
      <div class="border-b border-primary-gray/10 p-6 bg-primary-gray/5">
        <div class="flex gap-3">
          <img
            :src="currentUser.avatar"
            :alt="currentUser.name"
            class="w-10 h-10 rounded-full flex-shrink-0"
          >
          <div class="flex-1">
            <textarea
              ref="commentInputRef"
              v-model="newComment"
              placeholder="Posting balasan Anda..."
              class="w-full px-4 py-3 bg-primary-white text-primary-gray border border-primary-gray/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent placeholder:text-primary-gray/40 text-sm"
              rows="2"
              maxlength="300"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs text-primary-gray/60">{{ newComment.length }}/300</span>
              <button
                @click="handleAddComment"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-secondary-red text-primary-white rounded-full font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-red/90 shadow-sm"
              >
                Balas
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div v-if="topLevelComments.length > 0" class="relative">
        <div class="space-y-0">
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

      <!-- Empty Comments State -->
      <div v-else class="text-center py-12 px-6">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-gray/10 mb-3">
          <svg class="w-6 h-6 text-primary-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <p class="text-primary-gray text-sm mb-2">Belum ada balasan</p>
        <p class="text-primary-gray/60 text-xs">Jadilah yang pertama memberikan balasan pada post ini</p>
      </div>

      <!-- Image Modal -->
      <ImageModal
        v-if="post"
        :is-open="isImageModalOpen"
        :image-url="selectedImage"
        :images="post.images"
        :initial-index="selectedImageIndex"
        @close="closeImageModal"
      />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockPosts, mockComments, mockChannels } from '~/utils/mockData'
import ImageModal from '~/components/forum/ImageModal.vue'
import CommentThread from '~/components/forum/CommentThread.vue'

const route = useRoute()
const router = useRouter()
const channel = computed(() => route.params.channels as string)
const postId = computed(() => route.params.postId as string)

const channelData = computed(() =>
  mockChannels.find(c => c.slug === channel.value)
)

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
const commentInputRef = ref<HTMLTextAreaElement>()
const isImageModalOpen = ref(false)
const selectedImage = ref('')
const selectedImageIndex = ref(0)

const focusCommentInput = () => {
  if (commentInputRef.value) {
    commentInputRef.value.focus()
  }
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
    month: 'long',
    year: 'numeric'
  })
}

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

const openImage = (imageUrl: string) => {
  selectedImage.value = imageUrl
  if (post.value?.images) {
    selectedImageIndex.value = post.value.images.indexOf(imageUrl)
  }
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
}

const handleShare = async () => {
  if (!post.value) return

  const postUrl = `${window.location.origin}/forums/${post.value.channel}/${post.value.id}`
  const shareData = {
    title: `Post oleh ${post.value.author.name}`,
    text: post.value.content.slice(0, 100) + (post.value.content.length > 100 ? '...' : ''),
    url: postUrl
  }

  try {
    // Try to use Web Share API (mobile & modern browsers)
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(postUrl)
      alert('Link post berhasil disalin ke clipboard!')
    }
  } catch (err: any) {
    // If sharing is cancelled or fails, just copy to clipboard
    if (err.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(postUrl)
        alert('Link post berhasil disalin ke clipboard!')
      } catch (clipboardErr) {
        console.error('Failed to copy:', clipboardErr)
      }
    }
  }
}

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

// Track view count when post is loaded
onMounted(() => {
  if (post.value) {
    trackPostView(post.value.id)
  }
})

const trackPostView = (postId: string) => {
  // Check if this post has already been viewed in this session
  const viewedPosts = sessionStorage.getItem('viewedPosts')
  const viewedPostsArray = viewedPosts ? JSON.parse(viewedPosts) : []

  if (!viewedPostsArray.includes(postId)) {
    // Mark as viewed in this session
    viewedPostsArray.push(postId)
    sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPostsArray))

    // In a real app, you would call an API here to increment the view count
    console.log(`Tracking view for post: ${postId}`)
    // Example API call:
    // await $fetch(`/api/posts/${postId}/view`, { method: 'POST' })
  }
}
</script>
