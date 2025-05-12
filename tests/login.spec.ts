import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Login with credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("invalid_user", "invalid_pass");
  await loginPage.expectLoginError("Epic sadface: Username and password do not match any user in this service");
  await loginPage.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/.*inventory/);
});
