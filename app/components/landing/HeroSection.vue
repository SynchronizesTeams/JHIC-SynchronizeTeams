<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <section ref="heroSection" class="md:h-[260vh] relative">
      <div
        ref="heroContent"
        class="h-screen sticky top-0 flex flex-col md:flex-row items-center justify-center overflow-hidden text-center md:text-left"
      >
        <h1
          ref="leftText"
          class="md:absolute md:bottom-20 md:left-10 text-4xl md:text-7xl font-bold text-black"
        >
          PELITA NUSANTARA
        </h1>
        <h1
          ref="rightText"
          class="md:absolute md:top-20 md:right-10 text-4xl md:text-7xl font-bold text-black"
        >
          SMK <span class="text-secondary-red">PLUS</span>
        </h1>

        <div
          ref="logo"
          class="w-40 h-20 md:w-64 md:h-28 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden mx-4 my-6 md:my-0"
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
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
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
      x: "20vw",
      y: "-20vh",
      duration: 2,
      ease: "power2.out",
    })
      .to(
        rightText.value,
        {
          x: "-20vw",
          y: "20vh",
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
      )
      .to(
        heroContent.value,
        {
          yPercent: -100,
          duration: 2,
          ease: "power2.inOut",
        },
        "+=0.5"
      );

    return () => tl.kill();
  });

  mm.add("(max-width: 767px)", () => {
    gsap.killTweensOf([leftText.value, rightText.value, logo.value, heroContent.value]);
    gsap.set([leftText.value, rightText.value, logo.value, heroContent.value], { clearProps: "all" });
  });
});
</script>

<style scoped>
html,
body {
  scroll-behavior: smooth;
}
</style>
