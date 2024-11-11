const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { MyAccountOrderPage } from '../pages/mason_myAccountOrder_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountSavedCCPage } from '../pages/mason_myAccountSavedCC_page';
import { OrderDetailsPage } from '../pages/mason_orderdetails_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));



test.describe("Mason MyAccount Single Order lookup", () => {

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


  //SB-MyA187
  test("Validate proper Error Messages if required fields are left empty in Orders page", async ({ page }, testInfo) => {
    //test.slow();
    const myaccountPage = new MyAccountPage(page);
    const myaccountOrderPage = new MyAccountOrderPage(page);
    //await myaccountPage.displayMyAccountLeftNavigationLink();
    // await myaccountPage.clickOnMyAccountLink();
    await myaccountPage.clickOrderStatusLinkGuest();
    ////await page.waitForLoadState('networkidle');
    await myaccountOrderPage.validateSingleOrderLookupSection();
    await myaccountOrderPage.enterOrderNumber('');
    await myaccountOrderPage.enterZipCode('');
    await myaccountOrderPage.clickOnViewOrderButton();
    await myaccountOrderPage.requiredOrderNumberError();
    await myaccountOrderPage.requiredZipError();

  })

  //SB-MyA186
  test("Validate user should be able to navigate to Orders Page in My account and the fields in Orders Page", async ({ page }, testInfo) => {
    //test.slow();
    const myaccountPage = new MyAccountPage(page);
    const myaccountOrderPage = new MyAccountOrderPage(page);
    //await myaccountPage.displayMyAccountLeftNavigationLink();
    // await myaccountPage.clickOnMyAccountLink();
    await myaccountPage.clickOrderStatusLinkGuest();
    //await page.waitForLoadState('networkidle');
    await myaccountOrderPage.validateSingleOrderLookupSection();

  })


  //SB-MyA189
  test("Validate proper Error Message when entered order number and zip code are wrong", async ({ page }, testInfo) => {
    //test.slow();
    const myaccountPage = new MyAccountPage(page);
    const myaccountOrderPage = new MyAccountOrderPage(page);
    //await myaccountPage.displayMyAccountLeftNavigationLink();
    // await myaccountPage.clickOnMyAccountLink();
    await myaccountPage.clickOrderStatusLinkGuest();
    //await page.waitForLoadState('networkidle');
    await myaccountOrderPage.validateSingleOrderLookupSection();
    await myaccountOrderPage.enterOrderNumber('123');
    await myaccountOrderPage.enterZipCode('11111');
    await myaccountOrderPage.clickOnViewOrderButton();
    await myaccountOrderPage.noOrderMessage();

  })


  //SB-MyA190
  test("Validate navigation to the Contact Us page when user clicks on ContactUs link", async ({ page }, testInfo) => {
    //test.slow();
    const myaccountPage = new MyAccountPage(page);
    const myaccountOrderPage = new MyAccountOrderPage(page);
    //await myaccountPage.displayMyAccountLeftNavigationLink();
    // await myaccountPage.clickOnMyAccountLink();
    await myaccountPage.clickOrderStatusLinkGuest();
    //await page.waitForLoadState('networkidle');
    await myaccountOrderPage.validateSingleOrderLookupSection();
    await myaccountOrderPage.enterOrderNumber('123');
    await myaccountOrderPage.enterZipCode('11111');
    await myaccountOrderPage.clickOnViewOrderButton();
    await myaccountOrderPage.noOrderMessage();
    await myaccountOrderPage.clickOncontactUs();

  })

  test("Validate navigation to the Order Detail page when user enters valid Order data ", async ({ page }, testInfo) => {
    //test.slow();
    const myaccountPage = new MyAccountPage(page);
    const myaccountOrderPage = new MyAccountOrderPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);
    await myaccountPage.clickOrderStatusLinkGuest();
    //await page.waitForLoadState('networkidle');
    await myaccountOrderPage.validateSingleOrderLookupSection();
    await myaccountOrderPage.enterOrderNumber(myaccountpage_data.valid_order);
    await myaccountOrderPage.enterZipCode(myaccountpage_data.valid_zip);
    await myaccountOrderPage.clickOnViewOrderButton();
    //await page.waitForLoadState('networkidle');
    const order_number = await orderDetailsPage.getOrderNumberInOrderDetails();
    console.log(order_number);
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/AccountOrder-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });


})