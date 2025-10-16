<template>
  <nav
    :class="[
      'fixed top-3 left-0 right-0 z-50 transition-all duration-300 ',
      isScrolled
        ? 'bg-transparent shadow-lg mx-6 rounded-2xl backdrop-blur-xl border border-primary-text/15'
        : 'backdrop-blur-none mt-5 border-none border-primary-text/15',
    ]">
    <div class="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <nuxt-img src="/images/penus/Logo.png" alt="Logo" class="w-80" />
      </NuxtLink>

      <div
        class="hidden md:flex items-center gap-8 text-lg font-medium text-primary-gray">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="relative group">
          <span class="hover:text-secondary-red transition">{{
            item.name
          }}</span>
          <span
            class="absolute left-0 bottom-0 w-0 h-[2px] bg-secondary-red transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
      </div>

      <button
        @click="toggleMenu"
        class="md:hidden text-primary-gray focus:outline-none">
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
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          @click="closeMenu"
          class="hover:text-secondary-red transition">
          {{ item.name }}
        </NuxtLink>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts" setup>
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const menuItems = [
  { name: "Beranda", path: "/" },
  { name: "Forum", path: "/forums" },
  { name: "Tentang Kami", path: "/about" },
  { name: "Berita", path: "/news" },
  { name: "Galeri", path: "/galery" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
nav {
  transition: all 0.3s ease-in-out;
}
</style>
