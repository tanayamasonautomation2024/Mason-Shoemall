const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();

const addressUser = './shoemalluser12.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;
let loginSuccessful = false;
test.describe("Mason MyAccount - Addresses - Standard With Addresses", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? addressUser : addressUser;

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

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA229/SB-MyA230/SB-MyA236/SB-MyA237
  test("Account - Addresses - Standard With Addresses - Verify functionality of add new Address", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.displayAddressSection();
    await myaccountPage.clickAddNewAddressButton();
    await myaccountPage.displayAddNewAddressSection();
    await myaccountPage.validateAddNewAddress();
  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA252/SB-MyA253/SB-MyA254/SB-MyA255
  test("Account - Addresses - Undo Remove Address - Verify clicking on 'Remove' button, the selected address gets deleted and on undo it recovered.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.displayAddressSection();
    await myaccountPage.undoRemoveAddress();

  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA252/SB-MyA253/SB-MyA254/SB-MyA255
  test("Account - Addresses - Remove Address - Verify clicking on 'Remove' button, the selected address gets deleted and the data removed from the Addresses page.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.displayAddressSection();
    await myaccountPage.removeAddress();

  })

  // //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA254/SB-MyA255
  // test("Account - Addresses - Undo Remove Address - Verify clicking on the 'Undo' text link, application reverses the removal of the address.",async({page},testInfo)=>{ 
  //   //test.slow();
  //   const myaccountPage = new MyAccountPage(page);
  //   await myaccountPage.clickMyAccountAddressLink();
  //   await myaccountPage.displayAddressSection();
  //   await myaccountPage.undoRemoveAddress();

  // })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA244/SB-MyA249
  test("Account - Addresses - Edit Address - Verify clicking on Edit against any address, application expands edit address form with values pre-populated in it.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.editSavedAccountAddress();
    await myaccountPage.validateUpdateSavedAddress();

  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA245/SB-MyA246
  test("Account - Addresses - Edit Address - Verify Address Line 2 (optional) field is collapsed upon load when data is not present.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.clickEditButton();
    await myaccountPage.validateAddressLine2();

  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA247/SB-MyA248
  test("Account - Addresses - Edit Address - Verify clicking on Save button, application validates (missing required field, invalid field) and shows an error message to user.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.clickEditButton();
    await myaccountPage.enterInvalidDataForEditAddress();
    await myaccountPage.validateErrorMessage();

  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA234/SB-MyA235
  test("Account - Addresses - Add Address - Verify clicking on Save button, application validates (missing required field, invalid field) and shows an error message to user.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.clickAddNewAddressButton();
    await myaccountPage.displayAddNewAddressSection();
    await myaccountPage.enterInvalidDataForAddAddress();
    await myaccountPage.validateErrorMessage();

  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA251
  test("Account - Addresses - Cancel Edit Address - Verify Cancel link is shown below the Save button and clicking on it, application collapses the Edit address form.", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.clickEditButton();
    await myaccountPage.clickCancelEditAddressButton();
    await myaccountPage.cancelEditAddress();

  })

  //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA239/SB-MyA240
  test("Account - Addresses - Set as Default Address - Verify if the 'Set as default billing & shipping address' checkbox is selected then newly added address gets updated as the Default Billing & Shipping Address upon save..", async ({ page }, testInfo) => {
    test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountAddressLink();
    await myaccountPage.setDefaultAddress();
    await myaccountPage.validateDefaultShippingFirstSection();
    await myaccountPage.clickAddNewAddressButton();
    await myaccountPage.displayAddNewAddressSection();
    await myaccountPage.addNewDefaultShippingBillingAddress();

  })

  // //Account - Addresses - Standard With Addresses - Test Cases ID-SB-MyA238
  // test("Account - Addresses - Set as Default Address using Default Checkbox - Verify if the 'Set as default billing & shipping address' checkbox is selected then newly added address gets updated as the Default Billing & Shipping Address upon save..",async({page},testInfo)=>{ 
  //   //test.slow();
  //   const myaccountPage = new MyAccountPage(page);
  //   await myaccountPage.clickMyAccountAddressLink();
  //   await myaccountPage.clickAddNewAddressButton();
  //   await myaccountPage.displayAddNewAddressSection();
  //   await myaccountPage.addNewDefaultShippingBillingAddress();
  //   })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/AccountStdAddress-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})