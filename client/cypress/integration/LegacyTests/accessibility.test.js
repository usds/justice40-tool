// / <reference types="Cypress" />

/**
 * The a11y check will use a cypress-axe library:
 *  - https://www.npmjs.com/package/cypress-axe
 *
 * This implements Deque's axe.run:
 *  - https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axerun
 *
 * The table of rule descriptions that are seen in the terminal can be seen in totality here:
 *  - https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
 *
 * The violation callback will post the violations into the terminal
 */

const endpoints = [
  // '/en/', needs an h1 tag on about page
  '/en/cejst',
  '/en/methodology',
];

// eslint-disable-next-line require-jsdoc
function terminalLog(violations) {
  cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`,
  );

  // pluck specific keys to keep the table readable
  // The results array is described here:
  // - https://www.deque.com/axe/core-documentation/api-documentation/#result-arrays
  // Unable to figure out how add the HTML element that the violation is occuring on. Using
  // Axe chrome plugin instead.
  const violationData = violations.map(
      ({id, impact, description}) => ({
        id,
        impact,
        description,
      }),
  );

  cy.task('table', violationData);
}


describe('Accessibility checks', () => {
  endpoints.forEach((endpoint) => {
    it(`Check Accessibility on ${endpoint} page`, () => {
      cy.visit(endpoint).get('main').then(() => {
        cy.injectAxe();
        cy.checkA11y(null, null, terminalLog);
      });
    });
  });
});
