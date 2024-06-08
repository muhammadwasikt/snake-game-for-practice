// Version
var appVersion = 'v1.00';

// File to cache
var files = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './setting.json',
    './Green Grass.jpg'
]

// Install
self.addEventListener('install', Event =>{
    Event.waitUntil(
        caches.open(appVersion)
        .then(cache=> {
            return cache.addAll(files)
            .catch(err=> {
                console.log('Error adding file to cache', err);
            })
        })
    )
    console.info('sw installed');
    self.skipWaiting();
})