
import { Page,expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator("data-test=shopping-cart-link").click();
  }

  async removeFromCart(productName: string) {
    const cartItem = this.page
      .locator(".cart_item")
      .filter({ hasText: productName });
    const button = cartItem.locator("button");

    await button.click();

    return cartItem;
  }

  async goToCheckout() {
    await this.page.locator("data-test=checkout").click();
  }
}