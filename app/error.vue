<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 bg-gradient-to-br from-primary-white to-white">
    <div class="absolute inset-0 flex items-center justify-center opacity-5">
      <h1 class="text-[20vw] font-black text-primary-gray">
        {{ error?.statusCode || '404' }}
      </h1>
    </div>

    <div class="relative z-10 text-center max-w-2xl mx-auto">
      <div class="mb-8">
        <img
          src="/images/penus/main-logo.png"
          alt="SMK PLUS PELITA NUSANTARA"
          class="w-48 h-24 mx-auto object-contain"
        />
      </div>

      <div class="mb-8">
        <h2 class="text-4xl md:text-6xl font-bold text-primary-gray mb-4">
          <template v-if="error?.statusCode === 404">
            Oops! Halaman <span class="text-secondary-red"> Hilang</span>
          </template>
          <template v-else-if="error?.statusCode === 500">
            Oops! Terjadi <span class="text-secondary-red"> Kesalahan Server</span>
          </template>
          <template v-else-if="error?.statusCode === 403">
            Oops! <span class="text-secondary-red"> Akses Ditolak</span>
          </template>
          <template v-else>
            Oops! Terjadi <span class="text-secondary-red"> Kesalahan</span>
          </template>
        </h2>
        <p class="text-lg md:text-xl text-primary-gray/80 mb-6">
          {{ getErrorMessage() }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goHome"
          class="px-8 py-3 bg-primary-white text-primary-gray font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          Kembali ke Beranda
        </button>
        <button
          @click="goBack"
          class="px-8 py-3 bg-transparent border-2 border-primary-gray/20 text-primary-gray font-medium rounded-xl hover:bg-primary-gray/10 transition-all duration-300 cursor-pointer"
        >
          Kembali ke Halaman Sebelumnya
        </button>
      </div>

      <div class="mt-12">
        <p class="text-sm text-primary-gray/60 mb-4">Mungkin Anda mencari:</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="item in menuItems"
            :key="item.name"
            @click="navigateToPage(item.path)"
            class="px-4 py-2 text-sm text-primary-gray hover:text-secondary-red transition-colors duration-200 cursor-pointer border border-primary-gray/20 rounded-xl"
          >
            {{ item.name }}
          </button>
        </div>
      </div>

      <div v-if="isDev && error" class="mt-8 text-left">
        <details class="text-xs text-primary-gray/60 bg-white/50 p-4 rounded-lg">
          <summary class="cursor-pointer font-semibold">Error Details (Dev Only)</summary>
          <pre class="mt-2 overflow-x-auto">{{ error }}</pre>
        </details>
      </div>
    </div>

    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="i in 6"
        :key="i"
        :class="floatingElementClass(i)"
        class="absolute w-20 h-20 bg-gradient-to-br from-secondary-red/10 to-primary-gray/10 rounded-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import type { NuxtError } from '#app'

definePageMeta({
  layout: false
})

const props = defineProps({
  error: Object as () => NuxtError
})

useHead({
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  title: `${props.error?.statusCode || '404'} - Kesalahan | SMK PLUS PELITA NUSANTARA`,
  meta: [
    {
      name: "description",
      content: "Halaman error SMK PLUS PELITA NUSANTARA"
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ],
  link: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap',
      rel: 'stylesheet'
    }
  ]
})

const isDev = process.dev

const menuItems = [
  { name: "Beranda", path: "/" },
  { name: "Tentang Kami", path: "/about" },
  { name: "Visi Kami", path: "/projects" },
  { name: "Galeri", path: "/contact" },
];

const goBack = () => {
  clearError();
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo("/");
  }
};

const goHome = () => {
  clearError();
  window.location.href = "/";
};

const navigateToPage = (path: string) => {
  clearError();
  navigateTo(path);
};

const getErrorMessage = () => {
  const statusCode = props.error?.statusCode;
  switch (statusCode) {
    case 404:
      return "Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.";
    case 500:
      return "Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.";
    case 403:
      return "Maaf, Anda tidak memiliki akses ke halaman ini.";
    default:
      return props.error?.statusMessage || "Maaf, terjadi kesalahan yang tidak terduga.";
  }
};

const floatingElementClass = (index: number) => {
  const positions = [
    "top-10 left-10",
    "top-20 right-20",
    "bottom-20 left-1/4",
    "bottom-10 right-1/3",
    "top-1/2 left-5",
    "top-1/3 right-10"
  ];
  return positions[index - 1];
};

onMounted(() => {
  gsap.set(".relative.z-10 > div", { opacity: 0, y: 30 });
  gsap.set(".absolute.w-20", { scale: 0, opacity: 0 });

  gsap.timeline()
    .to(".relative.z-10 > div:first-child", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".relative.z-10 > div:nth-child(2)", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .to(".relative.z-10 > div:nth-child(3)", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .to(".relative.z-10 > div:nth-child(4)", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .to(".relative.z-10 > div:nth-child(5)", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");

  const floatingElements = document.querySelectorAll(".absolute.w-20");
  floatingElements.forEach((element, index) => {
    gsap.to(element, {
      scale: 1,
      opacity: 0.6,
      duration: 1.5,
      delay: 0.2 + (index * 0.1),
      ease: "elastic.out(1, 0.5)"
    });

    gsap.to(element, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: "random(0, 2)"
    });
  });
});

</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
