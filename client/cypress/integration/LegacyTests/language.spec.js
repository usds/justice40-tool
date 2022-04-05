// / <reference types="Cypress" />

import {PAGES_ENDPOINTS} from './constants';

describe('Navigate to each endpoint', () => {
  Object.values(PAGES_ENDPOINTS).map((endpoint) =>
    it(`for the ${endpoint} page, it adds /en and redirects`, () => {
      cy.visit(endpoint);
      cy.url().should('include', '/en/');
    }),
  );

  // Todo VS: Understand how to create es content
  // it('Sets page content to spanish when visiting Spanish URL', () => {
  //   cy.visit('http://localhost:8000/es');
  //   cy.get('h1').contains('Acerca de Justice40');
  // });
});
