<template>
  <div class="bg-gradient-to-b from-primary-white via-white/30 to-primary-white">
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
      <SectionAnnouncement :main-news="mainNews" :secondary-news="newsList"/>
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
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg"
        >
          <span>Lihat Semua Prestasi</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
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

      <!-- View All Button
      <div class="flex justify-center mt-8 mb-12">
        <NuxtLink
          to="/galery"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-2xl font-semibold hover:from-secondary-red/90 hover:to-secondary-red transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span>Lihat Semua Galeri</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div> -->
    </section>
    <HeaderTitle title="FAQ" align="center" />
    <section id="faq" class="px-6">
      <SectionFaq :faqs="faqData" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { News } from '../types/news';
import { mockAchievements } from '~/utils/mockData'

const { newsList } = useNews();
const mainNews = computed<News>(() => newsList.value[0]!);

const achievementsData = ref(mockAchievements)

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

const faqData = ref([
  {
    id: 1,
    question: "Apa saja jurusan yang tersedia di SMK Penerbangan Bandung?",
    answer: "SMK Penerbangan Bandung menyediakan beberapa jurusan unggulan seperti Teknik Penerbangan, Teknik Komputer dan Jaringan, Rekayasa Perangkat Lunak, dan Multimedia. Setiap jurusan dirancang dengan kurikulum yang relevan dengan kebutuhan industri."
  },
  {
    id: 2,
    question: "Bagaimana proses pendaftaran siswa baru?",
    answer: "Pendaftaran siswa baru dapat dilakukan secara online melalui portal PPDB kami. Calon siswa perlu menyiapkan dokumen persyaratan seperti ijazah SMP/sederajat, KK, akta kelahiran, dan foto. Setelah mendaftar, akan ada tes seleksi berupa tes akademik dan wawancara."
  },
  {
    id: 3,
    question: "Apakah tersedia program beasiswa?",
    answer: "Ya, kami menyediakan berbagai program beasiswa untuk siswa berprestasi dan kurang mampu. Beasiswa meliputi beasiswa prestasi akademik, beasiswa olahraga/seni, dan beasiswa dari mitra industri. Informasi lengkap dapat dilihat di portal resmi kami."
  },
  {
    id: 4,
    question: "Bagaimana sistem praktik kerja industri (Prakerin)?",
    answer: "Siswa akan menjalani Prakerin selama 3-6 bulan di perusahaan mitra kami. Program ini bertujuan memberikan pengalaman kerja nyata di industri. Kami bermitra dengan berbagai perusahaan ternama di bidang teknologi dan penerbangan untuk memastikan siswa mendapat pengalaman terbaik."
  },
  {
    id: 5,
    question: "Fasilitas apa saja yang tersedia untuk siswa?",
    answer: "SMK Penerbangan Bandung dilengkapi dengan fasilitas modern seperti laboratorium komputer, workshop teknik, perpustakaan digital, ruang multimedia, lapangan olahraga, kantin, dan area wifi. Semua fasilitas dirancang untuk mendukung proses pembelajaran yang optimal."
  },
  {
    id: 6,
    question: "Apakah lulusan bisa langsung bekerja?",
    answer: "Ya, lulusan kami memiliki peluang langsung bekerja karena kurikulum yang berbasis kompetensi industri. Banyak alumni kami yang terserap di perusahaan-perusahaan besar. Kami juga memiliki job fair dan program career development untuk membantu siswa memasuki dunia kerja."
  },
  {
    id: 7,
    question: "Apakah bisa melanjutkan ke perguruan tinggi?",
    answer: "Tentu saja! Lulusan SMK juga memiliki kesempatan yang sama untuk melanjutkan ke perguruan tinggi melalui berbagai jalur seperti SNBP, SNBT, atau jalur mandiri. Banyak alumni kami yang melanjutkan pendidikan ke universitas ternama di Indonesia."
  },
  {
    id: 8,
    question: "Berapa biaya pendidikan di SMK Penerbangan Bandung?",
    answer: "Biaya pendidikan bervariasi tergantung jurusan yang dipilih. Kami menyediakan informasi rinci mengenai biaya pendidikan saat proses pendaftaran. Selain itu, tersedia juga program cicilan dan berbagai skema pembayaran yang dapat memudahkan orang tua siswa."
  }
]);
</script>

<style scoped></style>
