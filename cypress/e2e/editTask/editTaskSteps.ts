/// <reference types="cypress" />

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I go to {string}', (url: string) => {
  cy.visit(url);
});

Then('I should see {string}', (text: string) => {
  cy.contains(text).should('be.visible');
});

Then('I should see an input field for {string}', (labelText: string) => {
  cy.get('label.govuk-label').contains(labelText)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).should('exist');
    });
});

Then('I should see a textarea for {string}', (labelText: string) => {
  cy.get('label.govuk-label').contains(labelText)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`textarea#${id}`).should('exist');
    });
});

Then('I should see a select field for {string}', (labelText: string) => {
  cy.get('label.govuk-label').contains(labelText)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`select#${id}`).should('exist');
    });
});

Then(/^I should see an? "(.*)" button$/, (buttonText: string) => {
  cy.get('button.govuk-button').contains(buttonText).should('be.visible');
});
