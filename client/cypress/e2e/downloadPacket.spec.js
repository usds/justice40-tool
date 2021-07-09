// / <reference types="Cypress" />

describe('Census Block Group download', () => {
  it('validate file download', () => {
    cy.visit('localhost:8000/en/cejst');
    cy.get('#download-link').invoke('attr', 'target', '_blank');
    cy.get('button[class*="downloadPacket"]').debug().click();
    cy.readFile('cypress/downloads/01.csv').should('exist');
  });
});
