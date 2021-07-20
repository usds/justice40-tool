// / <reference types="Cypress" />

describe('Census Block Group download', () => {
  it('validate file download', () => {
    const filename = `usa.zip`;
    cy.visit('localhost:8000/en/cejst');
    cy.get('#download-link').invoke('attr', 'target', '_blank');
    cy.intercept(`https://justice40-data.s3.amazonaws.com/Score/${filename}`,
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
    cy.readFile(`cypress/downloads/${filename}`).should('exist');
  });
});
