<template>
  <nav
    :class="[
      'flex items-center w-full justify-between px-5 py-3 sticky top-3 z-50 transition-all duration-200',
      isScrolled ? 'bg-primary-white shadow-lg rounded-2xl' : 'bg-transparent',
    ]">
    <nuxt-img class="w-80" src="/images/penus/Logo.png" />
    <button
      class="bg-button-gray text-primary-text px-5 py-2 font-space-grotesk rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
      Menu
    </button>
  </nav>
</template>

<script lang="ts" setup>
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
