// / <reference types="Cypress" />

describe('Census Block Group packet download', () => {
  const filename = `Screening_Tool_Data.zip`;
  it('validate file download', () => {
    cy.visit('localhost:8000/en/methodology');

    cy.get('[data-cy="download-link"]').invoke('attr', 'target', '_blank');
    cy.intercept(`https://d3jqyw10j8e7p9.cloudfront.net/data-pipeline/data/score/downloadable/${filename}`,
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
