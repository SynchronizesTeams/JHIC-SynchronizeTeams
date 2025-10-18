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

interface Mading {
  title: string;
  type: string;
  content: string;
  image?: File;
}

interface Teacher {
  nig: string;
  full_name: string;
  position: string;
  subject: string;
  description: string;
}

interface Eskul {
  name: string;
  description: string;
  pembina_id: number;
}

interface Achievement {
  title: string;
  description: string;
  image?: File;
  achievement_date: string;
  news_id?: number;
}

interface Industry {
  name: string;
  logo?: File;
  website: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  description: string;
  image?: File;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}

interface Testimonial {
  name: string;
  position: string;
  photo?: File;
  testimonial: string;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBaseUrl || 'http://localhost:3001/api';
  const API_VERSION = config.public.apiVersion || 'v1';
  
  // Helper untuk membuat endpoint URL
  const buildEndpoint = (path: string): string => {
    // Jika sudah ada /api dalam path, gunakan langsung
    if (path.startsWith('/api/')) {
      return `${BASE_URL}${path}`;
    }
    // Jika tidak, tambahkan /api/{version}
    return `${BASE_URL}/api/${API_VERSION}${path}`;
  };
  
  // Helper function untuk mendapatkan headers dengan token (hanya jika token tersedia)
  // Return type dibuat eksplisit agar kompatibel dengan HeadersInit
  const getAuthHeaders = (): Record<string, string> => {
    const auth = useAuth();
    const token = (auth.token.value || '').trim();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    
    // Log API calls jika debug mode aktif
    if (config.public.logApiCalls) {
      console.log('[API] Headers:', headers);
    }
    
    return headers;
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
  
  // Log API request jika debug mode aktif
  const logRequest = (method: string, url: string, body?: any) => {
    if (config.public.logApiCalls) {
      console.log(`[API] ${method} ${url}`, body || '');
    }
  };

  return {
    news: {
      getAll: async () => {
        const url = buildEndpoint(`/public${config.public.apiNewsEndpoint}/getAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`/public${config.public.apiNewsEndpoint}/get/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      create: async (newsData: News) => {
        const formData = createFormData(newsData);
        const url = buildEndpoint(`${config.public.apiNewsEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, newsData: News) => {
        const formData = createFormData(newsData);
        const url = buildEndpoint(`${config.public.apiNewsEndpoint}/update/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiNewsEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      addView: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiNewsEndpoint}/addView/${id}`);
        logRequest('POST', url);
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders()
        });
      },

      changeStatus: async (id: number, statusData: { status: string }) => {
        const formData = createFormData(statusData);
        const url = buildEndpoint(`${config.public.apiNewsEndpoint}/changeStatus/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      }
    },

    // Auth API
    auth: {
      register: async (credentials: AuthCredentials) => {
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/register`);
        logRequest('POST', url, credentials);
        return await $fetch(url, {
          method: 'POST',
          body: credentials
        });
      },

      login: async (credentials: AuthCredentials) => {
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/login`);
        logRequest('POST', url, credentials);
        return await $fetch(url, {
          method: 'POST',
          body: credentials
        });
      },

      editProfile: async (profileData: UserProfile) => {
        const formData = createFormData(profileData);
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/edit`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      profile: async () => {
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/profile`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Image API
    image: {
      getAll: async () => {
        const url = buildEndpoint(`/public${config.public.apiImageEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getByCategory: async (category: string) => {
        const url = buildEndpoint(`/public${config.public.apiImageEndpoint}/show?category=${category}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      add: async (imageData: ImageUpload) => {
        const formData = createFormData(imageData);
        const url = buildEndpoint(`${config.public.apiImageEndpoint}/add`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiImageEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    },

    // User Links API
    userLinks: {
      create: async (linkData: UserLink) => {
        try {
          // Create FormData with only title and url
          // Icon is stored locally, not sent to backend
          const formData = new FormData();
          formData.append('title', linkData.title);
          formData.append('url', linkData.url);
          
          const headers = getAuthHeaders();
          const url = buildEndpoint(`${config.public.apiUserLinksEndpoint}/add`);
          logRequest('POST', url, { title: linkData.title, url: linkData.url });
          
          const response = await $fetch(url, {
            method: 'POST',
            headers,
            body: formData
          });
          
          // Store icon locally if response successful
          if (response && linkData.icon) {
            // We'll store the icon identifier locally
            localStorage.setItem(`userlink_icon_${linkData.title}`, linkData.icon);
          }
          
          return response;
        } catch (error: any) {
          console.error('API Error creating user link:', error);
          console.error('Error response:', error.data);
          console.error('Error status:', error.status);
          throw error;
        }
      },

      update: async (id: number, linkData: UserLink) => {
        try {
          // Create FormData with only title and url
          const formData = new FormData();
          formData.append('title', linkData.title);
          formData.append('url', linkData.url);
          
          const headers = getAuthHeaders();
          const url = buildEndpoint(`${config.public.apiUserLinksEndpoint}/edit/${id}`);
          logRequest('POST', url, { id, title: linkData.title, url: linkData.url });
          
          const response = await $fetch(url, {
            method: 'POST',
            headers,
            body: formData
          });
          
          // Store icon locally if response successful
          if (response && linkData.icon) {
            localStorage.setItem(`userlink_icon_${linkData.title}`, linkData.icon);
          }
          
          return response;
        } catch (error: any) {
          console.error('API Error updating user link:', error);
          throw error;
        }
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiUserLinksEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getSelf: async () => {
        const url = buildEndpoint(`${config.public.apiUserLinksEndpoint}/show/self`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Forum Section API
    forumSection: {
      create: async (sectionData: ForumSection) => {
        const formData = createFormData(sectionData);
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-section/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, sectionData: ForumSection) => {
        const formData = createFormData(sectionData);
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-section/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-section/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-section/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    },

    // Forum Post API
    forumPost: {
      create: async (postData: ForumPost) => {
        const formData = createFormData(postData);
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, postData: ForumPost) => {
        const formData = createFormData(postData);
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getWithReplies: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/post-replies/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      changeStatus: async (statusData: { status: string }) => {
        const formData = createFormData(statusData);
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/changeStatus`);
        logRequest('PUT', url, 'FormData');
        return await $fetch(url, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      upvote: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/upvote/${id}`);
        logRequest('PUT', url);
        return await $fetch(url, {
          method: 'PUT',
          headers: getAuthHeaders()
        });
      },

      downvote: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/downvote/${id}`);
        logRequest('PUT', url);
        return await $fetch(url, {
          method: 'PUT',
          headers: getAuthHeaders()
        });
      }
    },

    // Forum Reply API
    forumReply: {
      create: async (postId: number, replyData: ForumReply) => {
        const formData = createFormData(replyData);
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/reply/${postId}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getNested: async (postId: number) => {
        const url = buildEndpoint(`${config.public.apiForumEndpoint}-post/replies/${postId}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Event API
    event: {
      create: async (eventData: Event) => {
        const formData = createFormData(eventData);
        const url = buildEndpoint(`${config.public.apiEventEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiEventEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiEventEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      update: async (id: number, eventData: Event) => {
        const formData = createFormData(eventData);
        const url = buildEndpoint(`${config.public.apiEventEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiEventEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getByCategory: async (category: string) => {
        const url = buildEndpoint(`${config.public.apiEventEndpoint}/showByCategory?category=${category}`);
        logRequest('GET', url);
        return await $fetch(url, {
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
        const url = buildEndpoint(`${config.public.apiGuestBookEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiGuestBookEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiGuestBookEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      updateStatus: async (id: number, status: string) => {
        const formData = createFormData({ status });
        const url = buildEndpoint(`${config.public.apiGuestBookEndpoint}/updateStatus/${id}`);
        logRequest('PUT', url, 'FormData');
        return await $fetch(url, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      approve: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiGuestBookEndpoint}/approve/${id}`);
        logRequest('PUT', url);
        return await $fetch(url, {
          method: 'PUT',
          headers: getAuthHeaders()
        });
      },

      reject: async (id: number, rejection_reason: string) => {
        const formData = createFormData({ rejection_reason });
        const url = buildEndpoint(`${config.public.apiGuestBookEndpoint}/reject/${id}`);
        logRequest('PUT', url, 'FormData');
        return await $fetch(url, {
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
        const url = buildEndpoint(`${config.public.apiPortalEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, portalData: Portal) => {
        const formData = createFormData(portalData);
        const url = buildEndpoint(`${config.public.apiPortalEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiPortalEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiPortalEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiPortalEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Mading API
    mading: {
      create: async (madingData: Mading) => {
        const formData = createFormData(madingData);
        const url = buildEndpoint(`${config.public.apiMadingEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, madingData: Mading) => {
        const formData = createFormData(madingData);
        const url = buildEndpoint(`${config.public.apiMadingEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiMadingEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiMadingEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Teacher API
    teacher: {
      create: async (teacherData: Teacher) => {
        const formData = createFormData(teacherData);
        const url = buildEndpoint(`${config.public.apiTeacherEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, teacherData: Teacher) => {
        const formData = createFormData(teacherData);
        const url = buildEndpoint(`${config.public.apiTeacherEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiTeacherEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiTeacherEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    },

    // Eskul API
    eskul: {
      create: async (eskulData: Eskul) => {
        const formData = createFormData(eskulData);
        const url = buildEndpoint(`${config.public.apiEskulEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, eskulData: Eskul) => {
        const formData = createFormData(eskulData);
        const url = buildEndpoint(`${config.public.apiEskulEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiEskulEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiEskulEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Achievement API
    achievement: {
      create: async (achievementData: Achievement) => {
        const formData = createFormData(achievementData);
        const url = buildEndpoint(`${config.public.apiAchievementEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, achievementData: Achievement) => {
        const formData = createFormData(achievementData);
        const url = buildEndpoint(`${config.public.apiAchievementEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiAchievementEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiAchievementEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiAchievementEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    },

    // Industry API
    industry: {
      create: async (industryData: Industry) => {
        const formData = createFormData(industryData);
        const url = buildEndpoint(`${config.public.apiIndustryEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, industryData: Industry) => {
        const formData = createFormData(industryData);
        const url = buildEndpoint(`${config.public.apiIndustryEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiIndustryEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiIndustryEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      }
    },

    // Certification API
    certification: {
      create: async (certificationData: Certification) => {
        const formData = createFormData(certificationData);
        const url = buildEndpoint(`${config.public.apiCertificationEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, certificationData: Certification) => {
        const formData = createFormData(certificationData);
        const url = buildEndpoint(`${config.public.apiCertificationEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiCertificationEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiCertificationEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiCertificationEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    },

    // Testimonial API
    testimonial: {
      create: async (testimonialData: Testimonial) => {
        const formData = createFormData(testimonialData);
        const url = buildEndpoint(`${config.public.apiTestimonialEndpoint}/create`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      update: async (id: number, testimonialData: Testimonial) => {
        const formData = createFormData(testimonialData);
        const url = buildEndpoint(`${config.public.apiTestimonialEndpoint}/edit/${id}`);
        logRequest('POST', url, 'FormData');
        return await $fetch(url, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiTestimonialEndpoint}/show/${id}`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiTestimonialEndpoint}/showAll`);
        logRequest('GET', url);
        return await $fetch(url, {
          method: 'GET',
          headers: getAuthHeaders()
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(`${config.public.apiTestimonialEndpoint}/delete/${id}`);
        logRequest('DELETE', url);
        return await $fetch(url, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      }
    }
  };
};