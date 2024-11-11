const { chromium } = require('playwright');
import { test } from '@playwright/test';
import { CLPPage } from '../pages/mason_clp_page';
import { HomePageNew } from '../pages/mason_home_page1';
import {HomePage} from '../pages/mason_home_page';
import { allure } from 'allure-playwright';


test.describe("Mason CLP Scenarios", () => {
  test.setTimeout(40000);
  test.beforeEach(async ({ page }) => {
    test.slow();
    try {
      await page.goto(process.env.CLP_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })
  

//SB-CLP001 
test("MegaNav - Validate User is redirected to L1 when clicked on the hyperlink",async({page})=>{ 
  //test.slow();  
  const homePage = new HomePage(page);
  //await homePageNew.selectRandomSubCategory();
  await homePage.navigateToCategoryL1();
  
  
})

//SB-CLP005
test("Verify on clicking 'v' arrow of title root category it shows all sub categories.",async({page})=>{ 
  //test.slow();
  const clpPage = new CLPPage(page);
  await clpPage.validateAccordionExpandAndClose();
  await clpPage.validate2ColumnImageTiles();
  await clpPage.validate2ColumnTiles();
  
})

//SB-CLP021,22
test("Verify the Best Seller widget in CLP.",async({page})=>{ 
  //test.slow();
  const clpPage = new CLPPage(page);
  await clpPage.validate2ColumnImageTiles();
  await clpPage.validate2ColumnTiles();
  await clpPage.validateBestSellerWidget();
  await clpPage.validateSwipeInBestSellerWidget();
  
})

//SB-CLP021,22
test("Verify the Best Seller widget Div in CLP.",async({page})=>{ 
  //test.slow();
  const clpPage = new CLPPage(page);
  await clpPage.validate2ColumnImageTiles();
  await clpPage.validate2ColumnTiles();
  await clpPage.validateBestSellerWidgetDiv();

})

test("Verify the Category grid in CLP.",async({page})=>{ 
  //test.slow();
  const clpPage = new CLPPage(page);
  await clpPage.validate2ColumnImageTiles();
  await clpPage.validateCategoryGrid();
  await clpPage.validateNavigationFromHref();

})


test("Verify the Best Seller product pricing format in CLP.",async({page})=>{ 
  //test.slow();
  const clpPage = new CLPPage(page);
  await clpPage.validate2ColumnImageTiles();
  await clpPage.validate2ColumnTiles();
  await clpPage.validateBestSellerWidgetDiv();
  await clpPage.validatePricingOfBestSellerProduct();
  await clpPage.validateViewMore();

})

test("Verify the Style Finder in CLP.",async({page})=>{ 
  //test.slow();
  const clpPage = new CLPPage(page);
  await clpPage.validate2ColumnImageTiles();
  await clpPage.validate2ColumnTiles();
  await clpPage.validateBestSellerWidgetDiv();
  await clpPage.validateStyleFinder();
  await clpPage.selectColorInStyleFinder();
})

test.afterEach(async ({ page }) => {
  try {
    const screenshotPath = `screenshots/CLP-Screenshot-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  }
});

})