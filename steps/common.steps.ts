import { Given, When, Then } from '@cucumber/cucumber';
import { getPage } from "../playwrightUtilities";

Given('I open the {string} page', async (url) => {
    await getPage().goto(url);
  });

When(
  'I fill the {string} field with {string}',
  async (testId: string, text: string) => {
    await getPage().getByTestId(testId).fill(text);
  }
);

Then( 'I log details of elements with test id {string}',
  async (testId: string) => {

    const locator = getPage().getByTestId(testId);
    const count = await locator.count();

    console.log(
      `[debug] getByTestId("${testId}") matched ${count} element(s).`
    );
    if (count === 0) return;

    // Print text contents of all matched elements
    const texts = await locator.allTextContents();
    console.log('[debug] text contents:', texts);

  }
);


