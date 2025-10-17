<template>
  <div class="min-h-screen bg-gradient-to-b from-primary-white via-white/50 to-primary-white py-4 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Main Container with Rounded Border (Threads Style) -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg">
        <!-- Channel Header -->
        <div class="sticky top-4 z-10 bg-primary-white/95 backdrop-blur-sm border-b border-primary-gray/10 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h1 class="text-xl sm:text-2xl font-bold text-primary-gray capitalize">{{ channelData?.name || channel }}</h1>

                <!-- Channel Dropdown Button -->
                <div class="relative">
                  <button
                    @click="showChannelDropdown = !showChannelDropdown"
                    class="flex items-center justify-center p-1.5 text-primary-gray hover:bg-primary-gray/10 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5 transition-transform" :class="showChannelDropdown ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <Transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-if="showChannelDropdown"
                      class="absolute left-0 mt-2 w-56 bg-primary-white border border-primary-gray/20 rounded-xl shadow-lg overflow-hidden z-20"
                    >
                      <div class="py-1">
                        <button
                          v-for="ch in allChannels"
                          :key="ch.id"
                          @click="navigateToChannel(ch.slug)"
                          class="w-full text-left px-4 py-3 hover:bg-primary-gray/10 transition-colors flex items-center justify-between group"
                          :class="ch.slug === channel ? 'bg-primary-gray/5' : ''"
                        >
                          <div>
                            <div class="font-semibold text-primary-gray text-sm capitalize">{{ ch.name }}</div>
                            <div class="text-xs text-primary-gray/60 mt-0.5">{{ ch.description }}</div>
                          </div>
                          <svg v-if="ch.slug === channel" class="w-5 h-5 text-secondary-red" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>

              <p class="text-primary-gray/60 mt-0.5 text-xs sm:text-sm">{{ channelDescription }}</p>
            </div>
            <!-- <button
              @click="showCreatePost = true"
              class="flex items-center gap-2 bg-secondary-red hover:bg-secondary-red/90 text-primary-white px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span class="hidden sm:inline text-sm font-semibold">Post</span>
            </button> -->
          </div>
        </div>

        <!-- Create Post Quick Access -->
        <div class="px-6 py-8 border-b border-primary-gray/10">
          <button
            @click="showCreatePost = true"
            class="w-full bg-primary-gray/5 hover:bg-primary-gray/10 border border-primary-gray/20 rounded-xl p-4 text-left transition-all group flex items-center justify-between cursor-pointer"
          >
            <div class="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                alt="Your avatar"
                class="w-10 h-10 rounded-full"
              >
              <span class="text-primary-gray/60 text-sm group-hover:text-primary-gray/80 transition-colors">Apa yang sedang kamu pikirkan?</span>
            </div>
            <span class="hidden sm:inline text-sm font-medium text-primary-gray/60 group-hover:text-primary-gray/80 transition-colors border-2 border-primary-gray/20 rounded-lg hover:bg-primary-gray/10 px-4 py-1.5 flex-shrink-0">Post</span>
          </button>
        </div>

        <!-- Posts Feed -->
        <div v-if="posts.length > 0">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @upvote="handleUpvote(post.id)"
            @downvote="handleDownvote(post.id)"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 px-6">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-gray/10 mb-4">
            <svg class="w-8 h-8 text-primary-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <p class="text-primary-gray text-lg font-semibold mb-2">Belum ada post di channel ini</p>
          <p class="text-primary-gray/60 text-sm mb-6">Jadilah yang pertama untuk memposting!</p>
          <button
            @click="showCreatePost = true"
            class="inline-flex items-center gap-2 bg-secondary-red hover:bg-secondary-red/90 text-primary-white px-6 py-2.5 rounded-xl transition-all font-semibold shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Buat Post Baru
          </button>
        </div>
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

// Channel dropdown
const showChannelDropdown = ref(false)
const allChannels = computed(() => mockChannels)

const navigateToChannel = (channelSlug: string) => {
  showChannelDropdown.value = false
  router.push(`/forums/${channelSlug}`)
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showChannelDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

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
