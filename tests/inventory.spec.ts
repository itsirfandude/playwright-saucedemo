import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  productPage = new ProductPage(page);
});

test("Getting product list", async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory/);
  const count = await productPage.getInventoryItemsCount();
  const titles = await productPage.getInventoryItemTitles();

  expect(count).toBeGreaterThan(0);
  expect(titles.length).toBe(count);

  console.log("Product count:", count);
  console.log("Titles:", titles);
});
test("Add non-existing product to cart should fail", async ({ page }) => {
 

  const result = await productPage.addToCartByProductName("Non-Existing Product");
  expect(result).toBeNull(); // or expect an error message or no action
});

test("Managing products", async ({ page }) => {

const  productCard = await productPage.addToCartByProductName("Sauce Labs Backpack");
await expect(productCard.locator("button")).toHaveText("Remove");
await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
console.log("Added to cart");
await productPage.removeFromCartByProductName("Sauce Labs Backpack");
await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
await productPage.addToCartByProductName("Sauce Labs Onesie");
await productPage.addToCartByProductName("Test.allTheThings() T-Shirt (Red)");
await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
console.log("Final cart state verified");



});