import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";


test("Getting product list", async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/.*inventory/);
    const productpage = new ProductPage(page);
    const count =  await productpage.getInventoryItemsCount();
    const titles = await productpage.getInventoryItemTitles();
    expect(count).toBeGreaterThan(0);
    expect(titles.length).toBe(count);
    console.log("Product count:", count);
    console.log("Titles:", titles);





})