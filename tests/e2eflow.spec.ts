import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage"; 


test("End-to-End: Login → Add Product → View Cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await test.step("Login to the app", async () => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  await test.step("Attempt to add a non-existing product", async () => {
    const nonexprod = await productPage.addToCartByProductName("Non-Existing Product");
    expect(nonexprod).toBeNull();
    console.log("Product not found");

    await cartPage.goToCart();
    const result = await cartPage.removeFromCart("Non-Existing Product");
    expect(result).toBeNull();
    await cartPage.goBackToShopping();
  });

  await test.step("Add multiple valid products to cart", async () => {
    await productPage.addToCartByProductName("Sauce Labs Backpack");
    await productPage.addToCartByProductName("Sauce Labs Onesie");
    await productPage.addToCartByProductName("Test.allTheThings() T-Shirt (Red)");
  });

  await test.step("Verify items in cart", async () => {
    await cartPage.goToCart();
    const cartItemBackpack = page.locator('.cart_item:has-text("Sauce Labs Backpack")');
    const cartItemOnesie = page.locator('.cart_item:has-text("Sauce Labs Onesie")');

    await expect(cartItemBackpack).toBeVisible();
    await expect(cartItemOnesie).toBeVisible();

    await cartPage.removeFromCart("Test.allTheThings() T-Shirt (Red)");
    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
    await expect(page.locator('.cart_item:has-text("Test.allTheThings() T-Shirt (Red")')).toHaveCount(0);
  });

  await test.step("Checkout with missing info", async () => {
    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutInfo("", "", "");

    const errorMessage = page.locator(".error-message-container");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Error: First Name is required");

    await cartPage.closeError();
  });

  await test.step("Complete checkout with valid info", async () => {
    await checkoutPage.fillCheckoutInfo("i","s","64");

    await expect(page.locator("data-test=shipping-info-value")).toHaveText(
      "Free Pony Express Delivery!"
    );
    await expect(page.locator("data-test=payment-info-label")).toHaveText(
      "Payment Information:"
    );
    await checkoutPage.finishCheckout();
    await checkoutPage.getConfirmationMessage();
    await expect(page.locator("data-test=complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });

  await test.step("Redirect to home and assert URL", async () => {
    await checkoutPage.goHome();
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
