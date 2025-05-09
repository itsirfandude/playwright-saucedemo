// pages/LoginPage.ts
import { Page,expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

  async expectLoginError(expectedText: string) {
    const errorMessage = this.page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(expectedText);
  }
}
