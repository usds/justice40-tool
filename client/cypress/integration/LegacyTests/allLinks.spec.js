// / <reference types="Cypress" />

import {PAGES_ENDPOINTS} from '../LegacyTests/constants';

describe('Do all the English pages have all links with a defined href attribute?', () => {
  const pages = Object.values(PAGES_ENDPOINTS);

  pages.forEach((page) => {
    it(`test all href attr on ${page} page`, () => {
      cy.visit(page);

      // Checks to make sure all a tags have an href:
      cy.get('a').each(($a) => {
        const message = $a.text();
        expect($a, message).to.have.attr('href').not.contain('undefined');
      });
    });
  });
});
