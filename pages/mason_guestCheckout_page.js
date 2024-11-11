import test, { expect } from 'playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { allure } from 'allure-playwright';
const myaccountpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

const search_placeholder = "What can we help you find";
const search_icon = "Search";
const no_search_result_text = "Sorry, there are no results";
const search_tips = "Please check spelling, try a more general search, or use fewer keywords.";
const need_help = "Need Help?";
const view_faq = "View FAQs";
const chat_with_us = "Chat with Us";
const email = "Email";
const call_number = "Call Us 1-800-704-5480";
const category_grid = "//ul[@class='grid  gap-5 grid-cols-3 md:grid-cols-6']/li";
const search_result_title = "Result for";
const item_count = "Items";
const popular_searches = "Popular Searches";
const popular_search_container = "div.m-2.flex.flex-wrap.gap-2\\.5";
const popular_search_terms = "div.flex.gap-1\\.5.rounded-md.border.border-foggyGray.p-2";
const auto_suggestion_container = "ul.m-2\\.5 li"
const secure_checkout_header = "Begin Secure Checkout";
const sign_in_option = "Sign In & Check Out";
const add_to_cart = "Add to Bag";
const check_out = "Check Out";
const checkOut_as_guest = "Check Out as Guest";
const guest_text = "You don't need an account to check out. Just continue as a guest, and create an account later if you'd like";
const guest_checkout_button = "Continue as Guest";
const shipping = "Shipping";
const secure_checkout_link = "Secure Checkout";
const return_to_cart_link = "Return to Bag";
const shipping_address = "Shipping Address";
const items_in_cart = "Items in Your Order";
const order_summary = "Order Summary";
const order_total = "Order Total:";
const shipping_method = "Shipping Method";
const continue_to_payment = "Continue to Payment";
const close_cart_button = "My Bag";
const payment = "Payment";
const payment_method = "Payment Method";
const continue_to_review = "Continue to Review";
const review = "Review";
const place_order_button = 'button[type="submit"]';
const email_us = 'Email Us:';
const email_text = 'Email your question to';
const mail_id = "service@shoemall.com";
const dropdownSelector = '#addressId';
const gift_message = 'Gift Message';
const create_account_text = 'To use Stoneberry Credit,you must create a new account here or Sign In to an existing account'
const edit_credituser_address_message = 'If you need to change the credit account holder’s name, please call us at 1-800-704-5480'
const different_address_message = 'Your order may be canceled if your shipping and billing addresses are different';
const address_line_2 = 'Show Address Line 2';
const cartApplyPromoCode = 'Apply Promo Code (optional)';
const tollFreeNumberRegex = /^\s*1-\d{3}-\d{3}-\d{4}\s*$/;
const items_in_cart_texts = [
  'Items in Your Order',
  'Item in Your Order'
];

const addresses = [
  {
    streetAddress: '100 Irish Ivy Ct',
    city: 'Boyd',
    state: 'TX',
    zipCode: '76023-4067'
  },
  {
    streetAddress: '11 Falmouth Pl',
    city: 'Albertson',
    state: 'NY',
    zipCode: '11507-2003'
  },
  {
    streetAddress: '138C Gg25 Rd',
    city: 'Fall River',
    state: 'KS',
    zipCode: '67047-4721'
  },
  {
    streetAddress: '7 Yo Yo Rd',
    city: 'Cana',
    state: 'VA',
    zipCode: '24317-3987'
  },
  {
    streetAddress: '2 JJ Rd',
    city: 'Charlotte',
    state: 'AR',
    zipCode: '72522-9645'
  },
  {
    streetAddress: '103 Nnptc Cir',
    city: 'Goose Creek',
    state: 'SC',
    zipCode: '29445-6324'
  }
];

exports.GuestCheckOutPage = class GuestCheckOutPage {
  constructor(page) {
    this.page = page;
    this.search_placeholder = page.getByPlaceholder(search_placeholder);
    this.searchicon = page.getByLabel(search_icon, { exact: true });
    this.no_search_result_text = page.getByText(no_search_result_text);
    this.search_tips = page.getByText(search_tips);
    this.need_help = page.getByText(need_help);
    this.view_faq = page.getByRole('link', { name: view_faq });
    this.chat_with_us = page.getByRole('link', { name: chat_with_us });
    this.email = page.getByRole('link', { name: email });
    this.call_number = page.getByRole('link', { name: call_number });
    this.search_result_title = page.getByText(search_result_title);
    this.itemCount = page.getByText(item_count);
    this.popular_searches = page.getByText(popular_searches);
    this.yourInfo_dob = page.getByLabel('*Date of Birth (MM/DD/YYYY)');
    this.yourInfo_ssn = page.getByLabel('*Last 4 of SSN');
    this.makepayment_newAddress = page.locator('section').filter({ hasText: new RegExp(myaccountpage_locator.makepayment_newAddress) });
    this.makepayment_newaddress_fname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_firstname);
    this.makepayment_newaddress_lname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_lastname);
    this.makepayment_newaddress_address1 = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_addressline1);
    this.makepayment_newaddress_address2 = page.getByRole('button', { name: address_line_2 });
    this.makepayment_addnewaddress_city = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_city);
    this.makepayment_newAddress_state = page.locator(myaccountpage_locator.makepayment_newAddress_state);
    this.makepayment_addnewaddress_zipcode = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_zipcode);
    this.makepayment_addnewaddress_phonenumber = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_phonenumber);
    this.makepayment_combobox = page.getByRole(myaccountpage_locator.makepayment_combobox);
    this.paymentEditButton = page.locator('section').filter({ hasText: /^PaymentEdit$/ }).getByRole('button');
    this.termsandConditionButton = page.getByRole('button', { name: 'Terms & Conditions' });
    this.privacyPolicyButton = page.getByRole('button', { name: 'Privacy Policy' });
    this.creditReportButton = page.getByRole('button', { name: 'Credit Report & Electronic' });
    this.checkoutRemovePromoCodeButton = page.locator('button.underline:has-text("Remove")');
    this.checkoutpaypaloption = page.getByLabel('PayPal');
    this.paypalpageheader = page.getByRole('heading', { name: 'Pay with PayPal' });
    this.paypalemailplaceholder = page.getByPlaceholder('Email or mobile number');
    this.paypalnextbutton = page.getByRole('button', { name: 'Next' });
    this.paypalpassword = page.getByPlaceholder('Password');
    this.paypalloginbutton = page.getByRole('button', { name: 'Log In' });
    this.submitpaypalbutton = page.getByTestId('submit-button-initial');
    //this.paypalpaymentmethod = page.locator('article').filter({ hasText: 'Payment Method' }).locator('path');
    this.paypalpaymentmethod = page.locator('image[id="image0_2298_1837"]');
    this.cartApplyPromoCodeOption = page.getByRole('button', { name: cartApplyPromoCode });
    this.cartApplyPromoCodeTextBox = page.locator('#promo-code');
    this.cartApplyPromoCodeButton = page.getByRole('button', { name: 'Apply Code' });
  }


  async selectAnOptionFromSearchSuggestion(search_text) {
    await this.search_placeholder.click();
    await this.search_placeholder.fill(search_text);
    // Wait for the autocomplete suggestions to appear
    await this.page.waitForSelector(auto_suggestion_container); // replace with the appropriate selector for your suggestion list

    // Get the count of suggestions
    // replace with the appropriate selector for your suggestion list

    await this.page.waitForSelector(auto_suggestion_container, { state: "visible" });
    // Use expect to ensure the count is 10
    const suggestions = await this.page.$$(auto_suggestion_container);
    expect(suggestions).toHaveLength(10);
    // Click on the first suggestion (adjust the selector as per your UI)
    if (suggestions.length > 0) {
      await suggestions[0].click();
      await this.page.waitForTimeout(2000);// Click on the first suggestion
    } else {
      throw new Error('No suggestions found');
    }
    await this.page.waitForSelector(`//h1[contains(text(), "${search_text}")]`, { visible: true });

    //await this.page.$(`//h1[contains(text(), "${search_text}")]`).waitFor({state:"visible"});

    const searchResultH1 = await this.page.$(`//h1[contains(text(), "${search_text}")]`);
    if (!searchResultH1) {
      throw new Error(`${search_text} h1 element not found`);
    }

    const isVisible = await searchResultH1.isVisible();
    if (!isVisible) {
      throw new Error(`${search_text} h1 element is not visible`);
    }
  }

  async clickAddToCart() {
    await this.page.getByRole('button', { name: add_to_cart }).click();
  }

  async clickCheckoutOnMyCart() {
    // await expect(this.page.getByRole('button', { name: check_out })).toBeVisible();
    await this.page.getByRole('button', { name: check_out }).click();
  }

  async clickCloseCart() {
    await this.page.getByRole('button', { name: close_cart_button }).click();
  }


  async validateSecureCheckout() {
    await expect(this.page.getByText(secure_checkout_header)).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByText(sign_in_option)).toBeVisible();
    await expect(this.page.getByText(checkOut_as_guest)).toBeVisible();
    await expect(this.page.getByText(guest_text)).toBeVisible();
    await expect(this.page.getByRole('button', { name: guest_checkout_button })).toBeVisible();
  }

  async continueCheckoutAsGuest() {
    await this.page.getByRole('button', { name: guest_checkout_button }).click();
  }

  async validateShippingSection() {
    await this.page.$(`//h2[contains(text(), "${shipping}")]`);
    await this.page.$(`//p[contains(text(), "${shipping}")]`);
    await this.page.$(`//p[contains(text(), "${shipping_method}")]`);
    await this.page.getByText(secure_checkout_link, { exact: true }).waitFor({ state: "visible" });
    await (this.page.getByText(return_to_cart_link)).waitFor({ state: "visible" });
    await expect(this.page.getByText(shipping_address, { exact: true })).toBeVisible();
    for (const text of items_in_cart_texts) {
      try {
        await expect(this.page.getByText(text)).toBeVisible({ timeout });
        return; // If one text is visible, exit the function
      } catch (error) {
        // Continue checking the next text
      }
    }
    await expect(this.page.getByText(order_summary)).toBeVisible();
    await expect(this.page.getByText(order_total)).toBeVisible();
    //await expect(this.page.getByRole('button', { name: continue_to_payment })).toBeVisible();


  }

  async validateReturnToCart() {
    await this.page.getByText(return_to_cart_link).click();
    const shoppingCartElement = this.page.locator('strong:has-text("Shopping Bag")');
    await expect(shoppingCartElement).toBeVisible({ timeout: 10000 });
  }

  async validatePaymentSection() {
    //await this.page.$(`//h2[contains(text(), "${payment}")]`).waitFor({ state: 'visible' });
    await this.page.$(`//h2[contains(text(), "${payment}")]`);
    await this.page.$(`//h1[contains(text(), "${payment}")]`);
    await this.page.$(`//p[contains(text(), "${payment_method}")]`);
    //await (this.page.getByRole('button', { name: continue_to_review })).waitFor({ state: 'visible' });
  }

  async validateReviewSection() {
    await this.page.$(`//p[contains(text(), "${review}")]`);
  }

  async clickOnPlaceOrder() {
    // Wait for the button to be visible
    await this.page.waitForSelector(place_order_button);

    // Click the button
    await this.page.click(place_order_button);
  }

  async validateProgressBar() {
    await this.page.$(`//span[contains(text(), "${shipping}")]`);
    // Get the computed style of the element
    const element = await this.page.$(`//span[contains(text(), "${shipping}")]`);
    const computedStyle = await element.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        color: style.getPropertyValue('color'),
        backgroundColor: style.getPropertyValue('background-color'),
        fontWeight: style.getPropertyValue('font-weight'),
      };
    });

    // Validate if the text is highlighted with black background and bold
    const isHighlighted = computedStyle.color === 'rgb(15, 23, 42)'
      //&& computedStyle.backgroundColor === 'rgb(255, 255, 0)' // Adjust this RGB value as per your specific highlight color
      && computedStyle.fontWeight >= 700;

    if (isHighlighted) {
      console.log(`Validation passed: ${shipping} is highlighted with bluish and bold text.`);
    } else {
      console.log(`Validation failed: ${shipping} is not highlighted with bluish and bold text.`);
    }

    // Validate Review section is greyed out
    const reviewElement = await this.page.$(`//span[contains(text(), "${review}")]`);
    const reviewStyle = await reviewElement.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        color: style.getPropertyValue('color'),
      };
    });

    const isReviewGreyedOut = reviewStyle.color === 'rgb(183, 183, 184)';

    if (isReviewGreyedOut) {
      console.log(`Validation passed: Review is greyed out.`);
    } else {
      console.log(`Validation failed: Review is not greyed out.`);
    }

    // Validate Payment section is greyed out
    const paymentElement = await this.page.$(`//span[contains(text(), "${payment}")]`);
    const paymentStyle = await paymentElement.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        color: style.getPropertyValue('color'),
      };
    });


    const isPaymentGreyedOut = paymentStyle.color === 'rgb(183, 183, 184)';

    if (isPaymentGreyedOut) {
      console.log(`Validation passed: Payment is greyed out.`);
    } else {
      console.log(`Validation failed: Payment is not greyed out.`);
    }
  }

  //FAQ
  async validateCallSection() {
    await expect(this.page.getByText('Call Us Toll-Free')).toBeVisible({ timeout: 10000 });
    await expect(this.page.locator('a').filter({ hasText: tollFreeNumberRegex }).first()).toBeVisible();
    //await expect(tollFreeLink).toBeVisible();
    await expect(this.page.getByText('6 a.m. to Midnight (CST),')).toBeVisible();
    await expect(this.page.getByText('7 days a week')).toBeVisible();
  }

  async validateEmailSection() {
    await expect(this.page.getByText(email_us)).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByText(email_text)).toBeVisible();
    await expect(this.page.getByRole('link', { name: mail_id })).toBeVisible();
  }


  async validateNeedHelpSection() {
    await this.page.getByText('Need Help?').waitFor({ state: 'visible' });
    await expect(this.page.getByText('Need Help?')).toBeVisible();
    await expect(this.page.getByText('View FAQs:')).toBeVisible();
    await expect(this.page.getByText('Find your answer by visiting')).toBeVisible();
    await expect(this.page.getByText('Chat With Us:')).toBeVisible();
    await expect(this.page.getByText('Send us your question via')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Frequently Asked Questions' })).toBeVisible();
    //await expect(this.page.getByRole('link', { name: 'chat now ' })).toBeVisible();
    await expect(this.page.getByText('chat now')).toBeVisible();

  }


  async validateNewAddressModal() {
    await (this.makepayment_newaddress_fname).waitFor({ state: "visible" });
    await (this.makepayment_newaddress_lname).waitFor({ state: "visible" });
    await expect(this.makepayment_newaddress_address1).toBeVisible();
    await expect(this.makepayment_newaddress_address2).toBeVisible();
    await expect(this.makepayment_addnewaddress_city).toBeVisible();
    await expect(this.makepayment_newAddress_state).toBeVisible();
    await expect(this.makepayment_addnewaddress_zipcode).toBeVisible();
    await expect(this.makepayment_addnewaddress_phonenumber).toBeVisible();
  }



  async addShippingAddress() {
    const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
    const firstName = faker.person.firstName();
    await this.makepayment_newaddress_fname.fill(firstName);
    const lastName = faker.person.lastName();
    await (this.makepayment_newaddress_lname).fill(lastName);

    const address = faker.location.streetAddress();
    await (this.makepayment_newaddress_address1).fill(randomAddress.streetAddress);

    const city = faker.location.city();
    await (this.makepayment_addnewaddress_city).fill(randomAddress.city);

    const state = faker.location.state({ abbreviated: true });
    await (this.makepayment_newAddress_state).selectOption(randomAddress.state);

    const zipCode = faker.location.zipCode().substring(0, 5);
    await (this.makepayment_addnewaddress_zipcode).fill(randomAddress.zipCode);

    const phoneNumber = faker.phone.number();
    const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
    //await this.page.type('#phoneNumber', phoneNumber);
    await (this.makepayment_addnewaddress_phonenumber).fill(phoneNumber);
    //return firstName, lastName;
  }

  async clickSaveAddress() {
    await expect(this.page.getByLabel('Save this Address')).toBeVisible();
    await this.page.getByLabel('Save this Address').click();
  }

  async clickOnContinueToPayment() {
    await this.page.getByRole('button', { name: 'Continue to Payment' }).click();
  }

  async checkIfAddressValidationIsRequired() {
    await this.page.waitForSelector(`//*[contains(text(), "${firstName} ${lastName}")]`, { visible: true });
  }

  // async validateAddressVerification() {
  //   await this.page.waitForSelector('div[role="dialog"]', { timeout: 15000 });
  //   const addressModalVisible = await this.page.locator('div[role="dialog"][data-state="open"]').isVisible();
  //   if (addressModalVisible) {
  //     await this.page.getByLabel('Use Original Address').click();
  //     await this.page.getByRole('button', { name: 'Continue' }).click();
  //   } else {
  //     console.log('Heading "Verify Your Address" is not visible.');
  //     await this.page.waitForSelector(`//*[contains(text(), "${firstName} ${lastName}")]`, { visible: true });
  //   }
  //   // const headingVisible = await this.page.waitForSelector('h2', { text: 'Verify Your Address', visible: true });
  //   // if (headingVisible) {

  //   //   // If heading is visible, find the section with text 'Use Original Address' and click it
  //   //   const section = await this.page.locator('section').filter({ hasText: /^Use Original Address$/ }).first();
  //   //   if (section) {
  //   //     // await section.click();
  //   //     // await this.page.click('#r2');
  //   //     await this.page.click('label:has-text("Use Original Address")');
  //   //     //  const continueButton = await this.page.waitForSelector('button:enabled', {
  //   //     //   text: 'Continue',
  //   //     // });
  //   //     await expect(this.page.getByRole("button", { name: 'Continue' })).toBeEnabled();
  //   //     await this.page.getByRole("button", { name: 'Continue' }).click();
  //   //     console.log('Clicked on "Use Original Address" section.');
  //   //   } else {
  //   //     console.log('Could not find section with text "Use Original Address".');
  //   //   }
  //   // } else {
  //   //   console.log('Heading "Verify Your Address" is not visible.');
  //   //   await this.page.waitForSelector(`//*[contains(text(), "${firstName} ${lastName}")]`, { visible: true });
  //   // }

  // }

  async validateAddressVerification() {
    try {
      await this.page.waitForTimeout(5000);
      // Check if the address verification dialog is present with the data-state="open" attribute
      const addressModal = this.page.locator('div[role="dialog"][data-state="open"]');
      const isModalPresent = await addressModal.count() > 0;

      if (isModalPresent) {
        // Verify if the modal is visible within 15 seconds
        const isModalVisible = await addressModal.first().isVisible({ timeout: 15000 });

        if (isModalVisible) {
          // Click "Use Original Address" and then "Continue"
          await this.page.getByLabel('Use Original Address').click();
          await this.page.getByRole('button', { name: 'Continue' }).click();
          console.log('Address verification completed.');
          return;
        }
      }

      console.log('Address verification modal did not appear or is not open.');

      // Wait for the text containing the first and last name to be visible
      // const fullName = `${firstName} ${lastName}`;
      // await this.page.waitForSelector(`//*[contains(text(), "${fullName}")]`, { state: 'visible' });
      // console.log(`Found text: "${fullName}"`);

    } catch (error) {
      console.error('An error occurred during address verification:', error);
    }
  }

  async clickOnEditAddress() {
    await this.page.waitForSelector("(//button[text()='Edit'])[1]", { visible: true });
    const button = await this.page.$('(//button[text()="Edit"])[1]');
    await button.click();
  }

  async validateEditAddress() {
    const state = faker.location.state({ abbreviated: true })
    await this.page.waitForSelector("(//button[text()='Edit'])[1]", { visible: true });
    const button = await this.page.$('(//button[text()="Edit"])[1]');
    await button.click();
    await this.page.getByRole("button", { name: 'Edit Address' }).waitFor({ state: "visible" });
    await this.page.getByRole("button", { name: 'Edit Address' }).click();
    await this.addShippingAddress();

  }

  async verifyShippingOptionVisibility(option) {
    const selector = `label:has-text("${option}")`; // Using Playwright's :has-text pseudo-selector

    // Check if the element matching the option is visible
    const element = await this.page.locator(selector).first();
    await expect(element).toBeVisible();
  }

  async validateShippingAddressRadioButtons() {
    //await expect(this.billingAddressHeader).toBeVisible();
    await expect(this.makepayment_newAddress).toBeVisible();
    await expect(this.page.locator('section').filter({ hasText: new RegExp(myaccountpage_locator.makepayment_savedAddress) })).toBeVisible();
  }

  //if there is an address added
  async validateSavedAddressisSelectedbyDefault() {
    // Check if the "Saved address" radio button is present and selected by default
    // Wait for the button to appear on the page
    const button = await this.page.waitForSelector('button#savedAddress');

    // Get the value of aria-checked attribute
    const ariaChecked = await button.getAttribute('aria-checked');

    // Assert that aria-checked attribute is 'true'
    expect(ariaChecked).toBeTruthy();
  }


  async validateSavedAddress() {


    // Wait for the dropdown to appear on the page
    await this.page.waitForSelector(dropdownSelector);

    // Get all options from the dropdown
    const options = await this.page.$$eval(`${dropdownSelector} > option`, options =>
      options.map(option => ({
        value: option.value,
        text: option.innerText.trim()
      }))
    );

    // Select a random option from the dropdown
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];

    // Select the random option by its value
    await this.page.selectOption(dropdownSelector, randomOption.value);

    // Wait for the address details to appear on the page
    await this.page.waitForSelector('.ml-6'); // Adjust selector as per your actual structure

    // Get the text content of the address details
    const addressDetails = await this.page.textContent('.ml-6');

    // Validate that the selected address details are displayed
    expect(addressDetails).toContain(randomOption.text);
  }


  async validateGiftMessage() {
    await this.page.getByRole('button', { name: gift_message }).click();
    //await expect(page.getByPlaceholder(' ')).toBeVisible();
    await expect(this.page.getByText(gift_message)).toBeVisible();
  }


  async validateItemsInCartSection() {
    // Wait for the button with specific name to be visible
    //const button = await this.page.waitForSelector('button[data-radix-collection-item]:has-text("Items in Your Cart")', { visible: true });
    for (const text of items_in_cart_texts) {
      try {
        const button = await this.page.getByRole('button', { name: text });
        return; // If one text is visible, exit the function
      } catch (error) {
        // Continue checking the next text
      }
    }
    //const button = await this.page.getByRole('button', { name: items_in_cart });
    // Function to check initial data-state
    const isDataStateClosed = async () => {
      const dataState = await button.getAttribute('data-state');
      return dataState === 'closed';
    };

    // Assert initial state using expect
    const initialDataStateClosed = await isDataStateClosed();
    expect(initialDataStateClosed).toBe(true); // Assert that initial state is closed

    // Click on the button to change data-state
    await button.click();

    // Wait for the data-state to change to 'open'
    //  await this.page.waitForFunction(() => {
    //    const button = document.querySelector('button[data-radix-collection-item]:has-text("Items in Your Cart")');
    //    return button.getAttribute('data-state') === 'open';
    //  });

    // Assert data-state changed using expect
    const finalDataState = await button.getAttribute('data-state');
    expect(finalDataState).toBe('open'); // Assert that final state is open
  }


  async validateShippingSectionAbovePaymentSection() {
    await this.page.waitForSelector(`//h1[contains(text(), "${shipping}")]`, { visible: true });
    await this.page.waitForSelector(`//h1[contains(text(), "${payment}")]`, { visible: true });
    const shippingSection = await this.page.$(`//h1[contains(text(), "${shipping}")]`);
    const paymentForm = await this.page.$(`//h1[contains(text(), "${payment}")]`);

    const shippingBox = await shippingSection.boundingBox();
    const paymentBox = await paymentForm.boundingBox();

    // Verify Shipping section is above Payment form section
    expect(shippingBox.y).toBeLessThan(paymentBox.y);

  }


  async validatePaymentProgressBarOld() {
    // Wait for the progress bar elements to appear
    await this.page.waitForSelector('nav[aria-label="Progress"]');

    // Verify each step in the progress bar
    const shippingStep = await this.page.$('nav[aria-label="Progress"] li:nth-child(1)');
    const paymentStep = await this.page.$('nav[aria-label="Progress"] li:nth-child(2)');
    const reviewStep = await this.page.$('nav[aria-label="Progress"] li:nth-child(3)');

    // Assert the styles and content for each step
    const shippingClass = await shippingStep.getAttribute('class');
    const paymentClass = await paymentStep.getAttribute('class');
    const reviewClass = await reviewStep.getAttribute('class');

    // Assert the shipping step (Green with Check)
    if (shippingClass.includes('text-[#298842]')) {
      console.log('Shipping step is green (completed)');
    } else {
      console.error('Shipping step is not green');
    }

    // Assert the payment step (Highlighted)
    if (paymentClass.includes('border-2') && paymentClass.includes('border-black')) {
      console.log('Payment step is highlighted');
    } else {
      console.error('Payment step is not highlighted');
    }

    // Assert the review step (Greyed out)
    if (reviewClass.includes('text-foggyGray')) {
      console.log('Review step is greyed out');
    } else {
      console.error('Review step is not greyed out');
    }

  }


  async validatePaymentProgressBar() {
    try {
      // Validate Shipping section (Green with Check)
      //const shippingText = 'Shipping';
      const shippingElement = await this.page.$(`//span[contains(text(), "${shipping}")]`);
      //await this.page.$(`nav[aria-label="Progress"] span:has(svg) span:has-text("${shipping}")`);
      const shippingClass = await shippingElement.getAttribute('class');

      if (shippingClass.includes('text-[#298842]')) {
        console.log(`Validation passed: ${shipping} is green with check.`);
      } else {
        console.log(`Validation failed: ${shipping} is not green with check.`);
      }

      // Validate Payment section (Highlighted)
      //const paymentText = 'Payment';
      const paymentElement = await this.page.$(`//span[contains(text(), "${payment}")]`);
      //await this.page.$(`nav[aria-label="Progress"] span.step-label:has-text("${payment}")`);
      const paymentClass = await paymentElement.getAttribute('class');

      if (paymentClass.includes('font-extrabold')) {
        console.log(`Validation passed: ${payment} is highlighted.`);
      } else {
        console.log(`Validation failed: ${payment} is not highlighted.`);
      }

      // Validate Review section (Greyed out)
      //const reviewText = 'Review';
      const reviewElement = await this.page.$(`//span[contains(text(), "${review}")]`);
      //await this.page.$(`nav[aria-label="Progress"] span.text-foggyGray:has-text("${review}")`);
      const reviewClass = await reviewElement.getAttribute('class');

      if (reviewClass.includes('text-foggyGray')) {
        console.log(`Validation passed: ${review} is greyed out.`);
      } else {
        console.log(`Validation failed: ${review} is not greyed out.`);
      }
    } catch (error) {
      console.error('Error during validation:', error);
    }
  }

  async validatePaymentMethods() {
    await this.page.waitForSelector('label:has-text("Credit/Debit Card")', { state: 'visible' });
    //await expect(this.page.getByLabel('My Stoneberry Credit')).toBeVisible();
  }


  async validateMyCreditIsSelectedbyDefault() {
    // Check if the "Saved address" radio button is present and selected by default
    // Wait for the button to appear on the page
    const button = await this.page.waitForSelector('button[value="CARD"]');

    // Get the value of aria-checked attribute
    const ariaChecked = await button.getAttribute('aria-checked');

    // Assert that aria-checked attribute is 'true'
    expect(ariaChecked).toBeTruthy();
  }

  async clickCreditCard() {
    try {
      const isPaymentEditButtonVisible = await this.paymentEditButton.isVisible();
      if (isPaymentEditButtonVisible) {
        await this.paymentEditButton.click();
      }

      const button = await this.page.waitForSelector('button[value="CARD"]');
      await button.click();
      console.log('Clicked on Credit/Debit Card button.');
    } catch (error) {
      console.error('Error clicking on Credit/Debit Card button:', error);
    }
  }

  async checkForPaymentEditButton() {
    const isPaymentEditButtonVisible = await this.paymentEditButton.isVisible();
    if (isPaymentEditButtonVisible) {
      await this.paymentEditButton.click();
    } else {
      console.log('Payment Edit Button not visible');
    }
  }

  async clickNewCard() {
    try {
      await this.page.locator('button[value="newCreditCard"]').click();
    } catch (error) {
      console.error('Error clicking on New Credit/Debit Card button:', error);
    }
  }

  async clickSameAsShippingCheckbox() {
    await this.page.getByLabel('Same as Shipping Address').click();
  }

  async validateDifferentAddressMessage() {
    await (this.page.getByText(different_address_message)).waitFor({ state: "visible" });
  }

  async clickEditBillingAddress() {
    await this.page.getByRole('button', { name: 'Edit Address' }).waitFor({ state: "visible" });
    await this.page.getByRole('button', { name: 'Edit Address' }).click();
  }


  async verifyBillingAddressDetails() {
    try {
      // List of fields to verify
      const fieldsToVerify = [
        { type: 'label', selector: '*First Name' },
        { type: 'label', selector: '*Last Name' },
        { type: 'label', selector: '*Address Line 1' },
        { type: 'label', selector: '*City' },
        { type: 'label', selector: '*Zip Code' },
        { type: 'label', selector: '*Phone Number' }
      ];

      // Check each field
      await Promise.all(fieldsToVerify.map(async field => {
        let element;
        switch (field.type) {
          case 'label':
            element = await this.page.getByLabel(field.selector, { exact: false });
            break;
          default:
            console.error(`Unsupported field type: ${field.type}`);
            return;
        }

        await expect(element).toBeVisible();
        const value = await element.inputValue();

        // Log prepopulation status
        if (value.trim() !== '') {
          console.log(`${field.selector} is prepopulated.`);
        } else {
          console.log(`${field.selector} is not prepopulated.`);
        }

        // Log text content

        console.log(`${field.selector} text content (value): ${value}`);
      }));

      console.log('Billing address details verification passed.');
    } catch (error) {
      console.error('Error in verifyBillingAddressDetails:', error);
      throw error;
    }
  }

  async validateEditAddressMessageForCreditUser() {
    await (this.page.getByText(edit_credituser_address_message)).waitFor({ state: "visible" });
  }


  async validateBillingAddressEditCreditAccountHolder() {
    try {


      // Wait for the Credit Account Holder label to be visible
      const creditAccountHolderLabel = await this.page.waitForSelector('p.pt-7.text-base.font-bold.leading-5', { state: 'visible' });

      // Check if the label contains 'Credit Account Holder:'
      const labelText = await creditAccountHolderLabel.innerText();
      if (labelText.includes('Credit Account Holder:')) {
        console.log('Credit Account Holder label is visible.');
      } else {
        console.error('Credit Account Holder label is not visible or does not contain expected text.');
      }



      // Get the text content of (fname lname)
      const firstNameLastNameElement = await this.page.$('p.pt-1\\.5.text-base');
      let nameText = '';

      if (firstNameLastNameElement) {
        nameText = await firstNameLastNameElement.textContent(); // Get the text content
        console.log(`Credit Account Holder: ${nameText.trim()}`); // Log the name
      } else {
        console.log('Name element not found.');
      }


      //await expect(firstNameLastNameElement).not.toHaveAttribute('contenteditable', 'true');
      // Verify if Brenda Hayton (fname lname) is editable
      //    const isEditable = await firstNameLastNameElement.evaluate(element => {
      //     return element.contentEditable === 'true'; // Check if contentEditable attribute is true
      // });

      // if (isEditable) {
      //     console.log('Brenda Hayton (fname lname) is editable.');
      // } else {
      //     console.log('Brenda Hayton (fname lname) is not editable.');
      // }

      // Get the element handle for the paragraph
      const paragraphElement = await this.page.$('p.pt-1\\.5.text-base');

      // Check if the paragraph element is editable
      const isContentEditable = await paragraphElement.evaluate(element => {
        return element.getAttribute('contenteditable') === 'true';
      });

      // Assert that the element is not contenteditable
      expect(isContentEditable).toBe(false);
      console.log('firstNameLastName is not editable');

    } catch (error) {
      console.error('Error in validateCreditAccountHolder:', error);
      throw error;
    }
  }


  async validateCreateAccountOnCheckoutPage() {
    await this.page.evaluate(() => {
      window.scrollBy(0, window.innerHeight + 600);
    });
    await (this.page.getByText(create_account_text)).waitFor({ state: "visible" });
  }

  async clickOnSignIn() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await (this.page.getByRole('heading', { name: 'Sign In to Your Stoneberry' })).waitFor({ state: "visible" });
  }

  async clickEditCard() {
    await this.page.getByRole('button', { name: 'Edit Card' }).click();
  }

  async validateCreditCardOptions() {
    // await this.page.getByLabel('Credit/Debit Card').click();
    await expect(this.page.locator('button#newCreditCard')).toBeVisible();
    await expect(this.page.locator('button#savedCreditCard')).toBeVisible();
  }


  //if there is an address added
  async validateSavedCardIsSelectedbyDefault() {
    // Check if the "Saved address" radio button is present and selected by default
    // Wait for the button to appear on the page
    const button = await this.page.waitForSelector('button[value="savedCreditCard"]');

    // Get the value of aria-checked attribute
    const ariaChecked = await button.getAttribute('aria-checked');

    // Assert that aria-checked attribute is 'true'
    expect(ariaChecked).toBeTruthy();
  }

  async validateSavedCCDropDownField() {
    try {

      // Wait for the dropdown selector to be visible
      const dropdownSelector = await this.page.waitForSelector('select#creditCardId');

      // Get all options within the dropdown
      const options = await dropdownSelector.$$eval('option', options =>
        options.map(option => option.textContent.trim())
      );

      // Validate each option format, skipping the first option
      let allOptionsMatchFormat = true;
      const formatRegex = /\*\*\*\* \d{4}/;

      options.slice(1).forEach(option => { // Start from index 1 to skip "*Select Credit Card"
        if (!formatRegex.exec(option)) {
          allOptionsMatchFormat = false;
          console.error(`Option "${option}" does not match the expected format.`);
        }
      });
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  }

  async selectRandomSavedCardOld() {
    try {
      // Wait for the dropdown selector to be visible and interactable
      const dropdownSelector = await this.page.waitForSelector('select#creditCardId', { visible: true });

      // Click on the dropdown to display options
      await dropdownSelector.click();


      await dropdownSelector.waitForElementState('visible');

      const options = await dropdownSelector.$$eval('option:not([disabled]):not([hidden])', options =>
        options.map(option => option.textContent.trim())
      );

      if (options.length > 0) {
        // Select a random option
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex];

        // Select the option in the dropdown
        await dropdownSelector.selectOption({ index: randomIndex });

        // Validate the selected option format
        const formatRegex = /^Visa \*\*\*\* \d{4}$/; // Adjust regex as needed
        if (formatRegex.test(selectedOption)) {
          console.log(`Selected option "${selectedOption}" matches the expected format.`);
        } else {
          console.error(`Selected option "${selectedOption}" does not match the expected format.`);
        }
      } else {
        console.error('Only one saved CC');
      }

    } catch (error) {
      console.error(`Error occurred during card selection: ${error}`);
    }
  }


  async selectRandomSavedCard() {

    // Define the regex pattern
    //  const expiresPattern = /^Expires \d{2}\/\d{2}$/;
    //  const xpathSelector = `//p[contains(text(), "${expiresPattern.source}")]`;
    //  await this.page.waitForSelector(xpathSelector, { state: 'visible' });

    const monthYearRegex = /^Expires (\d{2})\/(\d{2})$/; // Regex pattern for "Expires MM/YY"

    // Function to find an element by text content matching the month and year pattern
    const findElementByMonthYearPattern = async (page, regexPattern) => {
      const elements = await this.page.$$('*'); // Get all elements

      for (const element of elements) {
        const textContent = await element.textContent();
        console.log(textContent); // Get text content of each element
        const match = textContent.match(monthYearRegex);
        if (match) {
          const month = parseInt(match[1], 10); // Extract and parse month (first capture group)
          const year = parseInt(match[2], 10); // Extract and parse year (second capture group)

          // Check if month and year are valid (adjust validation as per your requirements)
          if (month >= 1 && month <= 12 && year >= '0o0' && year <= 99 && await element.isVisible()) {
            return element;
          }
        }

      }
      return null; // Return null if no element matches
    };

    // Wait for the dropdown selector to be visible
    const dropdownSelector = await this.page.waitForSelector('select#creditCardId');
    // const dropdownSelector = await this.page.getByLabel('*Select Credit Card');

    // Click on the dropdown to display options
    await this.page.waitForTimeout(5000);
    await dropdownSelector.click();

    await this.page.waitForTimeout(2000);
    // Get all options within the dropdown
    const options = await dropdownSelector.$$eval('option', options =>
      options.map(option => option.textContent.trim())
    );

    console.log(options.length);
    console.log(options);

    // Filter out the '*Select Credit Card' option
    const filteredOptions = options.filter(option => option !== '*Select Credit Card');

    // Randomly select an option from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredOptions.length);
    const selectedOption = filteredOptions[randomIndex];

    // Log the selected option (optional)
    console.log(`Selected option: ${selectedOption}`);
    console.log(selectedOption);

    // Select the option by its text value
    // Select the option by its text value using selectOption
    await dropdownSelector.selectOption({ label: selectedOption });

    // Optionally, wait for a brief moment after selection
    await this.page.waitForTimeout(1000);

  }

  async validateCardDetails() {
    await expect(this.page.getByText('Expires ')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Edit Card' })).toBeVisible();
  }

  async clickContinueToReview() {
    await this.page.getByRole('button', { name: 'Continue to Review' }).click();
    await this.page.getByRole('button', { name: 'Place Order' }).first().waitFor({ state: 'visible' });

  }

  async validatePlaceOrderButton() {
    await (this.page.getByRole('button', { name: 'Place Order' }).first()).waitFor({ state: "visible" });
  }

  // async clickOnPlaceOrderButton() {
  //   await this.page.getByRole('button', { name: 'Place Order' }).first().click();
  //   await this.validatePlaceOrderProgress();
  //   await this.page.waitForURL(/.*\/thank-you\/.*/);
  // }

  async clickOnPlaceOrderButton() {
    try {
      // Click on the "Place Order" button
      await this.page.getByRole('button', { name: 'Place Order' }).first().click();

      // Wait briefly for any error message to appear
      await this.page.waitForTimeout(5000); // Short delay for the UI to update

      // Check for the presence of the error message <p> tag
      const errorMessageSelector = 'p.text-scarletRed.font-medium.leading-6';
      const errorMessage = await this.page.locator(errorMessageSelector).first();

      if (await errorMessage.isVisible()) {
        // Capture the error message text
        const errorText = await errorMessage.textContent();
        console.log('Error Message:', errorText);

        // Optionally, you might want to throw an error or handle it in a specific way
        throw new Error(`Order failed with message: ${errorText}`);
      } else {
        // Proceed if no error message is found
        //await this.validatePlaceOrderProgress();
        await this.page.waitForURL('**/thank-you');
        console.log('Order placed successfully, redirected to the thank-you page.');
      }
    } catch (error) {
      console.error('An error occurred during order placement:', error.message);
      // Optionally, you can take a screenshot for further analysis
      const screenshotPath = `screenshots/order-error-${Date.now()}.png`;
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await this.page.screenshot({ fullPage: true })), 'image/png');
    }
  }

  async validateInvalidBlankCardDetails() {
    await this.page.getByRole('button', { name: 'Continue to Review' }).click();
    await (this.page.getByText('Enter a credit card number')).waitFor({ state: "visible" });
  }


  // async validateOrderSummary() {
  //   await (this.page.getByText('Order Summary')).waitFor({ state: "visible" });
  //   await (this.page.getByText('Subtotal:')).waitFor({ state: "visible" });
  //   await expect(this.page.getByText('Shipping:')).toBeVisible();
  //   //await expect(this.page.locator('li').filter({ hasText: 'Shipping:$' }).getByLabel('tooltip')).toBeVisible();
  //   await expect(this.page.getByText('Shipping Surcharge:')).toBeVisible();
  //   await expect(this.page.getByText('Estimated Sales Tax:')).toBeVisible();
  //   await expect(this.page.getByText('Order Total:')).toBeVisible();
  //   await expect(this.page.locator('li').filter({ hasText: 'Estimated Sales Tax:$' }).getByLabel('tooltip')).toBeVisible();
  //   await expect(this.page.locator('li').filter({ hasText: 'Shipping Surcharge:$' }).getByLabel('tooltip')).toBeVisible();
  //   await expect(this.page.getByRole('button', { name: 'Apply Promo Code (optional)' })).toBeVisible();
  //   await expect(this.page.locator('.absolute > button')).toBeVisible();

  // }

  async validateOrderSummary() {
    // Wait for the "Order Summary" and "Subtotal" labels to be visible
    await this.page.getByText('Order Summary').waitFor({ state: "visible" });
    await this.page.getByText('Subtotal:').waitFor({ state: "visible" });

    // Check and validate "Shipping" label
    await expect(this.page.getByText('Shipping:')).toBeVisible();

    // Conditionally check for the presence of "Shipping Surcharge"
    const isShippingSurchargeVisible = await this.page.getByText('Shipping Surcharge:').isVisible();
    if (isShippingSurchargeVisible) {
      await expect(this.page.getByText('Shipping Surcharge:')).toBeVisible();
      await expect(this.page.locator('li').filter({ hasText: 'Shipping Surcharge:$' }).getByLabel('tooltip')).toBeVisible();
    }

    // Check for "Estimated Sales Tax" and "Order Total" labels
    await expect(this.page.getByText('Estimated Sales Tax:')).toBeVisible();
    await expect(this.page.getByText('Order Total:')).toBeVisible();

    // Check for tooltips related to "Estimated Sales Tax"
    await expect(this.page.locator('li').filter({ hasText: 'Estimated Sales Tax:$' }).getByLabel('tooltip')).toBeVisible();

    // Validate the presence of the "Apply Promo Code" button and close button
    //await expect(this.page.getByRole('button', { name: 'Apply Promo Code (optional)' })).toBeVisible();
    //await expect(this.page.locator('.absolute > button')).toBeVisible();
    await this.validatePromoCodeSection();
  }


  async validatePromoCodeSection() {
    const removePromoButton = this.checkoutRemovePromoCodeButton;
    const applyPromoButton = this.page.getByRole('button', { name: 'Apply Promo Code (optional)' });
    const promoCodeInput = this.page.locator('#promo-code');
    const applyCodeButton = this.page.getByRole('button', { name: 'Apply Code' });

    if (await removePromoButton.isVisible()) {
      console.log('Promo code already applied');
      await removePromoButton.click();
      await this.page.locator('p.text-forestGreen span').waitFor({ state: 'visible' });
      const spanText = await this.page.locator('p.text-forestGreen span').textContent();
      expect(spanText).toContain('has been removed from your order');
    }

    const isPromoCodeTextBoxVisible = await this.cartApplyPromoCodeTextBox.isVisible();
    if (!isPromoCodeTextBoxVisible) {
      // If not visible, click on the option to reveal it
      await expect(this.cartApplyPromoCodeOption).toBeVisible();
      await this.cartApplyPromoCodeOption.click();
      // Wait for the promo code text box to become visible
      await this.cartApplyPromoCodeTextBox.waitFor({ state: 'visible' });
    }
    await expect(this.cartApplyPromoCodeTextBox).toBeVisible();
    await expect(this.cartApplyPromoCodeButton).toBeVisible();


  }

  async validateValidPromoCode(enterPromoCode) {
    await this.page.locator('#promo-code').click();
    await this.page.locator('#promo-code').fill(enterPromoCode);
    const promoCode = await this.cartApplyPromoCodeTextBox.inputValue();
    await this.page.getByRole('button', { name: 'Apply Code' }).click();
    await this.page.locator('p.text-forestGreen span').waitFor({ state: 'visible' });
    const spanText = await this.page.locator('p.text-forestGreen span').textContent();
    expect(spanText).toContain(`Promo code ${promoCode} has been applied to your order`);
    // await (this.page.getByText(`Promo code ${promoCode} has been applied to your order`)).waitFor({ state: "visible" });
    // await expect(this.page.getByText(`Promo code ${promoCode} applied to order`)).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(this.page.getByText('Order Discount')).toBeVisible();
  }

  async validateInvalidPromoCode() {
    await this.page.locator('#promo-code').click();
    await this.page.locator('#promo-code').fill('SAVE50');
    await this.page.getByRole('button', { name: 'Apply Code' }).click();
    await (this.page.getByText('Promo code SAVE50 is invalid, expired or not applicable to your item')).waitFor({ state: "visible" });
  }

  async removePromoCode() {
    await expect(this.page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Remove' }).click();
    await (this.page.getByText('Promo code SALE50 has been removed from your order')).waitFor({ state: "visible" });
  }


  async addCardDetails() {
    await this.page.getByLabel('*Card Number').fill('4012 0000 7777 7777');
    await this.page.getByText('*Exp. Date (MM/YY)').click();
    await this.page.getByLabel('*Exp. Date (MM/YY)').fill('12/25');
    await this.page.getByText('*Security Code').click();
    await this.page.getByLabel('*Security Code').fill('123');
  }

  async enterEmailDetails(email) {
    await this.page.getByText('*Email Address').click();
    await this.page.getByLabel('*Email Address').fill(email);
  }

  async fillDOB() {

    // Calculate the minimum date of birth which ensures age > 18
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minBirthYear = currentYear - 35;

    // Generate a random birth year between minBirthYear and (currentYear - 18)
    const birthYear = Math.floor(Math.random() * (currentYear - minBirthYear - 1)) + minBirthYear + 1;

    // Generate a random birth month (from 1 to 12)
    const birthMonth = Math.floor(Math.random() * 12) + 1;

    // Generate a random birth day based on the month and year
    const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    const birthDay = Math.floor(Math.random() * daysInMonth) + 1;

    // Format the components into MM/DD/YYYY format
    const formattedDate = `${String(birthMonth).padStart(2, '0')}/${String(birthDay).padStart(2, '0')}/1980`;

    await this.yourInfo_dob.fill(formattedDate);
  }


  // Function to calculate age based on date of birth
  async calculateAge(birthDate) {
    const today = new Date();
    const diff = today - birthDate;
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  async fillSSN() {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    // Assuming `this.yourInfo_ssn` is an input element, you can set its value
    await this.yourInfo_ssn.fill(randomNumber.toString());
  }

  async validateTermsAndConditionSection() {
    await expect(this.termsandConditionButton).toBeVisible();
    await expect(this.privacyPolicyButton).toBeVisible();
    await expect(this.creditReportButton).toBeVisible();
    // await expect(this.page.getByText('Terms & Conditions')).toBeVisible();
    //await this.page.getByLabel('*I agree to the account terms').click();
  }


  async fillPassword(password) {
    await this.page.getByText('*Password').click();
    await this.page.getByLabel('*Password').fill(password);
  }

  async validateReviewProgressBar() {
    try {
      // Validate Shipping section (Green with Check)
      //const shippingText = 'Shipping';
      const shippingElement = await this.page.$(`//span[contains(text(), "${shipping}")]`);
      //await this.page.$(`nav[aria-label="Progress"] span:has(svg) span:has-text("${shipping}")`);
      const shippingClass = await shippingElement.getAttribute('class');

      if (shippingClass.includes('text-[#298842]')) {
        console.log(`Validation passed: ${shipping} is green with check.`);
      } else {
        console.log(`Validation failed: ${shipping} is not green with check.`);
      }

      // Validate Payment section (Highlighted)
      //const paymentText = 'Payment';
      const paymentElement = await this.page.$(`//span[contains(text(), "${payment}")]`);
      //await this.page.$(`nav[aria-label="Progress"] span.step-label:has-text("${payment}")`);
      const paymentClass = await paymentElement.getAttribute('class');

      if (paymentClass.includes('text-[#298842]')) {
        console.log(`Validation passed: ${payment} is green with check.`);
      } else {
        console.log(`Validation failed: ${payment} is not not green with check.`);
      }

      // Validate Review section (Greyed out)
      //const reviewText = 'Review';
      const reviewElement = await this.page.$(`//span[contains(text(), "${review}")]`);
      //await this.page.$(`nav[aria-label="Progress"] span.text-foggyGray:has-text("${review}")`);
      const reviewClass = await reviewElement.getAttribute('class');

      if (reviewClass.includes('font-extrabold')) {
        console.log(`Validation passed: ${review} is highlighted`);
      } else {
        console.log(`Validation failed: ${review} is not highlighted`);
      }
    } catch (error) {
      console.error('Error during validation:', error);
    }
  }

  async validateTwoPlaceOrderButtons() {
    await (this.page.getByRole('button', { name: 'Place Order' }).first()).waitFor({ state: "visible" });
    await expect(this.page.getByRole('button', { name: 'Place Order' }).nth(1)).toBeVisible();
  }

  async validatePlaceOrderProgress() {
    await (this.page.getByText('Please wait while we process your')).waitFor({ state: "visible" });
    await expect(this.page.getByText('Don’t click the back button,')).toBeVisible();
  }

  async validateCreditUserInfo() {
    await (this.page.locator('article').filter({ hasText: 'Payment Method' }).getByRole('img')).waitFor({ state: "visible" });
    await expect(this.page.getByText('Contact Info')).toBeVisible();
  }

  async validatePreQualificationResultsSection() {
    await expect(this.page.getByRole('button', { name: 'Pre-Qualification Results' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Pre-Qualification Results' }).click();
    await expect(this.page.getByRole('heading', { name: 'Stoneberry Credit Pre-' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Pre-Qualification Results' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Pre-Qualification Results' }).click();
  }

  async validateCardUserInfo() {
    await (this.page.locator('article').filter({ hasText: 'Payment MethodCard Number' }).locator('path')).waitFor({ state: "visible" });
    await expect(this.page.getByText('Card Number')).toBeVisible();
    await expect(this.page.getByText('Expiration Date:')).toBeVisible();
  }

  async selectNewCardButton() {
    const button = await this.page.waitForSelector('button[value="newCreditCard"]');
    await button.click();
  }

  // async paypalPayment(paypalID, password) {
  //   await this.checkoutpaypaloption.click();
  //   await this.paypalpageheader.waitFor({ state: 'visible' });
  //   await this.paypalemailplaceholder.fill(paypalID);
  //   await this.paypalnextbutton.click();
  //   await this.paypalpassword.fill(password);
  //   await this.paypalloginbutton.click();
  //   await this.submitpaypalbutton.waitFor({ state: 'visible' });
  //   await this.submitpaypalbutton.click();
  //   await this.paypalpaymentmethod.waitFor({ state: 'visible' });

  // }

  async paypalPayment(paypalID, password) {
    // Check if the 'Place Order' button is visible
    const placeOrderButtonVisible = await this.page.getByRole('button', { name: 'Place Order' }).first().isVisible();

    // If 'Place Order' button is visible, click it and return from the function
    if (placeOrderButtonVisible) {
      await this.page.getByRole('button', { name: 'Place Order' }).first().click();
      console.log('Place Order button clicked');
      return; // Exit the function after clicking 'Place Order'
    }

    // If 'Place Order' button is not visible, proceed with PayPal payment flow
    await this.checkoutpaypaloption.click();
    //await this.paypalpageheader.waitFor({ state: 'visible' });
    await this.paypalemailplaceholder.fill(paypalID);
    await this.paypalnextbutton.click();
    await this.paypalpassword.fill(password);
    await this.paypalloginbutton.click();
    await this.submitpaypalbutton.waitFor({ state: 'visible' });
    await this.submitpaypalbutton.click();
    await this.paypalpaymentmethod.waitFor({ state: 'visible' });

    console.log('PayPal payment completed');
  }



}
