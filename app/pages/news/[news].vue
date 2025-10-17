<template>
  <div class="text-primary-gray min-h-screen mt-14">
    <div class="max-w-5xl mx-auto px-6 py-16">
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
          :src="article.cover"
          alt="cover"
          class="object-cover w-full h-full" />
      </div>

      <div
        class="prose text-primary-gray max-w-none text-lg leading-relaxed"
        v-html="article.content" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { newsList, load, loading } = useNews();

// Resolve article reactively from API-backed list, fallback placeholder while loading
const article = computed(() => {
  return newsList.value.find((n) => n.slug === route.params.news) || {
    title: "Memuat...",
    date: new Date().toISOString(),
    author: "Admin",
    cover: "/penus-icon.webp",
    content: "",
  };
});

// Ensure list is loaded when navigating directly to detail page
onMounted(() => {
  if (!newsList.value.length) {
    load();
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
