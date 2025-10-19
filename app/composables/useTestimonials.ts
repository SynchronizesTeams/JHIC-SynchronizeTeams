import { onMounted, ref } from "vue";
import { useApi } from "./useApi";
import { useRuntimeConfig } from "#imports";

type Testimonial = {
  id: number;
  name: string;
  position: string;
  photo: string;
  testimonial: string;
  created_at: string;
};

export const useTestimonials = () => {
  const api = useApi();
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBaseUrl.replace('/api', '');

  const testimonials = ref<Testimonial[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      const resp: any = await api.testimonial.getAll();
      const items: Testimonial[] = Array.isArray(resp) ? resp : resp?.data ?? [];
      
      // Transform to include full photo URLs
      testimonials.value = items.map((item) => ({
        ...item,
        photo: item.photo && item.photo !== '' 
          ? (item.photo.startsWith('http') ? item.photo : `${BASE_URL}/${item.photo}`)
          : ''
      }));
      
      console.log('Testimonials loaded:', testimonials.value);
    } catch (e: any) {
      error.value = e?.message ?? "Gagal memuat testimoni";
      console.error('Error loading testimonials:', e);
    } finally {
      loading.value = false;
    }
  };

  const getById = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const resp: any = await api.testimonial.getById(id);
      const item = resp?.data ?? resp;
      
      // Transform photo URL
      if (item.photo && item.photo !== '') {
        item.photo = item.photo.startsWith('http') 
          ? item.photo 
          : `${BASE_URL}/${item.photo}`;
      }
      
      return item;
    } catch (e: any) {
      error.value = e?.message ?? "Gagal memuat testimoni";
      console.error('Error loading testimonial:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadAll();
  });

  return {
    testimonials,
    loading,
    error,
    loadAll,
    getById,
  };
};
