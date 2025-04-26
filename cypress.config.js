const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler());
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature", // look for .feature files
    baseUrl: "http://localhost:3100", // or whatever port you run your app on
    supportFile: false, // empty file we created earlier
  },
});
