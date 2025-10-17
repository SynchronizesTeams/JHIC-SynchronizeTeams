/**
 * Web Vitals monitoring plugin
 * Tracks Core Web Vitals metrics
 */
export default defineNuxtPlugin(() => {
  if (!process.client) return

  // Monitor Core Web Vitals only in production
  if (process.env.NODE_ENV === 'production') {
    onMounted(() => {
      const { getCoreWebVitals } = usePerformance()
      getCoreWebVitals()
    })
  }

  // Optimize images on page load
  onMounted(() => {
    const { optimizeImages } = usePerformance()
    optimizeImages()
  })
})
