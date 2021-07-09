// / <reference types="Cypress" />

describe('Tests for the Explore the Map page', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('http://localhost:8000/en/cejst');
  });

  // The below values all assume a 13-inch MB as set in viewport above.
  // Values will be different for different screens
  const tests = {
    'Lower 48': '3.83/38.07/-95.87',
    'Alaska': '3.36/63.28/-140.24',
    'Hawaii': '5.94/20.574/-161.438',
    'Puerto Rico': '8.24/18.2/-66.583',
  };

  for (const [territory, zxy] of Object.entries(tests)) {
    it(`Can zoom to ${territory} `, () => {
      cy.get(`[aria-label="Zoom to ${territory}"]`).click();
      cy.url().should('include', zxy);
    });
  };
});

