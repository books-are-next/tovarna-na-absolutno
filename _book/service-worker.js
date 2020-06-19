/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-33fa717';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./01-predmluva.html","./02-kapitola-i-inzerat.html","./03-kapitola-ii-karburator.html","./04-kapitola-iii-panteismus.html","./05-kapitola-iv-bozsky-sklep.html","./06-kapitola-v-svetici-biskup.html","./07-kapitola-vi-meas.html","./08-kapitola-vii-go-on.html","./09-kapitola-viii-na-bagru.html","./10-kapitola-ix-slavnost.html","./11-kapitola-x-svata-elen.html","./12-kapitola-xi-prvni-srazka.html","./13-kapitola-xii-soukromy-docent.html","./14-kapitola-xiii-omluva-kronikare.html","./15-kapitola-xiv-zeme-hojnosti.html","./16-kapitola-xv-pohroma.html","./17-kapitola-xvi-na-horach.html","./18-kapitola-xvii-kladivo-a-hvezda.html","./19-kapitola-xviii-v-nocni-redakci.html","./20-kapitola-xix-kanonizacni-proces.html","./21-kapitola-xx-st-kilda.html","./22-kapitola-xxi-depese.html","./23-kapitola-xxii-stary-vlastenec.html","./24-kapitola-xxiii-augsburska-zapletka.html","./25-kapitola-xxiv-napoleon-horske-brigady.html","./26-kapitola-xxv-takzvana-nejvetsi-valka.html","./27-kapitola-xxvi-bitva-u-hradce-kralove.html","./28-kapitola-xxvii-na-tichomorskem-atolu.html","./29-kapitola-xxviii-u-sedmi-chalup.html","./30-kapitola-xxix-posledni-bitva.html","./31-kapitola-xxx-konec-vsemu.html","./32-zivot-a-doba-spisovatele-karla-capka-v-datech.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./images/ilu01.png","./images/ilu02.png","./images/ilu03.png","./images/ilu04.png","./images/ilu05.png","./images/ilu06.png","./images/ilu07.png","./images/ilu08.png","./images/ilu09.png","./images/ilu10.png","./images/ilu11.png","./images/ilu12.png","./images/ilu13.png","./images/ilu14.png","./images/ilu15.png","./images/ilu16.png","./images/ilu17.png","./images/ilu18.png","./scripts/bundle.js","./style/style.min.css","./title/arrow.gif","./title/dots.gif","./title/light.svg","./fonts/CapekCoverAGX.ttf","./fonts/CapekCoverAGX.woff2","./fonts/spectral/SIL Open Font License.txt","./fonts/spectral/Spectral-Bold.woff2","./fonts/spectral/Spectral-BoldItalic.woff2","./fonts/spectral/Spectral-Medium.woff2","./fonts/spectral/Spectral-MediumItalic.woff2","./fonts/space/AUTHORS.txt","./fonts/space/CONTRIBUTORS.txt","./fonts/space/OFL.txt","./fonts/space/variable/SpaceGroteskVariable.ttf","./fonts/space/variable/SpaceGroteskVariable.woff2","./fonts/space/webfont/SpaceGrotesk-Bold.woff","./fonts/space/webfont/SpaceGrotesk-Bold.woff2","./fonts/space/webfont/SpaceGrotesk-Light.woff","./fonts/space/webfont/SpaceGrotesk-Light.woff2","./fonts/space/webfont/SpaceGrotesk-Medium.woff","./fonts/space/webfont/SpaceGrotesk-Medium.woff2","./fonts/space/webfont/SpaceGrotesk-Regular.woff","./fonts/space/webfont/SpaceGrotesk-Regular.woff2","./fonts/space/webfont/SpaceGrotesk-SemiBold.woff","./fonts/space/webfont/SpaceGrotesk-SemiBold.woff2"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
