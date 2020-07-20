importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

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
    workbox.core.clientsClaim();
    workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "49dbe272f2c63ec767b4acbd60400be6"
  },
  {
    "url": "nav-home.html",
    "revision": "aaccf84a1802aec2836b217da39cf3b0"
  },
  {
    "url": "nav-detail.html",
    "revision": "d02235adc6c981b797b934a295913e5e"
  },
  {
    "url": "manifest.json",
    "revision": "475b07c6481714358b3228a9118829b8"
  },
  {
    "url": "app.js",
    "revision": "358e51e1399649d584bb2ffab114d7ec"
  },
  {
    "url": "style.css",
    "revision": "9823008b0a4d6a2dde600cc44955834b"
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
    "url": "pages/pagedetail.html",
    "revision": "3647f32fa144bb78d325ea05d321eee1"
  },
  {
    "url": "pages/pagehome.html",
    "revision": "17f9de2312dc37b5584741dd635e2276"
  },
  {
    "url": "pages/pagesave.html",
    "revision": "00c5b1d5f35c7e8039459d6adbf68264"
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

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'api-cache'
        })
    );

    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /(.*)images\/(.*)\.(?:png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)/,
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

    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://fonts.gstatic.com',
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}