// types/api.ts
interface News {
  id?: number;
  title: string;
  slug?: string;
  thumbnail?: File | string;
  content: string;
  author_id: number;
  excerpt: string;
  status: string;
  tags: string;
  view_count?: number;
}

interface AuthCredentials {
  name?: string;
  email: string;
  password: string;
}

interface ImageUpload {
  category: string;
  file_path: File;
}

interface UserLink {
  title: string;
  url: string;
  icon?: File;
}

interface ForumSection {
  name: string;
  slug?: string;
  description: string;
  icon?: File;
}

interface ForumPost {
  section_id: number;
  title: string;
  content: string;
  image?: File;
}

interface ForumReply {
  post_id: number;
  content: string;
}

interface Event {
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer: string;
  image?: File;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBase;
  
  // Helper function untuk mendapatkan headers dengan token (hanya jika token tersedia)
  // Return type dibuat eksplisit agar kompatibel dengan HeadersInit
  const getAuthHeaders = (): Record<string, string> | undefined => {
    const auth = useAuth();
    const token = (auth.token.value || '').trim();
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  };

  // Helper function untuk membuat FormData dari object
  const createFormData = (data: any): FormData => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };

  return {
    news: {
      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/news/getAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/news/get/${id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },
    },

    // Auth API
    auth: {
      register: async (credentials: AuthCredentials) => {
        return await $fetch(`${BASE_URL}/api/v1/auth/register`, {
          method: 'POST',
          body: credentials
        });
      },

      login: async (credentials: AuthCredentials) => {
        return await $fetch(`${BASE_URL}/login`, {
          method: 'POST',
          body: credentials
        });
      },

      profile: async () => {
        return await $fetch(`${BASE_URL}/api/v1/auth/profile`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Image API
    image: {
      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/public/image/showAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getByCategory: async (category: string) => {
        return await $fetch(`${BASE_URL}/api/v1/public/image/show?category=${category}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // User Links API
    userLinks: {
      create: async (linkData: UserLink) => {
        const formData = createFormData(linkData);
        return await $fetch(`${BASE_URL}/api/v1/user-links/add`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, linkData: UserLink) => {
        const formData = createFormData(linkData);
        return await $fetch(`${BASE_URL}/api/v1/user-links/edit/${id}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/user-links/delete/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getSelf: async () => {
        return await $fetch(`${BASE_URL}/api/v1/user-links/show/self`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Forum Section API
    forumSection: {
      create: async (sectionData: ForumSection) => {
        const formData = createFormData(sectionData);
        return await $fetch(`${BASE_URL}/api/v1/forum-section/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, sectionData: ForumSection) => {
        const formData = createFormData(sectionData);
        return await $fetch(`${BASE_URL}/api/v1/forum-section/edit/${id}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/forum-section/showAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      delete: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-section/delete/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    },

    // Forum Post API
    forumPost: {
      create: async (postData: ForumPost) => {
        const formData = createFormData(postData);
        return await $fetch(`${BASE_URL}/api/v1/forum-post/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, postData: ForumPost) => {
        const formData = createFormData(postData);
        return await $fetch(`${BASE_URL}/api/v1/forum-post/edit/${id}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/delete/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/showAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/show/${id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getWithReplies: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/post-replies/${id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      changeStatus: async (statusData: { status: string }) => {
        const formData = createFormData(statusData);
        return await $fetch(`${BASE_URL}/api/v1/forum-post/changeStatus`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      upvote: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/upvote/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders()
        });
      },

      downvote: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/downvote/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders()
        });
      }
    },

    // Forum Reply API
    forumReply: {
      create: async (postId: number, replyData: ForumReply) => {
        const formData = createFormData(replyData);
        return await $fetch(`${BASE_URL}/api/v1/forum-post/reply/${postId}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getNested: async (postId: number) => {
        return await $fetch(`${BASE_URL}/api/v1/forum-post/replies/${postId}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Event API
    event: {
      create: async (eventData: Event) => {
        const formData = createFormData(eventData);
        return await $fetch(`${BASE_URL}/api/v1/event/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      }
    }
  };
};