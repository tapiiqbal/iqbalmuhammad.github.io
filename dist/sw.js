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
    "revision": "3b8aeacf046e4693a7fce2e4abda9574"
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
    "revision": "0a103ecc7ae6236f91d60062388d3cf9"
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
    "url": "assets/images/caution-logout.svg",
    "revision": "ab523f7cb313d1db1c3948d45ca99ed9"
  },
  {
    "url": "assets/images/logo-ball-64.svg",
    "revision": "2d83671d0453a6e25fe3a47d4d28f1c6"
  },
  {
    "url": "assets/images/MaterialIcons-Regular.eot",
    "revision": "e79bfd88537def476913f3ed52f4f4b3"
  },
  {
    "url": "assets/images/MaterialIcons-Regular.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "assets/images/MaterialIcons-Regular.woff",
    "revision": "012cf6a10129e2275d79d6adac7f3b02"
  },
  {
    "url": "assets/images/MaterialIcons-Regular.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "assets/images/stadium-1.jpg",
    "revision": "fd73aeacda7326c117eb356a7337e17b"
  },
  {
    "url": "assets/images/stadium-2.jpg",
    "revision": "f001793549da8fea4eb576225aabb5d4"
  },
  {
    "url": "assets/images/triumph-soccer-ball-symbol.png",
    "revision": "659ee5cd695f9119f9022bc8392b9dcd"
  },
  {
    "url": "pages/detail.html",
    "revision": "3647f32fa144bb78d325ea05d321eee1"
  },
  {
    "url": "pages/home.html",
    "revision": "17f9de2312dc37b5584741dd635e2276"
  },
  {
    "url": "pages/save.html",
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
            cacheName: 'api-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'images',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                })
            ]
        })
    );

    const pageHandler = workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60,
                maxEntries: 50,
            }),
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

    // push notif payload firebase
    self.addEventListener('push', function(event) {
        let body;
        if (event.data) {
            body = event.data.text();
        } else {
            body = 'Push message no payload';
        }
        let options = {
            body: body,
            icon: '/assets/images/ball-180.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        event.waitUntil(
            self.registration.showNotification('Push Notification', options)
        );
    });

    self.addEventListener('notificationclick', function(event) {
        if (!event.action) {
            return;
        }
        switch (event.action) {
            case 'yes-action':
                clients.openWindow('https://soccer-match-4e1cf.web.app/#save');
                event.notification.close();
                break;
            case 'no-action':
                event.notification.close();
                break;
            default:
                break;
        }
    });
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}