const { chromium } = require('playwright');
import { test } from '@playwright/test';
import { MasonBIPPage } from '../pages/mason_bip_page';
import { allure } from 'allure-playwright';


test.describe("Mason Commerce Tool Site", () => {

  test.beforeEach(async ({ page }) => {
    test.slow();
    try {
      //await page.goto(process.env.WEB_URL);
      await page.goto(process.env.BIP_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })


  //SB - BIP002
  test("Validate Home -> Brand breadcrumbs are shown in BIP", async ({ page }) => {
    const bipPage = new MasonBIPPage(page);
    await bipPage.validateBrandBreadCrumb();
    await bipPage.validateBrandPageTitle();

  })

  //SB-BIP003 //SB-BIP004
  test("Validate the full-width banner present below the page title which supports images and videos", async ({ page }) => {
    const bipPage = new MasonBIPPage(page);
    await bipPage.validateBrandPageTitle();
    await bipPage.validateBannerSection();

  })

  //SB-BIP005
  test("Validate the brands logos present below the full width banner", async ({ page }) => {
    const bipPage = new MasonBIPPage(page);
    await bipPage.validateBrandPageTitle();
    await bipPage.validateTopBrandsSection();
  })

  //SB-BIP006 
  test("Validate the row of alphabet links below the top brands present", async ({ page }) => {
    const bipPage = new MasonBIPPage(page);
    await bipPage.validateBrandPageTitle();
    await bipPage.validateAlphabetLinks();

  })

  //SB-BIP007
  test("Validate under each alphabets the brand name starting with that letter is present", async ({ page }) => {
    const bipPage = new MasonBIPPage(page);
    await bipPage.validateBrandPageTitle();
    const randomAlphabet = await bipPage.validateAlphabetHeader();
    await bipPage.validateBrandsUnderRandomAlphabet(randomAlphabet);

  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/BIP-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });


})