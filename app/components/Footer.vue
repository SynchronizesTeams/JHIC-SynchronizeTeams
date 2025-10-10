<template>
  <footer class="w-full border-t-black border-t-[0.5px]">
    <div class="max-w-7xl mx-auto flex justify-between items-start px-10 py-10 text-gray-700">

      <div class="w-1/3 space-y-3">
        <div class="flex items-center gap-2">
          <nuxt-img src="/images/penus/Logo.png" class="w-80" />
        </div>

        <p class="text-sm leading-relaxed">
          SMK Plus Pelita Nusantara Menjadi Sekolah Menengah Kejuruan Unggulan
          yang menghasilkan sumber daya manusia Terampil, Entrepreneur, dan Religius.
        </p>

        <div class="flex items-center gap-3 pt-3">
          <NuxtLink to="#"><i class="fa-brands fa-instagram text-2xl"></i></NuxtLink>
          <NuxtLink to="#"><i class="fa-brands fa-facebook text-2xl"></i></NuxtLink>
          <NuxtLink to="#"><i class="fa-brands fa-youtube text-2xl"></i></NuxtLink>
          <NuxtLink to="#"><i class="fa-brands fa-linkedin text-2xl"></i></NuxtLink>
          <NuxtLink to="#"><i class="fa-brands fa-tiktok text-2xl"></i></NuxtLink>
        </div>
      </div>

      <div class="w-1/4 space-y-2">
        <h2 class="text-xl font-bold text-black">Navigasi</h2>
        <ul class="space-y-1">
          <li><NuxtLink class="hover:text-secondary-red transition-all duration-300" to="/">Beranda</NuxtLink></li>
          <li><NuxtLink class="hover:text-secondary-red transition-all duration-300" to="/profil-sekolah">Profil Sekolah</NuxtLink></li>
          <li><NuxtLink class="hover:text-secondary-red transition-all duration-300" to="/pengumuman">Pengumuman dan Berita</NuxtLink></li>
          <li><NuxtLink class="hover:text-secondary-red transition-all duration-300" to="/tenaga-pendidik">Tenaga Pendidik</NuxtLink></li>
          <li><NuxtLink class="hover:text-secondary-red transition-all duration-300" to="/galeri">Galeri</NuxtLink></li>
          <li><NuxtLink class="hover:text-secondary-red transition-all duration-300" to="/buku-tamu">Buku Tamu</NuxtLink></li>
        </ul>
      </div>

      <div class="w-1/4 space-y-2">
        <h2 class="text-xl font-bold text-black">Layanan dan Kolaborasi</h2>
        <ul class="space-y-1">
          <li><NuxtLink to="/">Beranda</NuxtLink></li>
          <li><NuxtLink to="/profil-sekolah">Profil Sekolah</NuxtLink></li>
          <li><NuxtLink to="/pengumuman">Pengumuman dan Berita</NuxtLink></li>
          <li><NuxtLink to="/tenaga-pendidik">Tenaga Pendidik</NuxtLink></li>
          <li><NuxtLink to="/galeri">Galeri</NuxtLink></li>
          <li><NuxtLink to="/buku-tamu">Buku Tamu</NuxtLink></li>
        </ul>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
