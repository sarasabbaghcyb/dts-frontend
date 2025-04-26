/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I go to {string}', (url: string) => {
  cy.visit(url);
});

Then('the page should include {string}', (text: string) => {
  cy.contains(text).should('be.visible');
});

Then('I should see a form field with label {string}', (labelText: string) => {
  cy.get('label').contains(labelText).should('be.visible');
});

Then('I should see a dropdown with label {string} and options {string} and {string}', (labelText: string, option1: string, option2: string) => {
  cy.get('label').contains(labelText).should('be.visible');
  cy.get('select').within(() => {
    cy.get('option').then(options => {
      const texts = [...options].map(option => option.text);
      expect(texts).to.include.members([option1, option2]);
    });
  });
});

When('I submit the form without filling {string}', (fieldName: string) => {
  cy.get(`input[name="${fieldName}"]`).clear();
  cy.get('form').submit();
});

Then('I should see an error summary with {string}', (errorText: string) => {
  cy.get('.govuk-error-summary').should('be.visible');
  cy.get('.govuk-error-summary').contains(errorText).should('be.visible');
});
