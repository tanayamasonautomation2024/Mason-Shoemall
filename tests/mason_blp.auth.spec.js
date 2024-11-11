const { chromium } = require('playwright');
import { test } from '@playwright/test';
import { MasonBLPPage } from '../pages/mason_blp_page';
import { MasonBIPPage } from '../pages/mason_bip_page';
import { allure } from 'allure-playwright';

test.describe("Mason BLP Page", () => {

  test.beforeEach(async ({ page }) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }
  });


  //SB-BLP001
  test("Validate navigation to BLP from Top Brands in homepage and breadcrumbs are shown in BLP", async ({ page }) => {
    const blpPage = new MasonBLPPage(page);
    //await page.goto(process.env.BIP_URL);
    await blpPage.clickOnTopBrandsInHomePage();

  })

  //SB-BLP002
  test("Validate navigation to BLP from PDP and ensure breadcrumbs are shown in BLP", async ({ page }) => {
    const blpPage = new MasonBLPPage(page);
    await page.goto(process.env.BLP_PDP_URL);
    await blpPage.validateNavigationFromPDP();

  })


  //SB-BLP003
  test("Validate navigation to BLP from BIP and ensure breadcrumbs are shown in BLP", async ({ page }) => {
    const blpPage = new MasonBLPPage(page);
    const bipPage = new MasonBIPPage(page);
    await page.goto(process.env.BIP_URL);
    //await page.goto(process.env.BIP_URL);
    const randomAlphabet = await bipPage.validateAlphabetHeader();
    await blpPage.validateNavigationFromBIP(randomAlphabet);

  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/BLP-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})