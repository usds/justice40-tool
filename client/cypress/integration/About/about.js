// / <reference types="Cypress" />
import {Given, When} from 'cypress-cucumber-preprocessor/steps';
import {ENDPOINTS} from '../LegacyTests/constants';

// eslint-disable-next-line new-cap
Given('I am on the About page', () => {
  cy.viewport(1060, 800);
  cy.visit(ENDPOINTS.ABOUT);
});

// eslint-disable-next-line new-cap
Given('I am on the Explore Tool page', () => {
  cy.viewport(1060, 800);
  cy.visit(ENDPOINTS.EXPLORE_THE_TOOL);
});

// eslint-disable-next-line new-cap
Given('I am on the Data & Methodology page', () => {
  cy.viewport(1060, 800);
  cy.visit(ENDPOINTS.METHODOLOGY);
});

// eslint-disable-next-line new-cap
Given('I open the Contact page', () => {
  cy.viewport(1060, 800);
  cy.visit(ENDPOINTS.CONTACT);
});

// eslint-disable-next-line new-cap
When(`I click on the {string} page in the navigation`, (page) => {
  cy.get(`[data-cy="nav-link-${page.toLowerCase()}"]`).click();
});
