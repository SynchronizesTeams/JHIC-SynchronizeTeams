<template>
  <div
    class="bg-gradient-to-b from-primary-white via-white/30 to-primary-white">
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
    <HeaderTitle title="BERITA TERBARU" align="center" />
    <section id="news" class="px-6">
      <SectionAnnouncement :main-news="mainNews" :secondary-news="newsList" />
    </section>
    <section id="partner" class="px-6">
      <SectionPartner />
    </section>
    <HeaderTitle title="EKSTRAKULIKULER" align="left" />
    <section>
      <CommonEkskul />
    </section>
    <HeaderTitle title="PRESTASI" align="left" />
    <section id="achievment" class="px-6">
      <SectionAchievement :achievements="achievementsData" :display-count="3" />

      <!-- View All Button -->
      <div class="flex justify-center mt-8 mb-12">
        <NuxtLink
          to="/achievements"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-2xl font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-lg hover:shadow-xl hover:scale-105">
          <span>Lihat Semua Prestasi</span>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>
    <HeaderTitle title="TESTIMONI" align="center" />
    <section id="testimonials" class="px-6">
      <SectionTestimonials :testimonials="testimonialsData" />
    </section>
    <HeaderTitle title="GALERI" align="right" />
    <section id="galery" class="px-6">
      <SectionGalery :images="galleryImages" :display-count="7" />

      <!-- View All Button -->
      <div class="flex justify-center mt-8 mb-12">
        <NuxtLink
          to="/galery"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-2xl font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-lg hover:shadow-xl hover:scale-105">
          <span>Lihat Semua Galeri</span>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>
    <HeaderTitle title="FAQ" align="center" />
    <section id="faq" class="px-6">
      <SectionFaq :faqs="faqData" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { News } from "../types/news";
import achievementsDataJson from "~/contents/achievements.json";
import faqsDataJson from "~/contents/faqs.json";
import testimonialsDataJson from "~/contents/testimonials.json";
import galleryDataJson from "~/contents/gallery.json";

const { newsList } = useNews();
const mainNews = computed<News>(() => newsList.value[0]!);

const achievementsData = ref(achievementsDataJson as any);

const galleryImages = ref<
  { id: number; src: string; alt: string; title: string }[]
>(galleryDataJson as any);

const testimonialsData = ref(testimonialsDataJson as any);

const faqData = ref(faqsDataJson as any);
</script>

<style scoped></style>
