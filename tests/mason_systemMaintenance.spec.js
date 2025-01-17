const { chromium } = require('playwright');
import { test } from '@playwright/test';
import { SystemMaintenancePage } from '../pages/mason_system_maintenance_page';
import { allure } from 'allure-playwright';



test.describe("Mason System Maintenance Tests", () => {

  test.beforeEach(async ({ page }) => {
    test.slow();
    try {
      await page.goto(process.env.SYSTEM_MAINTENANCE_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })


  //SB-SM001
  test("Validate the Shoemall logo at the center of the system maintenance page", async ({ page }) => {
    const sysMainPage = new SystemMaintenancePage(page);
    await sysMainPage.validateLogoDisplay();
    await sysMainPage.validateLogoAtCentre();
    await sysMainPage.validateSystemMaintenanceText();
    await sysMainPage.validateSystemTextPositionUnderLogo();

  })

  //SB-SM002
  test("Validate the subtitle and it's position of the system maintenance page", async ({ page }) => {
    const sysMainPage = new SystemMaintenancePage(page);
    await sysMainPage.validateSystemMaintenanceSubtitle();
    await sysMainPage.validateSystemTextPositionUnderLogo();

  })

  //SB-SM003
  test("Validate the subtitle text and it's position of the system maintenance page", async ({ page }) => {
    const sysMainPage = new SystemMaintenancePage(page);
    await sysMainPage.validateSystemMaintenanceText();
    await sysMainPage.validateSystemTextPositionUnderSubTitle();

  })

  test("Validate email, call section system maintenance page", async ({ page }) => {
    const sysMainPage = new SystemMaintenancePage(page);
    await sysMainPage.validateEmailSection();
    await sysMainPage.validateCallSection();
    await sysMainPage.validateThankYouMessage();
    await sysMainPage.clickOnMail();

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
