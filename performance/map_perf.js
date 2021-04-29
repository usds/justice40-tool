const puppeteer = require('puppeteer');

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

function zip(iterations) {
  return iterations[0].map((_, index) => {
    return iterations.map((iteration) => iteration[index])
  });
}

function getAverages(arrays) {
  return arrays.map(array => {
    return array.reduce((acc, val) => acc + val, 0) / array.length
  })
}

async function measurePageLoad(browser, name, url) {
  let measurements = new Array();

  for (let i = 0; i <= 10; i++) {
    const page = await browser.newPage()
    page.on('console', message => console.log(`\t${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
    console.log(name);
    await page.goto(url)
    let perf = [];
    let marks = await waitForMarks(page);
    perf.push(marks.styleLoad, marks.mapIdle);

    const navEvents = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('navigation'))))[0];
    perf.push(navEvents.domInteractive, navEvents.domComplete);
    measurements.push(perf);
  }
  return measurements;
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
  let full_measurements = {};
  // let options = ["openlayers", "olms", "leaflet", "mapbox", "ol_react"];
  for(const option of ["mb_react"]) {
    const measurements=  await measurePageLoad(browser, option, `http://localhost:1234/${option}.html`);
    full_measurements[option] = getAverages(zip(measurements));
    console.log(`Measurements from ${option}: ${measurements}`);
  }
  console.log(full_measurements);
  await browser.close();
})();