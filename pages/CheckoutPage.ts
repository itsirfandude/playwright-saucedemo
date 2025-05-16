import { Page,expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', zipCode);
    await this.page.click('[data-test="continue"]');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }

  async getConfirmationMessage() {
    return this.page.locator(".complete-header");
  }

  async goHome() {
    await this.page.click('[data-test="back-to-products"]');
  }
}