// / <reference types="Cypress" />

// describe('Map side panel', () => {
//   it('should show the map introduction text', () => {
//     cy.visit('http://localhost:8000/en/cejst');

//     // validate that side panel intro text is show
//     cy.get('div[class*="mapIntroHeader"]').scrollIntoView();
//     cy.get('div[class*="mapIntroHeader"]').contains('Zoom').should('be.visible');

//     // Simulate a click on the map
//   });
// });

// describe('Tests for the Explore the Map page', () => {
//   beforeEach(() => {
//     cy.viewport('macbook-13');
//     cy.visit('http://localhost:8000/en/cejst');
//   });

//   // The below values all assume a 13-inch MB as set in viewport above.
//   // Values will be different for different screens
//   const tests = {
//     'Lower 48': '3.25/38.07/-95.87',
//     'Alaska': '3/63.28/-162.39',
//     'Hawaii': '5.89/20.574/-161.438',
//     'Puerto Rico': '8.19/18.2/-66.583',
//   };

//   for (const [territory, zxy] of Object.entries(tests)) {
//     it(`Can focus on ${territory} `, () => {
//       cy.getMap().then((map) => {
//         cy.get(`[aria-label="Focus on ${territory}"]`).click();
//         cy.waitForMapIdle(map);
//         cy.url().should('include', zxy);
//       });
//     });
//   };
// });
