<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div
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
          :to="`/news/${achievement.News.slug}`"
          class="flex-shrink-0 w-80 md:w-auto bg-gray-500 rounded-xl shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
          <div class="relative">
            <!-- Optimized Image Component -->
            <OptimizedImage
              :src="achievement.image"
              :alt="achievement.title"
              :width="800"
              :height="480"
              aspect-ratio="5/3"
              format="webp"
              :quality="85"
              image-class="w-full h-48 object-cover"
              container-class="w-full h-48"
            />

            <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <h3 class="text-xl font-semibold text-white">
                {{ achievement.title }}
              </h3>
              <p class="text-xs text-white/80 mt-1">
                {{ formatDate(achievement.achievement_date) }}
              </p>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-b from-secondary-red/30 to-secondary-red/50 p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <p class="text-white text-center text-sm">
                {{ achievement.News.excerpt }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Achievement } from '~/types/achievement'

const props = defineProps<{
  achievements: Achievement[]
  displayCount?: number
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const displayedAchievements = computed(() => {
  if (props.displayCount) {
    return props.achievements.slice(0, props.displayCount)
  }
  return props.achievements
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  const el = scrollContainer.value;
  if (!el) return;

  let isDown = false;
  let startX: number = 0;
  let scrollLeft: number = 0;

  el.addEventListener("mousedown", (e: MouseEvent) => {
    isDown = true;
    el.classList.add("active");
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener("mouseleave", () => (isDown = false));
  el.addEventListener("mouseup", () => (isDown = false));

  el.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });
});
</script>

<style>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
