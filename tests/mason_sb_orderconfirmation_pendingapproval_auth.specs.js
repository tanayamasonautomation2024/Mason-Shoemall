const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { CartPage } from '../pages/mason_cart_page';
import { EmptyCartPage } from '../pages/mason_emptycart_page';
import {OrderDetailsPage} from '../pages/mason_orderdetails_page';
import {OrderConfirmationPage} from '../pages/mason_order_confirmation_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();
const creditUserFile = './credituser.json';
const nonCreditUserFile = './noncredituser.json';
const newUserFile = './newuser.json';
const globalUser1File = './globaluser1.json';
const orderDetailsCancelOrderFile = './orderdetailscancelorder.json';
const paymentUserFile = './paymentuser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const minicart_data = JSON.parse(JSON.stringify(require('../test_data/mason_minicart_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));

test.describe("Mason Order Confirmation Pending Credit Approval Guest User Page", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
       try {
           await page.goto(process.env.WEB_URL);
           await page.waitForTimeout(3000);
       } catch (error) {
           // Handle the error here
           console.error("An error occurred in test.beforeEach:", error);
       }  
  })
  test.afterEach(async ({ page }) => {
    const start = Date.now();

    // Perform tasks in parallel
    await Promise.all([
        process.env.TAKE_SCREENSHOTS && page.screenshot({ path: 'screenshot.png' }),
        page.close(),
        //context.close()
    ]);

    console.log(`AfterHooks completed in ${Date.now() - start}ms`);
  });

  //Order Confirmation Page - Test Cases ID-SB-CCA041
  test("Order Confirmation Page - Pending Credit Approval - Verify Order Confirmation section shows:- Order Confirmation Number <system generated number> in black color. - Order created date (place order) in MM/DD/YY format.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.validatePendingOrderNumber();
  })

  //Order Confirmation Page - Test Cases ID-
  test("Order Confirmation Page - Pending Credit Approval - Verify when user clicks on Contact Us link from text area on the Order Confirmation Page should on the Contact Us page.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.clickOnContactUs();
  })

  //Order Confirmation Page - Test Cases ID-SB-Chkout248
  test("Order Confirmation Page - Pending Credit Approval - Order Summary - Verify Order Summary on the Order Confirmation Page.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.validateOrderConfirmationOrderSummary();
  })

  //Order Confirmation Page - Test Cases ID-SB-Chkout249
  test("Order Confirmation Page - Pending Credit Approval - Shipping Section - Verify Shipping Section on the Order Confirmation Page.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.validateOrderConfirmationShippingDetails();
  })

  //Order Confirmation Page - Test Cases ID-SB-Chkout250
  test("Order Confirmation Page - Pending Credit Approval - Payment Section - Verify Payment Section on the Order Confirmation Page.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.validateOrderConfirmationBillingAddress();
    await orderConfPage.validateOrderConfirmationPaymentCredit();
  })

  //Order Confirmation Page - Test Cases ID-SB-CCA050/SB-CCA051
  test("Order Confirmation Page - Pending Credit Approval - Item in your Cart - Verify 'Item in your Cart' section on the Order Confirmation Page.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.validateProductSection();
  })

  //Order Confirmation Page - Pending Credit Approval Section - Test Cases ID-SB-CCA039/SB-CCA040
  test("Order Confirmation Page - Pending Credit Approval Section - Verify following text is shown on order confirmation page:- Your order has been submitted and is pending credit approval.", async ({ page }, testInfo) => {
    // const pdpPage = new PDPPage(page);
    // const cartDrawerPage = new CartDrawerPage(page);
       const orderConfPage = new OrderConfirmationPage(page);
    // await page.goto(pdp_data.pdp_url);
    // const cartItemCount = await pdpPage.getCartItemCount();
    // if (cartItemCount === '0') {
    //   await pdpPage.clickOnPDPSizeVariantButton();
    //   await pdpPage.addtoCart();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // } else {
    //   const homePage = new HomePageNew(page);
    //   homePage.clickMiniCartIcon();
    //   await pdpPage.miniCartDrawer();
    //   await orderConfPage.checkoutPage();
    // }
    await page.goto('https://stage--stoneberry-masoncompanies.netlify.app/thank-you/?orderId=9d7826d5-8d6f-40c9-bcbc-ba47f01f18f9');
    await page.getByText('Your order has been submitted').waitFor({ state: 'visible' });
    await orderConfPage.validateOrderConfPendingCreditApproval();
  })

})

