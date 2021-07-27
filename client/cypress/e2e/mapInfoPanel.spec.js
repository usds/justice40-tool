// / <reference types="Cypress" />

/*
A risk with this test is that if the feature/area that is currently being selected become non-prioritized, then this
test will fail. However it would be a major win for that area!
*/
import {ENDPOINTS} from './constants';

const devices = [
  [1024, 720],
  ['iphone-6', 'portrait'],
  ['samsung-s10', 'portrait'],
];

describe('tests that the map side panel renders MapIntroduction component', () => {
  devices.forEach((device) => {
    it(`should render MapIntroduction component on ${device[0]} x ${device[1]}`, () => {
      cy.visit(ENDPOINTS.EXPLORE_THE_TOOL);
      cy.viewport(device[0], device[1]);
      cy.get('aside').should('be.visible');
    });
  });
});

describe('tests that the map side panel renders AreaDetail component', () => {
  devices.forEach((device) => {
    it(`should render AreaDetail component on ${device[0]} x ${device[1]}`, () => {
      // Only set the viewport for mobile devices:
      if (!Number.isInteger(device[0])) cy.viewport(device[0], device[1]);
      cy.visit(ENDPOINTS.EXPLORE_THE_TOOL);
      cy.getMap().then((map) => {
        // Loop over the click event simulating zooming by a certain amount
        // The map will end at the end zoom level
        const endZoomLevel = device[0].isInteger ? 11 : 10;
        for (let zoom = 3; zoom <= endZoomLevel; zoom++) {
          cy.get('.mapboxgl-ctrl-zoom-in > .mapboxgl-ctrl-icon').click();
          cy.waitForMapIdle(map);
        }
        cy.get('.overlays').click('bottomRight');
        cy.get('aside').should('be.visible');
        cy.get('[data-cy="score"]').should('be.visible');
        cy.get('[data-cy="indicatorBox"]').should('be.visible');
        cy.get('[data-cy="indicatorBox"]')
            .each((indicator) => cy.wrap(indicator)
                // currently the padding-top on desktop = 1.5rem => 24px
                // currently the padding-top on mobile = .8 rem => 8px
                .should('have.css', 'padding-top', `${Number.isInteger(device[0]) ? '24px' : '8px'}`));
      });
    });
  });
});
