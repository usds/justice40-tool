// / <reference types="Cypress" />

describe('Tests for the Explore the Map page', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('http://localhost:8000/en/cejst');
  });

  // The below values all assume a 13-inch MB as set in viewport above.
  // Values will be different for different screens
  const tests = {
    'Lower 48': '3.19/38.07/-95.87',
    'Puerto Rico': '7.65/18.2/-66.583',

    // Todo: Understand what causes these two to hang intermittently ticket #579
    // 'Alaska': '3/63.28/-162.39',
    // 'Hawaii': '5.35/20.574/-161.438',
  };

  for (const [territory, zxy] of Object.entries(tests)) {
    it(`Can focus on ${territory} `, () => {
      cy.getMap().then((map) => {
        cy.get(`[aria-label="Focus on ${territory}"]`).click();
        cy.waitForMapIdle(map);
        cy.url().should('include', zxy);
      });
    });
  };
});
