import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    GITHUB_URL: "https://github.com/TheRealOwenRees/chess-pdf"
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
