// / <reference types="Cypress" />

describe('LatLng Test', () => {
  it('Checks that as the map zooms the lat/lng coordinates in the URL update', () => {
    cy.visit('http://localhost:8000/en/cejst?flags=mb');
    cy.url().should('include', '#3');
    cy.get('.maplibregl-ctrl-zoom-in > .maplibregl-ctrl-icon').click();
    cy.url().should('include', '#4');
    cy.getMap().then((map) => {
      cy.panTo(map, [-77.9, 35.04]);
      cy.url().should('include', '#4/35.04/-77.9');
    });
  });
});

