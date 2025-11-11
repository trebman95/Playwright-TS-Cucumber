import { Page } from "@playwright/test"

export class CheckoutComplete {
    private readonly page: Page
    private readonly completeHeader: string = '[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateOrderCompletion(expectedMessage: string) {
        const completeMessage = await this.page.locator(this.completeHeader).textContent();
        if (completeMessage !== expectedMessage) {
            throw new Error(`Expected message to be "${expectedMessage}" but found "${completeMessage}"`);
        }
    }
}
