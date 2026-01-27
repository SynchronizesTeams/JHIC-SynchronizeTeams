import type { News } from "../types/news";

export const useNews = () => {
  const api = useApi();
  const newsList = ref<News[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBaseUrl;

  const resolveSrc = (path: string) => {
    if (!path) return "/penus-icon.webp";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return `${BASE_URL}${path}`;
    return `${BASE_URL}/${path}`;
  };

  const mapNewsItem = (item: any): News => {
    const title = item?.title ?? "Tanpa Judul";
    const slug =
      item?.slug ??
      String(title)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
        .slice(0, 100);

    const cover = resolveSrc(item?.cover ?? item?.thumbnail ?? item?.image);
    const date = item?.created_at ?? item?.date ?? new Date().toISOString();
    const rawContent =
      typeof item?.content === "string" ? item.content : "Belum ada konten.";

    const excerpt =
      item?.excerpt ?? rawContent.replace(/<[^>]*>/g, "").slice(0, 160);

    const author =
      typeof item?.author === "object"
        ? item.author?.name ?? "Admin"
        : item?.author ?? "Admin";

    return {
      id: item?.id ?? 0,
      slug,
      title,
      excerpt,
      cover,
      date,
      content: rawContent,
      author,
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
      error.value = e?.message ?? "Gagal memuat berita";
    } finally {
      loading.value = false;
    }
  };

  const getNews = (slug: string): News | undefined =>
    newsList.value.find((n) => n.slug === slug);
  
  onMounted(() => {
    load();
  });

  return { newsList, getNews, mapNewsItem, load, loading, error };
};
