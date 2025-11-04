import { Page, expect } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private page: Page) {}
  firstName = () => this.page.locator('[data-test="firstName"]');
  lastName = () => this.page.locator('[data-test="lastName"]');
  postalCode = () => this.page.locator('[data-test="postalCode"]');
  continueBtn = () => this.page.getByRole('button', { name: 'Continue' });

  async assertOnPage() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName().fill(first);
    await this.lastName().fill(last);
    await this.postalCode().fill(zip);
    await this.continueBtn().click();
  }
}
