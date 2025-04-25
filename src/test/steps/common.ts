/// <reference types='codeceptjs' />

import { config as testConfig } from '../config';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace CodeceptJS {
  interface I {
    // Declare custom methods you use in the tests
    amOnPage(url: string): void;
    waitInUrl(url: string): void;
    waitForText(text: string, timeout: number): void;
  }
}

const { I } = inject();

// Define the step that opens the page and ensures the language is set to "en"
export const iAmOnPage = (text: string): void => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};

// Define step to navigate to the provided URL
Given('I go to {string}', iAmOnPage);

// Define step to check that the page URL matches the expected URL
Then('the page URL should be {string}', (url: string) => {
  I.waitInUrl(url);
});

// Define step to check that the page includes the provided text
Then('the page should include {string}', (text: string) => {
  I.waitForText(text, 5000); // Providing a timeout value of 5000ms (5 seconds)
});
