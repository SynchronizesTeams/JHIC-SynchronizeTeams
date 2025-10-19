<template>
  <div class="min-h-screen bg-gradient-to-b from-primary-white via-white/50 to-primary-white">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <p class="text-primary-gray/60">Memuat detail ekstrakurikuler...</p>
    </div>

    <div v-else-if="eskul" class="max-w-2xl mx-auto px-4 py-8">
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg mb-6">
        <div v-if="eskul.image" class="h-40 relative bg-gray-200">
          <NuxtImg
            :src="eskul.image"
            alt="Cover eskul"
            loading="lazy"
            class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-primary-white via-primary-white/50 to-transparent"></div>
        </div>

        <div class="px-6 py-8 text-center">
          <div class="flex justify-center mb-4">
            <div class="relative" :class="eskul.image ? '-mt-24' : ''">
              <div class="w-24 h-24 rounded-full bg-primary-white absolute inset-0"></div>
              <NuxtImg
                :src="eskul.logo"
                loading="lazy"
                :alt="eskul.title"
                class="w-24 h-24 rounded-full border-4 border-primary-white shadow-lg relative z-10 object-cover bg-white" />
            </div>
          </div>

          <h1 class="text-3xl font-bold text-secondary-red mb-2">
            {{ eskul.title }}
          </h1>
          <div
            class="text-primary-gray/80 prose prose-sm max-w-none"
            v-html="eskul.description"></div>
        </div>
      </div>

      <div v-if="eskul.pembina && eskul.pembina.length > 0"
        class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg">
        <div class="px-6 py-4 border-b border-primary-gray/10">
          <h2 class="text-lg font-bold text-primary-gray">Pembina</h2>
        </div>

        <div class="divide-y divide-primary-gray/10">
          <div
            v-for="pembina in eskul.pembina"
            :key="pembina.id"
            class="flex items-center gap-4 px-6 py-4">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gray/10 flex items-center justify-center text-lg font-bold text-secondary-red">
              {{ pembina.full_name[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-primary-gray text-sm">
                {{ pembina.full_name }}
              </h3>
              <p class="text-primary-gray/60 text-xs mt-0.5">
                Pembina Ekstrakurikuler
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 text-primary-gray/60 text-sm">
        <NuxtLink to="/" class="hover:text-secondary-red transition">
          ← Kembali ke halaman utama
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Eskul, EskulApiResponse, Pembina } from '~/types/eskul';

const route = useRoute();
const { eskul: eskulApi } = useApi();
const apiUrl = useRuntimeConfig().public.apiBaseUrl;

// State
const eskul = ref<Eskul | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    isLoading.value = true;
    
    const eskulId = parseInt(route.params.eskul as string);

    if (isNaN(eskulId)) {
      throw createError({ statusCode: 400, statusMessage: 'ID Ekstrakurikuler tidak valid', fatal: true });
    }

    const targetEskulData: EskulApiResponse = await eskulApi.getById(eskulId);

    if (!targetEskulData || !targetEskulData.id) {
      throw createError({ statusCode: 404, statusMessage: 'Ekstrakurikuler tidak ditemukan', fatal: true });
    }

    eskul.value = {
      id: targetEskulData.id,
      title: targetEskulData.name,
      description: targetEskulData.description,
      image: targetEskulData.image ? `${apiUrl}/${targetEskulData.image}` : '',
      logo: 'https://via.placeholder.com/150?text=Logo', 
      pembina: targetEskulData.Pembina && targetEskulData.Pembina.id !== 0 ? [targetEskulData.Pembina] : []
    };

  } catch (error: any) {
    if (!error.fatal) {
      showError({ 
        statusCode: error.statusCode || 500, 
        statusMessage: error.statusMessage || 'Gagal memuat data' 
      });
    }
  } finally {
    isLoading.value = false;
  }
});

// SEO Meta yang reaktif
useHead(computed(() => {
  if (eskul.value) {
    return {
      title: `${eskul.value.title} - Ekstrakurikuler`,
      meta: [
        { name: 'description', content: `Detail mengenai ekstrakurikuler ${eskul.value.title}` }
      ]
    };
  }
  return {
    title: 'Detail Ekstrakurikuler'
  };
}));
</script>