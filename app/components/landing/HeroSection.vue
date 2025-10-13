<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <section ref="heroSection" class="h-[260vh] relative">
      <div
        ref="heroContent"
        class="h-screen sticky top-0 flex items-center justify-center overflow-hidden"
      >
        <h1
          ref="leftText"
          class="absolute left-10 text-5xl font-bold text-black"
        >
          SMK PLUS
        </h1>

        <h1
          ref="rightText"
          class="absolute right-10 text-5xl font-bold text-black"
        >
          PELITA NUSANTARA
        </h1>

        <div
          ref="logo"
          class="w-64 h-28 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
        >
          <img
            src="/images/penus/Logo.png"
            alt="Logo"
            class="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSection = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLElement | null>(null);
const leftText = ref<HTMLElement | null>(null);
const rightText = ref<HTMLElement | null>(null);
const logo = ref<HTMLElement | null>(null);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: heroContent.value,
    },
  });

  tl.to(leftText.value, {
    x: "30vw",
    duration: 2,
    ease: "power2.out",
  })
    .to(
      rightText.value,
      {
        x: "-30vw",
        duration: 2,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      logo.value,
      {
        scale: 6,
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );

  tl.to(
    heroContent.value,
    {
      yPercent: -100,
      duration: 2,
      ease: "power2.inOut",
    },
    "+=0.5"
  );

  tl.to([leftText.value, rightText.value, logo.value], {
    opacity: 0,
    duration: 1,
  });
});
</script>

<style scoped>
html,
body {
  scroll-behavior: smooth;
}
</style>
