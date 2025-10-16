<template>
  <div class="relative w-full min-h-fit overflow-hidden rounded-2xl">
    <section ref="heroSection" class="relative">
      <div
        ref="heroContent"
        class="min-h-fit flex flex-col items-center justify-center">
        <div
          ref="background"
          class="w-full transform scale-110 transition-transform duration-700 ease-out"
          :style="{ transform: `scale(${1 + parallaxValue * 0.1})` }">
          <NuxtImg
            src="/videoplaceholder.png"
            alt="Hero Background"
            class="w-full h-full object-cover object-center" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const parallaxValue = ref(0);
const contentOpacity = ref(1);
const contentOffset = ref(0);
const logoScale = ref(1);
const isPortrait = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  parallaxValue.value = Math.min(scrollY / 500, 1);
  contentOpacity.value = 1 - Math.min(scrollY / 300, 1);
  contentOffset.value = Math.min(scrollY / 2, 100);
  logoScale.value = 1 - Math.min(scrollY / 1000, 0.2);
};

const handleResize = () => {
  isPortrait.value = window.innerHeight > window.innerWidth * 1.2;
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
  window.addEventListener("resize", handleResize);
  handleResize();
  animateOnLoad();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
html,
body {
  scroll-behavior: smooth;
}
</style>
