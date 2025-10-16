<template>
  <div>
    <section id="home" class="px-6 pt-6">
      <SectionHero />
    </section>
    <HeaderTitle title="TENTANG KAMI" align="center" />
    <section id="about" class="px-6 bg-gradient-to-b">
      <SectionInfo />
    </section>
    <HeaderTitle title="TENAGA PENDIDIKAN" align="right" />
    <section id="teachers" class="px-6">
      <SectionTeachers />
    </section>
    <HeaderTitle title="NEWS" align="center" />
    <section id="news" class="px-6">
      <SectionAnnouncement :main-news="mainNews" :secondary-news="newsList"/>
    </section>
    <section id="partner" class="px-6">
      <SectionPartner />
    </section>
    <HeaderTitle title="PRESTASI" align="left" />
    <section id="achievment" class="px-6">
      <SectionAchievement />
    </section>
    <HeaderTitle title="TESTIMONI" align="center" />
    <section id="testimonials" class="px-6">
      <SectionTestimonials :testimonials="testimonialsData" />
    </section>
    <HeaderTitle title="GALERI" align="right" />
    <section id="galery" class="px-6">
      <SectionGalery :images="galleryImages" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { News } from '../types/news';

const { newsList } = useNews();
const mainNews = computed<News>(() => newsList.value[0]!);

const galleryImages = ref<
  { id: number; src: string; alt: string; title: string }[]
>([]);

for (let i = 1; i <= 20; i++) {
  galleryImages.value.push({
    id: i,
    src: `https://picsum.photos/seed/${i}/800/600`,
    alt: `Gambar Literasi ${i}`,
    title: `Literasi Pagi #${i}`,
  });
}

const testimonialsData = ref([
  {
    id: 1,
    quote:
      "Kurikulum di sini sangat relevan dengan dunia industri. Saya merasa siap kerja setelah lulus.",
    name: "Budi Santoso",
    position: "Alumni, Software Engineer di TechCorp",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    quote:
      "Guru-gurunya sangat mendukung dan fasilitas praktiknya lengkap. Pengalaman belajar yang luar biasa.",
    name: "Citra Lestari",
    position: "Alumni, UI/UX Designer di CreativeHub",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    quote:
      "Program magang yang disediakan sekolah membuka banyak pintu kesempatan karir bagi saya.",
    name: "Doni Prasetyo",
    position: "Alumni, Network Administrator di GlobalNet",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
]);
</script>

<style scoped></style>
