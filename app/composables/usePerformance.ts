/**
 * Composable for performance monitoring and optimization
 */
export const usePerformance = () => {
  /**
   * Preload critical resources
   */
  const preloadResource = (href: string, as: string, type?: string) => {
    if (!process.client) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type

    document.head.appendChild(link)
  }

  /**
   * Prefetch resources for next navigation
   */
  const prefetchResource = (href: string) => {
    if (!process.client) return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href

    document.head.appendChild(link)
  }

  /**
   * Measure page load performance
   */
  const measurePageLoad = () => {
    if (!process.client || !window.performance) return null

    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart
    const ttfb = perfData.responseStart - perfData.navigationStart

    return {
      pageLoadTime,
      domReadyTime,
      ttfb
    }
  }

  /**
   * Get Core Web Vitals
   */
  const getCoreWebVitals = () => {
    if (!process.client) return

    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // FID - First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // CLS - Cumulative Layout Shift
      let clsScore = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value
            console.log('CLS:', clsScore)
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  /**
   * Defer non-critical JavaScript
   */
  const deferScript = (src: string, callback?: () => void) => {
    if (!process.client) return

    const script = document.createElement('script')
    script.src = src
    script.defer = true

    if (callback) {
      script.onload = callback
    }

    document.body.appendChild(script)
  }

  /**
   * Optimize images on the page
   */
  const optimizeImages = () => {
    if (!process.client) return

    const images = document.querySelectorAll('img:not([loading])')
    images.forEach((img) => {
      (img as HTMLImageElement).loading = 'lazy'
    })
  }

  return {
    preloadResource,
    prefetchResource,
    measurePageLoad,
    getCoreWebVitals,
    deferScript,
    optimizeImages
  }
}
