import { Page } from '@playwright/test'

export class CheckoutStepOne {
  private readonly page: Page

  private readonly continueButton: string = '[data-test="continue"]'

  constructor(page: Page) {
    this.page = page
  }

  public async continueCheckout() {
    await this.page.locator(this.continueButton).click()
  }
}

