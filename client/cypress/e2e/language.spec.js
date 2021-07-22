// / <reference types="Cypress" />

describe('Translation Test', () => {
  it('Sets default language to /en and redirects', () => {
    cy.visit('http://localhost:8000');
    cy.url().should('include', '/en/');
    cy.get('h1').contains('About Justice40');
  });

  it('Sets page content to spanish when visiting Spanish URL', () => {
    cy.visit('http://localhost:8000/es');
    cy.get('h1').contains('Acerca de Justice40');
  });
});
