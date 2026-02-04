<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-white to-white">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <p class="text-primary-gray/60">Memuat profil guru...</p>
    </div>

    <div v-else-if="teacher" class="max-w-4xl mx-auto px-4 py-8">
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-primary-gray/60 hover:text-secondary-red transition-colors mb-6">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-medium">Kembali</span>
      </button>

      <div
        class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow mb-6">
        <div
          class="h-32 bg-gradient-to-r from-secondary-red/20 to-secondary-red/10">
          <img
            loading="lazy"
            src="/images/penus/Gedung_Utama.webp"
            class="w-full h-full object-cover" />
        </div>

        <div class="px-6 py-8 text-center">
          <div class="flex justify-center mb-4">
            <div class="relative -mt-16">
              <div
                class="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-red/20 to-primary-gray/10 absolute inset-0"></div>
              <NuxtImg
                v-if="teacher.photo"
                :src="`${apiUrl}/${teacher.photo}`"
                :alt="teacher.full_name"
                class="w-24 h-24 rounded-full border-4 border-primary-white shadow-lg relative z-10 object-cover" />
              <div
                v-else
                class="w-24 h-24 rounded-full border-4 border-primary-white shadow-lg relative z-10 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg
                  class="w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 class="text-2xl font-bold text-primary-gray mb-1">
            {{ teacher.full_name }}
          </h1>
          <p class="text-secondary-red text-sm mb-2">
            {{ teacher.position }} {{ teacher.subject }}
          </p>

          <div
            class="flex flex-col sm:flex-row gap-2 justify-center items-center text-xs text-primary-gray/60 mb-4">
            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>NIG: {{ teacher.nig }}</span>
            </div>
            <span class="hidden sm:inline">•</span>
            <div class="flex items-center gap-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>@{{ teacher.user.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div
          class="px-6 py-4 border-b border-primary-gray/10 bg-gradient-to-r from-secondary-red/5 to-transparent">
          <h2 class="text-lg font-bold text-primary-gray">Tentang</h2>
        </div>

        <div class="px-6 py-6">
          <p class="text-primary-gray/80 leading-relaxed" v-html="teacher.description">
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <div
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red/10 to-secondary-red/5 border border-secondary-red/20 rounded-full">
          <svg
            class="w-5 h-5 text-secondary-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-sm font-semibold text-secondary-red">
            Mengajar: {{ teacher.subject }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Teacher } from "~/types/teacher";

const route = useRoute();
const { teacher: teacherApi } = useApi();
const apiUrl = useRuntimeConfig().public.apiBaseUrl;

// State
const teacher = ref<Teacher | null>(null);
const isLoading = ref(true);
const teacherId = computed(() => parseInt(route.params.id as string));

onMounted(async () => {
  if (isNaN(teacherId.value)) {
    return showError({ statusCode: 400, statusMessage: "ID Guru tidak valid" });
  }

  try {
    isLoading.value = true;
    const data = await teacherApi.getById(teacherId.value);

    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: "Guru tidak ditemukan",
        fatal: true,
      });
    }

    teacher.value = data;
  } catch (error: any) {
    if (!error.fatal) {
      showError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || "Gagal memuat data guru",
      });
    }
  } finally {
    isLoading.value = false;
  }
});

useHead(
  computed(() => {
    if (teacher.value) {
      return {
        title: `${teacher.value.full_name} - Guru ${teacher.value.subject}`,
        meta: [
          {
            name: "description",
            content:
              teacher.value.description ||
              `Profil lengkap ${teacher.value.full_name}, seorang guru ${teacher.value.subject}.`,
          },
        ],
      };
    }
    return {
      title: "Profil Guru",
      meta: [{ name: "description", content: "Melihat profil detail guru." }],
    };
  })
);
</script>
