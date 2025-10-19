import type {
  Achievement,
  AuthCredentials,
  Certification,
  Eskul,
  ForumPost,
  ForumReply,
  ForumSection,
  ImageUpload,
  Industry,
  Mading,
  News,
  Portal,
  Teacher,
  Testimonial,
  UserProfile,
} from "~/types/api";

export const useApi: any = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBaseUrl || "http://localhost:3001/api";
  const API_VERSION = config.public.apiVersion || "v1";

  // Helper untuk membuat endpoint URL
  const buildEndpoint = (path: string): string => {
    // Jika sudah ada /api dalam path, gunakan langsung
    if (path.startsWith("/api/")) {
      return `${BASE_URL}${path}`;
    }
    // Jika tidak, tambahkan /api/{version}
    return `${BASE_URL}/api/${API_VERSION}${path}`;
  };

  // Helper function untuk mendapatkan headers dengan token (hanya jika token tersedia)
  // Return type dibuat eksplisit agar kompatibel dengan HeadersInit
  const getAuthHeaders = (): Record<string, string> => {
    const auth = useAuth();
    const token = (auth.token.value || "").trim();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    // Log API calls jika debug mode aktif
    if (config.public.logApiCalls) {
      console.log("[API] Headers:", headers);
    }

    return headers;
  };

  // Helper function untuk membuat FormData dari object
  const createFormData = (data: any): FormData => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };

  // Log API request jika debug mode aktif
  const logRequest = (method: string, url: string, body?: any) => {
    if (config.public.logApiCalls) {
      console.log(`[API] ${method} ${url}`, body || "");
    }
  };

  return {
    news: {
      getAll: async () => {
        const url = buildEndpoint(
          `/public${config.public.apiNewsEndpoint}/getAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public${config.public.apiNewsEndpoint}/get/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    auth: {
      register: async (credentials: AuthCredentials) => {
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/register`);
        logRequest("POST", url, credentials);
        return await $fetch(url, {
          method: "POST",
          body: credentials,
        });
      },

      login: async (credentials: AuthCredentials) => {
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/login`);
        logRequest("POST", url, credentials);
        return await $fetch(url, {
          method: "POST",
          body: credentials,
        });
      },

      editProfile: async (profileData: UserProfile) => {
        const formData = createFormData(profileData);
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/edit`);
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      profile: async () => {
        const url = buildEndpoint(`${config.public.apiAuthEndpoint}/profile`);
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Image API
    image: {
      getAll: async () => {
        const url = buildEndpoint(
          `/public${config.public.apiImageEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getByCategory: async (category: string) => {
        const url = buildEndpoint(
          `/public${config.public.apiImageEndpoint}/show?category=${category}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // User Links API
    userLinks: {
      create: async (linkData: { title: string; url: string; icon: string | File }) => {
        try {
          const { iconToFile } = await import('~/utils/socialIcons');
          
          const formData = new FormData();
          formData.append("title", linkData.title);
          formData.append("url", linkData.url);
          
          // Convert icon to File object for backend
          let iconFile: File;
          if (linkData.icon instanceof File) {
            iconFile = linkData.icon;
          } else {
            // Convert string icon identifier to File
            iconFile = iconToFile(linkData.icon);
          }
          formData.append("icon", iconFile);

          const headers = getAuthHeaders();
          // Direct URL construction with double /api
          const url = `${BASE_URL}/api/v1${config.public.apiUserLinksEndpoint}/add`;
          logRequest("POST", url, { title: linkData.title, url: linkData.url, icon: 'file' });

          const response = await $fetch(url, {
            method: "POST",
            headers,
            body: formData,
          });

          return response;
        } catch (error: any) {
          console.error("API Error creating user link:", error);
          console.error("Error response:", error.data);
          console.error("Error status:", error.status);
          throw error;
        }
      },

      update: async (id: number, linkData: { title: string; url: string; icon: string | File }) => {
        try {
          const { iconToFile } = await import('~/utils/socialIcons');
          
          const formData = new FormData();
          formData.append("title", linkData.title);
          formData.append("url", linkData.url);
          
          // Convert icon to File object for backend
          let iconFile: File;
          if (linkData.icon instanceof File) {
            iconFile = linkData.icon;
          } else {
            // Convert string icon identifier to File
            iconFile = iconToFile(linkData.icon);
          }
          formData.append("icon", iconFile);

          const headers = getAuthHeaders();
          // Direct URL construction with double /api
          const url = `${BASE_URL}/api/v1${config.public.apiUserLinksEndpoint}/edit/${id}`;
          logRequest("POST", url, { id, title: linkData.title, url: linkData.url, icon: 'file' });

          const response = await $fetch(url, {
            method: "POST",
            headers,
            body: formData,
          });

          return response;
        } catch (error: any) {
          console.error("API Error updating user link:", error);
          throw error;
        }
      },

      delete: async (id: number) => {
        // Direct URL construction with double /api
        const url = `${BASE_URL}/api/v1${config.public.apiUserLinksEndpoint}/delete/${id}`;
        logRequest("DELETE", url);
        return await $fetch(url, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
      },

      getSelf: async () => {
        // Direct URL construction with double /api
        const url = `${BASE_URL}/api/v1${config.public.apiUserLinksEndpoint}/show/self`;
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getByUserId: async (userId: number) => {
        // Direct URL construction with double /api - public endpoint
        const url = `${BASE_URL}/api/v1/public/user-link/show/${userId}`;
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
        });
      },
    },

    // Forum Section API
    forumSection: {
      create: async (sectionData: ForumSection) => {
        const formData = createFormData(sectionData);
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-section/create`
        );
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      update: async (id: number, sectionData: ForumSection) => {
        const formData = createFormData(sectionData);
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-section/edit/${id}`
        );
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-section/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-section/delete/${id}`
        );
        logRequest("DELETE", url);
        return await $fetch(url, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
      },
    },

    // Forum Post API
    forumPost: {
      create: async (postData: ForumPost) => {
        const formData = createFormData(postData);
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/create`
        );
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      update: async (id: number, postData: ForumPost) => {
        const formData = createFormData(postData);
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/edit/${id}`
        );
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      delete: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/delete/${id}`
        );
        logRequest("DELETE", url);
        return await $fetch(url, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getWithReplies: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/post-replies/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      changeStatus: async (statusData: { status: string }) => {
        const formData = createFormData(statusData);
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/changeStatus`
        );
        logRequest("PUT", url, "FormData");
        return await $fetch(url, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      upvote: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/upvote/${id}`
        );
        logRequest("PUT", url);
        return await $fetch(url, {
          method: "PUT",
          headers: getAuthHeaders(),
        });
      },

      downvote: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/downvote/${id}`
        );
        logRequest("PUT", url);
        return await $fetch(url, {
          method: "PUT",
          headers: getAuthHeaders(),
        });
      },
    },

    // Forum Reply API
    forumReply: {
      create: async (postId: number, replyData: ForumReply) => {
        const formData = createFormData(replyData);
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/reply/${postId}`
        );
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      getNested: async (postId: number) => {
        const url = buildEndpoint(
          `${config.public.apiForumEndpoint}-post/replies/${postId}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Event API
    event: {
      getAll: async () => {
        const url = buildEndpoint(
          `/public${config.public.apiEventEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public${config.public.apiEventEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getByCategory: async (category: string) => {
        const url = buildEndpoint(
          `/public${config.public.apiEventEndpoint}/showByCategory?category=${category}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getByDate: async (date: string) => {
        const url = buildEndpoint(
          `/public${config.public.apiEventEndpoint}/show/date/${date}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
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
        const url = buildEndpoint(
          `${config.public.apiGuestBookEndpoint}/create`
        );
        logRequest("POST", url, "FormData");
        return await $fetch(url, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `/public${config.public.apiGuestBookEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public${config.public.apiGuestBookEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      updateStatus: async (id: number, status: string) => {
        const formData = createFormData({ status });
        const url = buildEndpoint(
          `${config.public.apiGuestBookEndpoint}/updateStatus/${id}`
        );
        logRequest("PUT", url, "FormData");
        return await $fetch(url, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: formData,
        });
      },

      approve: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiGuestBookEndpoint}/approve/${id}`
        );
        logRequest("PUT", url);
        return await $fetch(url, {
          method: "PUT",
          headers: getAuthHeaders(),
        });
      },

      reject: async (id: number, rejection_reason: string) => {
        const formData = createFormData({ rejection_reason });
        const url = buildEndpoint(
          `${config.public.apiGuestBookEndpoint}/reject/${id}`
        );
        logRequest("PUT", url, "FormData");
        return await $fetch(url, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: formData,
        });
      },
    },

    // Portal API (School Portals, different from user links)
    portal: {
      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public${config.public.apiPortalEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`/public${config.public.apiPortalEndpoint}/showAll`);
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
        });
      },
    },

    mading: {
      getById: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiMadingEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(`${config.public.apiMadingEndpoint}/showAll`);
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    teacher: {
      getAll: async () => {
        const url = buildEndpoint(
          `/public/${config.public.apiTeacherEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public/${config.public.apiTeacherEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Eskul API
    eskul: {
      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public/${config.public.apiEskulEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `/public/${config.public.apiEskulEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Achievement API
    achievement: {
      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public/${config.public.apiAchievementEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `/public/${config.public.apiAchievementEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Industry API
    industry: {
      getById: async (id: number) => {
        const url = buildEndpoint(
          `/public/${config.public.apiIndustryEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `/public/${config.public.apiIndustryEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Certification API
    certification: {
      getById: async (id: number) => {
        const url = buildEndpoint(
          `${config.public.apiCertificationEndpoint}/show/${id}`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },

      getAll: async () => {
        const url = buildEndpoint(
          `${config.public.apiCertificationEndpoint}/showAll`
        );
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
          headers: getAuthHeaders(),
        });
      },
    },

    // Testimonial API
    testimonial: {
      getById: async (id: number) => {
        // Direct URL construction with double /api (as per backend requirement)
        const url = `${BASE_URL}/api/v1${config.public.apiTestimonialEndpoint}/show/${id}`;
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
        });
      },

      getAll: async () => {
        // Direct URL construction with double /api (as per backend requirement)
        const url = `${BASE_URL}/api/v1/public${config.public.apiTestimonialEndpoint}/showAll`;
        logRequest("GET", url);
        return await $fetch(url, {
          method: "GET",
        });
      },
    },
  };
};
