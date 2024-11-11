import test, { expect } from 'playwright/test';
const myaccountpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

exports.MyAccountMakePaymentPage = class MyAccountMakePaymentPage {
    constructor(page) {
        this.page = page;
        this.noWishListMessage = page.getByText(accountpage_data.myaccount_no_wishlist_message);
        this.newCCRadioButton = page.locator('button[id="new-card"]');
        this.savedCCRadioButton = page.locator('button[id="saved-card"]');
        this.comboBox=page.locator('button[role="combobox"]');
        this.myaccount_cc_cardnumber_textbox = page.getByLabel(myaccountpage_locator.myaccount_cc_cardnumber_textbox);
        this.myaccount_cc_expirydate_textbox = page.getByLabel(myaccountpage_locator.myaccount_cc_expirydate_textbox);
        this.myaccount_cc_securitycode_textbox = page.getByLabel(myaccountpage_locator.myaccount_cc_securitycode_textbox);
        this.securitycodetooltip = page.locator('form').filter({ hasText: myaccountpage_locator.myaccount_cc_cardnumber_textbox }).getByLabel('tooltip');
        this.saveNewCard = page.locator('section').filter({ hasText: new RegExp(myaccountpage_locator.makepayment_newCC_saveCard) });
        this.billingAddressHeader = page.getByText(myaccountpage_locator.makepayment_billingAddress);
        this.makepayment_newAddress = page.locator('section').filter({ hasText: new RegExp(myaccountpage_locator.makepayment_newAddress) });
        this.makepayment_newaddress_fname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_firstname);
        this.makepayment_newaddress_lname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_lastname);
        this.makepayment_newaddress_address1 = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_addressline1);
        this.makepayment_newaddress_address2 = page.getByRole('button', { name: myaccountpage_locator.makepayment_newAddress_address2 });
        this.makepayment_addnewaddress_city = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_city);
        this.makepayment_newAddress_state = page.locator(myaccountpage_locator.makepayment_newAddress_state);
        this.makepayment_addnewaddress_zipcode = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_zipcode);
        this.makepayment_addnewaddress_phonenumber = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_phonenumber);
        this.makepayment_combobox = page.getByRole(myaccountpage_locator.makepayment_combobox);
        this.otherAmountRadioButton = page.locator('button[id="otheramountRadio"]');
        this.otherAmountTextBox=page.locator('input[id="otherAmount"]');
    }



    async validateMakeaPaymentPage() {
        await expect(this.page).toHaveURL(/.*payment/);
    }


    async validateNewCreditCardRadioButton() {
        await this.newCCRadioButton.waitFor({state:'visible'});
        await expect(this.newCCRadioButton).toBeVisible();
    }

    async validateSavedCreditCardRadioButton() {
        await this.savedCCRadioButton.waitFor({state:'visible'});
        await expect(this.savedCCRadioButton).toBeVisible();
    }

    async addNewCreditCard() {
        await this.page.getByLabel(myaccountpage_locator.makepayment_addnewcc).click();
    }

    async validateNewCreditCardModal() {
        await expect(this.myaccount_cc_cardnumber_textbox).toBeVisible();
        await expect(this.myaccount_cc_expirydate_textbox).toBeVisible();
        await expect(this.myaccount_cc_securitycode_textbox).toBeVisible();
        await expect(this.securitycodetooltip).toBeVisible();
        await expect(this.saveNewCard).toBeVisible();
    }

    async validateSecurityCodeTooltiphover() {
        await this.securitycodetooltip.click();
        await expect(this.page.getByText(accountpage_data.makepayment_securitycode_text1, { exact: true }).first()).toBeVisible();
        await expect(this.page.getByText(accountpage_data.makepayment_securitycode_text2).first()).toBeVisible();
        await expect(this.page.getByText(accountpage_data.makepayment_securitycode_text3).first()).toBeVisible();
        await expect(this.page.getByText(accountpage_data.makepayment_securitycode_text4).first()).toBeVisible();
    }

    async validateBillingAddressRadioButtons() {
        await expect(this.billingAddressHeader).toBeVisible();
        await expect(this.makepayment_newAddress).toBeVisible();
        await expect(this.page.locator('section').filter({ hasText: new RegExp(myaccountpage_locator.makepayment_savedAddress) })).toBeVisible();
    }

    async addNewAddress() {
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.myaccount_savecc_newaddressradiobutton })).toBeVisible();
        await this.page.locator(myaccountpage_locator.makepayment_newaddress_button).click();
    }

    async validateNewAddressModal() {
        await expect(this.makepayment_newaddress_fname).toBeVisible();
        await expect(this.makepayment_newaddress_lname).toBeVisible();
        await expect(this.makepayment_newaddress_address1).toBeVisible();
        await expect(this.makepayment_newaddress_address2).toBeVisible();
        await expect(this.makepayment_addnewaddress_city).toBeVisible();
        await expect(this.makepayment_newAddress_state).toBeVisible();
        await expect(this.makepayment_addnewaddress_zipcode).toBeVisible();
        await expect(this.makepayment_addnewaddress_phonenumber).toBeVisible();
    }

    //if there is an address added
    async validateSavedAddressisSelectedbyDefault() {
        // Check if the "Saved address" radio button is present and selected by default
        const addressExists = await this.page.$(myaccountpage_locator.makepayment_savedaddress_button);
        const isSelected = addressExists && await this.page.isChecked(myaccountpage_locator.makepayment_savedaddress_button);
        expect(isSelected).toBe(true);
    }

    async validateSavedAddressComboBox() {
        // Wait for the combobox to be visible and click it
        await expect(this.makepayment_combobox).toBeVisible();
        await this.makepayment_combobox.click();
        await this.selectComboBoxValue(/.+/);
        //await this.page.locator('button[role="combobox"] span:has-text("dev testing")').click();
        // // Click on the first visible option in the dropdown
        // const firstOption = await this.page.locator('div:has-text("BlackBox")').first();
        // //Use JavaScript to click the element if direct clicking fails
        // await this.page.evaluate(element => element.click(), await firstOption.elementHandle());
    }

    // Function to select a value from the dropdown
    async selectComboBoxValue(valueToSelect) {
        const dropdownOptionSelector = 'button[role="combobox"] span';
        const options = await this.page.$$eval(dropdownOptionSelector, (elements, valueToSelect) => {
            return elements.filter(element => element.textContent.trim() === valueToSelect);
        }, valueToSelect);

        if (options.length > 0) {
            // Click on the first matching option
            await options[0].click();
            console.log(`Selected option: ${valueToSelect}`);
        } else {
            console.log(`Option '${valueToSelect}' not found`);
        }
    }

    async validateSavedAddressList() {
        // Verify that all saved addresses are listed by first and last name
        const savedAddresses = await this.page.locator('div:has-text("Milan")').allTextContents(); // Adjust the selector to match your saved addresses container
        console.log(savedAddresses);
        const allAddressesListed = savedAddresses.every(address => /[A-Za-z]+\s[A-Za-z]+/.test(address));
        console.log(allAddressesListed ? 'All saved addresses are listed by first and last name.' : 'Not all saved addresses are listed by first and last name.');
        // Get the text content of the button
        const buttonText = await this.page.$eval('button[role="' + myaccountpage_locator.makepayment_combobox + '"]', button => button.textContent);
        expect(this.page.locator('p').filter({ hasText: buttonText })).toBeVisible();

    }

    //if there is a credit/debit card added
    async validateSavedCCisSelectedbyDefault() {
        //const savedCCSelected = await this.page.$(myaccountpage_locator.makepayment_savedcard_button);
        const savedCCSelected = await this.savedCCRadioButton.locator('span').getAttribute('data-state');
        //const isSelected = await this.page.isChecked(myaccountpage_locator.makepayment_savedcard_button);
        expect(savedCCSelected).toBe('checked');
    }


    async validateSavedCCDropDownField() {
        // Select the dropdown button and click to open it
        const dropdownButton = this.page.locator('button[role="' + myaccountpage_locator.makepayment_combobox + '"]');
        await dropdownButton.click();

        // Wait for the dropdown content to be visible
        const creditCardInfo = await dropdownButton.textContent();

        // Define the expected pattern (****1234)
        const creditCardPattern = /\*\*\*\*[0-9]{4}/;

        // Verify the captured text matches the expected pattern
        expect(creditCardInfo).toMatch(creditCardPattern);
    }


    async clickAnOptionFromSavedCCList() {
        await this.makepayment_combobox.waitFor({state:'visible'});
        // Wait for the dropdown content to be visible
        await this.page.waitForSelector(myaccountpage_locator.makepayment_ccDropdownList);

        // Count the elements in the dropdown
        const dropdownItems = this.page.locator(myaccountpage_locator.makepayment_ccDropdownList);
        const itemCount = await dropdownItems.count();
        console.log(itemCount);

        // Ensure there is at least one item to select
        expect(itemCount).toBeGreaterThan(0);
        // Randomly select one of the items
        const randomIndex = Math.floor(Math.random() * itemCount);
        const selectedItem = dropdownItems.nth(randomIndex);
        // Optionally, click the selected item
        const comboboxstate = await this.makepayment_combobox.getAttribute('data-state');
        console.log('combobox state' + comboboxstate);
        await this.makepayment_combobox.click();
        await this.page.locator('button[role="combobox"] span div div').click();
        //await dropdownItems.first().click();
        //await selectedItem.press('Tab');
    }

    // async  selectComboBoxValue(valueToSelect) {
    //     // Click the combo box button to open the dropdown
    //     await this.combobox.click();
    
    //     // Wait for the dropdown items to appear
    //     const dropdownItemSelector = 'button[role="combobox"] span div'; // Adjust this selector based on your actual DOM structure
    //     await page.waitForSelector(dropdownItemSelector);
    
    //     // Find all dropdown items
    //     const options = await page.$$eval(dropdownItemSelector, (elements, valueToSelect) => {
    //         return elements.filter(element => element.textContent.trim().includes(valueToSelect));
    //     }, valueToSelect);
    
    //     if (options.length > 0) {
    //         // Click on the first matching option
    //         await options[0].click();
    //         console.log(`Selected option: ${valueToSelect}`);
    //     } else {
    //         console.log(`Option '${valueToSelect}' not found`);
    //     }
    // }

    async validateEditCardlink() {
        await expect(this.page.getByRole('button', { name: 'Edit Card' })).toBeVisible();
    }

    async validateCardDetailOnPage() {
        const creditCardText = await this.page.locator('p').filter({ hasText: '****' }).innerText();
        const creditCardRegex = /^(\*{4})\d{4}$/;
        expect(creditCardText).toMatch(creditCardRegex);
    }

    async validateExpiryDetailOnPage() {
        const expiryText = await this.page.getByText(myaccountpage_locator.makepayment_CC_expires).innerText();
        const extractedDate = expiryText.match(/\d{2}\/\d{2}$/)[0];
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        expect(extractedDate).toMatch(expiryRegex);
    }

    async validatePaymentsection() {
        await expect(this.page.locator('label').filter({ hasText: myaccountpage_locator.makepayment_minimumdue })).toBeVisible();
        await expect(this.page.getByText(myaccountpage_locator.makepayment_totalbalance)).toBeVisible();
        await expect(this.page.getByLabel(myaccountpage_locator.makepayment_otheramount)).toBeVisible();
    }

    async validateOtherAmountisEditable() {
        await this.otherAmountRadioButton.click();
        await this.otherAmountTextBox.fill('67');
    }

    async clickOnReviewPayment() {
        await this.page.getByRole('button', { name: myaccountpage_locator.makepayment_review_payment }).click();
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.makepayment_review_payment })).toBeVisible();
    }

    async validateReviewPaymentModal() {
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.makepayment_review_payment })).toBeVisible();
        await expect(this.page.getByLabel(myaccountpage_locator.makepayment_review_payment).getByText(myaccountpage_locator.makepayment_paymentAmount)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.makepayment_paymentMethod })).toBeVisible();
        await expect(this.page.getByLabel(myaccountpage_locator.makepayment_review_payment).getByText(myaccountpage_locator.makepayment_billingAddress)).toBeVisible();
        await expect(this.page.getByRole('button', { name: myaccountpage_locator.makepayment_submitPayment })).toBeVisible();
        await expect(this.page.getByRole('button', { name: myaccountpage_locator.makepayment_editPayment })).toBeVisible();
        await expect(this.page.getByLabel(myaccountpage_locator.makepayment_review_payment).getByText('****')).toBeVisible();
        await expect(this.page.getByLabel(myaccountpage_locator.makepayment_review_payment).getByText(myaccountpage_locator.makepayment_CC_expires)).toBeVisible();
    }

    async validateSubmitPayment() {
        await this.page.getByRole('button', { name: myaccountpage_locator.makepayment_submitPayment }).click();
        //await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*thankyou/);
        // await this.page.goto('https://dev--stoneberry-masoncompanies.netlify.app/account/makepayment/thankyou/');
    }

    async validatePaymentSuccessPage() {
        await expect(this.page.getByRole('heading', { name: accountpage_data.makepayment_thank_message })).toBeVisible();
        await expect(this.page.getByText(accountpage_data.makepayment_success_48h_message)).toBeVisible();
        await expect(this.page.getByText(accountpage_data.makepayment_payment_confirm)).toBeVisible();
        await expect(this.page.getByText(accountpage_data.makepayment_accountNum)).toBeVisible();
        await expect(this.page.getByRole('heading', { name: accountpage_data.makepayment_payment_info })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.makepayment_paymentMethod })).toBeVisible();
        await expect(this.page.getByText(myaccountpage_locator.makepayment_billingAddress)).toBeVisible();
        await expect(this.page.getByText(myaccountpage_locator.makepayment_paymentAmount)).toBeVisible();
    }

    async editPaymentFromReviewPayment() {
        await this.page.getByRole('button', { name: myaccountpage_locator.makepayment_editPayment }).click();
        await expect(this.newCCRadioButton).toBeVisible();
    }


}