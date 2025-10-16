<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Mitra Industri
      </h2>

      <div class="relative overflow-hidden">
        <div class="animate-partner-scroll flex space-x-8 py-5">
          <div
            v-for="(partner, index) in [...partners, ...partners, ...partners]"
            :key="index"
            class="flex-shrink-0 w-32 h-20 p-2 bg-white rounded-lg shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105"
            :title="partner.name">
            <NuxtImg
              :src="partner.logoUrl"
              :alt="partner.name"
              class="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = ref([
  {
    name: "Mitra A",
    logoUrl: "",
  },
  {
    name: "Mitra B",
    logoUrl: "",
  },
  {
    name: "Mitra C",
    logoUrl: "",
  },
  {
    name: "Mitra D",
    logoUrl: "",
  },
  {
    name: "Mitra E",
    logoUrl: "",
  },
  {
    name: "Mitra F",
    logoUrl: "",
  },
]);
</script>

<style scoped>
.animate-partner-scroll {
  width: max-content;
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% / 3));
  }
}

.overflow-hidden {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}
</style>
