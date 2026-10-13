// Guarda la app en el teléfono para que funcione sin internet
const CACHE='pruebas-ttr-v1';
const ARCHIVOS=['./','index.html','jszip.min.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{});return r;})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
