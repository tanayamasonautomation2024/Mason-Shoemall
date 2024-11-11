const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();

const userFile = './shoemalluser13.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;
let loginSuccessful = false;
test.describe("Mason MyAccount Longstanding Customer", () => {

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

  //Account - My Account- Longstanding Customer - Test Cases ID -SB-MyA005
  test("Account - My Account-Left-hand Navigation - Verify all navigation links are clickable", async ({ page }, testInfo) => {
    //test.slow();

    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.verifyLeftNavLinks();
    //await myaccountPage.verifyAllLinksAreClickable();
  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA005
  test("Account - My Account-Left-hand Navigation - Verify navigation link highlights current section", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickAndVerifyHighlightedLink();

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA015
  test("Account - Orders - Verify display of order data in Orders Page", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    await myaccountPage.validatedOrderNumberDisplaySectionWithLimitedOrder(myaccountpage_data.myaccount_orders_ordernumberprefix);

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA018
  test("Account - Orders - Verify clicking on product name or image thumbnail, redirects user to order details page", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    await myaccountPage.clickOnProductNamePlacedOrder();

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA023
  test("Account - Address - Verify Default address is shown in the Addresses section along with View Addresses link", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.validateDefaultShippingandBillingAddressSection();
    await myaccountPage.validateEditAndRemoveButtonDisplayForMyAccount();

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA026/SB-MyA028
  test("Account - My Profile - Verify my profile section shows: - User's First and last name - Email address", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountMyProfileLink();
    await myaccountPage.validateMyProfilePage();

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA027
  test("Account - Change Password - Verify navigation to Change password page when click on the link from account home page", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickChangePasswordLink();
    await myaccountPage.validateChangePasswordSection();

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA029
  test("Account - Saved Credit Cards - Verify Credit card section shows:- Default card details (Credit card svg image, last 4 digits of the card and expiry date)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountSavedCCLink();
    await myaccountPage.validateDefaultSavedCreditCardSection();
    await myaccountPage.validateEditAndRemoveButtonDisplayForMyAccount();

  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA022
  test("Account - Orders - Verify clicking on the View Orders link from My Account Dashboard redirect user to the Orders page)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountViewOrderLink();
  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA028
  test("Account - View My Profile - Verify clicking on the View My Profile link from My Account Dashboard redirect user to the My Profile page)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountViewMyProfileLink();
  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA024
  test("Account - View Addresses - Verify clicking on the View Addresses link from My Account Dashboard redirect user to the Addresses page)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountViewAddressLink();
  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA030
  test("Account - View Saved Credit Card - Verify clicking on the  View Saved Credit Card link from My Account Dashboard redirect user to the Credit Card page)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountViewSavedCCLink();
  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA034
  test("Account - View Wishlist - Verify clicking on the View Wishlist link from My Account Dashboard redirect user to the Wishlist page)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountViewWishListLink();
  })

  //Account - My Account- Longstanding Customer - Test Cases ID-SB-MyA034/SB-MyA033
  test("Account - Wish List - Verify navigation Wish list page when click on wish list link and Wishlist section shows:- Product image thumbnails)", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountWishListLink();
    await myaccountPage.validateProductImagesWishlist();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/LongStanding-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})