import {hyphenizeString} from '../integration/common/helpers';

// For some interactions, we need access to the underlying map
// Below adapted from https://github.com/codeforcologne/edelgard-map
Cypress.Commands.add('getMap', () => {
  return cy.window().its('underlyingMap', {timeout: 10000});
});

Cypress.Commands.add('waitForMove', (map) => {
  return new Cypress.Promise((resolve) => {
    map.on('moveend', resolve);
  });
});

Cypress.Commands.add('panTo', (map, lngLat) => {
  map.panTo(lngLat);
  cy.waitForMove(map);
});

Cypress.Commands.add('getMapCanvas', () => {
  return cy.get('.maplibregl-canvas');
});

Cypress.Commands.add('waitForMapIdle', (map) => {
  return new Cypress.Promise((resolve) => {
    map.once('idle', resolve);
  });
});

Cypress.Commands.add('internalLinks', (string) => {
  return cy.get(`[data-cy="${hyphenizeString(string)}-block"] a`).click();
});

Cypress.Commands.add('externalLinks', (string) => {
  return cy.get(`[data-cy="${hyphenizeString(string)}-block"] a`).then((link) => {
    cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200);
  });
});

Cypress.Commands.add('externalFooterLinks', (string) => {
  return cy.get(`[data-cy="${hyphenizeString(string)}"]`).then((link) => {
    cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200);
  });
});
