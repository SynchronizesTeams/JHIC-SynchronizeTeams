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
    <HeaderTitle title="TENAGA PENDIDIKAN" align="center" />
    <section id="teachers" class="px-6">
      <SectionTeachers />
    </section>
    <HeaderTitle title="BERITA TERBARU" align="center" />
    <section id="news" class="px-6 w-full">
      <div v-if="newsList.length > 0">
        <SectionAnnouncement
          :main-news="mainNews"
          :secondary-news="secondaryNews" />
        <center>
          <NuxtLink
            v-if="useRoute().path === '/'"
            to="/news"
            class="inline-flex items-center gap-2 mx-auto mt-8 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg">
            <span>Lihat Lainnya</span>
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
        </center>
      </div>
      <div v-else class="text-center text-gray-500 py-8">Memuat berita...</div>
    </section>
    <section id="partner" class="px-6">
      <SectionPartner />
    </section>
    <HeaderTitle title="KALENDER & BUKU TAMU" align="center" />
    <section id="calendar" class="px-6">
      <SectionCalendarGuestBook />
    </section>
    <HeaderTitle title="PROGRAM UNGGULAN" align="center" />
    <section>
      <CommonEkskul />
    </section>
    <HeaderTitle title="PRESTASI" align="center" />
    <section id="achievment" class="px-6">
      <SectionAchievement :achievements="achievementsData" :display-count="3" />

      <!-- View All Button -->
      <div class="flex justify-center mt-8 mb-12">
        <NuxtLink
          to="/achievements"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg">
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
    <HeaderTitle title="GALERI" align="center" />
    <section id="galery" class="px-6">
      <SectionGalery :images="galleryImages" :display-count="7" />
    </section>
    <HeaderTitle title="FAQ" align="center" />
    <section id="faq" class="px-6">
      <SectionFaq :faqs="faqData" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import achievementsDataJson from "~/contents/achievements.json";
import faqsDataJson from "~/contents/faqs.json";
import type { News } from "../types/news";
import { mockAchievements } from "~/utils/mockData";

// SEO Meta Tags
useSeoMeta({
  title: "Beranda",
  description:
    "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan unggulan di Bandung dengan program keahlian teknologi, komunikasi, dan keterampilan profesional. Mencetak lulusan kompeten dan siap kerja.",
  ogTitle: "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik",
  ogDescription:
    "Sekolah kejuruan unggulan dengan fasilitas modern dan program keahlian terkini. Bergabunglah dengan kami untuk masa depan cerah!",
  ogImage: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
  ogUrl: "https://smkpluspelitanusantara.sch.id",
  twitterCard: "summary_large_image",
  twitterTitle: "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik",
  twitterDescription:
    "Sekolah kejuruan unggulan dengan fasilitas modern dan program keahlian terkini.",
  twitterImage: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
});

useHead({
  link: [{ rel: "canonical", href: "https://smkpluspelitanusantara.sch.id" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "SMK Plus Pelita Nusantara - Beranda",
        description:
          "SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan di Bandung",
        url: "https://smkpluspelitanusantara.sch.id",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: "https://smkpluspelitanusantara.sch.id",
            },
          ],
        },
      }),
    } as any,
  ],
});

const { newsList } = useNews();
const {
  galleryImages,
  loading: galleryLoading,
  error: galleryError,
} = useGallery();
const {
  testimonials: testimonialsData,
  loading: testimonialsLoading,
  error: testimonialsError,
} = useTestimonials();

const mainNews = computed<News>(() => newsList.value[0]!);
const secondaryNews = computed<News[]>(() => newsList.value);

const achievementsData = ref(mockAchievements);
const faqData = ref(faqsDataJson as any);

onMounted(() => {
  console.log("Gallery images:", galleryImages);
  console.log("Testimonials:", testimonialsData);
});
</script>

<style scoped></style>
