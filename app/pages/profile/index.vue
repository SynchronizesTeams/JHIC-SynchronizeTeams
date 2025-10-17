<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">

    <!-- Hero Section -->
    <section
      class="relative flex items-center justify-center h-[50vh] overflow-hidden bg-black text-white">
      <NuxtImg
        src="/images/penus/Gedung_Utama.webp"
        alt="SMK Plus Pelita Nusantara"
        class="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Profile PENUS
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Unggulan yang Menghasilkan SDM Terampil, Entrepreneur, dan Religius
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-6 py-16">

      <!-- Sejarah Sekolah -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Sejarah Sekolah</h2>
        </div>
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
          <p class="text-gray-700 leading-relaxed mb-4">
            <strong>SMK Plus Pelita Nusantara</strong> didirikan dengan visi untuk menciptakan generasi muda yang tidak hanya terampil dalam bidang teknologi dan kejuruan, tetapi juga memiliki jiwa entrepreneur dan nilai-nilai religius yang kuat.
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            Sejak awal berdirinya, sekolah kami berkomitmen untuk menyediakan pendidikan berkualitas yang relevan dengan kebutuhan industri modern. Dengan menggabungkan kurikulum nasional dan muatan lokal yang inovatif, kami mempersiapkan siswa untuk menghadapi tantangan dunia kerja dan kewirausahaan.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Berlokasi di lingkungan yang kondusif untuk belajar, SMK Plus Pelita Nusantara terus berkembang dan berinovasi dalam menyediakan fasilitas dan program pendidikan terbaik bagi para siswa.
          </p>
        </div>
      </div>

      <!-- Visi & Misi -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Visi & Misi</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Visi -->
          <div class="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-lg border border-red-200">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-8 h-8 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <h3 class="text-2xl font-bold text-red-700">Visi</h3>
            </div>
            <p class="text-gray-700 leading-relaxed">
              Menjadi Sekolah Menengah Kejuruan Unggulan yang menghasilkan sumber daya manusia yang <strong>Terampil</strong>, <strong>Entrepreneur</strong>, dan <strong>Religius</strong> untuk memenuhi kebutuhan industri dan masyarakat.
            </p>
          </div>

          <!-- Misi -->
          <div class="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-200">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="text-2xl font-bold text-blue-700">Misi</h3>
            </div>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-blue-700 font-bold mt-1">•</span>
                <span>Menyelenggarakan pendidikan kejuruan berbasis kompetensi dan keterampilan</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-700 font-bold mt-1">•</span>
                <span>Mengembangkan jiwa entrepreneur dan inovasi pada peserta didik</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-700 font-bold mt-1">•</span>
                <span>Menanamkan nilai-nilai religius dan karakter mulia</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-700 font-bold mt-1">•</span>
                <span>Menjalin kemitraan dengan industri dan dunia usaha</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Jurusan/Program Keahlian -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Program Keahlian</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="program in programs" :key="program.id"
            class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="program.icon"/>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 text-center mb-3">
              {{ program.name }}
            </h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed">
              {{ program.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Fasilitas Sekolah -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Fasilitas Sekolah</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="facility in facilities" :key="facility.id"
            class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200 text-center hover:bg-white hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">{{ facility.icon }}</div>
            <h4 class="font-semibold text-gray-800">{{ facility.name }}</h4>
          </div>
        </div>
      </div>

      <!-- Keunggulan -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Keunggulan Kami</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="advantage in advantages" :key="advantage.id"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-200 flex items-start gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-2">{{ advantage.title }}</h4>
              <p class="text-gray-600 text-sm leading-relaxed">{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-red-700 to-red-900 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Bergabunglah Dengan Kami!</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Jadilah bagian dari SMK Plus Pelita Nusantara dan wujudkan masa depan cemerlang Anda bersama kami.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="https://ppdb.smkpluspnb.sch.id"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-700 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
            <span>Pelajari Lebih Lanjut</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span>Kembali ke Beranda</span>
          </NuxtLink>
        </div>
      </div>

    </section>

  </div>
</template>

<script lang="ts" setup>
// Program Keahlian Data
const programs = ref([
  {
    id: 1,
    name: 'Teknik Komputer dan Jaringan',
    description: 'Mempelajari instalasi, konfigurasi, dan maintenance sistem komputer dan jaringan',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  },
  {
    id: 2,
    name: 'Rekayasa Perangkat Lunak',
    description: 'Mengembangkan kemampuan dalam pemrograman dan pengembangan aplikasi',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    id: 3,
    name: 'Multimedia',
    description: 'Menguasai desain grafis, video editing, dan produksi konten digital',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
  }
])

// Fasilitas Sekolah
const facilities = ref([
  { id: 1, name: 'Laboratorium Komputer', icon: '💻' },
  { id: 2, name: 'Workshop Praktik', icon: '🔧' },
  { id: 3, name: 'Perpustakaan Digital', icon: '📚' },
  { id: 4, name: 'Ruang Multimedia', icon: '🎬' },
  { id: 5, name: 'Studio Recording', icon: '🎙️' },
  { id: 6, name: 'Masjid', icon: '🕌' },
  { id: 7, name: 'Lapangan Olahraga', icon: '⚽' },
  { id: 8, name: 'Kantin', icon: '🍽️' }
])

// Keunggulan
const advantages = ref([
  {
    id: 1,
    title: 'Kurikulum Berbasis Industri',
    description: 'Pembelajaran yang disesuaikan dengan kebutuhan dunia kerja dan industri terkini'
  },
  {
    id: 2,
    title: 'Tenaga Pengajar Profesional',
    description: 'Guru dan instruktur berpengalaman dengan latar belakang industri'
  },
  {
    id: 3,
    title: 'Kemitraan dengan Industri',
    description: 'Bekerja sama dengan perusahaan-perusahaan ternama untuk program magang'
  },
  {
    id: 4,
    title: 'Fasilitas Modern',
    description: 'Dilengkapi dengan peralatan dan teknologi terkini untuk mendukung pembelajaran'
  },
  {
    id: 5,
    title: 'Pembinaan Karakter',
    description: 'Fokus pada pembentukan karakter religius dan jiwa entrepreneur'
  },
  {
    id: 6,
    title: 'Sertifikasi Kompetensi',
    description: 'Siswa mendapatkan sertifikasi kompetensi yang diakui industri'
  }
])

// SEO
useHead({
  title: 'Profile Sekolah - SMK Plus Pelita Nusantara',
  meta: [
    {
      name: 'description',
      content: 'Profil lengkap SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan unggulan yang menghasilkan SDM terampil, entrepreneur, dan religius'
    }
  ]
})
</script>

<style scoped>
</style>
