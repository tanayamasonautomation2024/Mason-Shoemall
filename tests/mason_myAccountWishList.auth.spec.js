const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { ResetPage } from '../pages/mason_reset_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountWishListPage } from '../pages/mason_myAccountWishList_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';
import fs from 'fs';
require('dotenv').config();

const profileUserFile = './shoemalluser21.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;
let loginSuccessful = false;
test.describe("Mason MyAccount Wishlist", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? profileUserFile : profileUserFile;

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



  //SB-MyA327
  test("Validate Breadcrumbs in WishList Page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateWishlistBreadcrumb();
  })

  //SB-MyA330
  test("Validate Item count is displayed near the title in WishList Page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
  })

  //SB-MyA331
  test("Validate WishListed item in WishList Page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validateTheWishListedItem();

  })


  //SB-MyA338
  test("Validate Alignment of WishListed item in WishList Page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validateAlignmentInWishListNew();

  })

  //SB-MyA339
  test("Validate Pricing of WishListed item in WishList Page is in the expected format", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await page.reload();
    await page.waitForLoadState('networkidle');
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validatePricingFormatNew();
  })


  //SB-MyA334
  test("Validate Heart icon is filled in the Wishlist page for all the wishlisted product", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validateHeartIconIsFilled();
  })

  //SB-MyA335
  test("Validate Item Remove Success message when we click on wishlisted icon in wishList page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validateRemoveItemFromWishList();
  })

  // //SB-MyA357, //SB-MyA326
  // test.skip("Validate user should be able to navigate to WishList Page in My account", async ({ page }, testInfo) => {
  //   const myaccountPage = new MyAccountPage(page);
  //   await myaccountPage.redirectToMyAccount();
  //   const myaccountWishListPage = new MyAccountWishListPage(page);
  //   await myaccountPage.displayMyAccountLeftNavigationLink();
  //   await myaccountPage.clickMyAccountWishListLink();
  //   await myaccountWishListPage.validateWishListPage();
  //   await myaccountWishListPage.noWishListMessageForNewUser();


  // })

  //SB-MyA332
  test("Validate navigation to PDP from image in wishList page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validatePDPNavigationFromImageLink();
  })


  //SB-MyA337
  test("Validate navigation to PDP from title in wishList page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validatePDPNavigationFromTitleLink();
  })

  //SB-MyA352, 349
  test("Validate Move to cart and View More Details(if variants are present) in wishList page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    await myaccountWishListPage.validateViewMoreDetails();
  })


  //SB-MyA340
  test("Validate Move to cart and Cart count(if variants are not present) in wishList page", async ({ page }, testInfo) => {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myaccountWishListPage = new MyAccountWishListPage(page);
    await myaccountPage.displayMyAccountLeftNavigationLink();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountWishListPage.validateItemCountIsDisplayed();
    //await myaccountWishListPage.validateCreditPriceFormat();
    await myaccountWishListPage.validateCartCountChange();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/Wishlist-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})