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
test.describe("Mason MyAccount Orders - Standard With Orders", () => {

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

  //Account - Orders - Standard With Orders - Test Cases ID-SB-MyA168/SB-MyA169/SB-MyA170/SB-MyA171/SB-MyA173/SB-MyA174
  test("Account - Orders - Standard With Orders - Verify display of order details including Order ID, Order Date, and Order Total", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    await myaccountPage.validatedOrderNumberDisplaySectionWithLimitOrder(myaccountpage_data.myaccount_orders_ordernumberprefix);
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/Orders-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})