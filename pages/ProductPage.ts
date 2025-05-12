import { Page,expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

async getInventoryItemTitles(): Promise<string[]> {
  const items = this.page.locator('.inventory_item_name');
  return await items.allTextContents();
}
  
}