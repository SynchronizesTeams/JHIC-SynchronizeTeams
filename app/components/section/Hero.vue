<template>
  <div class="relative w-full overflow-hidden rounded-2xl">
    <section ref="heroSection" class="relative">
      <div
        ref="heroContent"
        class="relative w-full aspect-video">
        <div
          ref="background"
          class="absolute inset-0 w-full h-full transform scale-110 transition-transform duration-700 ease-out"
          :style="{ transform: `scale(${1 + parallaxValue * 0.1})` }">
          <!-- Video Background -->
          <video
            ref="videoRef"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            class="w-full h-full object-cover object-center"
          >
            <source src="/videos/header-content-small.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
const videoRef = ref<HTMLVideoElement | null>(null);

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

const playVideo = () => {
  if (videoRef.value) {
    videoRef.value.play().catch((error) => {
      console.log('Autoplay prevented, will play on user interaction:', error);
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  handleResize();
  animateOnLoad();

  // Force play video after mount
  setTimeout(playVideo, 100);
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

.hero-video-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
