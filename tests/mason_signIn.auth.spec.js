const { chromium } = require('playwright');
import { test } from '@playwright/test';
import { SignInPage } from '../pages/mason_signin_page';
import { allure } from 'allure-playwright';
require('dotenv').config();


test.describe("Mason SignIn Scenarios", () => {

  test.beforeEach(async ({ page }) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }
  })


  // //SB-LOGREG009, this test case is NA now as loader icon has been removed.
  // test.skip("Account - SignIn - Validate the Loader icon when user tries to sign-in", async ({ page }) => {
  //   const signinPage = new SignInPage(page);
  //   await signinPage.clickSignInImage();
  //   await signinPage.clickSignIn();
  //   //await signinPage.validateSignInDialog();
  //   await signinPage.login(process.env.MY_PROFILE_USER, process.env.PROFILE_PASSWORD);
  //   await signinPage.clickSignIn();
  //   await signinPage.checkLoaderwhileSignIn();

  // })


  //SB-LOGREG012
  test("Account - Sign In (Drawer)/Sign In Page - Validate user should be able to login to site", async ({ page }) => {
    const signinPage = new SignInPage(page);
    await signinPage.clickSignInImage();
    await signinPage.clickSignIn();
    //await signinPage.validateSignInDialog();
    await signinPage.login(process.env.MY_PROFILE_USER, process.env.PROFILE_PASSWORD);
    await signinPage.clickSignIn();
    await signinPage.waitForHiddenSignedInMessage();

  })

  //SB-LOGREG013
  test("Account - Sign In (Drawer)/Sign In Page - Validate user should be able to login to site and close success message", async ({ page }) => {

    const signinPage = new SignInPage(page);
    await signinPage.clickSignInImage();
    await signinPage.clickSignIn();
    //await signinPage.validateSignInDialog();
    await signinPage.login(process.env.MY_PROFILE_USER, process.env.PROFILE_PASSWORD);
    await signinPage.clickSignIn();
    await signinPage.waitForHiddenSignedInMessage();
    await signinPage.closeSignIsSuccessMessage();

  })


  //SB-LOGREG014
  test("Account - Sign In (Drawer)/Sign In Page - Validate proper message when login fails", async ({ page }) => {

    const signinPage = new SignInPage(page);
    await signinPage.clickSignInImage();
    await signinPage.clickSignIn();
    //await signinPage.validateSignInDialog();
    await signinPage.login(process.env.INVALIDUSERNAME, process.env.PASSWORD);
    await signinPage.clickSignIn();
    await signinPage.loginFailMessage();

  })

  //SB-LOGREG036
  test("Account - Sign In (Drawer)/Sign In Page - Validate the Error message for null or invalid email", async ({ page }) => {
    const signinPage = new SignInPage(page);
    await signinPage.clickSignInImage();
    await signinPage.clickSignIn();
    await signinPage.clickOnForgotPassword();
    await signinPage.validateNullEmailAddressOnForgotPassword();
    await signinPage.validateInvalidEmailAddressOnForgotPassword();

  })


  test("Account - SignIn - Validate the Password Hide/Show in Sign-In ", async ({ page }) => {

    const signinPage = new SignInPage(page);
    await signinPage.clickSignInImage();
    //const createAccountPage = new CreateAccountPage(page);
    //await signinPage.clickCreateAnAccount();
    //await signinPage.enterPasswordOnCreateAccountPage(password);
    await signinPage.clickSignIn();
    await signinPage.login(process.env.MY_PROFILE_USER, process.env.PROFILE_PASSWORD);
    await signinPage.validatePasswordShowLinkIsVisible();
    await signinPage.clickOnShowPassword();
    await signinPage.validatePasswordIsShown();
    //await signinPage.readPasswordFromTextboxAndValidate(password);
    await signinPage.validatePasswordHideLinkIsVisible();
    await signinPage.clickOnHidePassword();
    await signinPage.validatePasswordIsHidden();

  })
  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/Signin-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})