import { Page,expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

 

  async getInventoryItemsCount(): Promise<number> {
    return await this.page.locator(".inventory_item").count();
  }

  async getInventoryItemTitles(): Promise<string[]> {
    const items = this.page.locator(".inventory_item_name");
    return await items.allTextContents();
  }
  async addToCartByProductName(productName: string) {
    const productCard = this.page.locator(".inventory_item").filter({ hasText: productName });
    const count = await productCard.count();
    if (count === 0) {
      return null; // ✅ exit early if product not found
    }
    await productCard.locator("button").click();
    return productCard;
  }

  async removeFromCartByProductName(productName: string) {
    const productCard = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });
    const button = productCard.locator("button");

    if ((await button.textContent())?.includes("Remove")) {
      await button.click();
    }

    return productCard;
  }
}