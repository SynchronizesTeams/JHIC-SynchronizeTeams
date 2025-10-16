<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-xl">
    <div
      class="mb-8 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl">
      <div
        class="relative w-full h-80 bg-gray-300 group cursor-pointer"
        :style="`background-image: url(${mainNews.imageUrl}); background-size: cover; background-position: center;`">
        <div
          class="absolute inset-0 bg-black/40 flex items-end p-6 transition-all duration-300 group-hover:bg-black/60">
          <div class="text-white w-full">
            <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 leading-tight">
              {{ mainNews.title }}
            </h1>

            <p
              class="text-lg font-medium max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 line-clamp-3">
              {{ mainNews.description }}
            </p>
            <span
              class="block mt-2 text-sm font-semibold text-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >Baca Selengkapnya →</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="news in secondaryNews"
        :key="news.id"
        class="rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
        <div
          class="relative w-full aspect-square bg-gray-300 group cursor-pointer"
          :style="`background-image: url(${news.imageUrl}); background-size: cover; background-position: center;`">
          <div
            class="absolute inset-0 bg-black/40 flex items-end p-4 transition-all duration-300 group-hover:bg-black/70">
            <div class="text-white w-full">
              <h2
                class="text-xl font-bold mb-1 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-red-300">
                {{ news.title }}
              </h2>

              <p
                class="text-sm max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100 line-clamp-2">
                {{ news.description }}
              </p>
              <span
                class="block mt-1 text-xs font-medium text-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >Lihat Detail →</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mainNews = ref({
  id: 101,
  title: "Inovasi Terbaru Pendidikan: Peluncuran Kurikulum Abad 21",
  description:
    "Pemerintah resmi meluncurkan kurikulum baru yang fokus pada penguatan keterampilan digital dan berpikir kritis, menandai era baru dalam sistem pendidikan nasional. Implementasi akan dimulai pada tahun ajaran mendatang.",
  imageUrl:
    "",
});

const secondaryNews = ref([
  {
    id: 1,
    title: "Workshop Coding Gratis untuk Siswa SMA",
    description:
      "Telah dibuka pendaftaran untuk workshop intensif pemrograman dasar selama 3 hari. Kuota terbatas!",
    imageUrl:
      "D",
  },
  {
    id: 2,
    title: "Beasiswa Penuh ke Jepang: Kesempatan Emas",
    description:
      "Pengumuman penerima beasiswa unggulan untuk studi lanjut di Tokyo University. Selamat kepada para pemenang!",
    imageUrl:
      "",
  },
  {
    id: 3,
    title: "Peningkatan Fasilitas Perpustakaan Digital",
    description:
      "Kini akses ke ribuan jurnal internasional tersedia gratis untuk seluruh civitas akademika. Peresmian hari ini.",
    imageUrl:
      "",
  },
  {
    id: 4,
    title: "Hasil Lomba Sains Nasional Diumumkan",
    description:
      "Tim SMA kami berhasil meraih medali emas dalam kompetisi fisika tahunan, mengalahkan 100 tim lainnya.",
    imageUrl:
      "",
  },
]);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>