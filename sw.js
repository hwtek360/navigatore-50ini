// Nome del "cassetto" dove salveremo i dati (per il futuro)
const CACHE_NAME = 'navigatore-v1';

// File base che l'app deve memorizzare (per ora lasciamo vuoto per semplicità)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icona-192.png'
];

// Fase di Installazione: il Service Worker si attiva
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cassetto cache aperto!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fase di Attivazione
self.addEventListener('activate', event => {
  console.log('Service Worker Attivato!');
});

// Fase di Fetch: gestisce le richieste (per ora passa tutto a internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});