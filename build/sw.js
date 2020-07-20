importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    workbox.core.setCacheNameDetails({
        prefix: 'soccer-match',
        suffix: 'v1',
        precache: 'keepmatch-precache-name',
        runtime: 'keepmatch-runtime-name',
        googleAnalytics: 'keepmatch-google-analytics-name'
    });

    workbox.core.skipWaiting();
    workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "644f8fb6139f16a7268e6ea16c0563bd"
  },
  {
    "url": "manifest.json",
    "revision": "475b07c6481714358b3228a9118829b8"
  },
  {
    "url": "assets/images/clubs/bundes-liga.svg",
    "revision": "7cd892d5ff0241b31a7a9fd1e42f902f"
  },
  {
    "url": "assets/images/clubs/eredivisie.svg",
    "revision": "71ae148b5af6b07b88e895b312eec9fd"
  },
  {
    "url": "assets/images/clubs/ligue-1.svg",
    "revision": "f68903ad4e14d9f16b3583be2b235b02"
  },
  {
    "url": "assets/images/clubs/premier-league.svg",
    "revision": "ab2d72698cf22c453ddfc0ce5220f9bf"
  },
  {
    "url": "assets/images/clubs/primera-division.svg",
    "revision": "95eb074db196d4e01a1aecb585af5231"
  },
  {
    "url": "pages/offline.html",
    "revision": "62ec812f06a60f4af8a84acd29c82dab"
  },
  {
    "url": "pages/404.html",
    "revision": "cd7c51ed555e23bbeb561776fdf05ebf"
  }
], {
        ignoreURLParametersMatching: [/.*/]
    });
    workbox.routing.registerRoute(new RegExp('.*.*'), new workbox.strategies.staleWhileRevalidate());

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org'),
        workbox.strategies.staleWhileRevalidate({ // 3 detik
            cacheName: 'api-cache'
        })
    );

    workbox.routing.registerRoute(
        /(.*)images\/(.*)\.(?:png|gif|jpg|svg)/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );

    const pageHandler = workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)pages\/(.*)\.html/, args => {
        return pageHandler.handle(args).then(response => {
                if (response.status === 404) {
                    return caches.match('pages/404.html');
                }
                return response;
            })
            .catch(function() {
                return caches.match('pages/offline.html');
            });
    });

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}