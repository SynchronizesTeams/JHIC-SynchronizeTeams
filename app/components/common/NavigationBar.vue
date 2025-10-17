<template>
  <nav
    :class="[
      'sticky top-3 left-0 right-0 z-50 transition-all duration-300 mb-',
      isScrolled
        ? 'bg-transparent shadow-lg mx-6 rounded-2xl backdrop-blur-xl border border-primary-text/15'
        : 'backdrop-blur-none pt-5 border-none border-primary-text/15',
    ]">

    <!-- BACKDROP LAYER (pake ini biar bisa mix blend mode) -->
    <div
      :class="[
        'pointer-events-none absolute inset-0 -z-10 transition-all duration-300 rounded-2xl',
        isScrolled
          ? 'backdrop-blur-xl bg-white/10 border border-primary-text/15 shadow-lg'
          : 'backdrop-blur-0 bg-transparent border-0 shadow-none'
      ]"
    />

    <div class="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
      <button @click="handleLogoClick" class="flex items-center gap-2 cursor-pointer">
        <nuxt-img src="/images/penus/Logo.png" alt="Logo" class="w-80" />
      </button>

      <div
        class="hidden md:flex items-center gap-8 text-lg font-medium transition-colors"
        :class="[
          isScrolled ? 'text-primary-gray' : 'text-primary-white',
          !isScrolled && 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
        ]">
        <button
          v-for="item in menuItems"
          :key="item.name"
          @click="handleNavClick(item)"
          class="relative group cursor-pointer">
          <!-- TEKS blend ke latar belakang halaman -->
          <span class="transition mix-blend-difference md:mix-blend-normal hover:text-secondary-red">
            {{ item.name }}
          </span>
          <span
            class="absolute left-0 bottom-0 w-0 h-[2px] bg-secondary-red transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>

      <button
        @click="toggleMenu"
        class="md:hidden focus:outline-none transition-colors mix-blend-difference md:mix-blend-normal"
        :class="[
          isScrolled ? 'text-primary-gray' : 'text-primary-white',
          !isScrolled && 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
        ]">
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3">
      <div
        v-if="isMenuOpen"
        class="md:hidden absolute left-4 right-4 top-full shadow-lg rounded-b-2xl px-5 py-4 flex flex-col space-y-4 text-primary-gray font-medium bg-primary-white">
        <button
          v-for="item in menuItems"
          :key="item.name"
          @click="handleNavClick(item)"
          class="hover:text-secondary-red transition text-left">
          {{ item.name }}
        </button>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const menuItems = [
  { name: "Beranda", path: "/", section: "home" },
  { name: "Tentang Kami", path: "/about", section: "about" },
  { name: "Berita", path: "/news", section: "news" },
  { name: "Galeri", path: "/galery", section: "galery" },
  { name: "Forum", path: "/forums", section: null },
  { name: "Portals", path: "/portals", section: null },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const handleLogoClick = () => {
  if (route.path === '/') {
    // Jika di homepage, scroll ke atas
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else {
    // Jika tidak di homepage, navigate ke homepage
    router.push('/')
  }
}

const handleNavClick = (item: { name: string; path: string; section: string | null }) => {
  closeMenu()

  // Jika ada section dan sedang di homepage
  if (item.section && route.path === '/') {
    const element = document.getElementById(item.section)
    if (element) {
      const navHeight = 100 // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      return
    }
  }

  // Jika section tapi tidak di homepage, navigate dulu baru scroll
  if (item.section && route.path !== '/') {
    router.push('/').then(() => {
      // Tunggu sebentar untuk render
      setTimeout(() => {
        const element = document.getElementById(item.section!)
        if (element) {
          const navHeight = 100
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    })
    return
  }

  // Jika tidak ada section, navigate biasa
  router.push(item.path)
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
nav {
  transition: all 0.3s ease-in-out;
}

/* Catatan:
   - Hindari ancestor dengan isolation:isolate/transform/filter/opacity < 1,
     karena bisa memutus efek blend. */
</style>

<style>
/* Global smooth scroll */
html {
  scroll-behavior: smooth;
}
</style>
