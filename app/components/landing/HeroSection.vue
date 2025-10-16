<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <section
      ref="heroSection"
      class="relative min-h-screen flex items-center justify-center">
      <div class="absolute inset-0 z-0 overflow-hidden rounded-xl ">
        <div
          ref="background"
          class="w-full h-full transform scale-110 transition-transform duration-700 ease-out"
          :style="{ transform: `scale(${1 + parallaxValue * 0.1})` }">
          <img
            src="/videoplaceholder.png"
            alt="Hero Background"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const parallaxValue = ref(0);
const contentOpacity = ref(1);
const contentOffset = ref(0);
const logoScale = ref(1);

const heroSection = ref(null);
const background = ref(null);

const handleScroll = () => {
  const scrollY = window.scrollY;

  parallaxValue.value = Math.min(scrollY / 500, 1);

  contentOpacity.value = 1 - Math.min(scrollY / 300, 1);
  contentOffset.value = Math.min(scrollY / 2, 100);
  logoScale.value = 1 - Math.min(scrollY / 1000, 0.2);
};

const animateOnLoad = () => {
  contentOpacity.value = 0;
  contentOffset.value = 30;

  setTimeout(() => {
    contentOpacity.value = 1;
    contentOffset.value = 0;
  }, 100);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  animateOnLoad();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

html,
body {
  scroll-behavior: smooth;
}
</style>