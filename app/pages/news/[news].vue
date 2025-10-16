<template>
  <div class="text-primary-gray min-h-screen mt-14">
    <div class="max-w-5xl mx-auto px-6 py-16">
      <NuxtLink to="/news" class="text-primary-gray/90 hover:text-primary-gray mb-8 block">
        ← Back to News
      </NuxtLink>

      <h1 class="text-5xl font-bold mb-6 leading-tight">
        {{ article.title }}
      </h1>
      <div class="text-sm text-primary-gray/80 mb-10">
        {{ formatDate(article.date) }} • {{ article.author }}
      </div>

      <div class="aspect-video rounded-2xl overflow-hidden mb-10">
        <img
          :src="article.cover"
          alt="cover"
          class="object-cover w-full h-full"
        />
      </div>

      <div
        class="prose text-primary-gray max-w-none text-lg leading-relaxed"
        v-html="article.content"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { getNews } = useNews();

const article = getNews(route.params.news);

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
