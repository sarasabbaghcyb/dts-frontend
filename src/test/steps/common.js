"use strict";
/// <reference types='codeceptjs' />
Object.defineProperty(exports, "__esModule", { value: true });
exports.iAmOnPage = void 0;
const config_1 = require("../config");
const { I } = inject();
// Define the step that opens the page and ensures the language is set to "en"
const iAmOnPage = (text) => {
    const url = new URL(text, config_1.config.TEST_URL);
    if (!url.searchParams.has('lng')) {
        url.searchParams.set('lng', 'en');
    }
    I.amOnPage(url.toString());
};
exports.iAmOnPage = iAmOnPage;
// Define step to navigate to the provided URL
Given('I go to {string}', exports.iAmOnPage);
// Define step to check that the page URL matches the expected URL
Then('the page URL should be {string}', (url) => {
    I.waitInUrl(url);
});
// Define step to check that the page includes the provided text
Then('the page should include {string}', (text) => {
    I.waitForText(text, 5000); // Providing a timeout value of 5000ms (5 seconds)
});
