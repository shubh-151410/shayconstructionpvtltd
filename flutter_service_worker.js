'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "01d342fb4cd5a892bb36703d39e3fec5",
"assets/assets/icons/facebook.png": "1b0520e172c29d409f8593b2324424d1",
"assets/assets/icons/instagram.png": "2785e88d2159923fbd2dfcca05d72c78",
"assets/assets/icons/telegram.png": "177853a7b1078b23f8c6a61486ca06fe",
"assets/assets/icons/twitter.png": "ba35785cbd918e3a2d909fb6665e5c0c",
"assets/assets/images/growth.png": "312ad01bcfec4b844651a110231aa6b2",
"assets/assets/images/hi.gif": "cad5918d86b6a7e83f1fb4acead70e4c",
"assets/assets/images/image1.png": "ad95121576d95040dff1dc273831d5c8",
"assets/assets/images/journey.png": "f185ce57b108dc9c8ad76d89d5661824",
"assets/assets/images/mission.png": "cc2dfa2b7e6c97b9bf4821fa7c9bd8eb",
"assets/assets/images/project1_actual.png": "8881553390d02cf98a071ffc0fe47293",
"assets/assets/images/project1_virtual.png": "2e960e87b41619ca0b8761b60d5cb3fa",
"assets/assets/images/project2_actual.png": "980623aeb66d843fe9d0b85235d461f4",
"assets/assets/images/project2_virtual.png": "152c10206f043623e58bfc3fd68bb11d",
"assets/assets/images/project3_actual.png": "d6232b8b7d3f6494f02a900634574455",
"assets/assets/images/project3_virtual.png": "3e149a0d15bd3fb94242e07fbe3c7bbb",
"assets/assets/images/projects/project1.jpg": "d811848751ee1c5d21a7265885c650e4",
"assets/assets/images/projects/project2.jpg": "06749591a3940ea0f21408f483f1e0b8",
"assets/assets/images/projects/project4.jpg": "d9611f5231c9e8b6ad51b31ff895ae93",
"assets/assets/images/projects/project5.jpg": "44312adca367d08e01b48d10fe6d5b66",
"assets/assets/images/projects/project6.jpg": "f58605cdbf8be0d6e66136f03f5b3871",
"assets/assets/images/shaylogo.png": "c2ba579defcb0fa61a104ee63b106715",
"assets/assets/images/team/anurag.jpeg": "c32199f65b4c18da04c1e53b1941dcea",
"assets/assets/images/team/himanshu.jpg": "159bbe26276dbcf024be961f0581c2b0",
"assets/assets/images/team/rajesh.jpeg": "7ece7e60e23fbc32dc61dc6301d6167d",
"assets/assets/images/team/shudhanshu.jpg": "adc331254da5a968a5114bb8fc39eae2",
"assets/assets/images/team/vinod.jpeg": "e98c4895c197783a3f3032b82207983b",
"assets/font/Futura-Normal.ttf": "e15e04d5b8ea210a0a98596732a32871",
"assets/FontManifest.json": "ee5f158de229a8760417a27cd311a462",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "6600788555c53a9a02db2b09f5bf2b23",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "e430f2f229b1a9126b9b96896408ca3d",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "8f71b8c018d13dd6e2bfaa423dc4b85e",
"/": "8f71b8c018d13dd6e2bfaa423dc4b85e",
"main.dart.js": "00824de4ae20c79d4e1b3b2d648539e4",
"manifest.json": "0395255d1940a4d4988c23581965f971",
"version.json": "1d6624a089800c49ea65727c6702e6c9"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
