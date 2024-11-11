const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPage } from '../pages/mason_signin_page';
import { MasonPLPPage } from '../pages/mason_plp_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountAddressPage } from '../pages/mason_myAccountAddress_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';
import { pl } from '@faker-js/faker';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const plp_data = JSON.parse(JSON.stringify(require('../test_data/mason_plp_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;


test.describe("Mason PLP Scenarios", () => {
  //test.setTimeout(40000);
  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    try {
      //await page.goto(process.env.WEB_URL);
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })

  // SB-PLP005
  //SB-MM008 //SB-PLP004
  test("Validate User is redirected to L3 when clicked on the hyperlink and check the breadcrumb", async ({ page }) => {
    test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    //const homePageNew = new HomePageNew(page);
    const homePage = new HomePage(page);
    await homePage.selectRandomSubCategory();
    await plpPage.validateItemCount();
    await plpPage.validateFilterExpandClose();

  })

  //SB-MM007// SB-PLP005 //SB-PLP004
  test("Validate User is redirected to L2 when clicked on the hyperlink and check the breadcrumb", async ({ page }) => {
    //test.slow();
    const plpPage = new MasonPLPPage(page);
    const homePage = new HomePage(page);
    await homePage.selectRandomSubCategory();
    await plpPage.validateItemCount();
  })

  //SB-PLP046//SB-PLP047
  test("Validate Filters in L3 when clicked on the hyperlink", async ({ page }) => {
    //test.slow();
    const plpPage = new MasonPLPPage(page);
    const homePage = new HomePage(page);
    await homePage.selectRandomSubCategory();
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.validateFiltersForAllTypes();
  })


  //SB-PLP048
  test("Validate Single Filter applied in L3 PLP", async ({ page }) => {
    //test.slow();
    const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    await homePage.selectRandomSubCategory();
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.validateFiltersForAllTypes();
    //const selectedFilter =await plpPage.randomlySelectFilterCheckbox();
    const selectedFilter = await plpPage.randomlySelectFilterCheckbox(1);
    await plpPage.validateAppliedFilters(selectedFilter);
    console.log(selectedFilter);
  })

  //SB-PLP049,55
  test("Validate Multiple Filters applied in L3 PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.validateFiltersForAllTypes();
    const numOptionsPerCategory = 2;
    const selectedFilters = await plpPage.randomlySelectFilterCheckbox(numOptionsPerCategory);
    await plpPage.validateAppliedFilters(selectedFilters);
    // for (let i = 0; i < numOptionsPerCategory; i++) {
    //   const selectedFilter = await plpPage.randomlySelectFilterCheckbox(1);
    //   selectedFilters.push(selectedFilter);
    //   await plpPage.validateAppliedFilters(selectedFilter);
    //   console.log('Selected filter:', selectedFilter);
    // }
  })

  //SB-PLP050
  test("Validate Expand and Close option for the Filters", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validateFilterExpandClose();
  })

  //SB-PLP051,52,53
  test("Validate View More link for more than 8 or 16 options", async ({ page }) => {
    //test.slow();
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    const homePage = new HomePage(page);
    await homePage.selectRandomSubCategory();
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.validateFiltersForAllTypes();
    await plpPage.validateViewMoreOption();
  })

  //SB-PLP062
  test("Validate SortBy in PLP", async ({ page }) => {
    //test.slow();
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.validateSortBy();
    await plpPage.clickSortBy();
    await plpPage.validateFeatureIsDefaultSort();
    await plpPage.validateSortOptions();
    await plpPage.selectSortOption();

  })

  //SB-PLPADC002,01,04,05,06
  test("Validate Add to Cart in PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    //await page.waitForLoadState('networkidle');
    await plpPage.validateChooseOptionDrawer();

  })

  //SB-PLPADC002,01,04,05,06,07,08
  test("Validate Navigation Arrows in PLP - Add to cart drawer", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    //await page.waitForLoadState('networkidle');
    await plpPage.validateChooseOptionDrawer();
    await plpPage.validateImageInChooseOptionDrawer();
    //await plpPage.validateNavigationArrows();
    //await plpPage.closeChooseOptionDrawer();
  })

  //SB-PLPADC002,01,04,05,06
  test("Validate Close Option in Add to Cart drawer in PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    //await page.waitForLoadState('networkidle');
    await plpPage.validateChooseOptionDrawer();
    await plpPage.closeChooseOptionDrawer();
  })


  //SB-PLPADC0010,23,24,41
  test("Validate Product Variant Option and SizeChart link in Add to Cart drawer in PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    const pdpPage = new PDPPage(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    //await page.waitForLoadState('networkidle');
    await plpPage.validateChooseOptionDrawer();
    await pdpPage.validateSelectColorValue();
    await pdpPage.validateSelectSizeValue();
    await pdpPage.validateProductAvailabilityMessage();
    await pdpPage.sizeChartDisplay();

  })

  //SB-PLPADC0016,28,29,30,42
  test("Validate Add To Cart Option in Choose Options drawer in PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    const pdpPage = new PDPPage(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    //await page.waitForLoadState('networkidle');
    await plpPage.validateChooseOptionDrawer();
    await pdpPage.clickOnPDPSizeVariantButton();
    await plpPage.clickAddToCartInChooseOptionDrawer();

  })

  //SB-PLPADC0017
  test("Validate View More Option in Choose Options drawer in PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    const pdpPage = new PDPPage(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    ////await page.waitForLoadState('networkidle');
    await plpPage.validateChooseOptionDrawer();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await plpPage.clickOnViewMoreDetails();

  })

  // //SB-PLPADC0035
  // test.skip("Validate Credit Text in Choose Options drawer in PLP", async ({ page }) => {
  //   //test.slow();
  //   //const homePage = new HomePage(page);
  //   const plpPage = new MasonPLPPage(page);
  //   const homePageNew = new HomePageNew(page);
  //   const pdpPage = new PDPPage(page);
  //   await page.goto(plp_data.stg2_plp_url);
  //   //await page.waitForLoadState('networkidle');
  //   // await homePageNew.selectSubCategoryFromMegaMenu(expectedCategories);
  //   await plpPage.validateItemCount();
  //   await plpPage.validatePresenceOfFilter();
  //   await plpPage.validateSortBy();
  //   await plpPage.clickSortBy();
  //   await plpPage.validateFeatureIsDefaultSort();
  //   await plpPage.validateSortOptions();
  //   // await plpPage.selectSortOption();
  //   await plpPage.clickAddToCart();
  //   await plpPage.validateChooseOptionDrawer();
  //   await plpPage.validateCreditText();
  //   await plpPage.clickGetStartedLink();

  // })

  //SB-PLPADC0017
  test("Validate Quantity Option in Choose Options drawer in PLP", async ({ page }) => {
    //test.slow();
    //const homePage = new HomePage(page);
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    const pdpPage = new PDPPage(page);
    await page.goto(plp_data.plp_url_with_size_color);
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    await plpPage.clickQuickView();
    //await page.waitForLoadState('networkidle');
    //await plpPage.validateChooseOptionDrawer();
    await plpPage.validateProductQTYSection();
    await pdpPage.validateProductAvailabilityMessage();
   // await pdpPage.validateProductQTYIncreaseDecrease();
    await pdpPage.validateProductQTYUpdateByTypeIn(plp_data.product_quantity);
  })

  test("Validate the display and functionality of products, including default product image, color variants, name, pricing, reviews, and add to cart CTA", async ({ page }) => {
    const plpPage = new MasonPLPPage(page);
    const homePageNew = new HomePageNew(page);
    const homePage = new HomePage(page);
    await homePage.selectRandomSubCategory();
    //await page.waitForLoadState('networkidle');
    await plpPage.validateItemCount();
    await plpPage.validatePresenceOfFilter();
    //await page.waitForLoadState('networkidle');
    await plpPage.checkItemCountBeforeRunningTest();
  })


  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/PLP-Screenshot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})