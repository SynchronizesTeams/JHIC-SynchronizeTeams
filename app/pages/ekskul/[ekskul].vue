<template>
  <div
    class="min-h-screen bg-gradient-to-b from-primary-white via-white/50 to-primary-white">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <div
        class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg mb-6">
        <div v-if="ekskul && ekskul.image" class="h-32 relative">
          <NuxtImg
            :src="ekskul.image"
            alt="Cover Ekskul"
            loading="lazy"
            class="w-full h-full object-cover opacity-30" />
        </div>

        <div class="px-6 py-8 text-center">
          <div class="flex justify-center mb-4">
            <div class="relative" :class="ekskul?.image ? '-mt-16' : ''">
              <div
                class="w-24 h-24 rounded-full bg-primary-white absolute inset-0"></div>
              <NuxtImg
                :src="ekskul.logo"
                loading="lazy"
                :alt="ekskul.title"
                class="w-24 h-24 rounded-full border-4 border-primary-white shadow-lg relative z-10 object-cover" />
            </div>
          </div>

          <h1 class="text-2xl font-bold text-secondary-red mb-1">
            {{ ekskul.title }}
          </h1>
          <div
            class="text-primary-gray/60 text-sm mb-4 prose prose-sm max-w-none"
            v-html="ekskul.description"></div>
        </div>
      </div>

      <div
        class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg">
        <div class="px-6 py-4 border-b border-primary-gray/10">
          <h2 class="text-lg font-bold text-primary-gray">Tautan Ekskul</h2>
        </div>

        <div class="divide-y divide-primary-gray/10">
          <div
            v-for="(link, i) in ekskul.links"
            :key="link.url"
            class="flex items-center gap-4 px-6 py-4 hover:bg-primary-gray/5 transition-colors group">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gray/10 flex items-center justify-center text-lg font-bold text-secondary-red">
              {{ link.label[0] }}
            </div>

            <NuxtLink
              :to="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-0">
              <h3
                class="font-semibold text-primary-gray text-sm group-hover:text-secondary-red transition-colors">
                {{ link.label }}
              </h3>
              <p class="text-primary-gray/60 text-xs mt-0.5 truncate">
                {{ link.desc }}
              </p>
            </NuxtLink>

            <div class="flex items-center gap-2 flex-shrink-0">
              <NuxtLink
                :to="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 hover:bg-primary-gray/10 rounded-lg transition-colors">
                <svg
                  class="w-5 h-5 text-primary-gray/40 group-hover:text-secondary-red transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 text-primary-gray/60 text-xs">
        <NuxtLink to="/" class="hover:text-secondary-red transition"
          >← Kembali ke halaman utama</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import extracurricularsData from '~/contents/extracurriculars.json';
import extracurricularLinks from '~/contents/extracurricular-links.json';

interface EkskulLink {
  label: string;
  url: string;
  desc: string;
}

interface EkskulItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  links: EkskulLink[];
}

const route = useRoute();
const ekskulList: EkskulItem[] = (extracurricularsData as Array<Omit<EkskulItem, 'links'>>).map((item) => ({
  ...item,
  links: (extracurricularLinks as Record<string, EkskulLink[]>)[item.slug] ?? []
}));

const ekskul = computed<EkskulItem>(() => {
  const slug = route.params.ekskul as string;
  return (ekskulList.find((e) => e.slug === slug) ?? ekskulList[0])!;
});
</script>
