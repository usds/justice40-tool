// eslint-disable-next-line new-cap
Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title);
});
