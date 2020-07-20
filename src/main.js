document.addEventListener('DOMContentLoaded', () => {
    // REGISTER SERVICE WORKER
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async() => {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                requestPermission();
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            } catch (err) {
                console.log('ServiceWorker registration failed: ', err);
            }
        })
    }

    function requestPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(function(result) {
                if (result === "denied") {
                    console.log("Fitur notifikasi tidak diijinkan.");
                    return;
                } else if (result === "default") {
                    console.error("Pengguna menutup kotak dialog permintaan ijin.");
                    return;
                }

                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function(registration) {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BMxVCipfJYQOh7oP4pMtucmgViaxzfyEZDkgxADqfC6aa3ZRyXx9Sj_jCPcI0LQK37L9CgQezhsocbYElT_IKF8")
                        }).then(function(subscribe) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                            localStorage.setItem('endpoint', JSON.stringify(subscribe.endpoint));
                            localStorage.setItem('p256dh', JSON.stringify(btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh'))))));
                            localStorage.setItem('auth', JSON.stringify(btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth'))))));
                        }).catch(function(e) {
                            location.reload();
                            console.error(e.message);
                        });
                    });
                }
            });
        }
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
})