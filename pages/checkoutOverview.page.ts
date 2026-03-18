import { Page } from '@playwright/test';

export class CheckoutOverview {

  constructor(private page: Page) {}

  private finishButton = '[data-test="finish"]';

  public async finish() {
    await this.page.click(this.finishButton);
  }
}
