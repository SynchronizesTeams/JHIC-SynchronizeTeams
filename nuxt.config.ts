// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'https://jhic-infra.synchronizeteams.my.id',
          changeOrigin: true,
          secure: true
        }
      },
      hmr: {
        protocol: 'ws',
        host: '33d30327dd7c.ngrok-free.app',
      },
      allowedHosts: [
        '33d30327dd7c.ngrok-free.app'
      ]
    }
  },

  modules: ["@nuxt/image", "@nuxtjs/sitemap"],

  runtimeConfig: {
    public: {
      vapidPublicKey: process.env.NUXT_PUBLIC_VAPID_PUBLIC_KEY || '',
      apiBase: process.env.NODE_ENV === 'development' ? '' : 'https://jhic-infra.synchronizeteams.my.id'
    }
  },

  ssr: false, // Client-side rendering

  site: {
    url: 'https://smkpluspelitanusantara.sch.id',
    name: 'SMK Plus Pelita Nusantara',
  },

  sitemap: {
    hostname: 'https://smkpluspelitanusantara.sch.id',
    gzip: true,
    routes: async () => {
      return [
        '/',
        '/news',
        '/forums',
        '/achievements',
        '/Galery',
        '/portals',
      ]
    },
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://smkpluspelitanusantara.sch.id/sitemap.xml',
  },

  app: {
    head: {
      title: 'SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik',
      titleTemplate: '%s | SMK Plus Pelita Nusantara',
      htmlAttrs: {
        lang: 'id'
      },
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', type: 'image/webp', href: '/penus-icon.webp' },
        { rel: 'apple-touch-icon', href: '/penus-icon.webp' },
        { rel: 'shortcut icon', type: 'image/webp', href: '/penus-icon.webp' },
        { rel: 'canonical', href: 'https://smkpluspelitanusantara.sch.id' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional untuk mempersiapkan generasi muda yang kompeten dan siap kerja.' },
        { name: 'keywords', content: 'SMK Plus Pelita Nusantara, sekolah kejuruan, SMK terbaik, pendidikan vokasi, teknologi, komunikasi, pelatihan profesional, sekolah menengah kejuruan, SMK Bandung, pendidikan teknologi' },
        { name: 'author', content: 'SMK Plus Pelita Nusantara' },
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'SMK Plus Pelita Nusantara' },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'SMK Plus Pelita Nusantara' },
        { property: 'og:title', content: 'SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik' },
        { property: 'og:description', content: 'SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional.' },
        { property: 'og:image', content: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Logo SMK Plus Pelita Nusantara' },
        { property: 'og:url', content: 'https://smkpluspelitanusantara.sch.id' },
        { property: 'og:locale', content: 'id_ID' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@smkpelitanusantara' },
        { name: 'twitter:title', content: 'SMK Plus Pelita Nusantara - Sekolah Menengah Kejuruan Terbaik' },
        { name: 'twitter:description', content: 'SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional.' },
        { name: 'twitter:image', content: 'https://smkpluspelitanusantara.sch.id/penus-icon.webp' },
        { name: 'twitter:image:alt', content: 'Logo SMK Plus Pelita Nusantara' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            'name': 'SMK Plus Pelita Nusantara',
            'alternateName': 'SMK Pelita Nusantara',
            'url': 'https://smkpluspelitanusantara.sch.id',
            'logo': 'https://smkpluspelitanusantara.sch.id/penus-icon.webp',
            'description': 'SMK Plus Pelita Nusantara adalah sekolah menengah kejuruan unggulan yang menyediakan pendidikan berkualitas dengan program keahlian teknologi, komunikasi, dan keterampilan profesional.',
            'address': {
              '@type': 'PostalAddress',
              'addressCountry': 'ID',
              'addressLocality': 'Bandung'
            },
            'sameAs': [
              'https://www.facebook.com/smkpelitanusantara',
              'https://www.instagram.com/smkpelitanusantara',
              'https://twitter.com/smkpelitanusantara'
            ]
          })
        }
      ]
    }
  }
});
