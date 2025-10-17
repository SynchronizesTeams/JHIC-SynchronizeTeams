<template>
  <div class="w-full py-8 px-4 select-none">
    <div class="max-w-7xl mx-auto">
      <div class="relative">
        <!-- Tombol kiri -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-red-50 text-gray-800 hover:text-secondary-red rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary-red"
          aria-label="Scroll left">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Tombol kanan -->
        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-red-50 text-gray-800 hover:text-secondary-red rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary-red"
          aria-label="Scroll right">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 cursor-grab active:cursor-grabbing"
          style="
            scrollbar-width: none;
            -ms-overflow-style: none;
            touch-action: pan-x pan-y;
            -webkit-overflow-scrolling: touch;
          ">
          <div
            v-for="teacher in teachers"
            :key="teacher.id"
            class="flex-shrink-0 w-52 snap-center pt-4">
            <button
              @click="goToTeacher(teacher.id)"
              class="w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 cursor-pointer">
              <div
                class="relative bg-gradient-to-br from-gray-100 to-gray-200 aspect-square overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-24 h-24 text-gray-400 group-hover:text-secondary-red transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-secondary-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div class="p-4 text-center">
                <h3
                  class="text-md font-bold text-gray-800 mb-1 group-hover:text-secondary-red transition-colors duration-300">
                  {{ teacher.name }}
                </h3>
                <p class="text-gray-600 text-xs mb-2">{{ teacher.subject }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import teachersData from '~/contents/teachers.json';

const router = useRouter();
const scrollContainer = ref<HTMLElement | null>(null);
const currentPage = ref(0);

interface TeacherItem { id: number; name: string; subject: string }
const teachers = ref<TeacherItem[]>(teachersData as TeacherItem[]);

const goToTeacher = (teacherId: number) => {
  router.push(`/teacher/${teacherId}`);
};

const scrollLeft = () => {
  const el = scrollContainer.value;
  if (el) {
    const cardWidth = 256 + 24;
    const targetLeft = el.scrollLeft - cardWidth * 3;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
    updateCurrentPage();
  }
};

const scrollRight = () => {
  const el = scrollContainer.value;
  if (el) {
    const cardWidth = 256 + 24;
    const targetLeft = el.scrollLeft + cardWidth * 3;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
    updateCurrentPage();
  }
};

const updateCurrentPage = () => {
  if (scrollContainer.value) {
    const cardWidth = 256 + 24;
    const scrollPosition = scrollContainer.value.scrollLeft;
    currentPage.value = Math.round(scrollPosition / (cardWidth * 4));
  }
};

onMounted(() => {
  const el = scrollContainer.value;
  if (!el) return;

  let isDown = false;
  let startX: number;
  let scrollLeft: number;

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
