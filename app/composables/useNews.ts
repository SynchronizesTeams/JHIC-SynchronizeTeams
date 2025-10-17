import type { News } from '../types/news';
import newsData from '~/contents/news.json';

export const useNews = () => {
  const api = useApi();
  const newsList = ref<News[]>(newsData as News[]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const mapNewsItem = (item: any): News => {
    const title = item?.title ?? 'Tanpa Judul';
    const slug =
      item?.slug ??
      String(title)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .slice(0, 100);
    const cover = item?.cover ?? item?.thumbnail ?? item?.image ?? '/penus-icon.webp';
    const date = item?.date ?? item?.created_at ?? new Date().toISOString();
    const author = item?.author ?? item?.author_name ?? 'Admin';
    const rawContent = typeof item?.content === 'string' ? item.content : '';
    const excerpt =
      item?.excerpt ??
      rawContent
        .replace(/<[^>]*>/g, '')
        .slice(0, 160);

    return {
      slug,
      title,
      excerpt,
      cover,
      date,
      author,
      content: rawContent,
    } as News;
  };

  const load = async () => {
    loading.value = true;
    error.value = null;
    try {
      const resp: any = await api.news.getAll();
      const items: any[] = Array.isArray(resp) ? resp : resp?.data ?? [];
      const mapped = items.map(mapNewsItem);
      if (mapped.length > 0) {
        newsList.value = mapped;
      }
    } catch (e: any) {
      error.value = e?.message ?? 'Gagal memuat berita';
    } finally {
      loading.value = false;
    }
  };

  const getNews = (slug: string): News | undefined =>
    newsList.value.find((n) => n.slug === slug);

  // Refresh dari API, gunakan data lokal sebagai fallback awal
  onMounted(() => {
    load();
  });

  return { newsList, getNews, load, loading, error };
};
