<template>
  <div class="text-primary-gray min-h-screen ">
    <div class="max-w-5xl mx-auto px-6 py-16">
      <!-- Breadcrumb -->
      <nav class="flex items-center text-sm mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <NuxtLink to="/" class="text-primary-gray/60 hover:text-primary-gray transition-colors">
              Home
            </NuxtLink>
          </li>
          <li>
            <svg class="w-4 h-4 text-primary-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </li>
          <li>
            <NuxtLink to="/news" class="text-primary-gray/60 hover:text-primary-gray transition-colors">
              News
            </NuxtLink>
          </li>
          <li>
            <svg class="w-4 h-4 text-primary-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </li>
          <li class="text-primary-gray font-medium truncate max-w-xs" :title="article.title">
            {{ article.title }}
          </li>
        </ol>
      </nav>

      <NuxtLink
        to="/news"
        class="text-primary-gray/90 hover:text-primary-gray mb-8 block">
        ← Back to News
      </NuxtLink>

      <h1 class="text-5xl font-bold mb-6 leading-tight">
        {{ article.title }}
      </h1>
      <div class="text-sm text-primary-gray/80 mb-10">
        {{ formatDate(article.date) }} • {{ article.author }}
      </div>

      <div class="aspect-video rounded-2xl overflow-hidden mb-10">
        <NuxtImg
          :src="article?.cover"
          alt="cover"
          class="object-cover w-full h-full" />
      </div>

      <div
        class="prose text-primary-gray max-w-none text-lg leading-relaxed"
        v-html="article?.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~/types/news';

const route = useRoute();
const { newsList, mapNewsItem, load } = useNews();
const api = useApi();
const news = ref<News | undefined>();

const article = ref<News>({
  id: 0,
  title: "Memuat...",
  slug: "",
  excerpt: "",
  date: new Date().toISOString(),
  author: "Admin",
  cover: "/penus-icon.webp",
  content: "",
});

const fetchDetail = async () => {
  if (!newsList.value.length) {
    await load();
  }

  const fromList = newsList.value.find(
    n => n.slug === route.params.news
  );

  if (!fromList?.id) return;

  const resp: any = await api.news.getById(fromList.id);

  const item = Array.isArray(resp) ? resp[0] : resp;
  if (item) {
    article.value = mapNewsItem(item); // 🔥 INI KUNCI
  }
};

watchEffect(() => {
  console.log("ARTICLE:", article.value);
});


onMounted(async () => {
  await fetchDetail();
  if (!newsList.value.length) {
    await load();
  }
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<style scoped>
@reference "../../assets/css/main.css";
</style>
