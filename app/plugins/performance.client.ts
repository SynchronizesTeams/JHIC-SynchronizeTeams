/**
 * Performance optimization plugin
 * Runs only on client-side
 */
export default defineNuxtPlugin(() => {
  if (!process.client) return

  // Register lazy load directive globally
  const { vLazyLoad } = useLazyLoad()

  return {
    provide: {
      lazyLoad: vLazyLoad
    }
  }
})
