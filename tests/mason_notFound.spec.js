const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { NotFoundPage } from '../pages/mason_not_found_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountAddressPage } from '../pages/mason_myAccountAddress_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';



test.describe("Mason Not Found Tests", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.NOT_FOUND_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })


  //SB-SM001
  test("Validate the Not Found page", async ({ page }, testInfo) => {
    const notFoundPage = new NotFoundPage(page);
    await notFoundPage.validateNotFoundHeaderDisplay();
    await notFoundPage.validateHeaderAtCentre();
    await notFoundPage.validateNotFoundSubtitle();
    await notFoundPage.validateNotFoundTextUnderHeader();
    await notFoundPage.validateContinueShoppingButton();

  })
  test.afterEach(async ({ page }, testInfo) => {
    // Log the status of the test (success or failure)
    if (testInfo.status === 'passed') {
      console.log(`Test passed: ${testInfo.title}`);
    } else if (testInfo.status === 'failed') {
      console.log(`Test failed: ${testInfo.title}`);
      
    }
  });
})
