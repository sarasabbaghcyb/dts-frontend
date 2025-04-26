/// <reference types="cypress" />

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I go to {string}', (url: string) => {
  cy.visit(url);
});

Then('the page URL should be {string}', (expectedUrl: string) => {
  cy.url().should('include', expectedUrl);
});

Then('the page should include {string}', (text: string) => {
  cy.contains(text).should('be.visible');
});
