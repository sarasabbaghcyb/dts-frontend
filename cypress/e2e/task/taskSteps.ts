/// <reference types="cypress" />

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I go to {string}', (url: string) => {
  cy.visit(url);
});

Then('the page should include {string}', (text: string) => {
  cy.contains(text).should('be.visible');
});

Then('I should see a summary field labeled {string} with a value', (label: string) => {
  cy.get('.govuk-summary-list__row').contains('.govuk-summary-list__key', label)
    .parent('.govuk-summary-list__row')
    .within(() => {
      cy.get('.govuk-summary-list__value').should('not.be.empty');
    });
});

Then(/^I should see an? "(.*)" button$/, (buttonText: string) => {
  cy.get('a.govuk-button, button.govuk-button').contains(buttonText).should('be.visible');
});
