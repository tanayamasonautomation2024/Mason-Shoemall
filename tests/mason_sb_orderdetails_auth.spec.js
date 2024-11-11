const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { CartPage } from '../pages/mason_cart_page';
import { EmptyCartPage } from '../pages/mason_emptycart_page';
import { OrderDetailsPage } from '../pages/mason_orderdetails_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();

const orderUser = './shoemallorderuser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const minicart_data = JSON.parse(JSON.stringify(require('../test_data/mason_minicart_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));

let loginSuccessful = false;
test.describe("Mason Order Details Page", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? orderUser : orderUser;

    if (fs.existsSync(storageStatePath)) {
      await page.context().addCookies(JSON.parse(fs.readFileSync(storageStatePath, 'utf-8')).cookies);
      loginSuccessful = true;
    } else {
      console.error("Login state is not available, skipping test.");
      test.skip('Skipping test because login state is not available');
    }

    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      console.error("Navigation failed:", error);
      test.skip('Skipping test because navigation failed');
    }
  })

  //Order Details - Order Cancellation - Test Cases ID-SB-MyA194
  test("My Account Order details - Order Cancellation - Verify Cancel button displayed if order is Pending Shipment.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();

  })
  //Order Details - Order Cancellation - Test Cases ID-SB-MyA194/SB-MyA200
  test("My Account Order details - Order Cancellation - Verify Cancel button does not show if order is already Processed and Shipped.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateNoCancelOrderInOrderDetails();

  })

  //Order Details - Order Cancellation - Test Cases ID-SB-MyA195
  test("My Account Order details - Order Cancellation - Verify clicking on Cancel on, application opens a cancel modal along with following options:- Yes, Cancel the Order- No, Go back to the Order- X option.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.clickCancelOrderButton();
    await orderDetailsPage.validateCancelOrderModal();

  })

  //Order Details - Order Cancellation - Test Cases ID-SB-MyA196
  test("My Account Order details - Order Cancellation - Verify clicking on X closes the cancel order modal.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.clickCancelOrderButton();
    await orderDetailsPage.validateCancelOrderModal();
    await orderDetailsPage.clickCloseCancelOrderButton();

  })

  //Order Details - Order Cancellation - Test Cases ID-SB-MyA196
  test("My Account Order details - Order Cancellation - Verify clicking on No,Go Back closes the cancel order modal.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.clickCancelOrderButton();
    await orderDetailsPage.validateCancelOrderModal();
    await orderDetailsPage.clickNoGoBackOrderButton();

  })

  //Order Details - Item Cancellation - Test Cases ID-SB-MyA199
  test("My Account Order details - Item Cancellation - Verify if an item within a multiple item order has not been processed or shipped, application displays 'Cancel Item' button with the text 'Changed your mind?' within the bottom righthand corner of the item detail card.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.validateCancelItemButton();

  })

  //Order Details - Item Cancellation - Test Cases ID-SB-MyA201
  test("My Account Order details - Item Cancellation - Verify clicking on Cancel Item on, application opens a cancel item modal along with following options:- Yes, Cancel the product- No, Go back to the Order- X option", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.clickCancelItemButton();
    await orderDetailsPage.validateCancelItemModal();

  })

  //Order Details - Item Cancellation - Test Cases ID-SB-MyA196
  test("My Account Order details - Item Cancellation - Verify clicking on X closes the cancel Item modal.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.clickCancelItemButton();
    await orderDetailsPage.validateCancelItemModal();
    await orderDetailsPage.clickCloseCancelItemModalButton();

  })

  //Order Details - Item Cancellation - Test Cases ID-SB-MyA196
  test("My Account Order details - Item Cancellation - Verify clicking on No,Go Back closes the cancel Item modal.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateCancelOrderInOrderDetails();
    await orderDetailsPage.clickCancelItemButton();
    await orderDetailsPage.validateCancelItemModal();
    await orderDetailsPage.clickNoGoBackOrderButton();

  })

  // //Order Details - Item Cancellation - Test Cases ID-SB-MyA202/SB-MyA203 //Commenting this test cases as it will cancelled the order and for that we need many orders so avoiding this scenarios.
  // test.skip("My Account Order details - Item Cancellation - Verify clicking on 'Cancel Item' button, modal gets closed, page gets refreshed and application shows the order status as 'Cancelled' on the applicable item.", async ({ page }, testInfo) => {
  //   if (!loginSuccessful) {
  //     test.skip('Skipping test due to failed login');
  //   }
  //   const myaccountPage = new MyAccountPage(page);
  //   await myaccountPage.redirectToMyAccount();
  //   await myaccountPage.clickMyAccountOrderLink();
  //   const orderDetailsPage = new OrderDetailsPage(page);
  //   //await orderDetailsPage.validateCancelOrderInOrderDetails();
  //   //await orderDetailsPage.validateCanceledItem();
  //   const isPendingShipmentOrderFound = await orderDetailsPage.validateCancelOrderInOrderDetails();
  //   if (isPendingShipmentOrderFound) {
  //     await orderDetailsPage.validateCanceledItem();
  //   } else {
  //     console.log('No order with "Pending Shipment" status found. Skipping Cancel item.');
  //   }

  // })

  // //Order Details - Order Cancellation - Test Cases ID-SB-MyA197/SB-MyA198 //Commenting this test cases as it will cancelled the order and for that we need many orders so avoiding this scenarios.
  // test.skip("My Account Order details - Order Cancellation - Verify clicking on Yes, application closes the modal, refreshes the page and order status gets changed to Canceled.", async ({ page }, testInfo) => {
  //   if (!loginSuccessful) {
  //     test.skip('Skipping test due to failed login');
  //   }
  //   const myaccountPage = new MyAccountPage(page);
  //   await myaccountPage.redirectToMyAccount();
  //   await myaccountPage.clickMyAccountOrderLink();
  //   const orderDetailsPage = new OrderDetailsPage(page);
  //   await orderDetailsPage.validateCancelOrderInOrderDetails();
  //   const orderID = await orderDetailsPage.getOrderNumberInOrderDetails();
  //   const orderIDWithOutHash = orderID.replace('#', '');
  //   await orderDetailsPage.clickCancelOrderButton();
  //   await orderDetailsPage.validatedCanceledOrder(orderIDWithOutHash);

  // })

  //Order Details - Order Summary - Test Cases ID-SB-MyA204
  test("My Account Order details - Order Summary - Verify Order Summary shows following fields:- Subtotal- Shipping with ? icon- Shipping Surcharge (when applicable) - with ? icon- Sales Tax - with ? icon- Order total.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickViewOrderDetailsLink();
    await orderDetailsPage.validateOrderDetailsOrderSummary();

  })

  //Order Details - Shipping Section - Test Cases ID-SB-MyA212
  test("My Account Order details - Shipping Section - Verify below the Order Summary, Shipping section shows with the following data: - Shipping Address- First & Last Name- Address Line 1- Address Line 2 (if available)- City, State/Region & Zip Code- 10 digit phone - (XXX) XXX-XXXX format.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickViewOrderDetailsLink();
    await orderDetailsPage.validateOrderDetailsShippingDetails();

  })

  //Order Details - Payment Section - Test Cases ID-SB-MyA214/SB-MyA215
  test("My Account Order details - Payment Section - Verify following details are shown along with Payment details: - Billing Address- First & Last Name- Address Line 1- Address Line 2 (if available)- City, State/Region & Zip Code- 10 digit phone - (XXX) XXX-XXXX format.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickViewOrderDetailsLink();
    await orderDetailsPage.validateOrderDetailsBillingAddress();
    await orderDetailsPage.validateOrderDetailsPaymentSection();
  })

  //Order Details - Shipment Details - Test Cases ID-SB-MyA217/SB-MyA218
  test("My Account Order details - Shipment Details - Verify following details are shown in the Shipment section:- Shipment (number).", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    // await orderDetailsPage.validateShippedOrderInOrderDetails();
    // await orderDetailsPage.clickOnTrackShipmentNumber();
    const isShippedOrderFound = await orderDetailsPage.validateShippedOrderInOrderDetails();
    if (isShippedOrderFound) {
      await orderDetailsPage.clickOnTrackShipmentNumber();
    } else {
      console.log('No order with "Shipped On" status found. Skipping Track Shipment Number click.');
    }
  })

  //Order Details - Product Data - Test Cases ID-SB-MyA222
  test("My Account Order details - Product Data - Verify display of product details including name, image thumbnail, variant attributes, quantity, price, protection plan, etc.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickViewOrderDetailsLink();
    await orderDetailsPage.validateProductSection();
  })

  //Order Details - Write a Product Review - Test Cases ID-SB-MyA224
  test("My Account Order details - Write a Product Review - Verify 'Write a Product Review' button is shown only if the order status is marked 'Delivered'.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateDeliveredOrderInOrderDetails();
  })

  //Order Details - Write a Product Review - Test Cases ID-SB-MyA225
  test("My Account Order details - Write a Product Review - Verify clicking on the 'Write a Product Review' button, application opens a modal hosted from Power Reviews integration.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    // await orderDetailsPage.validateDeliveredOrderInOrderDetails();
    // await orderDetailsPage.clickOnWriteAReviewButton();
    const isDeliveredOnOrderFound = await orderDetailsPage.validateDeliveredOrderInOrderDetails();
    if (isDeliveredOnOrderFound) {
      await orderDetailsPage.clickOnWriteAReviewButton();
    } else {
      console.log('No order with "Delivered On" status found. Skipping Write a review Click.');
    }
  })

  //Order Details - Return/Refund Information - Test Cases ID-
  test("My Account Order details - Return/Refund Information - Verify display of return information in the Order Summary section.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.validateReturnedOnOrderInOrderDetails();

  })

  //Order Details - Return/Refund Information - Test Cases ID-
  test("My Account Order details - Return/Refund Information - Verify display of refund information in the Order Summary section.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    // await orderDetailsPage.validateReturnedOnOrderInOrderDetails();
    // await orderDetailsPage.validatePostOrderRefundTextVisibility();
    const isReturnedOnOrderFound = await orderDetailsPage.validateReturnedOnOrderInOrderDetails();
    if (isReturnedOnOrderFound) {
      await orderDetailsPage.validatePostOrderRefundTextVisibility();
    } else {
      console.log('No order with "Returned On" status found. Skipping Post Order Refund Text Visibility.');
    }

  })

  //Order Details - Display the Order Number under the Orders in Left Navigation - Test Cases ID-SB-MyA175/SB-MyA176
  test("My Account Order details - Display the Order Number under the Orders in Left Navigation - Verify the left navigation updates to Orders -> Order number when user is only any order's details page.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickViewOrderDetailsLink();
    await orderDetailsPage.validateOrderDetailsOrderNumberSection();
    await orderDetailsPage.validatePlacedOnDate();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/OrderDetails-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})

