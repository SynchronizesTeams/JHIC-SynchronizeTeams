<template>
  <section class="bg-white/50 rounded-xl mx-6 my-6 py-8 md:py-16">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-if="!isLoading"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        @mouseenter="stopRotation"
        @mouseleave="startRotation">
        <div
          class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
          <transition name="fade" mode="out-in">
            <img
              :key="currentEkskul.image"
              :src="currentEkskul.image"
              :alt="`Kegiatan ${currentEkskul.title}`"
              class="absolute inset-0 w-full h-full object-cover" />
          </transition>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <button
            @click="prevItem"
            class="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/60 rounded-full text-gray-800 backdrop-blur-sm transition-all hover:bg-white/90 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextItem"
            class="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/60 rounded-full text-gray-800 backdrop-blur-sm transition-all hover:bg-white/90 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="relative text-center lg:text-left">
          <transition name="slide-fade" mode="out-in">
            <div
              :key="currentEkskul.title"
              class="flex flex-col items-center lg:items-start">
              <img
                :src="currentEkskul.logo"
                :alt="`Logo ${currentEkskul.title}`"
                class="w-24 h-24 rounded-full object-cover mb-6 bg-white p-2 shadow-md border" />
              <h3
                class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                {{ currentEkskul.title }}
              </h3>
              <div
                class="text-gray-600 prose prose-sm max-w-none"
                v-html="currentEkskul.description"></div>
              <NuxtLink
                v-if="route.path === '/'"
                :to="`/ekskul/${currentEkskul.slug}`"
                class="inline-flex items-center gap-2 mx-auto mt-8 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg">
                <span>Lihat Detail</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </NuxtLink>
            </div>
          </transition>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-20">
        Memuat data ekstrakurikuler...
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import extracurricularsData from '~/contents/extracurriculars.json';
interface EkskulItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  logo: string;
}

const ekskulList = ref<EkskulItem[]>(extracurricularsData as EkskulItem[]);
const isLoading = ref(false);
const currentIndex = ref(0);

const route = useRoute();


const nextItem = () => {
  currentIndex.value = (currentIndex.value + 1) % ekskulList.value.length;
};

const prevItem = () => {
  currentIndex.value =
    (currentIndex.value - 1 + ekskulList.value.length) %
    ekskulList.value.length;
};

const currentEkskul = computed<EkskulItem>(() => ekskulList.value[currentIndex.value]!);

let interval: ReturnType<typeof setInterval> | null = null;

const startRotation = () => {
  if (interval !== null) clearInterval(interval);
  interval = setInterval(nextItem, 5000);
};

const stopRotation = () => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
};

onMounted(() => {
  if (ekskulList.value.length > 1) {
    startRotation();
  }
});

onUnmounted(() => {
  stopRotation();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s ease-out;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
