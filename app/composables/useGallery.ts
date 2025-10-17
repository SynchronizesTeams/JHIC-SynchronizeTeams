// composables/useGallery.ts
import { onMounted, ref } from 'vue';
import { useApi } from './useApi';
import { useRuntimeConfig } from '#imports';

type GalleryImage = {
  id?: number;
  src: string;
  alt: string;
  title: string;
  category?: string;
};

export const useGallery = () => {
  const api = useApi();
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBase;

  const galleryImages = ref<GalleryImage[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const resolveSrc = (path: any): string => {
    if (typeof path !== 'string' || path.length === 0) {
      return '/penus-icon.webp';
    }
    if (path.startsWith('http')) {
      return path;
    }
    if (path.startsWith('/')) {
      return `${BASE_URL}${path}`;
    }
    return `${BASE_URL}/${path}`;
  };

  const mapImage = (item: any): GalleryImage => {
    const src = resolveSrc(item?.file_path ?? item?.url ?? item?.src);
    const title = item?.title ?? item?.category ?? 'Galeri';
    const alt = item?.alt ?? title;

    return {
      id: item?.id,
      src,
      alt,
      title,
      category: item?.category,
    };
  };

  const loadAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      const resp: any = await api.image.getAll();
      const items: any[] = Array.isArray(resp) ? resp : resp?.data ?? [];
      galleryImages.value = items.map(mapImage);
    } catch (e: any) {
      error.value = e?.message ?? 'Gagal memuat galeri';
    } finally {
      loading.value = false;
    }
  };

  const loadByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;
    try {
      const resp: any = await api.image.getByCategory(category);
      const items: any[] = Array.isArray(resp) ? resp : resp?.data ?? [];
      galleryImages.value = items.map(mapImage);
    } catch (e: any) {
      error.value = e?.message ?? 'Gagal memuat galeri';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadAll();
  });

  return {
    galleryImages,
    loading,
    error,
    loadAll,
    loadByCategory,
  };
};