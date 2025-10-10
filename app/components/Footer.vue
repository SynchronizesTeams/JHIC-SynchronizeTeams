<template>
  <footer class="w-full border-t-black border-t-[0.5px] px-10 py-10">
    <div
      class="max-w-7xl mx-auto flex justify-between items-start text-gray-700"
    >
      <div class="w-1/3 space-y-3">
        <div class="flex items-center gap-2">
          <nuxt-img src="/images/penus/Logo.png" class="w-80" />
        </div>

        <p class="text-sm leading-relaxed">
          SMK Plus Pelita Nusantara Menjadi Sekolah Menengah Kejuruan Unggulan
          yang menghasilkan sumber daya manusia Terampil, Entrepreneur, dan
          Religius.
        </p>
      </div>

      <div class="w-1/4 space-y-2">
        <h2 class="text-xl font-bold text-black">Navigasi</h2>
        <ul class="space-y-1">
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/"
              >Beranda</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/profil-sekolah"
              >Profil Sekolah</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/pengumuman"
              >Pengumuman dan Berita</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/tenaga-pendidik"
              >Tenaga Pendidik</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/galeri"
              >Galeri</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/buku-tamu"
              >Buku Tamu</NuxtLink
            >
          </li>
        </ul>
      </div>

      <!-- ini mau isi aoaan cokk -->
      <div class="w-1/4 space-y-2">
        <h2 class="text-xl font-bold text-black">Layanan dan Kolaborasi</h2>
        <ul class="space-y-1">
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/"
              >Beranda</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/profil-sekolah"
              >Profil Sekolah</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/pengumuman"
              >Pengumuman dan Berita</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/tenaga-pendidik"
              >Tenaga Pendidik</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/galeri"
              >Galeri</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/buku-tamu"
              >Buku Tamu</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="flex items-center gap-4 pt-3">
        <!-- ini mau isi icon tapi bingung mau make apaan -->
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
