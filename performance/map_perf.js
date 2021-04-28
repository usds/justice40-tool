const puppeteer = require('puppeteer');

var get_page_load_stats = function() {
    var p = performance.getEntriesByType("navigation")[0];
    // console.log("DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart));
    console.log("DOM interactive = " + p.domInteractive);
    console.log("DOM complete = " + p.domComplete);
    // // document load and unload time
    // console.log("document load = " + (p.loadEventEnd - p.loadEventStart));
    // console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart));

    // // other properties
    // console.log("type = " + p.type);
    // console.log("redirectCount = " + p.redirectCount);

}

async function waitForMarks(page) {
  // console.log("Waiting called...");
  const markTimingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('mark')));
  const resourceTiming = JSON.parse(markTimingJson)
  const styleLoadTiming = resourceTiming.find(element => element.name.includes('STYLE_LOADED'));
  const mapIdleTiming = resourceTiming.find(element => element.name.includes('MAP_IDLE'));
  
  // console.log(styleLoadTiming, mapIdleTiming);
  if (styleLoadTiming == undefined || mapIdleTiming == undefined) {
    // console.log("waiting...");
    await delay(2);
    return waitForMarks(page);
  } else {
    // console.log("values present...");
    return {
      styleLoad: styleLoadTiming.startTime, 
      mapIdle: mapIdleTiming.startTime
    }
  }
  
}

async function measurePageLoad(browser, name, url) {
  const page = await browser.newPage()
  page.on('console', message => console.log(`\t${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
  console.log(name);
  await page.goto(url)
  marks = await waitForMarks(page);
  console.log("\tStyle Loaded: ", marks.styleLoad, "Map idle:", marks.mapIdle);
  await page.evaluate(get_page_load_stats);
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

(async () => {
  const browser = await puppeteer.launch({
      // headless: false,
      // devtools: true,
      waitUntil: 'networkidle2'
  });
  
  // page.on('pageerror', ({ message }) => console.log("\t", message));
  // page.on('response', response => console.log(`\t${response.status()} ${response.url()}`));
  // page.on('requestfailed', request => console.log(`\t${request.failure().errorText} ${request.url()}`));
  // const devtoolsProtocolClient = await page.target().createCDPSession();
  //   await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });
  await measurePageLoad(browser, "OpenLayers", 'http://localhost:1234/openlayers.html');
  await measurePageLoad(browser, "OpenLayers+MB", 'http://localhost:1234/olms.html');
  await measurePageLoad(browser, "Leaflet", 'http://localhost:1234/leaflet.html');
  await measurePageLoad(browser, "Mapbox", 'http://localhost:1234/mapbox.html');
  await browser.close()
})();