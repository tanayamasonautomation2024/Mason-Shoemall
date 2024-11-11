const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { ResetPage } from '../pages/mason_reset_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { SearchPage } from '../pages/mason_search_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;

test.describe("Mason Commerce Tool Site", () => {

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


  //SB-NSRP003//SB-NSRP004
  test("Validate Page Title and search tip when the searched item/product is not a valid search", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
  })

  //SB-NSRP005
  test("Validate NeedHelp when the searched item/product is not a valid search", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();

  })

  //SB-NSRP006
  test("Validate FAQ navigation-NeedHelp when the searched item/product is not a valid search", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();
    await mySearchPage.clickFaqlink();
  })

  //SB-NSRP007
  test("Validate ChatWithUs navigation-NeedHelp when the searched item/product is not a valid search", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();
    await mySearchPage.clickChatWithUslink();
  })

  //SB-NSRP008
  test("Validate EmailUs navigation-NeedHelp when the searched item/product is not a valid search", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();
    await mySearchPage.clickEmailLink();
  })

  //SB-NSRP009
  test("Validate CallUs section-NeedHelp when the searched item/product is not a valid search", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();
    await mySearchPage.validateCallNumber();
  })

  //SB-NSRP010
  test("Validate each of category tiles should display a category image and title", async ({ page }, testInfo) => {
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();
    await mySearchPage.validateTopCategoryImageandTitle();
  })


  //SB-SRP003
  test("Validate Page Title and search tip when the searched item/product is a valid search", async ({ page }, testInfo) => {
    const search_value = "jeans";
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateValidSearchPageTitle(search_value);
  })


  //SB-SRP004
  test("Validate Item count when the searched item/product is a valid search", async ({ page }, testInfo) => {
    const search_value = "jeans";
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateValidSearchPageTitle(search_value);
    await mySearchPage.validateItemCount();

  })


  //SB-Search002
  test("Validate on clicking the search icon or press enter, the search term should redirected to the search result page", async ({ page }, testInfo) => {
    const search_value = "jeans";
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.validateValidSearchPageTitle(search_value);
  })

  //SB-Search007
  test("Validate when there is no recent search, then the popular search should display.", async ({ page }, testInfo) => {
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validatePopularSearch();
  })


  //SB-Search003
  test("Validate the suggestion search dropdown (recent searches and popular searches) should display.",async({page},testInfo)=>{
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    await page.waitForTimeout(5000);
    await mySearchPage.validateWrongSearchPageTitle(search_value);
    await mySearchPage.validateSearchTips();
    await mySearchPage.validateNeedHelpsection();
    await mySearchPage.goToHomeViaLink();
    await mySearchPage.validateRecentSearches(search_value);
    await mySearchPage.validatePopularSearch();
  })

  //SB-Search004
  test("Validate the 5 most recent search products as selectable text links along with X is displayed based on CT configuration", async ({ page }, testInfo) => {
    const mySearchPage = new SearchPage(page);
    const searchValues = [];

    // Function to generate a random search value
    const generateSearchValue = () => {
      return [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') +
        String.fromCharCode(Math.random() * 26 + 65 | 0) +
        (Math.random() * 10 | 0);
    };

    // Perform 5 different searches
    for (let i = 0; i < 5; i++) {
      const searchValue = generateSearchValue();
      searchValues.push(searchValue);

      // Validate the search field with the generated search value
      await mySearchPage.validateSearchField(searchValue);
      await page.waitForTimeout(5000);
      
    }

    // Validate recent searches for all 5 search values
    for (const searchValue of searchValues) {
      await mySearchPage.validateRecentSearches(searchValue);
    }

  })


  //SB-Search005
  test("Validate the clicking of product from the recent searches", async ({ page }, testInfo) => {
    const mySearchPage = new SearchPage(page);
    const searchValues = [];
    // Function to generate a random search value
    const generateSearchValue = () => {
      return [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') +
        String.fromCharCode(Math.random() * 26 + 65 | 0) +
        (Math.random() * 10 | 0);
    };

    // Perform 5 different searches
    for (let i = 0; i < 3; i++) {
      const searchValue = generateSearchValue();
      searchValues.push(searchValue);

      // Validate the search field with the generated search value
      await mySearchPage.validateSearchField(searchValue);
      await page.waitForTimeout(3000);
    }

    // Validate recent searches for all 5 search values
    for (const searchValue of searchValues) {
      await mySearchPage.validateRecentSearches(searchValue);
    }

    // Randomly select one search value to click and one to remove
    const randomIndexToClick = Math.floor(Math.random() * searchValues.length);
    const searchValueToClick = searchValues[randomIndexToClick];

    // Verify clicking on the product in recent searches redirects to SRP
    await mySearchPage.validateClickOnRecentSearch(searchValueToClick);
  })

  //SB-Search006 //SB-Search012
  test("Validate the clicking of X from the recent searches", async ({ page }, testInfo) => {
    const mySearchPage = new SearchPage(page);
    const searchValues = [];

    // Function to generate a random search value
    const generateSearchValue = () => {
      return [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') +
        String.fromCharCode(Math.random() * 26 + 65 | 0) +
        (Math.random() * 10 | 0);
    };

    // Perform 5 different searches
    for (let i = 0; i < 3; i++) {
      const searchValue = generateSearchValue();
      searchValues.push(searchValue);

      // Validate the search field with the generated search value
      await mySearchPage.validateSearchField(searchValue);
      await page.waitForTimeout(3000);
    }

    // Validate recent searches for all 5 search values
    for (const searchValue of searchValues) {
      await mySearchPage.validateRecentSearches(searchValue);
    }


    const randomIndexToRemove = Math.floor(Math.random() * searchValues.length);
    const searchValueToRemove = searchValues[randomIndexToRemove];


    // Verify clicking "x" in the recent searches removes the search term from history
    await mySearchPage.validateRemoveRecentSearchEntry(searchValueToRemove);

  })

  //SB-Search008
  test('Verify the 10 most popular search terms are displayed as selectable text links', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validatePopularSearch();
    await mySearchPage.validatePopularSearchItemsCount();

  })

  //SB-Search011
  test('Verify the 10 autocomplete suggestions for the search terms are displayed as selectable text links', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateAutoSuggestion();
  })

  //SB-Search032
  test('Verify the the user gets error messages on entering invalid inputs', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const search_value = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateWrongInputError(search_value);
  })


  //SB-SRP002
  test("Validate Page BreadCrumb tip when the searched item/product is a valid search", async ({ page }, testInfo) => {
    const search_value = "dress";
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    await page.waitForTimeout(5000);
    await mySearchPage.validateValidSearchPageTitle(search_value);
    await mySearchPage.validateSearchBreadCrumb(search_value);
  })

  //SB-SRP006
  test("Validate display and functionality of product when the searched item/product is a valid search", async ({ page }, testInfo) => {
    const search_value = "dress";
    const mySearchPage = new SearchPage(page);
    await mySearchPage.validateSearchField(search_value);
    await page.waitForTimeout(5000);
    await mySearchPage.validateValidSearchPageTitle(search_value);
    await mySearchPage.validateSearchBreadCrumb(search_value);
    //await page.waitForLoadState('networkidle');
    await mySearchPage.checkItemCountBeforeRunningTest();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/Search-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})