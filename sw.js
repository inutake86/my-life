const CACHE='my-life-v0381-onedrive-test';
const ASSETS=['./','./index.html','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith((async()=>{
    try{return await fetch(e.request);}
    catch(err){
      const cached=await caches.match(e.request,{ignoreSearch:true});
      if(cached) return cached;
      return Response.error();
    }
  })());
});
