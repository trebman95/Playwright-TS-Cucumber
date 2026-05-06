import { Before, After, setDefaultTimeout } from 'playwright-bdd';

setDefaultTimeout(15000);

Before(async ({ page }) => {
    // Setup before each scenario
});

After(async ({ page }) => {
    // Cleanup after each scenario
});