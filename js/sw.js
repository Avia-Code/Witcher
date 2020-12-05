var APP_PREFIX = 'ApplicationName_Witcher'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/{Witcher}/',                     // If you have separate JS/CSS files,
  '/{Witcher}/index.html',            // add path to those files here
  '/{Witcher}/css/script.min.js',
  '/{Witcher}/js/style.min.css',
  '/{Witcher}/fonts/MasonChronicles.woff',
  '/{Witcher}/fonts/Roboto-Bold.woff',
  '/{Witcher}/fonts/Roboto-Regular.woff',
  '/{Witcher}/img/series/s1.webp',
  '/{Witcher}/img/series/s2.webp',
  '/{Witcher}/img/series/s3.webp',
  '/{Witcher}/img/series/s4.webp',
  '/{Witcher}/img/series/s5.webp',
  '/{Witcher}/img/series/s6.webp',
  '/{Witcher}/img/series/s7.webp',
  '/{Witcher}/img/series/s8.webp',
  '/{Witcher}/img/background.webp',
  '/{Witcher}/img/arrow.svg',
  '/{Witcher}/img/play.svg',
  '/{Witcher}/img/star.svg',
  '/{Witcher}/img/star-0.svg',
  '/{Witcher}/img/logo.webp',
  '/{Witcher}/img/social/facebook.svg',
  '/{Witcher}/img/social/instagram.svg',
  '/{Witcher}/img/social/twitter.svg'
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i])
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
