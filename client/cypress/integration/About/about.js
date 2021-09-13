// / <reference types="Cypress" />
import {Given} from 'cypress-cucumber-preprocessor/steps';
import {ENDPOINTS} from '../LegacyTests/constants';

// eslint-disable-next-line new-cap
Given('I open the About page', () => {
  cy.visit(ENDPOINTS.ABOUT);
});
