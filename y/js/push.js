let webPush = require("web-push");

const vapidKeys = {
    publicKey: "BPnqk6gNYt4CB0ggbuNdUI2RZelckizSy4xBZYlPMr5dV54DKkP2MbacsNr5MbQnqjERd3hhxFehfKgiz-F_NUs",
    privateKey: "2_0z_pkcMkwDeoqRQxZcv-1cn3faFZG_EN0EhEwynNI",
};

webPush.setVapidDetails(
    "mailto:nikoprayudha@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
let pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/e6z_y4DJSzM:APA91bHDqY0RsXHedmYuaZ3eBF7CiBqyrcx5W_HuuTHcL6kju2Ex3m-gg3f_Li1edOwYBEGTxe5ihVYAvZul7MfCZ8c7G07FxhskF0vJ6eLv4voE5xodeUyPyJs_9VamDi8vJA_9SpEZ",
    keys: {
        p256dh: "BMZwjtbB75ah1WqmrqTFqgyqA3T0g/E3lVSvjYBlu8dgVFnM2LL04DJn3Z+bR4DNyGDgb4dgB3tMnSlJMiiXgMw=",
        auth: "qgMN0FDfXpgyQn850C0l2A==",
    },
};
let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

let options = {
    gcmAPIKey: "201917952201",
    TTL: 60,
};
webPush
    .sendNotification(pushSubscription, payload, options)
    .then((status) => {
        console.log(status);
    })
    .catch((error) => {
        console.log(error);
    });