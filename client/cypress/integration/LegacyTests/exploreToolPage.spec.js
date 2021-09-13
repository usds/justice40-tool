// / <reference types="Cypress" />

describe('tests links on Explore Tool Page', () => {
  it('validate file download', () => {
    cy.visit('localhost:8000/en/cejst');

    // Checks to make sure all a tags have an href:
    cy.get('a').each(($a) => {
      const message = $a.text();
      expect($a, message).to.have.attr('href').not.contain('undefined');
    });
  });
});
