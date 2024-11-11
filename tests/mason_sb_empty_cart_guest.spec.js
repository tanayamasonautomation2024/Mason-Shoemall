const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { CartPage } from '../pages/mason_cart_page';
import { EmptyCartPage } from '../pages/mason_emptycart_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const minicart_data = JSON.parse(JSON.stringify(require('../test_data/mason_minicart_page_data.json')));

test.describe("Mason Empty Cart Page for Guest user", () => {

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

  //Cart - Display Empty Cart Message - Test Cases ID-SB-Cart162/SB-Cart160
  test("Cart - Display Empty Cart Message -  Verify 'Your shopping cart is empty' text is shown below the page title.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.validateEmptyCartMessageGuestUser();

  })

  //Cart - Display Additional Text for Guest Users - Test Cases ID-SB-Cart163
  test("Cart - Display Additional Text for Guest Users - Verify application shows the additional text - 'Have an account? Sign in to view items that were previously added to your cart'.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.validateEmptyCartAccountSignInText();

  })

  //Cart - Sign In Functionality for Guest Users - Test Cases ID-SB-Cart164
  test("Cart - Sign In Functionality for Guest Users - Verify clicking on the Sign in text link, application generates the Sign In Drawer.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.clickSignInTextEmptyCart();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignInDialog();

  })

  //Cart - Sign In Functionality for Guest Users - Test Cases ID-SB-Cart165
  test("Cart - Sign In Functionality for Guest Users -  Verify clicking the Sign In btn, application opens the Sign In Drawer.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.clickSignInButtonEmptyCart();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignInDialog();

  })

  //Cart - Sign In Functionality for Logged In Users - Test Cases ID-SB-Cart165
  test("Cart - Sign In Functionality for Logged In Users -  Verify clicking the Sign In btn, application opens the Sign In Drawer and user can logged In.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.clickSignInTextEmptyCart();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignInDialog();
    await signinPage.login(process.env.MY_PROFILE_USER, process.env.PROFILE_PASSWORD);
    await signinPage.clickSignIn();
    await emptyCartPage.validateEmptyCartLoggedInUser();
    await emptyCartPage.clickContinueShoppingButtonEmptyCart();

  })

  //Cart - Continue Shopping CTA Functionality for Logged In Users - Test Cases ID-SB-Cart167
  test("Cart - Continue Shopping CTA Functionality for Logged In Users - Verify clicking on the Continue Shopping btn, application redirects user to the homepage.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.clickSignInTextEmptyCart();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignInDialog();
    await signinPage.login(process.env.MY_PROFILE_USER, process.env.PROFILE_PASSWORD);
    await signinPage.clickSignIn();
    await emptyCartPage.validateEmptyCartLoggedInUser();
    await emptyCartPage.clickContinueShoppingButtonEmptyCart();
    await homePage.homePageRedirectionValidation(homepage_data.homePageUrl);

  })

  //Cart - Continue Shopping CTA Functionality for Guest Users - Test Cases ID-SB-Cart166
  test("Cart - Continue Shopping CTA Functionality for Guest Users - Verify application shows the additional text - 'Have an account? Sign in to view items that were previously added to your cart'.", async ({ page }, testInfo) => {
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    const pdpPage = new PDPPage(page);
    await pdpPage.miniCartDrawer();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.miniCartClickViewCartButton();
    const emptyCartPage = new EmptyCartPage(page);
    await emptyCartPage.clickContinueShoppingButtonEmptyCart();
    await homePage.homePageRedirectionValidation(homepage_data.homePageUrl);
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/EmptyCart-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})