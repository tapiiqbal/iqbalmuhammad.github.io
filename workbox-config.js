module.exports = {
    "globDirectory": "dist/",
    "globPatterns": [
        "index.html",
        "nav-home.html",
        "nav-detail.html",
        "manifest.json",
        "app.js",
        "style.css",
        "assets/images/clubs/*.svg",
        "assets/images/*",
        "pages/detail.html",
        "pages/home.html",
        "pages/save.html",
        "pages/offline.html",
        "pages/404.html"
    ],
    "swDest": "dist/sw.js",
    "swSrc": "src/sw.js",
    "maximumFileSizeToCacheInBytes": 1024 * 1024 * 5,
    "globIgnores": [
        "../workbox-config.js"
    ]
};