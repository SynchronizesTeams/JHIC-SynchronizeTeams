<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">
    <section
      class="relative flex items-center justify-center h-[50vh] overflow-hidden bg-black text-white">
      <NuxtImg
        :src="profile.hero.image"
        alt="Profile PENUS"
        class="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          {{ profile.hero.title }}
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          {{ profile.hero.subtitle }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <!-- Sejarah -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Sejarah Sekolah
          </h2>
        </div>
        <div
          class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
          <p
            v-for="(p, i) in profile.sejarah"
            :key="i"
            class="text-gray-700 leading-relaxed mb-4">
            {{ p }}
          </p>
        </div>
      </div>

      <!-- Visi & Misi -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Visi & Misi
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Visi -->
          <div
            class="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-lg border border-red-200">
            <h3 class="text-2xl font-bold text-red-700 mb-4">Visi</h3>
            <p class="text-gray-700 leading-relaxed">{{ profile.visi }}</p>
          </div>

          <!-- Misi -->
          <div
            class="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-200">
            <h3 class="text-2xl font-bold text-blue-700 mb-4">Misi</h3>
            <ul class="space-y-3 text-gray-700 list-disc pl-5">
              <li v-for="(m, i) in profile.misi" :key="i">{{ m }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Program Keahlian -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Program Keahlian
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="prog in profile.programs"
            :key="prog.id"
            class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div
                class="w-16 h-16 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                <NuxtImg
                  :src="prog.icon"
                  alt="{{ prog.name }}"
                  class="w-10 h-12 text-white " />
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 text-center mb-3">
              {{ prog.name }}
            </h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed">
              {{ prog.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Fasilitas -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Fasilitas Sekolah
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="f in profile.facilities"
            :key="f.id"
            class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200 text-center hover:bg-white hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">{{ f.icon }}</div>
            <h4 class="font-semibold text-gray-800">{{ f.name }}</h4>
          </div>
        </div>
      </div>

      <!-- Keunggulan -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl md:text-4xl font-bold text-red-700">|</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Keunggulan Kami
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="adv in profile.advantages"
            :key="adv.id"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-200 flex items-start gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center">
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-2">{{ adv.title }}</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                {{ adv.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { ProfileData } from '~/types/profile';
import profileDataJson from "~/contents/profilepage.json"

const profile: Ref<ProfileData> = ref(profileDataJson as ProfileData)

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

<style scoped></style>
