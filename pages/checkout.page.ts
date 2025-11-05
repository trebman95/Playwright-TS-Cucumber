import { Page } from "@playwright/test"
export class Checkout {
    private readonly page: Page
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    constructor(page: Page) {
        this.page = page;
    }
 
    public async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
  // increase default timeout to handle slow page load
  const timeout = 20000;

  const firstNameField = this.page.locator(this.firstNameField);
  const lastNameField = this.page.locator(this.lastNameField);
  const postalCodeField = this.page.locator(this.postalCodeField);
  const continueButton = this.page.locator(this.continueButton);

  // Wait for the first field to appear before starting
  await firstNameField.waitFor({ state: 'visible', timeout });
  console.log(`Typing first name: ${firstName}`);
  await firstNameField.fill(firstName);

  // Fill last name
  await lastNameField.waitFor({ state: 'visible', timeout });
  await lastNameField.fill(lastName);

  // Fill postal code
  await postalCodeField.waitFor({ state: 'visible', timeout });
  await postalCodeField.fill(postalCode);

  // Click Continue button safely
  await continueButton.waitFor({ state: 'visible', timeout });
  await continueButton.scrollIntoViewIfNeeded();
  await continueButton.click();

  console.log('✅ Checkout information filled and Continue clicked successfully');
}

    
    public  async continueToOverview() {
    await this.page.click('[data-test="continue"]');
  }

  public  async finishPurchase() {
    const timeout = 20000;
     const finishButton = this.page.locator(this.finishButton);
    await finishButton.waitFor({ state: 'visible', timeout });
  await finishButton.scrollIntoViewIfNeeded();
  await finishButton.click();

  }

  public  async getConfirmationMessage(): Promise<string> {
    const confirmationMessageLocator = this.page.locator('.complete-header');
    return await confirmationMessageLocator.textContent() || '';
  }
}