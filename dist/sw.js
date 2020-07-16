let CACHE_NAME = 'soccermatch-v2';
let urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/offline.html',
    '/app.js',
    '/assets/js/initialization.js',
    '/assets/js/materialize.js',
    '/assets/css/materialize.css',
    '/assets/css/detail.css',
    '/assets/css/home.css',
    '/assets/images/stadium-2.jpg',
    '/assets/images/stadium/stadium-16.png',
    '/assets/images/stadium/stadium-24.png',
    '/assets/images/stadium/stadium-128.png',
    '/assets/images/stadium/stadium-180.png',
    '/assets/images/stadium/stadium-192.png',
    '/assets/images/stadium/stadium-256.png',
    '/assets/images/stadium/stadium-512.png'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})

self.addEventListener("fetch", function(event) {
    var base_url = `https://api.football-data.org/v2/`;
    console.log("event.request.url.indexOf(base_url) ", event.request.url.indexOf(base_url));
    console.log("url ", event.request.url);

    // Method indexOf akan mengembalikan nilai -1 jika base_url tidak ada di request saat ini dan akan bernilai lebih dari -1 jika url yang diminta mengandung isi base_url.

    // hasil 0 jika  di event.request.url sma dengan containt baseUrl, hasil -1 jika event.request.url tidak sma dengan containt baseUrl
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
    return caches.match('/offline.html');
});

// push notif payload firebase
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
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