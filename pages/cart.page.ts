import { Page } from '@playwright/test'

export class Cart {
  private readonly page: Page

  private readonly checkoutButton: string= 'button[data-test="checkout"]'

  constructor(page: Page) {
    this.page = page
  }

  public async proceedToCheckout() {
    await this.page.locator(this.checkoutButton).click()
  }

}
