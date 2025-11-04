import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}
  header = () => this.page.locator('.complete-header');
  body = () => this.page.locator('.complete-text');

  async assertCompleted(headerText: string) {
    await expect(this.header()).toHaveText(headerText);
  }

  async expectBodyContains(snippet: string) {
    await expect(this.body()).toContainText(snippet);
  }
}
