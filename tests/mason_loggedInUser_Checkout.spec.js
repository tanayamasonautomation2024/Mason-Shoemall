const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { ResetPage } from '../pages/mason_reset_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { GuestCheckOutPage } from '../pages/mason_guestCheckout_page';
import { CreateAccountPage } from '../pages/mason_createAccount_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';
require('dotenv').config();


const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const checkout_data = JSON.parse(JSON.stringify(require('../test_data/mason_checkout_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;

test.describe("Mason Checkout - LoggedIn Users - Scenarios", () => {
  test.setTimeout(90000);
  test.beforeEach(async ({ page }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.goto(checkout_data.add_to_cart_pdp_url);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }
  });




  test.describe("Checkout Scenario for the guest user - login with no address or credit", () => {
    test('Verify Checkout Scenario for the guest user - login with no address or credit - go to shipping scenario', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const signinPage = new SignInPage(page);
      const signinPageNew = new SignInPageNew(page);
      const guestCheckoutPage = new GuestCheckOutPage(page);
      //await guestCheckoutPage.selectAnOptionFromSearchSuggestion('Yellow');
      const pdpPage = new PDPPage(page);
      //await page.goto(checkout_data.add_to_cart_pdp_url);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await signinPage.login(process.env.NEW_USER, process.env.PROFILE_PASSWORD);
      await signinPage.clickSignIn();
      //await page.waitForLoadState('networkidle');
      await page.waitForTimeout(5000);
      await guestCheckoutPage.validateShippingSection();
    });
  });



  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check progress bar and return to cart", () => {
    test.use({ storageState: './shoemalluser7.json' });
    //test('Logged in: Non Credit Users: placing order with newly added credit card', async ({ page }) => {
    test('Verify Checkout Scenario for the loggedIn user - go to shipping scenario - check progress bar and return to cart', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateProgressBar();
      await guestCheckoutPage.validateReturnToCart();

    })

  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Need Help section", () => {
    test.use({ storageState: './shoemalluser8.json' });
    //Need Help section
    test('Verify Need Help section - Checkout Scenario for the loggedIn user - go to shipping scenario', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateProgressBar();
      await guestCheckoutPage.validateNeedHelpSection();
      await guestCheckoutPage.validateCallSection();
      await guestCheckoutPage.validateEmailSection();
    })

  });

  test.describe("Verify add/save New Address - Checkout Scenario for the loggedIn user", () => {
    test('Verify add/edit New Address - Checkout Scenario for the loggedIn user - go to shipping scenario', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await homePage.clickOnHomePageSignIn();
      const createAccountPage = new CreateAccountPage(page);
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      await signinPage.clickCreateAnAccount();
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.enterNameDetailsOnCreateAccountPage(firstname, lastname);
      await createAccountPage.enterEmailOnAccountPage(email);
      await createAccountPage.enterPasswordOnCreateAccountPage(password);
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.accountCreationSuccessMessage();
      //await page.waitForLoadState('networkidle');
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateProgressBar();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.validateNewAddressModal();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickSaveAddress();
      await guestCheckoutPage.validateItemsInCartSection();
      await guestCheckoutPage.validateGiftMessage();
      const shippingOptions = ['Priority', 'Standard', 'Express'];
      for (const option of shippingOptions) {
        await guestCheckoutPage.verifyShippingOptionVisibility(option);
      }
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentSection();

    })

  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check shipping methods", () => {
    test.use({ storageState: './shoemalluser9.json' });
    test('Verify Shipping Methods - Checkout Scenario for the loggedIn user - go to shipping scenario', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      // await page.waitForTimeout(10000);
      await guestCheckoutPage.validateShippingSection();

      // List of shipping options to verify
      const shippingOptions = ['Priority', 'Standard', 'Express'];
      for (const option of shippingOptions) {
        await guestCheckoutPage.verifyShippingOptionVisibility(option);
      }
    })
  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Shipping address options", () => {
    test.use({ storageState: './shoemalluser10.json' });
    test('Verify Shipping Address Options - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      //await page.waitForTimeout(10000);
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateItemsInCartSection();
      await guestCheckoutPage.clickOnEditAddress();
      await guestCheckoutPage.validateGiftMessage();
      await guestCheckoutPage.validateShippingAddressRadioButtons();
      await guestCheckoutPage.validateSavedAddressisSelectedbyDefault();
      await guestCheckoutPage.validateSavedAddress();
    })

  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check edit address", () => {
    test.use({ storageState: './shoemalluser10.json' });
    test('Verify Edit Shipping Address Options - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      //await page.waitForTimeout(10000);
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateEditAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentSection();
      await guestCheckoutPage.clickContinueToReview();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateReviewProgressBar();
    })

  });

  //This test cases scenario covered in above test cases
  // test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Gift Message", () => {
  //   test.use({ storageState: './newuser.json' });
  //   test.skip('Verify Gift Message Options - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();

  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     // await page.waitForTimeout(10000);
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.validateGiftMessage();
  //   })

  // });

  //This test cases scenario covered in above test cases
  // test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Items in cart", () => {
  //   test.use({ storageState: './newuser.json' });
  //   test.skip('Verify Items in Cart section - open/close - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();

  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await page.waitForLoadState('networkidle');
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.validateItemsInCartSection();

  //   })

  // });

  // test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check shipping section", () => {
  //   test.use({ storageState: './noncredituser.json' });
  //   test('Verify shipping section is above Payment section - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await page.waitForLoadState('networkidle');
  //     await guestCheckoutPage.validateShippingSectionAbovePaymentSection();

  //   })

  // });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check payment progress bar", () => {
    test.use({ storageState: './shoemalluser11.json' });
    test('Verify Payment Progress Bar - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
      await guestCheckoutPage.validatePaymentProgressBar();
    })

  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Payment Method Radio Buttons", () => {
    test('Verify Payment Method Radio Buttons - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await homePage.clickOnHomePageSignIn();
      const createAccountPage = new CreateAccountPage(page);
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      await signinPage.clickCreateAnAccount();
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.enterNameDetailsOnCreateAccountPage(firstname, lastname);
      await createAccountPage.enterEmailOnAccountPage(email);
      await createAccountPage.enterPasswordOnCreateAccountPage(password);
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.accountCreationSuccessMessage();
      //await page.waitForLoadState('networkidle');
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateProgressBar();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickSaveAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
    })
  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Different Address(Billing/Shipping) message", () => {
    test.use({ storageState: './shoemalluser12.json' });
    //SB-Chkout120
    test('Verify Different Address(Billing/Shipping) message - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.clickOnEditAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.clickCreditCard();
      //await guestCheckoutPage.clickNewCard();
      await guestCheckoutPage.clickSameAsShippingCheckbox();
      //await guestCheckoutPage.validateDifferentAddressMessage();
    })

  });

  test.describe("Checkout Scenario for the loggedIn user - go to shipping scenario - check Billing Address edit section", () => {
    test.use({ storageState: './shoemalluser13.json' });
    test('Verify Billing Address edit section - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      //await page.waitForLoadState('networkidle');
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.clickOnEditAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.selectRandomSavedCard();
      await guestCheckoutPage.validateSavedCCDropDownField();
      await guestCheckoutPage.validateCardDetails();
      await guestCheckoutPage.clickCreditCard();
      await guestCheckoutPage.clickEditCard();
      await guestCheckoutPage.clickEditBillingAddress();
      await guestCheckoutPage.verifyBillingAddressDetails();

    })
  });

  //Not applicable for shoemall
  // test.describe("Mason Checkout - Logged in: Billing Address edit section for Credit User", () => {
  //   test.use({ storageState: './creditUser2.json' });
  //   test('Verify Billing Address edit section for Credit User - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.clickOnEditAddress();
  //     await guestCheckoutPage.clickOnContinueToPayment();
  //     await guestCheckoutPage.validatePaymentMethods();
  //     await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
  //     //await guestCheckoutPage.clickCreditCard();
  //     await guestCheckoutPage.clickEditBillingAddress();
  //     await guestCheckoutPage.validateEditAddressMessageForCreditUser();
  //     await guestCheckoutPage.validateBillingAddressEditCreditAccountHolder();

  //   })
  // });
  //Covered in above test cases
  // test.describe("Mason Checkout - Logged in: Card Options ", () => {
  //   test.use({ storageState: './creditUser2.json' });
  //   test('Verify Card Options - Credit User - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.clickOnEditAddress();
  //     await guestCheckoutPage.clickOnContinueToPayment();
  //     await page.waitForLoadState('networkidle');
  //     await guestCheckoutPage.clickCreditCard();
  //     await guestCheckoutPage.validateCreditCardOptions();
  //     await guestCheckoutPage.validateSavedCardIsSelectedbyDefault();
  //     await guestCheckoutPage.selectRandomSavedCard();
  //     await guestCheckoutPage.validateSavedCCDropDownField();
  //     await guestCheckoutPage.validateCardDetails();
  //   })

  // });

  test.describe("Mason Checkout - Logged in: Continue to Review ", () => {
    test.use({ storageState: './shoemalluser14.json' });
    test('Verify Continue to Review - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateOrderSummary();
      await guestCheckoutPage.validatePromoCodeSection();
      await guestCheckoutPage.validateInvalidPromoCode();
      await guestCheckoutPage.clickOnEditAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.clickContinueToReview();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateReviewProgressBar();

    })

  });


  test.describe("Mason Checkout - Logged in: Verify errors for blank/invalid fields ", () => {
    test.use({ storageState: './shoemalluser16.json' });
    test('Verify errors for blank/invalid fields - Review - Credit User - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      //await page.waitForLoadState('networkidle');
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.clickOnEditAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      //await page.waitForLoadState('networkidle');
      await guestCheckoutPage.clickCreditCard();
      //await guestCheckoutPage.selectNewCardButton();
      await guestCheckoutPage.validateInvalidBlankCardDetails();
    })

  });

  //Covered in above test cases
  // test.describe("Mason Checkout - Logged in: Verify OrderSummary ", () => {
  //   test.use({ storageState: './newuser.json' });
  //   //SB-Chkout044
  //   test('Verify OrderSummary for the loggedIn user - go to shipping scenario - check progress bar and return to cart', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.validateOrderSummary();
  //   })

  // });

  //Covered in above test cases
  // test.describe("Mason Checkout - Logged in: Verify PromoCode section ", () => {
  //   test.use({ storageState: './newuser.json' });
  //   //SB-Chkout045
  //   test('Verify PromoCode section for the loggedIn user - go to shipping scenario - check progress bar and return to cart', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.validateOrderSummary();
  //     await guestCheckoutPage.validatePromoCodeSection();
  //   })

  // });


  test.describe("Mason Checkout - Logged in: Verify Valid PromoCode", () => {
    test.use({ storageState: './shoemalluser15.json' });
    //SB-Chkout047
    test('Verify PromoCode - Valid- for the loggedIn user - go to shipping scenario - check progress bar and return to cart', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateReviewProgressBar();
      await guestCheckoutPage.validateOrderSummary();
      await guestCheckoutPage.validatePromoCodeSection();
      await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
      await guestCheckoutPage.removePromoCode();
    })
  });
  //Covered in above test cases
  // test.describe("Mason Checkout - Logged in: Verify Invalid PromoCode", () => {
  //   test.use({ storageState: './newuser.json' });
  //   //SB-Chkout049
  //   test('Verify PromoCode - Invalid- for the loggedIn user - go to shipping scenario - check progress bar and return to cart', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);
  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await guestCheckoutPage.validateShippingSection();
  //     await guestCheckoutPage.validateOrderSummary();
  //     await guestCheckoutPage.validatePromoCodeSection();
  //     await guestCheckoutPage.validateInvalidPromoCode();


  //   })
  // });

  //Covered in above test cases
  // test.describe("Mason Checkout - Logged in: Verify  Review Progress Bar", () => {
  //   test.use({ storageState: './creditUser2.json' });
  //   test('Verify Review Progress Bar - Checkout Scenario for the loggedIn user - go to shipping section', async ({ page }) => {
  //     // Navigate to the page containing the popular search terms
  //     const guestCheckoutPage = new GuestCheckOutPage(page);
  //     const signinPage = new SignInPage(page);
  //     const homePage = new HomePage(page);
  //     const pdpPage = new PDPPage(page);
  //     const signinPageNew = new SignInPageNew(page);

  //     await pdpPage.clickOnPDPColorVariantButton();
  //     await pdpPage.clickOnMultiplePDPSizeVariantButton();
  //     await guestCheckoutPage.clickAddToCart();
  //     await pdpPage.miniCartDrawer();
  //     await guestCheckoutPage.clickCheckoutOnMyCart();
  //     await guestCheckoutPage.validateShippingSection();
  //     await page.waitForLoadState('networkidle');
  //     await guestCheckoutPage.validateReviewProgressBar();

  //   })
  // });

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/LoggedCheckout-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})