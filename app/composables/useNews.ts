import type { News } from '../types/news';
import newsData from '~/contents/news.json';

export const useNews = () => {
  const newsList = ref<News[]>(newsData as News[]);

  const getNews = (slug: string): News | undefined => newsList.value.find((n) => n.slug === slug);

  return { newsList, getNews };
};
