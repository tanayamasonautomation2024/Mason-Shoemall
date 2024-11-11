const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { CartPage } from '../pages/mason_cart_page';
import { GuestCheckOutPage } from '../pages/mason_guestCheckout_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();
const creditUserFile = './credituser.json';
const nonCreditUserFile = './noncredituser.json';
const newUserFile = './newuser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const minicart_data = JSON.parse(JSON.stringify(require('../test_data/mason_minicart_page_data.json')));

let loginSuccessful = false;
test.describe("Mason Cart Drawer", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      console.error("Navigation failed:", error);
      test.skip('Skipping test because navigation failed');
    }
  })

  //Cart Drawer - Adding a product with variations to the cart - Test Cases ID-SB-Cart006/SB-Cart007
  test("Cart Drawer - Adding a product with variations to the cart - Verify Choose Options drawer gets open when user click on add to cart against a product which has multiple variants from PLP and after adding to cart Cart Drawer opens", async ({ page }, testInfo) => {

    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    const pdpPage = new PDPPage(page);
    await homePage.selectRandomSubCategory();
    await cartDrawerPage.clickAddtoCartPLP();
    await pdpPage.miniCartDrawer();
  })

  //Cart Drawer - Adding a product with or without variations from the PDP - Test Cases ID-SB-Cart008
  test("Cart Drawer - Adding a product with or without variations from the PDP - Verify cart drawer gets open when user adds any product to the cart from any PDP", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
  })

  //Cart Drawer - Opening the Cart Drawer - Test Cases ID-SB-Cart001/SB-Cart002/SB-Cart010
  test("Cart Drawer - Opening the Cart Drawer - Verify that clicking the Cart icon in the top right corner of the Global Header opens the Cart Drawer, displaying the correct information with a gray transparent overlay and an X button to close the drawer.", async ({ page }, testInfo) => {

    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    await pdpPage.closeMiniCartDrawer();
  })
  //Cart Drawer - Removing items from the cart - Test Cases ID-SB-Cart024 Functionality out of scope
  test("Cart Drawer - Removing items from the cart - Verify if a user clicks the minus button when the qty is 1, application removes the item from the shopping cart.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.removeMiniCartItemsMinusSign();
    await pdpPage.closeMiniCartDrawer();
  })

  //Cart Drawer - Removing items from the cart - Test Cases ID-SB-Cart025
  test("Cart Drawer - Removing items from the cart - Verify If a user clicks and enters 0 into the qty field, application removes the item from the shopping cart.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.removeMiniCartItemsQtyTextBox();
    await pdpPage.closeMiniCartDrawer();
  })

  //Cart Drawer - Removing items from the cart - Test Cases ID-SB-Cart032
  test("Cart Drawer - Removing items from the cart - Verify clicking on Remove button, item gets removed from the cart.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.removeMiniCartItemsRemoveButton();
    await pdpPage.closeMiniCartDrawer();
  })

  //Cart Drawer - Handling quantity adjustments in the cart - Test Cases ID-SB-Cart032
  test("Cart Drawer - Handling quantity adjustments in the cart - Validate that the system prevents users from adding quantities beyond available stock and resets the value if the user exceeds the available quantity.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url_limitedStocks);
    await pdpPage.selectSize('S','1')
    await pdpPage.addtoCart();
    await cartDrawerPage.clickQtyIncreaseButton();
    await cartDrawerPage.miniCartUpdateInStockQty();
    await pdpPage.closeMiniCartDrawer();
  })

  //Cart Drawer - Handling quantity adjustments in the cart - Test Cases ID-SB-Cart032
  test("Cart Drawer - Handling quantity adjustments in the cart - Validate that users can adjust the quantity of items in the cart by clicking the plus or minus buttons.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.miniCartUpdateQtyMinusPlusSign();
    await pdpPage.closeMiniCartDrawer();
  })

  //Cart Drawer - Handling quantity adjustments in the cart - Test Cases ID-SB-Cart029/SB-Cart030/SB-Cart031
  test("Cart Drawer - Handling quantity adjustments in the cart - Verify user is able to type in the quantity.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url_limitedStocks);
    await pdpPage.selectSize('S','1');
    await pdpPage.addtoCart();
    await cartDrawerPage.miniCartQtyUpdateByTypeIn();
    await pdpPage.closeMiniCartDrawer();
  })

  //Cart Drawer - Handling View Cart and Check Out CTAs - Test Cases ID-SB-Cart040/SB-Cart055/SB-Cart056
  test("Cart Drawer - Handling View Cart and Check Out CTAs - Verify application shows View cart button and clicking on it navigates user to full cart page.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    const cartItemCount = await pdpPage.getCartItemCount();
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    const miniCartItemsCount = await cartDrawerPage.miniCartGetTotalItemsCount();
    console.log('Mini Cart Items Count' + miniCartItemsCount);
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const cartItemsCount = await cartPage.cartGetTotalItemsCount();
    console.log('Shopping Cart Items Count' + cartItemsCount);
    expect(miniCartItemsCount).toBe(cartItemsCount);

  })

  //Cart Drawer - Handling View Cart and Check Out CTAs - Test Cases ID-SB-Cart043
  test("Cart Drawer - Handling View Cart and Check Out CTAs - Verify logged In user with no saved information clicks on Checkout button from mini cart, application redirects user to the Shipping Step of checkout.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.miniCartClickCheckoutButtonGuest();
    const guestCheckoutPage = new GuestCheckOutPage(page);
    await guestCheckoutPage.continueCheckoutAsGuest();
    await cartDrawerPage.navigateToCheckoutShipping();

  })

  //Cart Drawer - Displaying success banners for adding items to the cart - Test Cases ID-SB-Cart050/SB-Cart051
  test("Cart Drawer - Displaying success banners for adding items to the cart - Verify application shows 'x item added to the cart' message when single quantity is added to the cart.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const homePage = new HomePageNew(page);
    const cartDrawerPage = new CartDrawerPage(page);
    // await homePage.selectRandomSubCategory();
    // await cartDrawerPage.clickAddtoCartPLP();
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.cartDrawerSuccessMessage();
    await pdpPage.closeMiniCartDrawer();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/CartDrawer-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})