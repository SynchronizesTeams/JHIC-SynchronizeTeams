<template>
  <div class="w-full py-8 px-4 select-none">
    <div class="max-w-7xl mx-auto">
      <div v-if="isLoading" class="text-center text-gray-500">
        Memuat data guru...
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        Gagal memuat data. Coba lagi nanti.
      </div>

      <div v-else class="relative">
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
                <img
                  v-if="teacher.photo"
                  :src="`${apiUrl}/${teacher.photo}`"
                  :alt="teacher.full_name"
                  class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110" />
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center">
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
                  {{ teacher.full_name }}
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
// Definisikan tipe data sesuai dengan respons API
export interface TeacherUser {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  nig: string;
  full_name: string;
  position: string;
  subject: string;
  photo?: string;
  description: string;
  user: TeacherUser;
}

const { teacher } = useApi(); // Menggunakan composable useApi
const router = useRouter();
const apiUrl = useRuntimeConfig().public.apiBaseUrl

const scrollContainer = ref<HTMLElement | null>(null);
const teachers = ref<Teacher[]>([]); // State untuk menampung data guru dari API
const isLoading = ref(true); // State untuk loading
const error = ref<any>(null); // State untuk error

// Fungsi untuk navigasi ke halaman detail guru
const goToTeacher = (teacherId: number) => {
  router.push(`/teacher/${teacherId}`);
};

// Fungsi untuk fetch data guru
const fetchTeachers = async () => {
  try {
    isLoading.value = true;
    // Panggil method getAll dari useApi
    const responseData = await teacher.getAll();
    teachers.value = responseData;
  } catch (e) {
    console.error("Failed to fetch teachers:", e);
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};

const scrollLeft = () => {
  const el = scrollContainer.value;
  if (el) {
    const cardWidth = el.firstElementChild?.clientWidth || 232; // 208px (w-52) + 24px (gap)
    const scrollAmount = cardWidth * Math.floor(el.clientWidth / cardWidth);
    el.scrollTo({ left: el.scrollLeft - scrollAmount, behavior: "smooth" });
  }
};

const scrollRight = () => {
  const el = scrollContainer.value;
  if (el) {
    const cardWidth = el.firstElementChild?.clientWidth || 232;
    const scrollAmount = cardWidth * Math.floor(el.clientWidth / cardWidth);
    el.scrollTo({ left: el.scrollLeft + scrollAmount, behavior: "smooth" });
  }
};

onMounted(() => {
  // Panggil fungsi fetch data saat komponen dimuat
  fetchTeachers();
  
  const el = scrollContainer.value;
  if (!el) return;

  let isDown = false;
  let startX: number;
  let scrollLeftVal: number;

  el.addEventListener("mousedown", (e: MouseEvent) => {
    isDown = true;
    el.classList.add("active");
    startX = e.pageX - el.offsetLeft;
    scrollLeftVal = el.scrollLeft;
  });

  el.addEventListener("mouseleave", () => (isDown = false));
  el.addEventListener("mouseup", () => (isDown = false));

  el.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeftVal - walk;
  });
});
</script>

<style>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>