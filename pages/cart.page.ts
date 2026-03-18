import { Page, expect } from '@playwright/test';

export class Cart {

  constructor(private page: Page) {}

  private cartIcon = '.shopping_cart_link';
  private checkoutButton = '[data-test="checkout"]';
  private cartItemName = '.inventory_item_name';
  private cartItemPrice = '.inventory_item_price';
  private cartItemQuantity = '.cart_quantity';


  public async openCart() {
    await this.page.click(this.cartIcon);
  }

  public async goToCheckout() {
    await this.page.click(this.checkoutButton);
  }

public async validateCartItem(expectedName: string, expectedPrice: string, expectedQty: string) {
  const name = await this.page.locator(this.cartItemName).textContent();
  const price = await this.page.locator(this.cartItemPrice).textContent();
  const qty = await this.page.locator(this.cartItemQuantity).textContent();

  expect(name?.trim()).toBe(expectedName);
  expect(price?.trim()).toBe(expectedPrice);
  expect(qty?.trim()).toBe(expectedQty);
}

}



