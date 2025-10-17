/**
 * Composable for lazy loading images and videos using Intersection Observer
 */
export const useLazyLoad = () => {
  const observeElement = (
    element: HTMLElement,
    callback: () => void,
    options: IntersectionObserverInit = {}
  ) => {
    if (!process.client) return

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px', // Start loading 50px before element enters viewport
      threshold: 0.01,
      ...options
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)

    observer.observe(element)

    // Return cleanup function
    return () => observer.disconnect()
  }

  const lazyLoadImage = (imgElement: HTMLImageElement) => {
    if (!process.client || !imgElement) return

    const src = imgElement.dataset.src
    const srcset = imgElement.dataset.srcset

    if (src) {
      imgElement.src = src
    }
    if (srcset) {
      imgElement.srcset = srcset
    }

    imgElement.classList.add('loaded')
  }

  const lazyLoadVideo = (videoElement: HTMLVideoElement) => {
    if (!process.client || !videoElement) return

    const sources = videoElement.querySelectorAll('source[data-src]')
    sources.forEach((source) => {
      const src = (source as HTMLSourceElement).dataset.src
      if (src) {
        (source as HTMLSourceElement).src = src
      }
    })

    videoElement.load()
    videoElement.classList.add('loaded')
  }

  const lazyLoadBackground = (element: HTMLElement) => {
    if (!process.client || !element) return

    const bgImage = element.dataset.bg
    if (bgImage) {
      element.style.backgroundImage = `url('${bgImage}')`
      element.classList.add('loaded')
    }
  }

  return {
    observeElement,
    lazyLoadImage,
    lazyLoadVideo,
    lazyLoadBackground
  }
}

/**
 * Directive for lazy loading images
 * Usage: v-lazy-load
 */
export const vLazyLoad = {
  mounted(el: HTMLElement) {
    const { observeElement, lazyLoadImage, lazyLoadVideo, lazyLoadBackground } = useLazyLoad()

    if (el.tagName === 'IMG') {
      observeElement(el, () => lazyLoadImage(el as HTMLImageElement))
    } else if (el.tagName === 'VIDEO') {
      observeElement(el, () => lazyLoadVideo(el as HTMLVideoElement))
    } else if (el.dataset.bg) {
      observeElement(el, () => lazyLoadBackground(el))
    }
  }
}
