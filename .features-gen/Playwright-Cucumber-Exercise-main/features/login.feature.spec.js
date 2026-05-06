// Generated from: Playwright-Cucumber-Exercise-main\features\login.feature
import { test } from "playwright-bdd";

test.describe('Login Feature', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('I open the "https://www.saucedemo.com/" page', null, { page }); 
  });
  
  test('Validate the login page title', async ({ Then, page }) => { 
    await Then('I should see the title "Labs Swag"', null, { page }); 
  });

  test('Validate login error message', async ({ Then, page }) => { 
    await Then('I will login as \'locked_out_user\'', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Playwright-Cucumber-Exercise-main\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the \"https://www.saucedemo.com/\" page","isBg":true,"stepMatchArguments":[{"group":{"start":11,"value":"\"https://www.saucedemo.com/\"","children":[{"start":12,"value":"https://www.saucedemo.com/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the title \"Labs Swag\"","stepMatchArguments":[{"group":{"start":23,"value":"\"Labs Swag\"","children":[{"start":24,"value":"Labs Swag","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the \"https://www.saucedemo.com/\" page","isBg":true,"stepMatchArguments":[{"group":{"start":11,"value":"\"https://www.saucedemo.com/\"","children":[{"start":12,"value":"https://www.saucedemo.com/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I will login as 'locked_out_user'","stepMatchArguments":[{"group":{"start":16,"value":"'locked_out_user'","children":[{"children":[{"children":[]}]},{"start":17,"value":"locked_out_user","children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end