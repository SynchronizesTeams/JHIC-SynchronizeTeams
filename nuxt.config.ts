// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy:
        process.env.NUXT_PUBLIC_USE_PROXY === "true"
          ? {
              "/api": {
                target:
                  process.env.NUXT_PUBLIC_API_BASE_URL ||
                  "https://jhic-infra.synchronizeteams.my.id",
                changeOrigin: true,
                secure: true,
              },
            }
          : {},
      hmr: {
        protocol: "ws",
        host: "33d30327dd7c.ngrok-free.app",
      },
      allowedHosts: ["33d30327dd7c.ngrok-free.app"],
    },
  },

  modules: ["@nuxt/image", "@nuxtjs/sitemap"],

  image: {
    provider: "ipx",
    dir: "public",
  },

  runtimeConfig: {
    public: {
      // API Configuration
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        "https://infra-adeli.synchronizeteams.my.id/api",
      apiVersion: process.env.NUXT_PUBLIC_API_VERSION || "v1",

      // API Endpoints
      apiAuthEndpoint: process.env.NUXT_PUBLIC_API_AUTH_ENDPOINT || "/auth",
      apiNewsEndpoint: process.env.NUXT_PUBLIC_API_NEWS_ENDPOINT || "/news",
      apiUserLinksEndpoint:
        process.env.NUXT_PUBLIC_API_USER_LINKS_ENDPOINT || "/user-links",
      apiTeacherEndpoint: process.env.NUXT_PUBLIC_API_TEACHER_ENDPOINT || "/teacher",
      apiForumEndpoint: process.env.NUXT_PUBLIC_API_FORUM_ENDPOINT || "/forum",
      apiEventEndpoint: process.env.NUXT_PUBLIC_API_EVENT_ENDPOINT || "/event",
      apiImageEndpoint: process.env.NUXT_PUBLIC_API_IMAGE_ENDPOINT || "/image",
      apiPortalEndpoint:
        process.env.NUXT_PUBLIC_API_PORTAL_ENDPOINT || "/portal",
      apiGuestBookEndpoint:
        process.env.NUXT_PUBLIC_API_GUEST_BOOK_ENDPOINT || "/guest-book",

      // Development
      useProxy: process.env.NUXT_PUBLIC_USE_PROXY === "true",
      proxyTarget:
        process.env.NUXT_PUBLIC_PROXY_TARGET || "http://127.0.0.1:3000",

      // App Configuration
      appName: process.env.NUXT_PUBLIC_APP_NAME || "SMK Plus Pelita Nusantara",
      appUrl:
        process.env.NUXT_PUBLIC_APP_URL ||
        "https://smkpluspelitanusantara.sch.id",
      appDescription:
        process.env.NUXT_PUBLIC_APP_DESCRIPTION ||
        "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik",

      // Social Media
      facebookUrl: process.env.NUXT_PUBLIC_FACEBOOK_URL || "",
      instagramUrl: process.env.NUXT_PUBLIC_INSTAGRAM_URL || "",
      twitterUrl: process.env.NUXT_PUBLIC_TWITTER_URL || "",
      youtubeUrl: process.env.NUXT_PUBLIC_YOUTUBE_URL || "",

      // Features
      enableNews: process.env.NUXT_PUBLIC_ENABLE_NEWS !== "false",
      enableForums: process.env.NUXT_PUBLIC_ENABLE_FORUMS !== "false",
      enableEvents: process.env.NUXT_PUBLIC_ENABLE_EVENTS !== "false",
      enableGallery: process.env.NUXT_PUBLIC_ENABLE_GALLERY !== "false",
      enablePortal: process.env.NUXT_PUBLIC_ENABLE_PORTAL !== "false",

      // Other
      vapidPublicKey:
        process.env.NUXT_PUBLIC_VAPID_PUBLIC_KEY ||
        "BLjn1-8nnAUtRdo6BjPwlQt3NGGuY3C7A3cfQCgN25unW2pqrK57on9nXn7clE4qkR3krDuHr-JSiLo60EzqITc",
      debugMode: process.env.NUXT_PUBLIC_DEBUG_MODE === "true",
      logApiCalls: process.env.NUXT_PUBLIC_LOG_API_CALLS === "true",
    },
  },

  ssr: false,

  site: {
    url: "https://smkpluspelitanusantara.sch.id",
    name: "SMK Plus Pelita Nusantara",
  },

  sitemap: {
    hostname: "https://smkpluspelitanusantara.sch.id",
    gzip: true,
    routes: async () => {
      return ["/", "/news", "/forums", "/achievements", "/Galery", "/portals"];
    },
  },

  robots: {
    UserAgent: "*",
    Allow: "/",
    Sitemap: "https://smkpluspelitanusantara.sch.id/sitemap.xml",
  },

  app: {
    head: {
      title: "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik",
      titleTemplate: "%s | SMK Plus Pelita Nusantara",
      htmlAttrs: {
        lang: "id",
      },
      link: [
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "icon", type: "image/webp", href: "/penus-icon.webp" },
        { rel: "apple-touch-icon", href: "/penus-icon.webp" },
        { rel: "shortcut icon", type: "image/webp", href: "/penus-icon.webp" },
        { rel: "canonical", href: "https://smkpluspelitanusantara.sch.id" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional untuk mempersiapkan generasi muda yang kompeten dan siap kerja.",
        },
        {
          name: "keywords",
          content:
            "SMK Plus Pelita Nusantara, sekolah kejuruan, SMK terbaik, pendidikan vokasi, teknologi, komunikasi, pelatihan profesional, sekolah menengah kejuruan, SMK Bandung, pendidikan teknologi",
        },
        { name: "author", content: "SMK Plus Pelita Nusantara" },
        {
          name: "robots",
          content:
            "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        },
        { name: "googlebot", content: "index, follow" },
        { name: "theme-color", content: "#3b82f6" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        {
          name: "apple-mobile-web-app-title",
          content: "SMK Plus Pelita Nusantara",
        },
        { name: "format-detection", content: "telephone=no" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "SMK Plus Pelita Nusantara" },
        {
          property: "og:title",
          content:
            "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik",
        },
        {
          property: "og:description",
          content:
            "SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional.",
        },
        {
          property: "og:image",
          content: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Logo SMK Plus Pelita Nusantara" },
        {
          property: "og:url",
          content: "https://smkpluspelitanusantara.sch.id",
        },
        { property: "og:locale", content: "id_ID" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@smkpelitanusantara" },
        {
          name: "twitter:title",
          content:
            "SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik",
        },
        {
          name: "twitter:description",
          content:
            "SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional.",
        },
        {
          name: "twitter:image",
          content: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
        },
        {
          name: "twitter:image:alt",
          content: "Logo SMK Plus Pelita Nusantara",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "SMK Plus Pelita Nusantara",
            alternateName: "SMK Pelita Nusantara",
            url: "https://smkpluspelitanusantara.sch.id",
            logo: "https://smkpluspelitanusantara.sch.id/penus-icon.webp",
            description:
              "SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "ID",
              addressLocality: "Bandung",
            },
            sameAs: [
              "https://www.facebook.com/smkpelitanusantara",
              "https://www.instagram.com/smkpelitanusantara",
              "https://twitter.com/smkpelitanusantara",
            ],
          }),
        } as any,
      ],
    },
  },
});
