const C='ahura-v79';const A=['./','./index.html','./icon-192.png','./icon-512.png','./pdf.min.mjs','./pdf.worker.min.mjs','./f400.woff2','./f700.woff2','./n400.woff2','./n700.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>null)))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
const nav=e.request.mode==='navigate';
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit||(nav?caches.match('./index.html'):Response.error()));
if(!hit)return net;if(nav||/\.(mjs|woff2|png|json)$/.test(u.pathname)){net.catch(()=>{});return hit}return net}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(w=>w.length?w[0].focus():clients.openWindow('./')))});
