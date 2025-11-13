import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Then('I should see the title {string}', async function(this: CustomWorld, expectedTitle: string) {
  await this.loginPage.validateTitle(expectedTitle);
});

Then('I will login as {string}', async function(this: CustomWorld, userName: string) {
  this.testData.username = userName; // Store username in World for later use
  await this.loginPage.loginAsUser(userName);
});

Then('I should see the error message {string}', async function(this: CustomWorld, expectedErrorMessage: string) {
  const actualErrorMessage = await this.loginPage.getErrorMessage();
  if (actualErrorMessage !== expectedErrorMessage) {
    throw new Error(`Expected error message to be "${expectedErrorMessage}" but found "${actualErrorMessage}"`);
  }
});

Then('I should be logged in successfully', async function(this: CustomWorld) {
  await this.loginPage.validateSuccessfulLogin();
});

When('I logout from the application', async function(this: CustomWorld) {
  await this.loginPage.logout();
});

Then('I should see the login page again', async function(this: CustomWorld) {
  await this.loginPage.validateLoginPage();
});