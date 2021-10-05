import {ENDPOINTS} from '../LegacyTests/constants';

// Common Givens:
// eslint-disable-next-line new-cap
Given('I am on the {string} page', (page) => {
  const pageArray = page.split(' ');
  cy.viewport(1060, 800);
  cy.visit(ENDPOINTS[pageArray.join('_').toUpperCase()]);
});

// Common Whens:
// eslint-disable-next-line new-cap
When(`I click on the {string} page in the navigation`, (page) => {
  const pageHyphenCase = page.split(' ').join('-').toLowerCase();
  cy.get(`[data-cy="nav-link-${pageHyphenCase}"]`).click();
});

// Common Thens:
// eslint-disable-next-line new-cap
Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title);
});


