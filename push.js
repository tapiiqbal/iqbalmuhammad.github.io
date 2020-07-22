const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BMxVCipfJYQOh7oP4pMtucmgViaxzfyEZDkgxADqfC6aa3ZRyXx9Sj_jCPcI0LQK37L9CgQezhsocbYElT_IKF8",
    "privateKey": "pr_XXwVplNF-hQ4adUqs2P4ImF46em4TMs_RjHW2sE8"
};

webPush.setVapidDetails(
    'mailto:tapiiqbal@gmail.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e7eLIZNLSRM:APA91bF0SNTvaKRgrZ4ZXnLOX43V6yTxcjtMoBZ4lZM6zGYsMWSSxMePFDrFEOtYi3sbPYa7LlXMnsEIRxbj6cJvhcfpxj-DIOJ77Z48ZmmIOdircA6xHFT8kD49FDHUT0cl_xCZTnRz",
    "keys": {
        "p256dh": "BHXaO7JnwL4Yko813hw3xil4d7vD/hlTPPtLGfpP06pdBjq0F0uMQTUyj9O/1nAfSo5aiMM0gxrQ0+T72EY9Aq8=",
        "auth": "5lvr9NjgdYIwutk2jW+CWQ=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '849897549041',
    TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);