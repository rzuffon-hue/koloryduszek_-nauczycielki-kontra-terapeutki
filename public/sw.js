const CACHE_NAME = 'koloryduszek-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512.jpg',
  '/src/assets/images/amelia_portrait_1783531566501.jpg',
  '/src/assets/images/bald_manager_portrait_1783529726331.jpg',
  '/src/assets/images/blueprints_bg_1783533350195.jpg',
  '/src/assets/images/control_center_1783531596202.jpg',
  '/src/assets/images/cook_portrait_1783533279630.jpg',
  '/src/assets/images/dark_kinder_bg_1783533364360.jpg',
  '/src/assets/images/director_portrait_1783533268563.jpg',
  '/src/assets/images/english_teacher_portrait_1783533253051.jpg',
  '/src/assets/images/game_cover_1783451874065.jpg',
  '/src/assets/images/gym_bg_1783533335722.jpg',
  '/src/assets/images/kindergarten_garden_1783451914603.jpg',
  '/src/assets/images/kitchen_bg_1783533322488.jpg',
  '/src/assets/images/pe_teacher_portrait_1783533293006.jpg',
  '/src/assets/images/pool_tunnels_1783531581796.jpg',
  '/src/assets/images/secret_room_1783451926713.jpg',
  '/src/assets/images/sonia_portrait_1783533307520.jpg',
  '/src/assets/images/teachers_trio_1783451887451.jpg',
  '/src/assets/images/therapists_trio_1783451898546.jpg'
];

// Install Event: cache core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[Service Worker] Failed to pre-cache some assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-first falling back to Cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip cross-origin requests, development WebSockets, etc.
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('/ws') || url.pathname.includes('hot-update')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses for subsequent offline usage
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fall back to cache when network is unavailable
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If navigating, serve the main index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
