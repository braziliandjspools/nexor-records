// Service Worker for Brazilian Remix Service
const CACHE_NAME = "brazilian-remix-service-v2"

// Assets to cache
const urlsToCache = [
  "/",
  "/atualizacoes",
  "/deemix",
  "/pedidos",
  "/converter-letras",
  "/manifest.json",
  "/favicon.ico",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/apple-touch-icon.png",
]

// Install event - cache assets
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell")
      return cache.addAll(urlsToCache)
    }),
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate")
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key)
            return caches.delete(key)
          }
        }),
      )
    }),
  )
  // Take control of all clients as soon as the service worker activates
  return self.clients.claim()
})

// Fetch event - serve from cache if available
self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch", event.request.url)
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      // Clone the request
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache the fetched response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // If fetch fails (offline), try to return a cached fallback
          if (event.request.mode === "navigate") {
            return caches.match("/")
          }
        })
    }),
  )
})
