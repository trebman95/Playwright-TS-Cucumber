// Generated from: Playwright-Cucumber-Exercise-main\features\purchase.feature
import { test } from "playwright-bdd";

test.describe('Purchase Feature', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('I open the "https://www.saucedemo.com/" page', null, { page }); 
  });
  
  test('Validate successful purchase text', async ({ Then, page }) => { 
    await Then('I will login as \'standard_user\'', null, { page }); 
    await Then('I will add the backpack to the cart', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Playwright-Cucumber-Exercise-main\\features\\purchase.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the \"https://www.saucedemo.com/\" page","isBg":true,"stepMatchArguments":[{"group":{"start":11,"value":"\"https://www.saucedemo.com/\"","children":[{"start":12,"value":"https://www.saucedemo.com/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then I will login as 'standard_user'","stepMatchArguments":[{"group":{"start":16,"value":"'standard_user'","children":[{"children":[{"children":[]}]},{"start":17,"value":"standard_user","children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I will add the backpack to the cart","stepMatchArguments":[]}]},
]; // bdd-data-end