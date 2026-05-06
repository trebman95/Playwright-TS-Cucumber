// Generated from: Playwright-Cucumber-Exercise-main\features\product.feature
import { test } from "playwright-bdd";

test.describe('Product Feature', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('I open the "https://www.saucedemo.com/" page', null, { page }); 
  });
  
  test.describe('Validate product sort by price <sort>', () => {

    test('Example #1', async ({ When, Then, page }) => { 
      await When('I will login as \'standard_user\'', null, { page }); 
      await Then('I sort products by "Price (low to high)"', null, { page }); 
    });

    test('Example #2', async ({ When, Then, page }) => { 
      await When('I will login as \'standard_user\'', null, { page }); 
      await Then('I sort products by "Price (high to low)"', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Playwright-Cucumber-Exercise-main\\features\\product.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the \"https://www.saucedemo.com/\" page","isBg":true,"stepMatchArguments":[{"group":{"start":11,"value":"\"https://www.saucedemo.com/\"","children":[{"start":12,"value":"https://www.saucedemo.com/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I will login as 'standard_user'","stepMatchArguments":[{"group":{"start":16,"value":"'standard_user'","children":[{"children":[{"children":[]}]},{"start":17,"value":"standard_user","children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I sort products by \"Price (low to high)\"","stepMatchArguments":[{"group":{"start":19,"value":"\"Price (low to high)\"","children":[{"start":20,"value":"Price (low to high)","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the \"https://www.saucedemo.com/\" page","isBg":true,"stepMatchArguments":[{"group":{"start":11,"value":"\"https://www.saucedemo.com/\"","children":[{"start":12,"value":"https://www.saucedemo.com/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I will login as 'standard_user'","stepMatchArguments":[{"group":{"start":16,"value":"'standard_user'","children":[{"children":[{"children":[]}]},{"start":17,"value":"standard_user","children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I sort products by \"Price (high to low)\"","stepMatchArguments":[{"group":{"start":19,"value":"\"Price (high to low)\"","children":[{"start":20,"value":"Price (high to low)","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end