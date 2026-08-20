const CACHE_NAME = 'radar-alternance-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // On ne gère QUE les fichiers de l'app elle-même. Tout le reste (polices,
  // Leaflet, tuiles de carte, et surtout l'API Groq du scan live) part toujours
  // directement au réseau, jamais via ce cache — le scan live doit rester vraiment live.
  if(url.origin !== self.location.origin) return;

  const isDoc = event.request.mode === 'navigate'
    || url.pathname === '/' || url.pathname.endsWith('/')
    || url.pathname.endsWith('/index.html');

  if(isDoc){
    // Page principale : réseau EN PRIORITÉ, cache seulement en repli hors-ligne.
    // C'est ce qui manquait avant — avec l'ancienne version (cache d'abord, réseau
    // seulement si rien en cache), une mise à jour d'index.html pouvait rester invisible
    // indéfiniment tant que sw.js lui-même n'avait pas changé d'un octet. Là, dès qu'il y a
    // du réseau, la dernière version s'affiche automatiquement — plus besoin de manip
    // (vider le cache Safari, réinstaller l'icône) à chaque mise à jour.
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{});
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Reste de l'app shell (icônes, manifest) : change rarement, cache d'abord reste pertinent.
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
