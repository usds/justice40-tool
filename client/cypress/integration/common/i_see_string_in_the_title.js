import {Then} from 'cypress-cucumber-preprocessor/steps';

// eslint-disable-next-line new-cap
Then(`I should see {string} in the title`, (title) => {
  cy.title().should('include', title);
});
