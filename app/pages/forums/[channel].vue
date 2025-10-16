<template>
  <div class="min-h-screen bg-primary-gray">
    <div class="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <!-- Channel Header -->
      <div class="mb-4 sm:mb-6 px-1">
        <h1 class="text-xl sm:text-2xl font-bold text-primary-text capitalize">{{ channel }}</h1>
        <p class="text-primary-white/70 mt-1 text-sm sm:text-base">{{ channelDescription }}</p>
      </div>

      <!-- Create Post Button -->
      <div class="mb-3 sm:mb-4">
        <button 
          @click="showCreatePost = true"
          class="w-full bg-button-gray border border-primary-white/20 rounded-xl p-3 sm:p-4 text-left hover:bg-button-gray/80 transition-all active:scale-[0.99]"
        >
          <span class="text-primary-white/60 text-sm sm:text-base">Apa yang sedang kamu pikirkan?</span>
        </button>
      </div>

      <!-- Posts Feed -->
      <div v-if="posts.length > 0" class="space-y-0 border border-primary-white/10 rounded-xl overflow-hidden">
        <PostCard 
          v-for="post in posts" 
          :key="post.id"
          :post="post"
          @upvote="handleUpvote(post.id)"
          @downvote="handleDownvote(post.id)"
          @comment="navigateToPost(post.id)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-primary-white/60">Belum ada post di channel ini</p>
        <p class="text-primary-white/40 text-sm mt-2">Channel: {{ channel }}</p>
        <p class="text-primary-white/40 text-sm">Total posts loaded: {{ mockPosts.length }}</p>
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

const navigateToPost = (postId: string) => {
  navigateTo(`/forums/${channel.value}/${postId}`)
}

const handleCreatePost = (postData: any) => {
  console.log('Create post:', postData)
  showCreatePost.value = false
  // TODO: Implement create post logic
}
</script>
