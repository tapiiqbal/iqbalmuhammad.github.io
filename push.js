var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BMxVCipfJYQOh7oP4pMtucmgViaxzfyEZDkgxADqfC6aa3ZRyXx9Sj_jCPcI0LQK37L9CgQezhsocbYElT_IKF8",
    "privateKey": "pr_XXwVplNF-hQ4adUqs2P4ImF46em4TMs_RjHW2sE8"
};

webPush.setVapidDetails(
    'mailto:tapiiqbal@gmail.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dIoCXRcZaDk:APA91bEHiGbHkYt7E_-AbqBJzq8FW19adtxPqZsv3PB4t88HdQYrCBfAhOA22c_P3pOOm-vzIlrtrZFgczvWHz4N9gKyzwpiWsgdtpeEE_GHySDgOHYNQ74qkdttQFLFsE08TGn6PXs7",
    "keys": {
        "p256dh": "BMoxwRV9Wg3JmxNIHtxxfXN5kQivozgE4d4kDtsHo9yeBLtWipchuBPyyB6m7T4Uef0tEm7/h3pBTIrsE7gLlA0=",
        "auth": "MwRzinG+wkNLgf7Hxhzfsg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '849897549041',
    TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);