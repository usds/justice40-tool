// / <reference types="Cypress" />

describe('LatLng Test', () => {
  it('URL starts at zoom level 3', () => {
    cy.visit('http://localhost:8000/en/cejst');
    cy.url().should('include', '#3');
  });
  it('URL changes to level 4 when you hit the zoom button', () => {
    cy.get('.mapboxgl-ctrl-zoom-in > .mapboxgl-ctrl-icon').click();
    cy.url().should('include', '#4');
  });
  it('URL includes correct lat/lng coordinates', () => {
    cy.getMap().then((map) => {
      cy.panTo(map, [-77.9, 35.04]);
      cy.url().should('include', '#4/35.04/-77.9');
    });
  });
  it('allows user to specify alternative starting URL', () => {
    const [expectedZoom, expectedLat, expectedLng] = [12.05, 41.40965, -75.65978];
    const expectedURL = `http://localhost:8000/en/cejst/#${expectedZoom}/${expectedLat}/${expectedLng}`;
    cy.visit(expectedURL);
    cy.getMap().then((map) => {
      cy.waitForMapIdle(map);
      cy.url().should('equal', expectedURL);
      const actualZoom = map.getZoom();
      const actualCenter = map.getCenter();
      expect(actualCenter.lat).to.eq(expectedLat);
      expect(actualCenter.lng).to.eq(expectedLng);
      expect(actualZoom).to.eq(expectedZoom);
    });
  });
});

