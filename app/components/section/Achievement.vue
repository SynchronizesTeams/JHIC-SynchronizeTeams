<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div
        ref="scrollContainer"
        class="flex overflow-x-auto space-x-6 pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:space-x-0 cursor-grab active:cursor-grabbing"
        style="
          scrollbar-width: none;
          -ms-overflow-style: none;
          touch-action: pan-x pan-y;
          -webkit-overflow-scrolling: touch;
        ">
        <div
          v-for="(achievement, index) in achievements"
          :key="index"
          class="flex-shrink-0 w-80 md:w-auto bg-gray-500 rounded-xl cursor-grab active:cursor-grabbing shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div class="relative">
            <NuxtImg
              :src="achievement.imageUrl"
              :alt="achievement.title"
              class="w-full h-48 object-cover" />

            <div class="absolute inset-x-0 bottom-0 p-3">
              <h3 class="text-xl font-semibold text-white">
                {{ achievement.title }}
              </h3>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-b from-secondary-red/30 to-secondary-red/50 p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
              <p class="text-white text-center text-sm">
                {{ achievement.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollContainer = ref(null);

const achievements = ref([
  {
    title: "Juara 1 Lomba Web Dev Nasional",
    imageUrl: "",
    description:
      "Memenangkan kompetisi pengembangan web tingkat nasional pada tahun 2024, mengalahkan lebih dari 500 tim.",
  },
  {
    title: "Sertifikasi Internasional ISO 9001",
    imageUrl: "",
    description:
      "Kami telah berhasil mendapatkan sertifikasi ISO 9001, menjamin kualitas manajemen dan layanan kami.",
  },
  {
    title: "Penghargaan Inovasi Terbaik",
    imageUrl: "",
    description:
      "Diakui sebagai yang terbaik dalam kategori inovasi teknologi untuk solusi perangkat lunak terbaru kami.",
  },
  {
    title: "Kontributor Open Source Terbaik",
    imageUrl: "",
    description:
      "Tim kami secara aktif berkontribusi pada komunitas sumber terbuka global, diakui tahun 2023.",
  },
  {
    title: "Mitra Pendidikan Unggulan",
    imageUrl: "",
    description:
      "Dipercaya sebagai mitra utama dalam program vokasi dan pendidikan industri.",
  },
]);

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
