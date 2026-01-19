<template>
  <section class="bg-white/50 rounded-xl mx-6 my-6 py-8 md:py-16">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="text-center text-gray-500 py-20">
        Memuat data ekstrakurikuler...
      </div>

      <div v-else-if="error" class="text-center text-red-500 py-20">
        Gagal memuat data. Silakan coba lagi nanti.
      </div>

      <div
        v-else-if="ekskulList.length > 0"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        @mouseenter="stopRotation"
        @mouseleave="startRotation">
        <div
          class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
          <transition name="fade" mode="out-in">
            <NuxtImg
              :key="currentEkskul.id"
              :src="currentEkskul.image"
              :alt="`Kegiatan ${currentEkskul.title}`"
              class="absolute inset-0 w-full h-full object-cover" />
          </transition>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <button
            @click="prevItem"
            class="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/60 rounded-full text-gray-800 backdrop-blur-sm transition-all hover:bg-white/90 hover:scale-110">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextItem"
            class="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/60 rounded-full text-gray-800 backdrop-blur-sm transition-all hover:bg-white/90 hover:scale-110">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="relative text-center lg:text-left">
          <transition name="slide-fade" mode="out-in">
            <div
              :key="currentEkskul.id"
              class="flex flex-col items-center lg:items-start">
              <img
                src="/penus-icon.webp"
                :alt="`Logo ${currentEkskul.title}`"
                class="w-24 h-24 rounded-full object-cover mb-6 bg-white p-2 shadow-md border" />
              <h3 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                {{ currentEkskul.title }}
              </h3>
              <div
                class="text-gray-600 prose prose-sm max-w-none"
                v-html="currentEkskul.description"></div>
              <NuxtLink
                v-if="route.path === '/'"
                :to="`/eskul/${currentEkskul.id}`"
                class="inline-flex items-center gap-2 mx-auto lg:mx-0 mt-8 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg">
                <span>Lihat Detail</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </transition>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-20">
        Belum ada data ekstrakurikuler untuk ditampilkan.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Eskul, EskulApiResponse, Pembina } from '~/types/eskul';

const { eskul: eskulApi } = useApi();
const apiUrl = useRuntimeConfig().public.apiBaseUrl;
const route = useRoute();

// State
const ekskulList = ref<Eskul[]>([]);
const isLoading = ref(true);
const error = ref<any>(null);
const currentIndex = ref(0);

const fetchEskul = async () => {
  try {
    isLoading.value = true;
    const res = await eskulApi.getAll();
const data = Array.isArray(res) ? res : res?.data ?? [];

ekskulList.value = data.map((item) => {
  const slug = item.name.toLowerCase().replace(/[\s_]+/g, '-');
  const imageUrl = item.image
    ? `${apiUrl}/${item.image}`
    : '/placeholder.webp';

  return {
    id: item.id,
    slug,
    title: item.name,
    description: item.description,
    image: imageUrl,
    logo: 'logo',
  };
});


    if (ekskulList.value.length > 1) {
      startRotation();
    }
  } catch (e) {
    console.error("Gagal mengambil data eskul:", e);
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};

const nextItem = () => {
  if (ekskulList.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % ekskulList.value.length;
  }
};

const prevItem = () => {
  if (ekskulList.value.length > 0) {
    currentIndex.value =
      (currentIndex.value - 1 + ekskulList.value.length) %
      ekskulList.value.length;
  }
};

const currentEkskul = computed<Eskul>(() => {
    return ekskulList.value[currentIndex.value] || {} as Eskul;
});

let interval: ReturnType<typeof setInterval> | null = null;

const startRotation = () => {
  if (interval !== null) clearInterval(interval);
  if (ekskulList.value.length > 1) {
    interval = setInterval(nextItem, 5000);
  }
};

const stopRotation = () => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
};

onMounted(() => {
  fetchEskul();
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
