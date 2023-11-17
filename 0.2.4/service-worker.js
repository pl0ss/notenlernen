self.addEventListener("install", e => {
    e.waitUntil(
        cache_files()
    );
});

function cache_files(){
    caches.open("static/music/notenlernen/").then(cache => {
        return cache.addAll(["./", "./index.html", "./style.css", "./script.js", "./manifest.json", "./service-worker.js", "./img/notenschlüssel_logo_white_500x.png", "./img/notenschlüssel_logo_white_200x_rounded.png"])
    });
}

self.addEventListener('message', function (e) {
    if(e.data == 'cache_files'){
        cache_files();
        console.log("new files cached");
    }
})

self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});