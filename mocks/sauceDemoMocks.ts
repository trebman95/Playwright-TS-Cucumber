import { Page } from '@playwright/test';

export const PRODUCT_IDS: Record<string, number> = {
  'Sauce Labs Bike Light': 0,
  'Sauce Labs Bolt T-Shirt': 1,
  'Sauce Labs Onesie': 2,
  'Test.allTheThings() T-Shirt (Red)': 3,
  'Sauce Labs Backpack': 4,
  'Sauce Labs Fleece Jacket': 5,
};

export function productIdsForNames(names: string[]): number[] {
  return names.map((name) => {
    const id = PRODUCT_IDS[name];
    if (id === undefined) {
      throw new Error(`Unknown saucedemo product: "${name}"`);
    }
    return id;
  });
}

export async function seedCart(page: Page, itemIds: number[]) {
  await page.evaluate((ids) => {
    localStorage.setItem('cart-contents', JSON.stringify(ids));
  }, itemIds);
}
