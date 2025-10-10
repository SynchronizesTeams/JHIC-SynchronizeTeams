<template>
  <nav
    :class="[
      'flex items-center w-full justify-between px-5 py-3 sticky top-3 z-50 transition-all duration-200',
      isScrolled ? 'bg-primary-white shadow-lg rounded-2xl' : 'bg-transparent',
    ]"
  >
    <nuxt-img class="w-80" src="/images/penus/Logo.png" />

    <div class="relative">
      <button
        @click="toggleMenu"
        class="bg-button-gray text-primary-text px-5 py-2 font-space-grotesk rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        {{ isMenuOpen ? 'X' : 'Menu' }}
      </button>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="absolute w-96 right-0 mt-8 bg-primary-white border border-gray-200 rounded-xl shadow-2xl py-2 z-50"
        >
          <NuxtLink
            to="/"
            class="block px-7 py-6 text-black text-4xl font-semibold relative group"
            @click="closeMenu"
          >
            <p class="hover:text-secondary-red">Beranda</p>
            <div
              class="h-0.5 w-0 bg-secondary-red transition-all duration-300 group-hover:w-full"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="block px-7 py-6 text-black text-4xl font-semibold relative group"
            @click="closeMenu"
          >
          <p class="hover:text-secondary-red">
            Tentang Kami
          </p>
            <div
              class="h-0.5 w-0 bg-secondary-red transition-all duration-300 group-hover:w-full"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/projects"
            class="block px-7 py-6 text-black text-4xl font-semibold relative group"
            @click="closeMenu"
          >
            <p class="hover:text-secondary-red">Visi Kami</p>
            <div
              class="h-0.5 w-0 bg-secondary-red transition-all duration-300 group-hover:w-full"
            ></div>
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="block px-7 py-6 text-black text-4xl font-semibold relative group"
            @click="closeMenu"
          >
            <p class="hover:text-secondary-red">Galeri</p>
            <p
              class="h-0.5 w-0 bg-secondary-red transition-all duration-300 group-hover:w-full"
            ></p>
          </NuxtLink>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest("nav")) {
    isMenuOpen.value = false;
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", handleClickOutside);
});
</script>