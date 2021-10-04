// / <reference types="Cypress" />

describe('Will it zoom into territories correctly?', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('http://localhost:8000/en/cejst');
  });

  // The below values all assume a 13-inch MB as set in viewport above.
  // Values will be different for different screens

  // Removing z as each tests has variance on it's value
  const tests = {
    'Lower 48': '/38.07/-95.87',
    'Puerto Rico': '/18.2/-66.583',

    // Todo: Understand what causes these two to hang intermittently ticket #579
    // 'Alaska': '/63.28/-162.39',
    // 'Hawaii': '5.35/20.574/-161.438',
  };

  for (const [territory, xy] of Object.entries(tests)) {
    it(`Can focus on ${territory} `, () => {
      cy.getMap().then((map) => {
        cy.get(`[aria-label="Focus on ${territory}"]`).click();
        cy.waitForMapIdle(map);
        cy.log(cy.url());
        cy.url().should('include', xy);
      });
    });
  };
});
