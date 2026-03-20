import { expect, Page } from "@playwright/test";

export class Checkout {
  private readonly page: Page;

  private readonly firstNameField = 'input[name="firstName"]';
  private readonly lastNameField = 'input[name="lastName"]';
  private readonly zipCodeField = 'input[name="postalCode"]';
  private readonly continueButton = "#continue";
  private readonly cancelButton = "#cancel";
  private readonly finishButton = "#finish";
  private readonly backHomeButton = "#back-to-products";
  private readonly checkoutSummaryContainer = '[data-test="checkout-summary-container"]';
  private readonly checkoutSummaryItemName = ".cart_list .inventory_item_name";
  private readonly paymentInfoLabel = '[data-test="payment-info-label"]';
  private readonly shippingInfoLabel = '[data-test="shipping-info-label"]';
  private readonly priceTotalLabel = '[data-test="total-info-label"]';
  private readonly subtotalLabel = '[data-test="subtotal-label"]';
  private readonly taxLabel = '[data-test="tax-label"]';
  private readonly totalLabel = '[data-test="total-label"]';
  private readonly completeHeader = 'h2[data-test="complete-header"]';
  private readonly errorBanner = 'h3[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async IsCheckoutPageOpened() {
    await expect(this.page).toHaveURL(/\/checkout-step-(one|two)\.html/);
  }

  public async FillCheckoutCustomerFields(firstName: string, lastName: string, zipCode: string) {
    await this.page.locator(this.firstNameField).fill(firstName ?? "");
    await this.page.locator(this.lastNameField).fill(lastName ?? "");
    await this.page.locator(this.zipCodeField).fill(zipCode ?? "");
  }

  /** Only clicks Continue (step-one). Use when validating errors or before waiting for overview. */
  public async ClickCheckoutContinueButton() {
    await this.page.locator(this.continueButton).click();
  }

  public async ClickCheckoutCancelButton() {
    await this.page.locator(this.cancelButton).click();
  }

  private async WaitUntilCheckoutOverviewStepIsVisible() {
    await this.page.waitForURL(/\/checkout-step-two\.html/, { timeout: 30000 });
    await expect(this.page.locator(this.checkoutSummaryContainer)).toBeVisible();
  }

  public async IsCheckoutStepOneShowingErrorBannerWithMessage(expectedMessage: string) {
    const actual = (await this.page.locator(this.errorBanner).textContent())?.trim() ?? "";
    if (actual !== expectedMessage) {
      throw new Error(`Expected checkout error "${expectedMessage}" but found "${actual}"`);
    }
  }

  /** Dispatches by label from feature (e.g. Continue / Finish / Back Home / Cancel). */
  public async ClickCheckoutButtonByLabel(buttonLabel: string) {
    switch (buttonLabel) {
      case "Continue":
        await this.ClickCheckoutContinueButton();
        break;
      case "Finish":
        await this.ClickCheckoutFinishButton();
        break;
      case "Back Home":
        await this.ClickBackToProductsButton();
        break;
      case "Cancel":
        await this.ClickCheckoutCancelButton();
        break;
      default:
        throw new Error(`Unknown checkout button "${buttonLabel}"`);
    }
  }

  public async IsCheckoutOverviewShowingPaymentInformationSection() {
    await this.WaitUntilCheckoutOverviewStepIsVisible();
    await expect(this.page.locator(this.paymentInfoLabel)).toBeVisible();
  }

  public async IsCheckoutOverviewShowingShippingInformationSection() {
    await expect(this.page.locator(this.shippingInfoLabel)).toBeVisible();
  }

  /** Validates `sectionLabel` from the feature and asserts the matching checkout overview block. */
  public async IsCheckoutOverviewSectionPresent(sectionLabel: string) {
    switch (sectionLabel) {
      case "Payment Information":
        await this.IsCheckoutOverviewShowingPaymentInformationSection();
        return;
      case "Shipping Information:":
        await this.IsCheckoutOverviewShowingShippingInformationSection();
        return;
      default:
        throw new Error(
          `Unknown checkout section "${sectionLabel}". Expected "Payment Information" or "Shipping Information:".`
        );
    }
  }

  public async IsCheckoutOverviewShowingPriceTotalSection() {
    await expect(this.page.locator(this.priceTotalLabel)).toBeVisible();
  }

  public async IsCheckoutOverviewSubtotalTaxAndTotalMatchingExpected(itemTotal: string, tax: string, total: string) {
    await this.IsCheckoutOverviewShowingPriceTotalSection();
    await expect(this.page.locator(this.subtotalLabel)).toContainText(itemTotal);
    await expect(this.page.locator(this.taxLabel)).toContainText(tax);
    await expect(this.page.locator(this.totalLabel)).toContainText(total);
  }

  public async IsCheckoutOverviewContainingExactlyTheseProductNames(expectedProductNames: string[]) {
    await this.WaitUntilCheckoutOverviewStepIsVisible();
    const expected = expectedProductNames.map((n) => n.trim()).filter((n) => n.length > 0);
    const raw = await this.page.locator(this.checkoutSummaryItemName).allTextContents();
    const actual = raw.map((t) => t.trim()).filter((t) => t.length > 0);

    if (actual.length !== expected.length) {
      throw new Error(`Expected ${expected.length} product(s) in checkout summary, found ${actual.length}. Actual: ${actual.join(" | ")}`);
    }

    const missing = expected.filter((name) => !actual.includes(name));
    
    if (missing.length > 0) {
      throw new Error(`Missing product(s) in summary: ${missing.join(", ")}. Actual: ${actual.join(" | ")}`);
    }

    const extra = actual.filter((name) => !expected.includes(name));
    
    if (extra.length > 0) {
      throw new Error(`Unexpected product(s) in summary: ${extra.join(", ")}`);
    }
  }

  public async ClickCheckoutFinishButton() {
    await this.page.locator(this.finishButton).click();
  }

  public async IsOrderCompletePageShowingHeaderText(expectedText: string) {
    await expect(this.page.locator(this.completeHeader)).toHaveText(expectedText);
  }

  public async ClickBackToProductsButton() {
    await this.page.locator(this.backHomeButton).click();
  }
}
