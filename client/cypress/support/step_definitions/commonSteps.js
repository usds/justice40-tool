/* eslint-disable new-cap */

// Common step definitions for Gherkin

import {ENDPOINTS} from '../../integration/LegacyTests/constants';
import {hyphenizeString} from '../../integration/common/helpers';

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
  cy.get(`[data-cy="${hyphenizeString(ctaString)}-block"]`).as('CTA_block');
  cy.get('@CTA_block').scrollIntoView().should('be.visible');
});

When(`I look for the {string}`, (footer) => {
  cy.get(`[data-cy="${hyphenizeString(footer)}-primary-block"]`).scrollIntoView().should('be.visible');
});

// Common Thens:
Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title);
});

Then(`All links under {string} should work`, (title) => {
  cy.testExternalLinks(title);
});

Then(`the link should allow client to send an email to {string}`, (email) => {
  cy.get(`@CTA_block`).find('a').invoke('attr', 'href').should('eq', `mailto:${email}`);
});

Then(`the link should respond successfully`, () => {
  cy.get(`@externalLink`).then((link) => {
    cy.request(link.prop('href'))
        .its('status')
        .should('eq', 200);
  });
});

// Common Ands:
And(`I click on the {string} {string} link`, (ctaString, type) => {
  const CTALinkSelector = `[data-cy="${hyphenizeString(ctaString)}-block"] a`;

  if (type === 'internal') {
    cy.get(CTALinkSelector).click();
  } else {
    cy.get(CTALinkSelector).as('externalLink');
  };
});

And(`I click on the {string} footer link`, (string) => {
  cy.get(`[data-cy="${hyphenizeString(string)}"]`).as('externalLink');
});

And(`I click on the {string} event`, (string) => {
  cy.get(`[data-cy="${hyphenizeString(string)}-block"]`).as('externalLink');
});
