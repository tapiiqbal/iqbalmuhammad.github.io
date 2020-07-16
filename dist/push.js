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
    "endpoint": "https://fcm.googleapis.com/fcm/send/cNNHNfrmyug:APA91bEV6ipjbuClE0Vg9A3rSqsLKd2fVZvVpN4Z2WKuLIi-OYBehanoy4yHmcXqQ7aoRN8R_jfldU5-RMVYMmg4P6TAL4mXlP7C_POrvhU7ZuPXu2nCE3pbMqtMPaUS7gHv1-HwEFIN",
    "keys": {
        "p256dh": "BNrGyLsvsEkyzBTEjFp5Um/03myHrQla7MMsGmcP/lD3WBAhI+yGkyXXX2qv9rTmNeQIyKQx18Qq7l24QDE1zRg=",
        "auth": "TDfy3JYCzBuzCwz+1aDE0Q=="
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