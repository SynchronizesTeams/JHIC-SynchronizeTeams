<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div v-if="isLoading" class="text-center text-gray-500">
        Memuat data prestasi...
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        Gagal memuat data. Mohon coba lagi nanti.
      </div>

      <div
        v-else-if="displayedAchievements.length > 0"
        ref="scrollContainer"
        class="flex overflow-x-auto space-x-6 pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:space-x-0"
        style="
          scrollbar-width: none;
          -ms-overflow-style: none;
          touch-action: pan-x pan-y;
          -webkit-overflow-scrolling: touch;
        ">
        <NuxtLink
          v-for="achievement in displayedAchievements"
          :key="achievement.id"
          to=""
          class="flex-shrink-0 w-80 md:w-auto bg-white rounded-xl shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
          <div class="relative">
            <NuxtImg
              :src="`${apiUrl}/${achievement.image}`"
              :alt="achievement.title"
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />

            <div
              class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 class="text-lg font-semibold text-white leading-tight">
                {{ achievement.title }}
              </h3>
              <p class="text-xs text-white/80 mt-1">
                {{ formatDate(achievement.achievement_date) }}
              </p>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-b from-secondary-red/50 to-secondary-red/70 p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p class="text-white text-center text-sm leading-relaxed">
                {{ achievement.News.excerpt }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center text-gray-500">
        Belum ada data prestasi untuk ditampilkan.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Achievement, AchievementNews } from "~/types/achievement";

// Props untuk komponen
const props = defineProps<{
  displayCount?: number;
}>();

// Menggunakan composables dari Nuxt
const { achievement: achievementApi } = useApi();
const apiUrl = useRuntimeConfig().public.apiBaseUrl;
const scrollContainer = ref<HTMLElement | null>(null);

// State management
const achievements = ref<Achievement[]>([]);
const isLoading = ref(true);
const error = ref<any>(null);

// Computed property untuk membatasi jumlah item yang ditampilkan
const displayedAchievements = computed(() => {
  if (props.displayCount) {
    return achievements.value.slice(0, props.displayCount);
  }
  return achievements.value;
});

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fungsi untuk mengambil data dari API
const fetchAchievements = async () => {
  console.log('FETCH ACHIEVEMENTS START');

  try {
    isLoading.value = true;

    console.log('achievementApi:', achievementApi);
    console.log('getAll fn:', achievementApi?.getAll);

    const res = await achievementApi.getAll();
achievements.value =
  Array.isArray(res) ? res :
  Array.isArray(res?.data) ? res.data :
  [];

    console.log('RAW ACHIEVEMENT RESPONSE:', res);

    achievements.value =
      Array.isArray(res) ? res :
      Array.isArray(res?.data) ? res.data :
      [];

    console.log('FINAL ACHIEVEMENTS:', achievements.value);
  } catch (e) {
    console.error('GAGAL FETCH ACHIEVEMENT:', e);
    error.value = e;
  } finally {
    console.log('FETCH ACHIEVEMENTS DONE');
    isLoading.value = false;
  }
};


onMounted(() => {
  fetchAchievements();

  const el = scrollContainer.value;
  if (!el) return;

  let isDown = false;
  let startX: number = 0;
  let scrollLeftVal: number = 0;

  el.addEventListener("mousedown", (e: MouseEvent) => {
    isDown = true;
    el.classList.add("active", "cursor-grabbing");
    startX = e.pageX - el.offsetLeft;
    scrollLeftVal = el.scrollLeft;
  });

  const stopDragging = () => {
    isDown = false;
    el.classList.remove("active", "cursor-grabbing");
  };

  el.addEventListener("mouseleave", stopDragging);
  el.addEventListener("mouseup", stopDragging);

  el.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Faktor percepatan scroll
    el.scrollLeft = scrollLeftVal - walk;
  });
});
</script>

<style>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
