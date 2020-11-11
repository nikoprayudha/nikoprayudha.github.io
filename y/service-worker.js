importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

// Force development builds
workbox.setConfig({ debug: true });

workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/images/icon.png", revision: "1" },
    { url: "/images/logo.png", revision: "1" },
    { url: "/images/maskable_icon_192.png", revision: "1" },
    { url: "/images/maskable_icon_96.png", revision: "1" },
    { url: "/images/maskable_icon_512.png", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/iconfont/material-icons.css", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.eot", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.woff2", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.woff", revision: "1" },
    { url: "/iconfont/MaterialIcons-Regular.ttf", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/push.js", revision: "1" },
    { url: "/js/sw-register.js", revision: "1" },
    { url: "/pages/standings.html", revision: "1" },
    { url: "/pages/teams.html", revision: "1" },
    { url: "/pages/favoriteteams.html", revision: "1" },
]);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

self.addEventListener("push", function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }
    var options = {
        body: body,
        icon: "images/logo.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});