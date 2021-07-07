self.addEventListener('install', e => {
    console.log('Installed SW')
})

const version = 'beproductive'
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then( allCaches => {
            allCaches.map(cacheName => cacheName !== version ? caches.delete(cacheName) : cacheName)
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).then( allReq => {
            const resClone = allReq.clone();

            caches.open(version).then(cache => {
                cache.put(e.request, resClone)
            })

            return allReq
        }).catch( () => caches.match(e.request))
    )
})