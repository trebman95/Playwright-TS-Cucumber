import { Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class Checkout {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async startCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async fillCheckoutInfo() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();

    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async continueCheckout() {
    await this.page.click('[data-test="continue"]');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }

  async verifySuccess() {
    const successText = this.page.locator('[data-test="complete-header"]');
    await expect(successText).toBeVisible();
    await expect(successText).toHaveText("Thank you for your order!");
  }
}
