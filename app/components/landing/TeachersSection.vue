<template>
  <div class="w-full py-8 px-4 select-none">
    <div class="max-w-7xl mx-auto">
      <div class="relative">
        <!-- Tombol kiri -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Scroll left">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Tombol kanan -->
        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Scroll right">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Scroll container -->
        <div
          ref="scrollContainer"
          class="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 cursor-grab active:cursor-grabbing"
          style="scrollbar-width: none; -ms-overflow-style: none; touch-action: pan-x pan-y; -webkit-overflow-scrolling: touch;">
          <div
            v-for="teacher in teachers"
            :key="teacher.id"
            class="flex-shrink-0 w-64 snap-center pt-6">
            <div
              class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              <div class="relative bg-gradient-to-br from-gray-200 to-gray-300 aspect-square overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-32 h-32 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {{ teacher.name }}
                </h3>
                <p class="text-gray-600 text-sm mb-3">{{ teacher.subject }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const scrollContainer = ref(null);
const currentPage = ref(0);

const teachers = ref([
  { id: 1, name: "Dr. Ahmad Hidayat", subject: "Matematika" },
  { id: 2, name: "Siti Nurhaliza, M.Pd", subject: "Bahasa Indonesia" },
  { id: 3, name: "Budi Santoso, S.Si", subject: "Fisika" },
  { id: 4, name: "Rina Kusuma, M.Si", subject: "Kimia" },
  { id: 5, name: "Dedi Prasetyo, S.Pd", subject: "Biologi" },
  { id: 6, name: "Lisa Andriani, M.Pd", subject: "Bahasa Inggris" },
  { id: 7, name: "Hendra Wijaya, S.Sos", subject: "Sosiologi" },
  { id: 8, name: "Maya Putri, S.Pd", subject: "Seni Budaya" },
]);

const scrollLeft = () => {
  if (scrollContainer.value) {
    const cardWidth = 256 + 24;
    scrollContainer.value.scrollBy({ left: -cardWidth * 3, behavior: "smooth" });
    updateCurrentPage();
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    const cardWidth = 256 + 24;
    scrollContainer.value.scrollBy({ left: cardWidth * 3, behavior: "smooth" });
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

// Drag scroll pakai mouse
onMounted(() => {
  const el = scrollContainer.value;
  if (!el) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    el.classList.add("active");
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener("mouseleave", () => (isDown = false));
  el.addEventListener("mouseup", () => (isDown = false));

  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // kecepatan drag
    el.scrollLeft = scrollLeft - walk;
  });
});
</script>

<style>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
