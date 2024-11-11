const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { allure } from 'allure-playwright';
require('dotenv').config();

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;

test.describe("Mason Guest User Home Page", () => {

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
  //Global Persistent Header (Guest) - Promotional Banner Management-SB-GPH010
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

  //Global Persistent Header (Guest) - Shoemall Logo Redirect-SB-GPH012
  test("GPH-Shoemall Logo Redirect - Verify the appearance and accesibility of the Shoemall logo at the lefthand side", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.displaySiteLogo(homepage_data.homepage_sitename_logo);
    await homePage.staticPageNavigation(homepage_data.staticPageUrl);
    await homePage.clickSiteLogo(homepage_data.homepage_sitename_logo);
    await homePage.homePageRedirectionValidation(homepage_data.homePageUrl);
    //console.log(testInfo.status);

  })

  //Global Persistent Header (Guest) - Sticky Header-SB-GPH002
  test("GPH-Sticky Header- Verify the header is sticky through the following pages: PDP", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.staticPageNavigation(homepage_data.pdpURL);
    await homePage.pageScrollBy();
    //await homePage.displayPDPStickyAddtoCartButton();
  })

  //Global Persistent Header (Guest) - Mega Menu Navigation-SB-GPH002
  test("GPH-Mega Menu Navigation - Verify Mega Menu Navigation opens on hovering within the CTA", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.selectRandomSubCategory();

  })

  //Global Persistent Header (Guest) - Search Bar-SB-GPH015/SB-GPH016/SB-GPH017
  test("GPH-Search Bar - Verify the search field appearance, help text display, and functionality", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.displaySearchBar();
    await homePage.enterSearchTerm(homepage_data.searchterm);
    await homePage.hiddenSearchPlaceholderText();

  })

  //Global Persistent Header (Guest) - Account Drawer-SB-GPH019
  test("GPH-Account Drawer - Verify generation of the account drawer upon clicking the Account icon", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.clickOnHomePageSignIn();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignInAccountDrawer();
    //console.log(testInfo.status);

  })

  //Global Persistent Header (Guest) - Cart Icon and Drawer-SB-GPH020
  test("GPH-Cart Icon and Drawer - Verify display and functionality of the Cart icon and drawer", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    await homePage.validatedEmptyMiniCartDrawerGuest();
    await homePage.emptyMiniCartDrawerSection();
    //console.log(testInfo.status);

  })

  //Global Persistent Footer (Guest) - Newsletter Mailing List Widget-SB-GPF001/SB-GPF002
  test("GPF-Newsletter Mailing List Widget - Verify the display of the newsletter widget, text, textbox, form field label, help text, and CTA functionality", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.validateFooterNewsLetterSignUpContent();
    await homePage.displayFooterSignUpButton();
    //await homePage.signUpModalDisplayValidation(homepage_data.signup_email);
  })

  //Global Persistent Footer (Guest) - Static Links-SB-GPF025
  test("GPF-Static Links - Verify Test the display and functionality of static links and associated URLs", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.displayFooter(homepage_data.homepage_footer1_name);
    await homePage.displayFooter(homepage_data.homepage_footer2_name);
    await homePage.displayFooter(homepage_data.homepage_footer3_name);
    await homePage.displayFooter(homepage_data.homepage_footer4_name);
    await homePage.displayFooterLinks(homepage_data.homepage_footer1_link1);
    await homePage.displayFooterLinks(homepage_data.homepage_footer2_link1);
    await homePage.displayFooterLinks(homepage_data.homepage_footer3_link1);
    await homePage.displayFooterLinks(homepage_data.homepage_footer_sociallink1);
    await homePage.displayFooterLinks(homepage_data.homepage_footer_sociallink2);
    await homePage.displayFooterLinks(homepage_data.homepage_footer_sociallink3);
  })

  //Global Persistent Footer (Guest) - Social Icons-SB-GPF017/SB-GPF018
  test("GPF-Social Icons - Verify the display and functionality of social icons and their respective hyperlinks", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.displayFooter(homepage_data.homepage_footer4_name);
    await homePage.displayFooterLinks(homepage_data.homepage_footer_sociallink1);
    await homePage.displayFooterLinks(homepage_data.homepage_footer_sociallink2);
    await homePage.displayFooterLinks(homepage_data.homepage_footer_sociallink3);
    await homePage.clickFooterLink(homepage_data.homepage_footer_sociallink1);
  })

  // //Global Persistent Footer (Guest) - Additional Site Logos-SB-GPF020//Not applicable for Shoemall
  // test("GPF-Additional Site Logos - Verify the display and functionality of additional site logos and their redirection", async ({ page }, testInfo) => {
  //   //test.slow();
  //   const homePage = new HomePageNew(page);
  //   await homePage.validateOtherSitesLinks(homepage_data.footer_otherSitesLinkName1);
  //   await homePage.validateOtherSitesLinks(homepage_data.footer_otherSitesLinkName2);
  //   await homePage.validateOtherSitesSection(homepage_data.footer_otherSitesSectionLabelName);
  //   //console.log(testInfo.status);

  // })

  //Global Persistent Footer (Guest) - Copyright and Legal Text Links-SB-GPF024/SB-GPF026
  test("GPF-Copyright and Legal Text Links - Verify the display and functionality of copyright and legal text links", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.validateCopyRightSection(homepage_data.footer_copyrightText, homepage_data.footer_contactUsLinkName);
    //await homePage.validateCopyrightLegalText(homepage_data.footer_copyrightLegalText1);
    //await homePage.validateCopyrightLegalText(homepage_data.footer_copyrightLegalText2);
    await homePage.validateCopyrightLegalText(homepage_data.footer_copyrightLegalText3);

  })

  //Home Page (Guest) - Category Image Tiles-SB-HMP010/SB-HMP011/SB-HMP012/SB-HMP013
  test("HP-Category Image Tiles - Verify the display and functionality of category image tiles, including image, title, and hyperlinks", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.getCategoryImageTilesCount();
    await homePage.validateCategoryProductImages();
  })

  // //Home Page (Guest) - Full Width Banner-SB-HMP015/SB-HMP016//Not applicable
  // test("HP-Full Width Banner - Verify the display and functionality of full-width banners, including image/video content and redirection upon click", async ({ page }, testInfo) => {
  //   //test.slow();
  //   const homePage = new HomePageNew(page);
  //   await homePage.displayHeroBanner(homepage_data.homepage_second_herobanner_name);
  //   //console.log(testInfo.status);

  // })

  //Home Page (Guest) - Category Grid-SB-HMP017/SB-HMP018
  test("HP-Category Grid - Verify the display and functionality of the 6x3 category grid, including image/icon, title, and hyperlinks", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.getTopCategoryImageTilesCount();
    await homePage.topCategoriesImageDisplayValidation();
    //console.log(testInfo.status);

  })

  //Home Page (Guest) - Top Brands Image Tiles-SB-HMP020/SB-HMP021/SB-HMP012/SB-HMP022
  test("HP-Top Brands Image Tiles - Verify the display and functionality of the top brands image tiles, including image, title, and hyperlinks", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.getTopBrandsImageTilesCount();
    await homePage.validateTopBrands();

  })

  //Home Page (Guest) Brand Logos-SB-HMP023
  test("HP-Brand Logos - Verify the display and functionality of brand logos, including image, title, and hyperlinks", async ({ page }, testInfo) => {
    test.slow();
    const homePage = new HomePageNew(page);
    await homePage.getBrandsImageTilesCount();
    await homePage.brandsImageDisplayValidation();
    //console.log(testInfo.status);

  })

  //Home Page (Guest) Seasonal Savings Widget-SB-HMP026/SB-HMP027
  test("HP-Seasonal Savings Widget - Verify the display and functionality of the Seasonal Savings widget, including product image content cards, navigation arrows, and View All link", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.validateSeasonalSavings();
  })

  //Account - Invalid Login Functionality
  test("Account - Invalid Login Functionality - Verify login with invalid credentials", async ({ page }, testInfo) => {
    const signinPage = new SignInPageNew(page);
    await signinPage.clickSignInImage();
    await signinPage.clickSignIn();
    await signinPage.validateSignInDialog();
    await signinPage.login(process.env.INVALIDUSERNAME, process.env.INVALIDPASSWORD);
    await signinPage.clickSignIn();
    await signinPage.invalidUserLoginValidation(signinpage_data.invalid_login_errormessage);
    //console.log(testInfo.status);

  })

  //Global Persistent Header (Guest) - Mega Menu Navigation-SB-GPH002
  test("GPH-Mega Menu Navigation - Verify Mega Menu Navigation opens on hovering within the CTA and on selecting the subcategory it redirected to the corresponding PLP", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePageNew(page);
    await homePage.selectRandomSubCategory();
    const cartDrawerPage = new CartDrawerPage(page);
    await cartDrawerPage.clickAddtoCartPLP();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/HomePage-Screenshot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})