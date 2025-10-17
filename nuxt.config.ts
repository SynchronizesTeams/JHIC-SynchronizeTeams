// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'ws',
        host: '33d30327dd7c.ngrok-free.app',
      },
      allowedHosts: [
        '33d30327dd7c.ngrok-free.app'
      ]
    }
  },

  modules: ["@nuxt/image"],

  runtimeConfig: {
    public: {
      vapidPublicKey: process.env.NUXT_PUBLIC_VAPID_PUBLIC_KEY || ''
    }
  },
});
