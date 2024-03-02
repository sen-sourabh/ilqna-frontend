const staticCacheList = [
    // localhost
      // '/static/js/main.chunk.js',
      // '/static/js/0.chunk.js',
      // '/static/js/bundle.js',
      // '/static/js/0.chunk.js.map',
      // '/static/js/main.chunk.js.map',
    // -------------------------------------------
    '/index.html',
    '/manifest.json',
    '/',
     //---- added especially for production
    //  '/static/js/main.fb4fa32b.chunk.js',
    //  '/static/js/4.001eda69.chunk.js',
    //  '/static/css/4.694d48bd.chunk.css',
    //  '/static/css/main.39c77e19.chunk.css',
    //  --------------------------------------------------
    // images
    // '/plantika_favicon.ico',
    // '/static/media/menu-icon.738468fd.svg',
    // '/static/media/need-help.ddd80562.svg',
    // '/static/media/setting.de231dae.svg',
    // '/static/media/alerts.c58a5f48.svg',
    // '/static/media/newExcel.23cdf209.svg',
    // '/static/media/white-arrow.55e481ac.svg',
    // '/static/media/icon3.c1c43c2f.svg',
    // '/static/media/icon9.d7a48586.svg',
    // '/static/media/drag_icon.d01f1697.svg',
    // '/static/media/icon1.f315cf46.svg',
    // '/static/media/icon2.be4ce653.svg',
    // '/static/media/icon4.b6173bcb.svg',
    // '/static/media/icon5.99922f06.svg',
    // '/static/media/icon6.47be2e23.svg',
    // '/static/media/edit.ac1c347d.svg',
  // check list icons
    // '/static/media/icon_Activation%20test.57d063ee.svg',
    // '/static/media/icon_Air%20flow%20measurement.6cf1aaab.svg',
    // '/static/media/icon_Measurement%20of%20currents.a7f120e5.svg',
    // '/static/media/icon_Visual%20inspection%20and%20audio.cbce8cd6.svg',
    // '/static/media/icon_visual%20test.eeaebce4.svg',
    // '/static/media/icon_pressure_measurement.2a1133a7.svg',
    // '/static/media/icon_measuring_airflow_velocity.4193b4d1.svg'
  ]
  
  const staticCache = 'ilqna-static-cache'
  const dynamicCache = 'ilqna-dynamic-cache'
  
  // installation service worker and adding static cache
  this.addEventListener('install',e => {
    e.waitUntil(
        caches.open(staticCache)
        .then(cache => cache.addAll(staticCacheList))
    )
  })
  // activating service worker, remove all unnecessary caches
  self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames
        .filter(name => name !== staticCache)
        // .filter(name => name !== dynamicCacheName)
        .map(name => caches.delete(name))
    )
  })
  
  // network requests
  this.addEventListener('fetch',e => {
    // if react routing return index.html
    if (e.request.mode === 'navigate') {
        e.respondWith(caches.match('/index.html'));
        // if offline upload from cache
      } else{
        if(!navigator.onLine){
            e.respondWith(
                caches.match(e.request)
                .then(res =>{
                    if(res){
                        return res
                    }
                })
            )
        }
      }
  })