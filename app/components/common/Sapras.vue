<template>
  <div class="relative w-full overflow-hidden py-4">
    <div
      v-if="isLoading"
      class="text-center text-gray-500 py-20 text-lg font-medium">
      Memuat data...
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">
      <div class="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        <transition name="fade" mode="out-in">
          <img
            :key="currentSapras.image"
            :src="currentSapras.image"
            alt="sapras image"
            class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out" />
        </transition>
        <div
          class="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
      </div>

      <div class="relative">
        <transition name="slide" mode="out-in">
          <div :key="currentSapras.title" class="space-y-4">
            <h2
              class="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <span class="text-red-700">|</span>
              {{ currentSapras.title }}
            </h2>

            <div
              class="text-gray-700 prose prose-sm max-w-none"
              v-html="currentSapras.description"></div>

            <NuxtLink
              v-if="currentSapras.linkUrl"
              :to="currentSapras.linkUrl"
              class="inline-flex items-center gap-2 font-medium text-red-600 transition-all hover:translate-x-1">
              {{ currentSapras.linkText }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </transition>
      </div>
    </div>

    <div class="flex justify-center gap-3 mt-6 ">
      <button
        v-for="(item, index) in saprasList"
        :key="index"
        @click="currentIndex = index"
        class="w-4 h-4 rounded-full transition-all cursor-pointer"
        :class="index === currentIndex ? 'bg-red-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SaprasItem {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  image: string;
}

const defaultSapras: SaprasItem = {
  title: "Memuat...",
  description: "",
  linkText: "",
  linkUrl: "",
  image: "",
};

const saprasList = ref<SaprasItem[]>([]);
const isLoading = ref(true);
const currentIndex = ref(0);

const fetchSaprasData = () => {
  saprasList.value = [
    {
      title: "Laboratorium RPL",
      description: `
        <p>Laboratorium Rekayasa Perangkat Lunak dilengkapi dengan komputer modern dan koneksi jaringan LAN yang stabil.</p>
        <ul class="list-disc pl-5"><li>PC high-end untuk coding dan desain</li><li>Proyektor interaktif</li><li>Akses internet cepat</li></ul>
      `,
      linkText: "Lihat Detail",
      linkUrl: "#",
      image: "https://picsum.photos/seed/labrpl/1200/800",
    },
    {
      title: "Workshop Teknik Komputer",
      description: `
        <p>Tempat praktik perakitan, perbaikan, dan pemeliharaan perangkat keras komputer.</p>
        <ul class="list-disc pl-5"><li>Peralatan servis lengkap</li><li>Ruang pendingin nyaman</li><li>Panduan instruktur ahli</li></ul>
      `,
      linkText: "Kunjungi Workshop",
      linkUrl: "#",
      image: "https://picsum.photos/seed/workshop/1200/800",
    },
    {
      title: "Perpustakaan Digital",
      description: `
        <p>Menjadi pusat referensi dan pembelajaran berbasis digital bagi seluruh siswa.</p>
        <ul class="list-disc pl-5"><li>Akses e-book dan jurnal ilmiah</li><li>Ruang baca nyaman</li><li>Wi-Fi gratis</li></ul>
      `,
      linkText: "Jelajahi Koleksi",
      linkUrl: "#",
      image: "https://picsum.photos/seed/library/1200/800",
    },
    {
      title: "Ruang Multimedia",
      description: `
        <p>Ruang kreatif untuk produksi video, animasi, dan presentasi digital.</p>
        <ul class="list-disc pl-5"><li>Peralatan audio visual modern</li><li>Studio mini untuk editing</li><li>Green screen</li></ul>
      `,
      linkText: "Lihat Galeri",
      linkUrl: "#",
      image: "https://picsum.photos/seed/multimedia/1200/800",
    },
    {
      title: "Lapangan Olahraga",
      description: `
        <p>Tempat berolahraga dan menyalurkan semangat sportivitas bagi seluruh siswa.</p>
        <ul class="list-disc pl-5"><li>Lapangan futsal & basket</li><li>Ruang ganti dan kamar mandi bersih</li><li>Area penonton luas</li></ul>
      `,
      linkText: "Lihat Fasilitas",
      linkUrl: "#",
      image: "https://picsum.photos/seed/sport/1200/800",
    },
  ];
  isLoading.value = false;
};

// --- Rotasi otomatis tiap 5 detik ---
let interval: ReturnType<typeof setInterval>;
onMounted(() => {
 fetchSaprasData();
 interval = setInterval(() => {
   const length = saprasList.value.length;
   if (length === 0) return;
   currentIndex.value = (currentIndex.value + 1) % length;
 }, 5000);
});
onUnmounted(() => clearInterval(interval));

const currentSapras = computed<SaprasItem>(
  () => saprasList.value[currentIndex.value] ?? defaultSapras
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
