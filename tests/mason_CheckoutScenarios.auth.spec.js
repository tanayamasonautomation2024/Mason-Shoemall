const { chromium } = require('playwright');
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { GuestCheckOutPage } from '../pages/mason_guestCheckout_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { OrderConfirmationPage } from '../pages/mason_order_confirmation_page';
import { expectWithTimeoutHandling } from '../utils/errorHandling';
import { TimeoutError } from '../utils/errorHandler';
require('dotenv').config();

const checkout_data = JSON.parse(JSON.stringify(require('../test_data/mason_checkout_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));

test.describe("Mason Checkout - Guest and LoggedIn Users - Scenarios", () => {
  test.setTimeout(70000);
  test.beforeEach(async ({ page }) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.goto(checkout_data.add_to_cart_pdp_url);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }
  });

  test.describe("Mason Checkout - Guest user with cc- promo code - Scenarios", () => {
    test("Guest user with cc- promo code", async ({ page }) => {
      try {
        const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const pdpPage = new PDPPage(page);
        await expectWithTimeoutHandling(async () => {
          await pdpPage.clickOnPDPColorVariantButton();
        }, 'Clicking on PDP color variant button');

        await expectWithTimeoutHandling(async () => {
          await pdpPage.clickOnMultiplePDPSizeVariantButton();
        }, 'Clicking on PDP size variant button');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickAddToCart();
        }, 'Clicking Add to Cart');

        await expectWithTimeoutHandling(async () => {
          await pdpPage.miniCartDrawer();
        }, 'Opening mini cart drawer');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickCheckoutOnMyCart();
        }, 'Clicking checkout on My Cart');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateSecureCheckout();
        }, 'Validating secure checkout');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.continueCheckoutAsGuest();
        }, 'Continuing checkout as guest');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateShippingSection();
        }, 'Validating shipping section');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateNewAddressModal();
        }, 'Validating new address modal');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.addShippingAddress();
        }, 'Adding shipping address');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validatePromoCodeSection();
          await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
        }, 'Applied Promo Code');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickOnContinueToPayment();
        }, 'Clicking on Continue to Payment');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateAddressVerification();
        }, 'Validating address verification');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickCreditCard();
        }, 'Clicking on credit card');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.addCardDetails();
        }, 'Adding card details');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.enterEmailDetails(email);
        }, 'Entering email details');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickContinueToReview();
        }, 'Clicking Continue to Review');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickOnPlaceOrderButton();
        }, 'Clicking on Place Order button');

        const orderConfPage = new OrderConfirmationPage(page);

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfOrderDetails();
        }, 'Validating order confirmation order details');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationOrderSummary();
        }, 'Validating order confirmation order summary');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationShippingDetails();
        }, 'Validating order confirmation shipping details');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationBillingAddress();
        }, 'Validating order confirmation billing address');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationPayment();
        }, 'Validating order confirmation payment');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateProductSection();
        }, 'Validating product section');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfGuestUserCreateAccount();
        }, 'Validating order confirmation create account section');

      } catch (error) {
        if (error instanceof TimeoutError) {
          console.error(`Timeout occurred: ${error.message}`);
        } else {
          console.error('Error during test execution:', error);
        }
        throw new Error(`Test failed due to error: ${error.message}`);
      }
    });
  });

  // Scenario 1: Guest user placing an order with a credit card
  test.describe("Mason Checkout - Guest user placing an order with a credit card - Scenarios", () => {
    test("Guest user placing an order with a credit card", async ({ page }) => {
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await guestCheckoutPage.continueCheckoutAsGuest();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.clickCreditCard();
      await guestCheckoutPage.addCardDetails();
      await guestCheckoutPage.enterEmailDetails(email);
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
      await expectWithTimeoutHandling(async () => {
        await orderConfPage.validateOrderConfGuestUserCreateAccount();
      }, 'Validating order confirmation create account section');
    });
  });

  // Scenario 2: Guest user placing an order with ZB credit
  test.describe("Mason Checkout - Guest user placing an order with Paypal - Scenarios", () => {
    test("Guest user placing an order with Paypal", async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await guestCheckoutPage.continueCheckoutAsGuest();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.paypalPayment(checkout_data.paypal_loginid,checkout_data.paypal_password);
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPaymentPaypal();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateProductSection();

    });
  });
  
  // Scenario 4: Logged in - Non Credit Users: placing order with newly added credit card
  test.describe("Mason Checkout - Logged in: Placing order with newly added credit card - Scenarios", () => {
    test.use({ storageState: './shoemalluser1.json' });
    test('Logged in:Placing order with newly added credit card', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateShippingSection();
      //await guestCheckoutPage.addShippingAddress();
      //await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.clickCreditCard();
      await guestCheckoutPage.addCardDetails();
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
    });
  });

  // Scenario 5: Logged in - Non Credit Users: placing order with saved credit card
  test.describe("Mason Checkout - Logged in: Placing order with saved credit card - Scenarios", () => {
    test.use({ storageState: './shoemalluser2.json' });
    test('Logged in: Placing order with saved credit card', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validatePlaceOrderButton();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
    });
  });

  // Scenario 5: Logged in - Non Credit Users: placing order with saved credit card
  test.describe("Mason Checkout - Logged in: Placing order with saved cc- promo code - Scenarios", () => {
    test.use({ storageState: './shoemalluser3.json' });
    test('Logged in: Placing order with saved cc- promo code', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validatePromoCodeSection();
      await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
      await guestCheckoutPage.validatePlaceOrderButton();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
    });
  });

  // Scenario 6: Logged in - Non Credit Users: placing order with ZB Credit
  test.describe("Mason Checkout - Logged in: Placing order with Paypal - Scenarios", () => {
    test.use({ storageState: './shoemalluser4.json' });
    test('Logged in: Placing order with Paypal', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.paypalPayment(checkout_data.paypal_loginid,checkout_data.paypal_password);
      await guestCheckoutPage.validatePlaceOrderButton();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPaymentPaypal();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateProductSection();
    });
  });

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/FPScreenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });
});

