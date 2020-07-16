 https://console.firebase.google.com/

 Setelah project berhasil di buat, selanjutnya pada halaman baru yang muncul klik ikon Settings lalu pilih Project Settings.

 Di halaman Settings, klik tab Cloud Messaging, akan terlihat kotak Project credential yang menampilkan Server key dan Sender ID yang berguna saat akan mengirim pesan push.

 Buat berkas manifest.json dan salin Sender ID dan simpan ke dalam file manifest.json dengan key gcm_sender_id. Langkah ini diperlukan agar FCM bisa bekerja di Chrome sebelum versi 52, Opera Android, dan Samsung Internet.

 Jangan lupa untuk mendaftarkan file manifest.json ke dalam tag <head>:
 <link rel="manifest" href="/manifest.json">

npm install web-push -g

web-push generate-vapid-keys --json

install indexeddb
npm install idb@2.1.3

#run build
npm run build
#run dev
npm run start-dev
