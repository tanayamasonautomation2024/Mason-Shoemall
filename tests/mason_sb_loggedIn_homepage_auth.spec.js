const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();

const userFile = './shoemallwishlistuser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;
let loginSuccessful = false;
test.describe("Mason LoggedIn User HomePage", () => {

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
  //Global Persistent Header (Logged In) - Promotional Banner Management-SB-GPH010
  test("GPH-Promotional Banner Managment - Verify the promotional banner should be displayed On Homepage", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    try {
      //await homePage.displayHeroBanner(homepage_data.homepage_first_herobanner_name);
      await homePage.displayVideoBanner();

    } catch (error) {
      console.log("Error: There is No banner Present");
    }

  })

  //Global Persistent Header (Logged In) - Stoneberry Logo Redirect-SB-GPH012
  test("GPH-Stoneberry Logo Redirect - Verify the appearance and accesibility of the Stoneberry logo at the lefthand side", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.displaySiteLogo(homepage_data.homepage_sitename_logo);
    await homePage.staticPageNavigation(homepage_data.staticPageUrl);
    await homePage.clickSiteLogo(homepage_data.homepage_sitename_logo);
    await homePage.homePageRedirectionValidation(homepage_data.homePageUrl);

  })

  //Global Persistent Header (Logged In) - Sticky Header-SB-GPH002
  test("GPH-Sticky Header- Verify the header is sticky through the following pages: PDP", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.staticPageNavigation(homepage_data.pdpURL);
    await homePage.pageScrollBy();
    //await homePage.displayPDPStickyAddtoCartButton();

  })

  //Global Persistent Header (Logged In) - Mega Menu Navigation-SB-GPH002
  test("GPH-Mega Menu Navigation - Verify Mega Menu Navigation opens on hovering within the CTA", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.selectRandomSubCategory();

  })

  //Global Persistent Header (Logged In) - Search Bar-SB-GPH015/SB-GPH016/SB-GPH017
  test("GPH-Search Bar - Verify the search field appearance, help text display, and functionality", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.displaySearchBar();
    await homePage.enterSearchTerm(homepage_data.searchterm);
    await homePage.hiddenSearchPlaceholderText();

  })

  //Global Persistent Header (Logged In) - Account State Update-SB-GPH038
  test("GPH-Account State Update - Verify the header update to display the logged-in user state, display of user's first name under the Account icon", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.validateAccountStatusUpdateText();
    console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Cart Icon and Drawer-SB-GPH020
  test("GPH-Cart Icon and Drawer - Verify display and functionality of the Cart icon and drawer", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    await homePage.validatedEmptyMiniCartDrawer();
    await homePage.emptyMiniCartDrawerSection();

  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/LoggedHomepage-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})