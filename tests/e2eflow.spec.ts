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

  


  // 1. Login
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");

  // 2. Add product to cart
  await productPage.addToCartByProductName("Sauce Labs Backpack");
  await productPage.addToCartByProductName("Sauce Labs Onesie");
  await productPage.addToCartByProductName("Test.allTheThings() T-Shirt (Red)");

  // 3. Go to cart
  await cartPage.goToCart();

  // 4. Assert product is in cart
  const cartItem = page.locator('.cart_item:has-text("Sauce Labs Backpack")');
  await expect(cartItem).toBeVisible();

  await cartPage.removeFromCart("Test.allTheThings() T-Shirt (Red)");
  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
  await cartPage.goToCheckout();

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
  await checkoutPage.goHome();

  


});
