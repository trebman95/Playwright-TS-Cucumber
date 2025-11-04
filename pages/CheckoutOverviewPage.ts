import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}
  finishBtn = () => this.page.getByRole('button', { name: 'Finish' });

  async assertOnPage() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async finish() {
    await this.finishBtn().click();
  }
}
