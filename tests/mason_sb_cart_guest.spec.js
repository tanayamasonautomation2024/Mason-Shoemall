const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { CartPage } from '../pages/mason_cart_page';
import { EmptyCartPage } from '../pages/mason_emptycart_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();


const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const minicart_data = JSON.parse(JSON.stringify(require('../test_data/mason_minicart_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));

let loginSuccessful = false;
test.describe("Mason Cart Page Guest User", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();

    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      console.error("Navigation failed:", error);
      test.skip('Skipping test because navigation failed');
    }
  })

  //Cart - Display Order Total - Test Cases ID-
  test("Cart - Display Order Total - Verify that the order total is displayed to the right of the page title.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.cartGetOrderTotal();

  })

  //Cart - Display Product Details - Test Cases ID-SB-Cart061
  test("Cart - Display Product Details - Verify that each product is displayed as a separate line item with relevant details.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.cartLineItemProductDetails();

  })

  //Cart - Quantity Field Functionality - Test Cases ID-SB-Cart061
  test("Cart - Quantity Field Functionality - Verify total price gets updated if user increases/decreases the quantity or applies a valid promo code.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //await page.waitForLoadState('networkidle');
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.cartUpdateQtyPlusMinus();

  })

  //Cart - Edit Item Functionality - Test Cases ID-SB-Cart088/SB-Cart089/SB-Cart090
  test("Cart - Edit Item Functionality - Verify that the Edit Item Drawer functions correctly, allowing users to modify variant options.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.clickCartEditButton();
    await cartPage.validateEditCartDrawerProductDetails();
    await pdpPage.validatePricingSection();
    await pdpPage.validateCreditMessageSection();
    await pdpPage.sizeChartDisplay();

  })

  //Cart - Remove Item from Cart - Test Cases ID-SB-Cart078
  test("Cart - Remove Item from Cart - Verify application shows a success message '<Product Name> was successfully removed from your cart. Undo' at the top of the cart when user removes item from the cart.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const removedProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickRemoveCartButton();
    //await cartPage.cartRemoveSuccessMessage(`Removed ${removedProdName} item from the cart`);

  })

  //Cart - Remove Item from Cart - Test Cases ID-SB-Cart078
  test("Cart - Remove Item from Cart - Verify clicking on Undo at the end of the success message, application adds product back in the cart.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const removedProdName = await cartPage.getCartFirstItemProductName();
    const totalProdCount = await cartPage.cartGetTotalItemsCount();
    await cartPage.clickRemoveCartButton();
    //await cartPage.cartRemoveSuccessMessage(`Removed ${removedProdName} item from the cart`);
    await cartPage.clickCartUndoButton();
    await cartPage.validateUndoCartItems(totalProdCount);

  })

  //Cart - Save Item for Later Functionality - Test Cases ID-SB-Cart193
  test("Cart - Save Item for Later Functionality - Verify application shows a success message when product is added to the cart <Product Name> was successfully moved to saved for later'.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickSaveForLaterButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later`);
    await cartPage.validateCartSaveForLater();

  })

  //Cart - Save Item for Later Functionality - Test Cases ID-SB-Cart170
  test("Cart - Save Item for Later Functionality - Verify application following details against every line item:- Product Name- Item number- Total price- Thumbnail image of product or product variant added to the cart- When applicable: Color, Size, Width- Pricing- Quantity- Availability- Arrives by- Remove button (when applicable)- Personalization (when applicable)- Protection plan (when applicable).", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    const saveLaterDisplayed = await cartPage.validateCartSaveForLater();
    if (saveLaterDisplayed === false) {
      await cartPage.clickSaveForLaterButton();
      //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later`);
      await cartPage.validateCartSaveForLater();
      await cartPage.cartSavedForLaterLineItemProductDetails();
    } {
      await cartPage.validateCartSaveForLater();
      await cartPage.cartSavedForLaterLineItemProductDetails();
    }

  })

  //Cart - Save Item for Later Functionality - Test Cases ID-SB-Cart192
  test("Cart - Save Item for Later Functionality - Verify Move to cart button is shown and clicking on it product moves from save for later to cart section.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    await page.goto(pdp_data.pdp_url);
    const cartDrawerPage = new CartDrawerPage(page);
    const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickSaveForLaterButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later`);
    await cartPage.validateCartSaveForLater();
    const moveToCartProdName = await cartPage.getCartSavedForLaterFirstItemProductName();
    await cartPage.clickMoveToCartButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${moveToCartProdName} was successfully moved to your cart`);

  })

  //Cart - Apply Promo Code Functionality - Test Cases ID-SB-Cart133
  test("Cart - Apply Promo Code Functionality- Verify clicking on Apply promo code, application shows a text box to enter the code.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.validatePromoCode();
  })

  //Cart - Apply Promo Code Functionality - Test Cases ID-SB-Cart136/SB-Cart137
  test("Cart - Apply Promo Code Functionality- Verify application shows: 'Promo code <CODE> applied to order' in place of apply promo code", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.clickPromoCodeOption();
    await cartPage.enterPromoCode(cart_data.promocode);
    const promoCode = await cartPage.getEnteredPromoCode();
    await cartPage.clickApplyCodeButton();
    //await cartPage.validateAppliedPromoCodeMessage(promoCode);
    //await cartPage.validateAppliedPromoCodeTopMessage(promoCode);

  })

  //Cart - Apply Promo Code Functionality - Test Cases ID-SB-Cart137
  test("Cart - Apply Promo Code Functionality- Verify application shows following success message on top: 'Promo code <promo code> has been applied to your order.'", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.clickPromoCodeOption();
    await cartPage.enterPromoCode('SALE50');
    const promoCode = await cartPage.getEnteredPromoCode();
    await cartPage.clickApplyCodeButton();
    await cartPage.validateAppliedPromoCodeTopMessage(promoCode);

  })

  //Cart - Apply Promo Code Functionality - Test Cases ID-SB-Cart138
  test("Cart - Apply Promo Code Functionality- Verify the applied promo code shows in red and Remove option is shown as well", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.clickPromoCodeOption();
    await cartPage.enterPromoCode('SALE50');
    const promoCode = await cartPage.getEnteredPromoCode();
    await cartPage.clickApplyCodeButton();
    await cartPage.validateAppliedPromoCodeMessage(promoCode);
    await cartPage.validatePromoCodeColor();

  })

  //Cart - Apply Promo Code Functionality - Test Cases ID-SB-Cart139
  test("Cart - Apply Promo Code Functionality- Verify order total gets updated when valid promo code is applied", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.clickPromoCodeOption();
    const orderTotal = await cartPage.getCartTotal();
    await cartPage.enterPromoCode('SALE50');
    const promoCode = await cartPage.getEnteredPromoCode();
    await cartPage.clickApplyCodeButton();
    await cartPage.validateAppliedPromoCodeMessage(promoCode);
    const orderTotalAfterPromoCode = await cartPage.getCartTotal();
    expect(orderTotalAfterPromoCode).toBeLessThan(orderTotal);

  })

  //Cart - Apply Promo Code Functionality - Test Cases ID-SB-Cart144
  test("Cart - Apply Promo Code Functionality- Verify application shows a message when promo code is removed: 'Promo code <CODE> has been removed from your order'", async ({ page }, testInfo) => {
    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.clickPromoCodeOption();
    const orderTotal = await cartPage.getCartTotal();
    await cartPage.enterPromoCode('SALE50');
    const promoCode = await cartPage.getEnteredPromoCode();
    await cartPage.clickApplyCodeButton();
    await cartPage.validateAppliedPromoCodeMessage(promoCode);
    await cartPage.clickPromoCodeRemoveButton();
    await cartPage.validateRemovedPromoCodeMessage(promoCode);
    const orderTotalRemovePromoCode = await cartPage.getCartTotal();
    expect(orderTotalRemovePromoCode).toBe(orderTotal);

  })

  //Cart - Display Order Summary Section - Test Cases ID-SB-Cart126
  test("Cart - Display Order Summary Section- Verify order summary shows:- Subtotal- Estimated Shipping- Shipping Surcharge- Estimated Sales tax- Apply promo code (optional) - if not applied to cart - Applied promo code - if applied to cart'", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.validateOrderSummary();

  })

  //Cart - Need Help Section Functionality - Test Cases ID-SB-Cart150
  test("Cart - Need Help Section Functionality- Verify that the Need Help section provides relevant information and functionalities.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    await cartPage.validateNeedHelp();

  })

  //Cart - Display "Saved for Later" Section - Test Cases ID-SB-Cart106/SB-Cart168/SB-Cart169
  test("Cart - Display Saved for Later Section - Verify Save for Later option is shown against applicable products.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickSaveForLaterButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later`);
    await cartPage.validateCartSaveForLater();

  })

  //Cart - Display Product Data - Test Cases ID-SB-Cart170
  test("Cart - Display Product Data - Verify application following details against every line item:- Product Name,Item number,Total price,Thumbnail image of product or product variant added to the cart- When applicable: Color, Size, Width- Pricing- Quantity- Availability- Arrives by- Remove button (when applicable)- Personalization (when applicable)- Protection plan (when applicable).", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    const saveLaterDisplayed = await cartPage.validateCartSaveForLater();
    if (saveLaterDisplayed === false) {
      await cartPage.clickSaveForLaterButton();
      //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later`);
      await cartPage.validateCartSaveForLater();
      await cartPage.cartSavedForLaterLineItemProductDetails();
    } {
      await cartPage.validateCartSaveForLater();
      await cartPage.cartSavedForLaterLineItemProductDetails();
    }

  })

  //Cart - Display "Move to Cart" CTA Functionality - Test Cases ID-SB-Cart192/SB-Cart193
  test("Cart - Display Move to Cart CTA Functionality - Verify application shows a success message when product is added to the cart:'<Product Name> was successfully moved to your cart'.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickSaveForLaterButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later`);
    await cartPage.validateCartSaveForLater();
    const moveToCartProdName = await cartPage.getCartSavedForLaterFirstItemProductName();
    await cartPage.clickMoveToCartButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${moveToCartProdName} was successfully moved to your cart`);

  })

  //Cart - Redirect to PDP on Product Name Click - Test Cases ID-SB-Cart188
  test("Cart - Redirect to PDP on Product Name Click - Verify clicking on <Product Name>, application redirects user to the associated PDP.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickSaveForLaterButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later.`);
    await cartPage.validateCartSaveForLater();
    const moveToCartProdName = await cartPage.getCartSavedForLaterFirstItemProductName();
    await cartPage.clickOnSavedForLaterFirstItemProductName();
    await cartPage.validateProductNameByText(moveToCartProdName);

  })

  //Cart - Display "Remove" CTA Functionality - Test Cases ID-SB-Cart186/SB-Cart187
  test("Cart - Display Remove CTA Functionality - Verify clicking on Remove btn, application removes the item from the Saved for Later section.", async ({ page }, testInfo) => {

    const pdpPage = new PDPPage(page);
    const cartDrawerPage = new CartDrawerPage(page);
    await page.goto(pdp_data.pdp_url);
    //const cartItemCount = await pdpPage.getCartItemCount();
    await pdpPage.clickOnMultiplePDPSizeVariantButton();
    await pdpPage.addtoCart();
    await pdpPage.miniCartDrawer();
    await cartDrawerPage.miniCartClickViewCartButton();
    const cartPage = new CartPage(page);
    const saveForLaterProdName = await cartPage.getCartFirstItemProductName();
    await cartPage.clickSaveForLaterButton();
    //await cartPage.cartSavedForLaterSuccessMessage(`${saveForLaterProdName} was successfully saved for later.`);
    await cartPage.validateCartSaveForLater();
    await cartPage.clickOnRemoveButtonSaveLater();
    //await cartPage.cartRemoveSaveForLaterSuccessMessage(`${saveForLaterProdName} was successfully removed from save for later wishlist.`);

  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/GuestCart-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})

