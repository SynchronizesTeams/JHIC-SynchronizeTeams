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

interface UserProfile {
  name?: string;
  no_induk?: string;
  role?: string;
  phone?: string;
  alamat?: string;
  tahun_ajaran_mulai?: string;
  jabatan?: string;
  email?: string;
  password?: string;
  photo_url?: File;
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

interface Portal {
  title: string;
  url: string;
  order?: number;
  is_active?: boolean;
  icon?: File;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBase;
  
  // Helper function untuk mendapatkan headers dengan token (hanya jika token tersedia)
  // Return type dibuat eksplisit agar kompatibel dengan HeadersInit
  const getAuthHeaders = (): Record<string, string> => {
    const auth = useAuth();
    const token = (auth.token.value || '').trim();
    return token ? { Authorization: `Bearer ${token}` } : {};
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
        return await $fetch(`${BASE_URL}/api/v1/public/news/getAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/public/news/get/${id}`, {
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
        return await $fetch(`${BASE_URL}/api/v1/auth/login`, {
          method: 'POST',
          body: credentials
        });
      },

      editProfile: async (profileData: UserProfile) => {
        const formData = createFormData(profileData);
        return await $fetch(`${BASE_URL}/api/v1/auth/edit`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
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
        try {
          // Always use FormData as backend expects it
          const formData = new FormData();
          formData.append('title', linkData.title);
          formData.append('url', linkData.url);
          
          // Only append icon if it's a File
          if (linkData.icon instanceof File) {
            formData.append('icon', linkData.icon);
          }
          
          const headers = getAuthHeaders();
          
          console.log('Creating user link:', {
            title: linkData.title,
            url: linkData.url,
            hasIcon: linkData.icon instanceof File
          });
          console.log('API URL:', `${BASE_URL}/api/v1/user-links/add`);
          console.log('Auth token:', headers.Authorization ? 'Present' : 'Missing');
          
          return await $fetch(`${BASE_URL}/api/v1/user-links/add`, {
            method: 'POST',
            headers,
            body: formData
          });
        } catch (error: any) {
          console.error('API Error creating user link:', error);
          console.error('Error response:', error.data);
          console.error('Error status:', error.status);
          throw error;
        }
      },

      update: async (id: number, linkData: UserLink) => {
        try {
          // Always use FormData as backend expects it
          const formData = new FormData();
          formData.append('title', linkData.title);
          formData.append('url', linkData.url);
          
          // Only append icon if it's a File
          if (linkData.icon instanceof File) {
            formData.append('icon', linkData.icon);
          }
          
          const headers = getAuthHeaders();
          
          console.log('Updating user link:', {
            id,
            title: linkData.title,
            url: linkData.url,
            hasIcon: linkData.icon instanceof File
          });
          
          return await $fetch(`${BASE_URL}/api/v1/user-links/edit/${id}`, {
            method: 'POST',
            headers,
            body: formData
          });
        } catch (error: any) {
          console.error('API Error updating user link:', error);
          throw error;
        }
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
      },

      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/event/showAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/event/show/${id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      update: async (id: number, eventData: Event) => {
        const formData = createFormData(eventData);
        return await $fetch(`${BASE_URL}/api/v1/event/edit/${id}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/event/delete/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getByCategory: async (category: string) => {
        return await $fetch(`${BASE_URL}/api/v1/event/showByCategory?category=${category}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Guest Book API
    guestBook: {
      create: async (guestBookData: {
        title: string;
        instance_name: string;
        contact_person: string;
        email: string;
        phone: string;
        request_date: string;
        description: string;
      }) => {
        const formData = createFormData(guestBookData);
        return await $fetch(`${BASE_URL}/api/v1/guest-book/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/guest-book/showAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/guest-book/show/${id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      updateStatus: async (id: number, status: string) => {
        const formData = createFormData({ status });
        return await $fetch(`${BASE_URL}/api/v1/guest-book/updateStatus/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: formData
        });
      }
    },

    // Portal API (School Portals, different from user links)
    portal: {
      create: async (portalData: Portal) => {
        const formData = createFormData(portalData);
        return await $fetch(`${BASE_URL}/api/v1/portal/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, portalData: Portal) => {
        const formData = createFormData(portalData);
        return await $fetch(`${BASE_URL}/api/v1/portal/edit/${id}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/portal/delete/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        return await $fetch(`${BASE_URL}/api/v1/portal/show/${id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        return await $fetch(`${BASE_URL}/api/v1/portal/showAll`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    }
  };
};