/* Canzoniere — service worker
   Strategia: la pagina (navigazione) usa "rete, poi cache" così vedi gli
   aggiornamenti quando sei online ma funziona anche offline; gli altri file
   dello stesso sito usano "cache, poi rete". Le richieste verso altri siti
   (proxy, ricerche) passano sempre dalla rete e non vengono memorizzate. */
const CACHE = "canzoniere-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Navigazione: rete prima, con copia in cache; offline -> cache.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Solo file dello stesso sito: cache prima, poi rete (e memorizza).
  if (sameOrigin) {
    e.respondWith(
      caches.match(req).then((hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => hit)
      )
    );
  }
  // Altri domini: lascia fare alla rete (nessuna gestione).
});
