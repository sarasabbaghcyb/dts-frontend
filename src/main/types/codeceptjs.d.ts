// src/main/types/codeceptjs.d.ts

/// <reference types="codeceptjs" />

declare namespace CodeceptJS {
  // Extending the I interface with custom methods
  interface I {
    amOnPage(url: string): void;
    waitInUrl(url: string): void;
    waitForText(text: string, timeout: number): void;
    click(locator: string): void;
    fillField(locator: string, value: string): void;
    see(text: string): void;
  }
}
