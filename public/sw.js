// Service Worker for Push Notifications and Caching
const CACHE_VERSION = 'v2'
const CACHE_NAME = `smk-pnb-${CACHE_VERSION}`

// Assets to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/penus-icon.webp'
]

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
}

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')

  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    }).then(() => clients.claim())
  )
})

// Fetch event with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Apply caching strategy based on request type
  if (url.pathname.startsWith('/_nuxt/')) {
    // Bundle files: Cache first (immutable)
    event.respondWith(cacheFirst(request))
  } else if (url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|gif|ico)$/)) {
    // Images: Stale while revalidate
    event.respondWith(staleWhileRevalidate(request))
  } else if (url.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    // Fonts: Cache first
    event.respondWith(cacheFirst(request))
  } else if (url.pathname.startsWith('/api/')) {
    // API requests: Network first
    event.respondWith(networkFirst(request))
  } else {
    // HTML pages: Network first with cache fallback
    event.respondWith(networkFirst(request))
  }
})

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)

    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}

// Network First Strategy
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)

    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    console.log('Network failed, trying cache:', request.url)
    const cached = await cache.match(request)

    if (cached) {
      return cached
    }

    throw error
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  })

  // Return cached version immediately if available
  return cached || fetchPromise
}

// Handle push notification
self.addEventListener('push', (event) => {
  console.log('Push notification received', event)

  let notificationData = {
    title: 'SMK Plus Pelita Nusantara',
    body: 'Ada update baru di website!',
    icon: '/penus-icon.webp',
    badge: '/penus-icon.webp',
    tag: 'notification',
    requireInteraction: false,
    data: {
      url: '/'
    }
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        tag: data.tag || notificationData.tag,
        requireInteraction: data.requireInteraction || false,
        data: {
          url: data.url || '/'
        }
      }
    } catch (e) {
      console.error('Error parsing notification data:', e)
    }
  }

  const promiseChain = self.registration.showNotification(
    notificationData.title,
    {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: notificationData.data
    }
  )

  event.waitUntil(promiseChain)
})

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked', event)

  event.notification.close()

  const urlToOpen = new URL(event.notification.data?.url || '/', self.location.origin).href

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open with the same URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }
        // If no existing tab, open a new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
      .catch((error) => {
        console.error('Error handling notification click:', error)
      })
  )
})

