const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();

const userFile = './shoemalluser19.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));

let loginSuccessful = false;
test.describe("Mason PDP", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? userFile : userFile;

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

  //PDP - Display of Selected Variant Image - Test Cases ID-SB-PDP017/SB-PDP019
  test("PDP - Display of Selected Variant Image - Verify that selected variant’s image is displayed  as full sized to the left", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_diff_color);
    await pdpPage.verifyImageChangesOnVariantSelection();
  })

  //PDP - Image Navigation with Left and Right Arrows - Test Cases ID-SB-PDP026
  test("PDP - Image Navigation with Left and Right Arrows - Verify left and right navigation arrows on the main image displayed", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url_carousel);
    await pdpPage.clickLeftRightCarouselButton();
  })

  //PDP - Display of Additional Images as Thumbnails - Test Cases ID-SB-PDP028
  test("PDP - Display of Additional Images as Thumbnails - Verify additional images associated with variants thumbnail images,variant has more than 5 image associated with it, system shall display left and right navigation arrows.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.thumbnailImageLeftRightArrowDisplay();
  })

  //PDP - Highlighting Selected Thumbnail Image - Test Cases ID-SB-PDP029
  test("PDP - Highlighting Selected Thumbnail Image - Verify that system can highlight with a black outline the thumbnail image that corresponds to the image currently being viewed as full sized.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateThumbnailImageSelection();
  })

  //PDP - Product Data Display (Name, Item #, Reviews, Shop All Link, Color, Size, Size Chart Link, Pricing) - Test Cases ID-SB-PDP009/SB-PDP010/SB-PDP011/SB-PDP016
  test("PDP - Product Data Display (Name, Item #, Reviews, Shop All Link, Color, Size, Size Chart Link, Pricing) - Verify Display of various product data.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url_shopalllink);
    await pdpPage.validateProductDetails();
  })

  //PDP - Product Data Display (Name, Item #, Reviews, Shop All Link, Color, Size, Size Chart Link, Pricing) - Test Cases ID-SB-PDP012/SB-PDP013/SB-PDP014/SB-PDP015
  test("PDP - Product Data Display - Verify selection of size & color variants.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateSelectSizeValue();
    await pdpPage.validateSelectColorValue();
  })

  //PDP - Display Sale Pricing and Percentage Saved - Test Cases ID-SB-PDP043
  test("PDP - Display Sale Pricing and Percentage Saved - Verify Sitewide sale pricing shall be displayed bolded in red if the product is on sale followed by the regular retail price.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url_saleprice);
    await pdpPage.validatePricingSection();
  })

  //PDP - Display Dynamic Credit Messaging and Promotional Text - Test Cases ID-SB-PDP048
  test("PDP - Display Dynamic Credit Messaging and Promotional Text - Verify Dynamic Credit Specific Messaging and/or Promotional Text:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateCreditMessageSection();
  })

  //PDP - Description and Specifications Display - Test Cases ID-SB-PDP048
  test("PDP - Description,Specifications and Shipping Display - Verify the Display of description,specifications and shipping section:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateDescription();
    await pdpPage.validateSpecifications();
    await pdpPage.validateShipping();
  })

  //PDP - Ways to Wear It Section - Test Cases ID-SB-PDP067
  test("PDP - Ways to Wear It Section - Verify Ways to wear content:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url_waystowearit);
    await pdpPage.validateWaysToWearIt();
  })

  //PDP - Reviews and Questions & Answers Display - Test Cases ID-SB-PDP084/SB-PDP085
  test("PDP - Reviews and Questions & Answers Display - Verify Power review and Q&A content:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url_reviews);
    await pdpPage.validateReviews();
    await pdpPage.validateQuestionsAnswers();
  })

  //PDP - Quantity field & Stock Availability: Display - Test Cases ID
  test("PDP - Quantity field & Stock Availability: Display - Verify Quantity field & Stock Availability display:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateProductQTYSection();
    await pdpPage.validateProductAvailabilityMessage();
  })

  //PDP - Quantity field & Stock Availability: Display - Test Cases ID
  test("PDP - Quantity update - Verify Quantity update on clicking the plus and minus button:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateProductQTYIncreaseDecrease();
  })

  //PDP - Quantity field & Stock Availability: Display - Test Cases ID
  test("PDP - Quantity update - Verify Quantity update on entering value in the Quantity textbox:", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.validateProductQTYUpdateByTypeIn(pdp_data.product_quantity);
  })

  //PDP - Quantity field & Stock Availability: Display - Test Cases ID
  test("PDP - Add To Cart - Verify on clicking Add To Cart CTA the product variant will be added to the user’s cart update the numeric qty of items displayed under the cart icon within the Global Header.", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await pdpPage.closeMiniCartDrawer();
    await pdpPage.minCartItemCount();
  })

  //Navigation to PDP from PLP, product image link, or configured link-SB-PDP005
  test("Navigation to PDP from PLP - Verify that Clicking on product image, name, or link redirected to the PDP", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.selectRandomSubCategory();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.navigateToPDPFromPLP();
    const pdpPage = new PDPPage(page);
    await pdpPage.validateSimilarItem();
  })
  

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/PDP-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})