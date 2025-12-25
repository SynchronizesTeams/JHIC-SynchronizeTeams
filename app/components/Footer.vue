<template>
  <footer
    class="w-full border-t-black border-t-[0.5px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-8 lg:items-start text-gray-700">
      <div class="space-y-3 lg:w-1/3">
        <div class="flex items-center gap-2">
          <img loading="lazy" src="/images/penus/Logo.png" class="w-52 sm:w-64 lg:w-80" />
        </div>

        <p class="text-sm leading-relaxed">
          SMK Plus Pelita Nusantara Menjadi Sekolah Menengah Kejuruan Unggulan
          yang menghasilkan sumber daya manusia Terampil, Entrepreneur, dan
          Religius.
        </p>

        <div class="w-full rounded-lg overflow-hidden border border-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4275926670093!2d106.86202197537628!3d-6.467392663236498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1d3574a6c97%3A0x43a0aa1056feca8b!2sSMK%20PLUS%20PELITA%20NUSANTARA!5e0!3m2!1sen!2sid!4v1760807644599!5m2!1sen!2sid"
            width="100%"
            height="200"
            style="border: 5px solid #1F2937;"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full"
          ></iframe>
        </div>
      </div>

      <div class="space-y-2 lg:w-1/4">
        <h2 class="text-lg sm:text-xl font-bold text-black">Navigasi</h2>
        <ul class="space-y-1">
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="#home"
              >Beranda</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="#about"
              >Profil Sekolah</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="#teachers"
              >Tenaga Pendidik</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/news"
              >Pengumuman dan Berita</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/#calendar"
              >Buku Tamu</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/galery"
              >Galeri</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div class="space-y-2 lg:w-1/4">
        <h2 class="text-lg sm:text-xl font-bold text-black">
          Layanan dan Kolaborasi
        </h2>
        <ul class="space-y-1">
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/forums"
              >Forum Diskusi</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/portals"
              >Portal Terpadu</NuxtLink
            >
          </li>
          <li v-if="user">
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              :to="`/personal-profile/${userIdFromLocalStorage || 'profile'}`"
              >Personal Profile</NuxtLink
            >
            <br>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/dashboard/links"
              >Dashboard Personal</NuxtLink
            >
          </li>
          <li v-else>
            <NuxtLink
              class="hover:text-secondary-red transition-all duration-300"
              to="/login"
              >Login</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Support and Aims To Section -->
    <div class="mt-8 pt-6 border-t border-gray-200">
      <div class="flex flex-col items-center justify-center space-y-6">
        <h3 class="text-lg sm:text-xl font-bold text-gray-700">Support and aims to</h3>
        <div class="flex justify-center w-full px-4">
          <div class="bg-gray-50 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-5xl">
            <!-- replacing single logo with individual logos and a vertical divider -->
            <div class="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <!-- Infra Competition Logo -->
              <div class="flex-shrink-0">
                <img
                  loading="lazy"
                  src="/images/penus/Logo-RPL.webp"
                  alt="Infra Competition"
                  class="h-14 sm:h-20 md:h-24 w-auto object-contain"
                />
              </div>

              <!-- Vertical Divider -->
              <div class="hidden md:block h-16 w-px bg-gray-300 mx-2"></div>

              <!-- Other Partners Group -->
              <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12">
                <img
                  loading="lazy"
                  src="/images/penus/Logo-TKJ.webp"
                  alt="Jagoan Hosting"
                  class="h-8 sm:h-10 md:h-12 w-auto object-contain"
                />
                <img
                  loading="lazy"
                  src="/images/penus/Logo-DKV.webp"
                  alt="Komdigi"
                  class="h-10 sm:h-14 md:h-18 w-auto object-contain"
                />
                <img
                  loading="lazy"
                  src="/images/penus/Logo-PKM.webp"
                  alt="Maspion IT"
                  class="h-10 sm:h-14 md:h-18 w-auto object-contain"
                />
                <img
                  loading="lazy"
                  src="/images/penus/Logo-TOI.webp"
                  alt="Garuda Spark"
                  class="h-10 sm:h-12 md:h-16 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="mt-6 pt-4 border-t border-gray-200">
      <div class="text-center text-sm text-gray-600">
        <p>&copy; {{ currentYear }} SMK Plus Pelita Nusantara. All rights reserved. <br> Website created by <NuxtLink class="text-secondary-red" target="_blank" to="https://synchronizeteams.com">SynchronizeTeams</NuxtLink></p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
