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

Then('I should see the {string} button', (buttonText: string) => {
  cy.contains('a.govuk-button', buttonText).should('be.visible');
});

Then('the page should have a task list', () => {
  cy.get('#taskList').should('exist');
});

Then('I should see a {string} dropdown with options {string}, {string}, {string}, and {string}',
  (dropdownLabel: string, option1: string, option2: string, option3: string, option4: string) => {
    cy.get('label').contains(dropdownLabel).should('be.visible');
    cy.get('select.govuk-select').within(() => {
      // Check if each option matches (case-insensitive)
      cy.get('option').eq(0).should('have.text', option1);
      cy.get('option').eq(1).should('have.text', option2);
      cy.get('option').eq(2).should('have.text', option3);
      cy.get('option').eq(3).should('have.text', option4);
    });
  });

Then('I should see an error summary with {string}', (errorMessage: string) => {
  cy.get('.govuk-error-summary').should('be.visible');
  cy.get('.govuk-error-summary').contains(errorMessage).should('be.visible');
});
