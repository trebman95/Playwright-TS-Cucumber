import { Page, expect } from '@playwright/test'

export class CheckoutComplete {
  private readonly page: Page;

  private readonly successHeader: string = 'h2[data-test="complete-header"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async validateOrderSuccess(expectedText: string) {
    const header = this.page.locator(this.successHeader);
    await expect(header).toBeVisible();
    await expect(header).toHaveText(expectedText);
  }
}

