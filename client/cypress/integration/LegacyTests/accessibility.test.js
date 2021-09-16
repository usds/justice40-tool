// / <reference types="Cypress" />

// Define at the top of the spec file or just import it

// eslint-disable-next-line require-jsdoc
function terminalLog(violations) {
  cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`,
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
      ({id, impact, description, nodes}) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
      }),
  );

  cy.task('table', violationData);
}


describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/').get('main').injectAxe();
  });
  it('Has no detectable accessibility violations on load', () => {
    cy.checkA11y(null, {includedImpacts: ['critical']}, terminalLog);
  });
});
