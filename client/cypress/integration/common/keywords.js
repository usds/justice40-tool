/* eslint-disable new-cap */

// Common keyword definitions for Gherkin workflows

import {ENDPOINTS} from '../LegacyTests/constants';
import {hyphenizeString} from './helpers';

// Common Givens:
Given('I am on the {string} page', (page) => {
  const pageArray = page.split(' ');
  cy.viewport(1060, 800);
  cy.visit(ENDPOINTS[pageArray.join('_').toUpperCase()]);
});

// Common Whens:
When(`I click on the {string} page in the navigation`, (page) => {
  const pageHyphenCase = hyphenizeString(page);
  cy.get(`[data-cy="nav-link-${pageHyphenCase}"]`).click();
});

When(`I look for the {string} CTA`, (ctaString) => {
  cy.get(`[data-cy="${hyphenizeString(ctaString)}-card"]`).scrollIntoView().should('be.visible');
});

// Common Thens:
Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title);
});

// Common Ands:
And(`I click on the {string} {string} link`, (ctaString, type) => {
  if (type === 'internal') cy.internalLinks(ctaString);
  else cy.externalLinks(ctaString);
});
