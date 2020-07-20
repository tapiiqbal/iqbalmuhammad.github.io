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
    "endpoint": "https://fcm.googleapis.com/fcm/send/d6VUBJhkevs:APA91bGZQMYYIwhTDTUxw7JaTdJslD4xUuonhxbrVf6xPX9W4I_rO9yPyb2HXIP7O98cL0i4V0tmLCcFqey__t9LeeVLvc79Xb0moH77jW4DQwgbs6hC2bTHdPE5Rgjc_Ee1CLqJCMDs",
    "keys": {
        "p256dh": "BFvmXy3bkwYZzipYuq7CyIO3W8Yy2BdYZJlG4QPtN6LZEKT4fTbdb/nevH/JUZjhbaIdwQhW70QBTYP3a4ddhvg=",
        "auth": "7mOp/tUWNOesmss+i2/fkg=="
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