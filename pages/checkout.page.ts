import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;

  private readonly firstName = '#first-name';
  private readonly lastName = '#last-name';
  private readonly postalCode = '#postal-code';
  private readonly continueBtn = '#continue';
  private readonly finishBtn = '#finish';
  private readonly confirmation = '.complete-header';
  private readonly errorBanner = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

    async fillCustomerInfo(first: string, last: string, zip: string) {
        await this.page.locator(this.firstName).fill(first);
        await this.page.locator(this.lastName).fill(last);
        await this.page.locator(this.postalCode).fill(zip);
    }

    async continue() {
        await this.page.locator(this.continueBtn).click();
    }

    async placeOrder() {
        await this.page.locator(this.finishBtn).click();
    }

    async assertOrderCompleted(expected: string) {
        const actual =
          (await this.page.locator(this.confirmation).textContent())?.trim() || "";
        expect(actual).toBe(expected.trim());
    }

    async assertCheckoutError(expected: string) {
    await expect(this.page.locator(this.errorBanner)).toHaveText(expected);
  }

}