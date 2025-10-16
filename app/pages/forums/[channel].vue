<template>
  <div class="min-h-screen bg-primary-gray">
    <div class="max-w-2xl mx-auto">
      <!-- Channel Header -->
      <div class="sticky top-0 z-10 bg-primary-gray/95 backdrop-blur-sm border-b border-primary-white/10 px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-primary-white capitalize">{{ channel }}</h1>
            <p class="text-primary-white/60 mt-0.5 text-xs sm:text-sm">{{ channelDescription }}</p>
          </div>
          <button
            @click="showCreatePost = true"
            class="flex items-center gap-2 bg-secondary-red/20 hover:bg-secondary-red/30 border border-secondary-red/40 text-secondary-red px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="hidden sm:inline text-sm font-semibold">Post</span>
          </button>
        </div>
      </div>

      <!-- Create Post Quick Access -->
      <div class="px-4 py-3 border-b border-primary-white/10">
        <button
          @click="showCreatePost = true"
          class="w-full bg-button-gray/50 hover:bg-button-gray/70 border border-primary-white/10 rounded-xl p-3 text-left transition-all group"
        >
          <div class="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              alt="Your avatar"
              class="w-8 h-8 rounded-full"
            >
            <span class="text-primary-white/50 text-sm group-hover:text-primary-white/70 transition-colors">Apa yang sedang kamu pikirkan?</span>
          </div>
        </button>
      </div>

      <!-- Posts Feed -->
      <div v-if="posts.length > 0" class="divide-y divide-primary-white/10">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @upvote="handleUpvote(post.id)"
          @downvote="handleDownvote(post.id)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 px-4">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-button-gray/50 mb-4">
          <svg class="w-8 h-8 text-primary-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <p class="text-primary-white/70 text-lg font-semibold mb-2">Belum ada post di channel ini</p>
        <p class="text-primary-white/50 text-sm mb-6">Jadilah yang pertama untuk memposting!</p>
        <button
          @click="showCreatePost = true"
          class="inline-flex items-center gap-2 bg-secondary-red/20 hover:bg-secondary-red/30 border border-secondary-red/40 text-secondary-red px-6 py-2.5 rounded-xl transition-all font-semibold"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Buat Post Baru
        </button>
      </div>

      <!-- Create Post Modal -->
      <CreatePostModal
        v-if="showCreatePost"
        :channel="channel"
        @close="showCreatePost = false"
        @post="handleCreatePost"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockPosts, mockChannels } from '~/utils/mockData'
import PostCard from '~/components/forum/PostCard.vue'
import CreatePostModal from '~/components/forum/CreatePostModal.vue'

const route = useRoute()
const router = useRouter()
const channel = computed(() => route.params.channel as string)

const channelData = computed(() => 
  mockChannels.find(c => c.slug === channel.value)
)

const channelDescription = computed(() => 
  channelData.value?.description || 'Forum diskusi'
)

const posts = computed(() => {
  const channelPosts = mockPosts.filter(post => post.channel === channel.value)
  // Fallback: if no posts for this channel, show all public posts
  return channelPosts.length > 0 ? channelPosts : mockPosts.filter(post => post.channel === 'public')
})

const showCreatePost = ref(false)

const handleUpvote = (postId: string) => {
  console.log('Upvote post:', postId)
  // TODO: Implement upvote logic
}

const handleDownvote = (postId: string) => {
  console.log('Downvote post:', postId)
  // TODO: Implement downvote logic
}



const handleCreatePost = (postData: any) => {
  console.log('Create post:', postData)
  showCreatePost.value = false
  // TODO: Implement create post logic
}
</script>
