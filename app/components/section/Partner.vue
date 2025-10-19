<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Mitra Industri
      </h2>

      <div v-if="isLoading" class="text-center text-gray-500">
        Memuat data mitra...
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        Gagal memuat data mitra.
      </div>

      <div v-else-if="partners.length > 0" class="relative overflow-hidden">
        <div class="animate-partner-scroll flex space-x-8 py-5">
          <div
            v-for="(partner, index) in [...partners, ...partners, ...partners]"
            :key="index"
            class="flex-shrink-0 w-32 h-20 p-2 bg-white rounded-lg shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105"
            :title="partner.name">
            <NuxtImg
              :src="`${apiUrl}/${partner.logo}`"
              :alt="partner.name"
              class="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        Belum ada mitra industri yang ditampilkan.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IndustryPartner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  created_at: string;
}

const { industry: industryApi } = useApi();
const apiUrl = useRuntimeConfig().public.apiBaseUrl;

// State management
const partners = ref<IndustryPartner[]>([]);
const isLoading = ref(true);
const error = ref<any>(null);

const fetchPartners = async () => {
  try {
    isLoading.value = true;
    partners.value = await industryApi.getAll();
  } catch (e) {
    console.error("Gagal mengambil data mitra:", e);
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPartners();
});
</script>

<style scoped>
.animate-partner-scroll {
  width: max-content;
  animation: scroll 40s linear infinite; 
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
