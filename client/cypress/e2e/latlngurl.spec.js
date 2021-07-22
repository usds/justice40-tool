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
});

