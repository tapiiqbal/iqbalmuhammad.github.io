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
    workbox.precaching.precacheAndRoute([], {
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