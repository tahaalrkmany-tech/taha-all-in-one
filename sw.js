const CACHE_NAME = 'tahatech-v2';
const urlsToCache = [
  '/taha-all-in-one/',
  '/taha-all-in-one/index.html',
  '/taha-all-in-one/manifest.json',
  '/taha-all-in-one/icon-512.png',
  
  // الألعاب (21 لعبة)
  '/taha-all-in-one/8Ball.html',
  '/taha-all-in-one/BALLONe.html',
  '/taha-all-in-one/BowlingStrike.html',
  '/taha-all-in-one/CubexMaster.html',
  '/taha-all-in-one/DamascusDash.html',
  '/taha-all-in-one/Dino.html',
  '/taha-all-in-one/Draw.html',
  "/taha-all-in-one/Falcon's%20Fortune.html",
  '/taha-all-in-one/FruitNinja.html',
  '/taha-all-in-one/Glint%20Rush.html',
  '/taha-all-in-one/Goalsphere.html',
  '/taha-all-in-one/IceCreamBlitz.html',
  '/taha-all-in-one/MeteorSlayer.html',
  '/taha-all-in-one/SeaStrike.html',
  '/taha-all-in-one/Snakeladder.html',
  '/taha-all-in-one/Sudoku.html',
  '/taha-all-in-one/Summerblaze.html',
  '/taha-all-in-one/Super-dino.html',
  '/taha-all-in-one/X-OGame.html',
  '/taha-all-in-one/YT-CRUSH4.html',
  '/taha-all-in-one/%D9%87%D9%88%D9%83%D9%8A.html',
  
  // الأدوات (6 أدوات)
  '/taha-all-in-one/PDFCONVERTOR.html',
  '/taha-all-in-one/QuranCalendar.html',
  '/taha-all-in-one/TahaProCalculator.html',
  '/taha-all-in-one/TahaSignature.html',
  '/taha-all-in-one/Translate_weather.html',
  '/taha-all-in-one/Files%20write%20and%20edit.html'
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 تخزين الملفات في الكاش...');
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات: من الكاش إذا كان موجوداً، وإلا من الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
  );
});

// تحديث الكاش عند وجود إصدار جديد
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ حذف الكاش القديم:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
