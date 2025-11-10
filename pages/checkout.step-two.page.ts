import { Page } from '@playwright/test'

export class CheckoutStepTwo {
  private readonly page: Page;

  private readonly finishButton: string = 'button[data-test="finish"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async finishCheckout() {
    await this.page.locator(this.finishButton).click();
  }
}

