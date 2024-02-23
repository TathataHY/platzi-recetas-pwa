/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html");

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  /^https:\/\/www.themealdb.com\/api\/.*/,
  workbox.strategies.staleWhileRevalidate(),
  "GET"
);

workbox.routing.registerRoute(
  /^https:\/\/www.themealdb.com\/images\/.*/,
  workbox.strategies.cacheFirst({
    cacheName: "api-image-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

// Por defecto. Va al final de todo
workbox.routing.registerRoute(
  /^https?.*/,
  workbox.strategies.networkFirst({}),
  "GET"
);
