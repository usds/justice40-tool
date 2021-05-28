import {cy} from 'local-cypress';


describe('Translation Test', () => {
  it('Checks that locales have correct content', () => {
    cy.visit('http://localhost:8000');
    cy.url().should('include', '/en/');
    cy.get('header').contains('Justice40');
    cy.visit('http://localhost:8000/es');
    cy.get('header').contains('Justicia40');
  });
});
