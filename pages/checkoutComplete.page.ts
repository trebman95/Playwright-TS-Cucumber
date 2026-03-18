import { Page, expect } from '@playwright/test';

export class CheckoutComplete {

  constructor(private page: Page) {}

  private successHeader = '.complete-header';

  public async validateSuccessMessage() {
    await expect(this.page.locator(this.successHeader)).toHaveText('Thank you for your order!');
  }
}

