import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}
  checkoutBtn = () => this.page.getByRole('button', { name: 'Checkout' });

  async assertOnPage() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async checkout() {
    await this.checkoutBtn().click();
  }
}
