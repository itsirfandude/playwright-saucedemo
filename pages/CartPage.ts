
import { Page,expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator("data-test=shopping-cart-link").click();
  }

  async goBackToShopping() {
    await this.page.locator("data-test=continue-shopping").click();
  }

  async removeFromCart(productName: string) {
    const cartItem = this.page.locator(".cart_item").filter({ hasText: productName });

    if ((await cartItem.count()) === 0) {
      return null; // ✅ exit early if not found
    }
  
    const button = cartItem.locator("button");
    await button.click();
    return cartItem;
  }

  async closeError()
  {
    await this.page.locator("data-test=error-button").click();
  }

  async goToCheckout() {
    await this.page.locator("data-test=checkout").click();
  }
}