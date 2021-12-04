// / <reference types="Cypress" />

describe('Does the map zoom and adjust to lat/long correctly?', () => {
  it('should start at zoom level 3', () => {
    cy.visit('http://localhost:8000/en/cejst');
    cy.url().should('include', '#3');
  });
  it('should change to level 4 when you hit the zoom button', () => {
    cy.get('.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in').click({force: true});
    cy.url().should('include', '#4');
  });
  // it('should show the correct lat/lng coordinates in the URL',
  //     {
  //       retries: {
  //         runMode: 3,
  //         openMode: 3,
  //       },
  //       defaultCommandTimeout: 4000,
  //       execTimeout: 10000,
  //       taskTimeout: 10000,
  //       pageLoadTimeout: 10000,
  //       requestTimeout: 5000,
  //       responseTimeout: 10000,
  //     },
  //     () => {
  //       cy.getMap().then((map) => {
  //         cy.panTo(map, [-77.9, 35.04]);
  //         cy.url().should('include', '#4/35.04/-77.9');
  //       });
  //     });

  // This test hangs intermittently (30% of the time) need to investigate why
  // it('allows user to specify alternative starting URL',
  //     {
  //       retries: {
  //         runMode: 3,
  //         openMode: 3,
  //       },
  //       defaultCommandTimeout: 4000,
  //       execTimeout: 10000,
  //       taskTimeout: 10000,
  //       pageLoadTimeout: 10000,
  //       requestTimeout: 5000,
  //       responseTimeout: 10000,
  //     },
  //     () => {
  //       const [expectedZoom, expectedLat, expectedLng] = [12.05, 41.40965, -75.65978];
  //       const expectedURL = `http://localhost:8000/en/cejst/#${expectedZoom}/${expectedLat}/${expectedLng}`;
  //       cy.visit(expectedURL);
  //       cy.getMap().then((map) => {
  //         cy.waitForMapIdle(map);
  //         cy.url().should('equal', expectedURL);
  //         const actualZoom = map.getZoom();
  //         const actualCenter = map.getCenter();
  //         expect(actualCenter.lat).to.eq(expectedLat);
  //         expect(actualCenter.lng).to.eq(expectedLng);
  //         expect(actualZoom).to.eq(expectedZoom);
  //       });
  //     });
});

