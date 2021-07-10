// / <reference types="Cypress" />

describe('Census Block Group download', () => {
  it('validate file download', () => {
    cy.visit('localhost:8000/en/cejst');
    cy.get('#download-link').invoke('attr', 'target', '_blank');
    cy.intercept(`https://usds-geoplatform-justice40-website.s3.amazonaws.com/data/score/csv/usa.csv`,
        {
          body: 'success',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Disposition': 'attachment',
          },
        },
    ).as('downloadRequest');
    cy.get('button[class*="downloadPacket"]').click();
    cy.wait('@downloadRequest');
    cy.readFile(`cypress/downloads/usa.csv`).should('exist');
  });
});
