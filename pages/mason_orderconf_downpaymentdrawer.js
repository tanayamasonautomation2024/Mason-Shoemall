import test, { expect } from 'playwright/test';

exports.OrderConfDownPayment = class OrderConfDownPayment {
    constructor(page) {
        this.page = page;
        this.downPaymentHeaderText = page.getByText('Pending Down Payment', { exact: true });
        this.downPaymentSectionText1 = page.getByText('Keep your order moving!');
        this.downPaymentSectionText2 = page.getByText('We can approve your order right now');
        this.downPaymentSectionText3 = page.getByText('if you make a down payment of:');
        this.downPaymentMakeADownPaymentButton = page.getByRole('button', { name: 'Make a Down Payment' });
        this.downPaymentLearnMoreButton = page.getByRole('button', { name: 'Learn More' });
        this.downPaymentDrawerHeaderText = page.getByRole('heading', { name: 'Make a Down Payment' });
        this.downPaymentDrawerHeaderText2 = page.getByRole('heading', { name: 'Down Payment Amount' });
        this.downPaymentDrawerMinDueLabel = page.getByText('Minimum Due:');
        this.downPaymentDrawerOrderTotalLabel = page.getByText('Order Total:', { exact: true });
        this.downPaymentDrawerOtherAmountTextBox = page.getByText('Other Amount');
        this.downPaymentDrawerOtherAmountRadioButton = page.locator('#otheramountRadio');
        this.downPaymentDrawerOrderTotalRadioButton = page.locator('#orderTotalRadio');
        this.downPaymentDrawerMinDueRadioButton = page.locator('#minimumDueRadio');
        this.downPaymentDrawerPaymentMethodText = page.getByRole('dialog').getByText('Payment Method');
        this.downPaymentDrawerNewCC = page.getByLabel('New Credit/Debit Card');
        this.downPaymentDrawerSavedCC = page.getByText('Saved Credit/Debit Card');
        this.downPaymentDrawerReviewDownPaymentButton = page.getByRole('button', { name: 'Review Down Payment' });
        this.downPaymentDrawerCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.downPaymentDrawerCloseButton = page.locator('button.pl-8.pr-1');
        this.downPaymentDrawerSBImage = page.locator('section.flex.pl-12.pt-5 svg g');
        this.downPaymentMayBeLaterText = page.getByRole('heading', { name: 'Maybe Later' });
        this.downPaymentMayBeLaterButton = page.getByRole('button', { name: 'Maybe Later' });
        this.reviewDownPaymentDrawerHeaderText1 = page.getByRole('heading', { name: 'Review Down Payment' });
        this.reviewDownPaymentDrawerSubmitDownPaymentButton = page.getByRole('button', { name: 'Submit Down Payment' });
        this.reviewDownPaymentDrawerEditDownPaymentButton = page.getByRole('button', { name: 'Edit Down Payment' });
    }

    async validateOrderConfDownPaymentSection() {
        await this.downPaymentHeaderText.waitFor({ state: 'visible' });
        await expect(this.downPaymentHeaderText).toBeVisible();
        await expect(this.downPaymentSectionText1).toBeVisible();
        await expect(this.downPaymentSectionText2.first()).toBeVisible();
        await expect(this.downPaymentSectionText3.first()).toBeVisible();
        await expect(this.downPaymentMakeADownPaymentButton).toBeVisible();
        await expect(this.downPaymentLearnMoreButton).toBeVisible();
    }

    async clickOnMakeADownPaymentButton() {
        await this.downPaymentMakeADownPaymentButton.click();
    }

    async clickOnDownPaymentLearnMoreButton() {
        await this.downPaymentLearnMoreButton.click();
    }

    async clickOnDownPaymentDrawerCancelButton() {
        await this.downPaymentDrawerCancelButton.click();
        await this.validateOrderConfDownPaymentSection();
    }

    async clickOnDownPaymentDrawerReviewDownPaymentButton() {
        await this.downPaymentDrawerReviewDownPaymentButton.click();
    }

    async clickOnDownPaymentDrawerCloseButton() {
        await this.downPaymentDrawerCloseButton.click();
        await this.validateOrderConfDownPaymentSection();
    }

    async clickOnEditReviewPaymentButton() {
        await this.reviewDownPaymentDrawerEditDownPaymentButton.click();
        await this.validateOrderConfDownPaymentDrawer();
    }

    async clickOnSubmitReviewPaymentButton() {
        await this.reviewDownPaymentDrawerSubmitDownPaymentButton.click();
        await this.validateSubmitDownPayment();
    }

    async validateOrderConfDownPaymentDrawer() {
        await this.downPaymentDrawerHeaderText.waitFor({ state: 'visible' });
        await expect(this.downPaymentDrawerSBImage.first()).toBeVisible();
        await expect(this.downPaymentDrawerCloseButton).toBeVisible();
        await expect(this.downPaymentDrawerHeaderText).toBeVisible();
        await expect(this.downPaymentDrawerHeaderText2).toBeVisible();
        await expect(this.downPaymentDrawerMinDueLabel).toBeVisible();
        await expect(this.downPaymentDrawerOrderTotalLabel).toBeVisible();
        await expect(this.downPaymentDrawerOtherAmountTextBox).toBeVisible();
        await expect(this.downPaymentDrawerOtherAmountRadioButton).toBeVisible();
        await expect(this.downPaymentDrawerOrderTotalRadioButton).toBeVisible();
        await expect(this.downPaymentDrawerMinDueRadioButton).toBeVisible();
        await expect(this.downPaymentDrawerPaymentMethodText).toBeVisible();
        await expect(this.downPaymentDrawerNewCC).toBeVisible();
        await expect(this.downPaymentDrawerSavedCC).toBeVisible();
        await expect(this.downPaymentDrawerReviewDownPaymentButton).toBeVisible();
        await expect(this.downPaymentDrawerCancelButton).toBeVisible();
        await this.validateMakeAPaymentDrawerCCAndBillingAddressSection();
    }
    async validateMaybeLaterDrawer() {
        await this.downPaymentMayBeLaterText.waitFor({ state: 'visible' });
        await expect(this.downPaymentDrawerSBImage.first()).toBeVisible();
        await expect(this.downPaymentDrawerCloseButton).toBeVisible();
        await expect(this.downPaymentMayBeLaterText).toBeVisible();
        await expect(this.downPaymentSectionText2.first()).toBeVisible();
        await expect(this.downPaymentSectionText3.nth(1)).toBeVisible();
        await expect(this.downPaymentMakeADownPaymentButton).toBeVisible();
        await expect(this.downPaymentMayBeLaterButton.nth(1)).toBeVisible();
    }

    async clickOnMaybeLaterButton() {
        await this.downPaymentMayBeLaterButton.nth(1).click();
        await this.validateOrderConfDownPaymentSection();
    }

    async validateMakeAPaymentDrawerCCAndBillingAddressSection() {
        // Validate the Combo Button Display
        const comboButton = this.page.locator('button[role="combobox"]');
        await expect(comboButton).toBeVisible();
        await expect(comboButton).toHaveAttribute('aria-expanded', 'false');

        // Validate the Credit Card Display with Image and Details
        const creditCardSection = this.page.locator('section.flex.items-center.gap-x-5.pt-5');
        await expect(creditCardSection).toBeVisible();

        const creditCardLogo = creditCardSection.locator('svg');
        await expect(creditCardLogo).toBeVisible();

        const creditCardNumber = creditCardSection.locator('p.text-base.font-semibold.leading-6.text-black');
        await expect(creditCardNumber).toBeVisible();
        await expect(creditCardNumber).toHaveText(/^\*{4}\d{4}$/); // Pattern for masked card number (e.g., ****7777)

        const expirationDate = creditCardSection.locator('p:has-text("Expires")');
        await expect(expirationDate).toBeVisible();
        await expect(expirationDate).toHaveText(/Expires\s+\d{2}\/\d{2}/); // Pattern for expiration date (e.g., Expires 12/29)

        // Validate the Edit Card Button
        const editCardButton = this.page.locator('button:has-text("Edit Card")');
        await expect(editCardButton).toBeVisible();
        await expect(editCardButton).toBeEnabled();

        // Validate the Billing Address
        const billingAddressSection = this.page.locator('section.ml-6.pt-9');
        await expect(billingAddressSection).toBeVisible();

        // Billing Name
        const billingName = billingAddressSection.locator('p').nth(0);
        await expect(billingName).toBeVisible();
        await expect(billingName).toBeTruthy();

        // Billing Street Address
        const billingStreet = billingAddressSection.locator('p').nth(1);
        await expect(billingStreet).toBeVisible();
        await expect(billingStreet).toBeTruthy();

        // Billing City, State, and ZIP
        const billingCityStateZip = billingAddressSection.locator('p').nth(2);
        await expect(billingCityStateZip).toBeVisible();
        await expect(billingCityStateZip).toBeTruthy();

        // Billing Phone Number
        const billingPhoneNumber = billingAddressSection.locator('p').nth(3);
        await expect(billingPhoneNumber).toBeVisible();
        await expect(billingPhoneNumber).toHaveText(/^\(\d{3}\)\s\d{3}-\d{4}$/); // Pattern for phone number (e.g., (827) 438-4784)

        console.log('All elements are validated successfully.');
    }

    async validateReviewDownPayment() {
        await this.reviewDownPaymentDrawerHeaderText1.waitFor({ state: 'visible' });
        await expect(this.downPaymentDrawerSBImage.first()).toBeVisible();
        await expect(this.reviewDownPaymentDrawerHeaderText1).toBeVisible();
        // Locate the main section containing all the relevant information
        const mainSection = this.page.locator('section.flex-1.overflow-y-auto.pl-5.pt-6');

        // Validate Down Payment Amount
        const downPaymentLabel = mainSection.locator('p:has-text("Down Payment Amount")');
        await expect(downPaymentLabel).toBeVisible();

        const downPaymentAmount = downPaymentLabel.locator('xpath=following-sibling::p[1]');
        await expect(downPaymentAmount).toBeVisible();
        await expect(downPaymentAmount).toHaveText(/^\$\d{1,3}(,\d{3})*(\.\d{2})?$/); // Pattern for dollar amounts (e.g., $100.48)

        // Validate Payment Method
        const paymentMethodLabel = mainSection.locator('p:has-text("Payment Method")');
        await expect(paymentMethodLabel).toBeVisible();

        const creditCardSection = paymentMethodLabel.locator('xpath=following-sibling::section[1]');
        await expect(creditCardSection).toBeVisible();

        // Validate Credit Card Logo
        const creditCardLogo = creditCardSection.locator('svg');
        await expect(creditCardLogo).toBeVisible();

        // Validate Credit Card Number
        const creditCardNumber = creditCardSection.locator('p.text-base.font-semibold.leading-6.text-black');
        await expect(creditCardNumber).toBeVisible();
        await expect(creditCardNumber).toHaveText(/^\*{4}\d{4}$/); // Pattern for masked card number (e.g., ****7777)

        // Validate Credit Card Expiry Date
        const expirationDate = creditCardSection.locator('p:has-text("Expires")');
        await expect(expirationDate).toBeVisible();
        await expect(expirationDate).toHaveText(/Expires\s+\d{2}\/\d{2}/);
        // Validate Billing Address Label
        const billingAddressLabel = mainSection.locator('h2.pt-6.text-lg.font-bold.leading-6');
        await expect(billingAddressLabel).toBeVisible();
        await expect(billingAddressLabel).toHaveText('Billing Address');

        // Validate Billing Address Details
        const billingAddressDetails = mainSection.locator('p.pt-2\\.5.text-base.font-normal.leading-6');

        // Extract the text content of the billing address
        const billingText = await billingAddressDetails.innerText();

        // Split the text by line breaks into an array
        const billingLines = billingText.split('\n').map(line => line.trim());

        // Billing Name
        const billingName = billingLines[0];
        expect(billingName).toBeTruthy();
        // Billing Street Address
        const billingStreet = billingLines[1];
        expect(billingStreet).toBeTruthy();

        // Billing City, State, and ZIP
        const billingCityStateZip = billingLines[2];
        expect(billingCityStateZip).toBeTruthy();

        // Billing Phone Number
        const billingPhoneNumber = billingLines[3];
        expect(billingPhoneNumber).toMatch(/^\(\d{3}\)\s\d{3}-\d{4}$/); // Pattern for phone number
        await expect(this.reviewDownPaymentDrawerSubmitDownPaymentButton).toBeVisible();
        await expect(this.reviewDownPaymentDrawerEditDownPaymentButton).toBeVisible();
        console.log('All validations passed successfully.');
    }

    async validateSubmitDownPayment() {
        await this.page.locator('section.mx-4.flex.gap-x-0.bg-\\[\\#89CDDA33\\].md\\:gap-x-5').waitFor({state:'visible'});
        // Locate the main section
        const mainSection = await this.page.locator('section.mx-4.flex.gap-x-0.bg-\\[\\#89CDDA33\\].md\\:gap-x-5');
        // Validate SVG Image
        const svgImage = mainSection.locator('svg');
        await expect(svgImage).toBeVisible();
        // Validate p tags
        const pTags = mainSection.locator('p');

        // First <p> tag
        const firstP = pTags.nth(0);
        await expect(firstP).toBeVisible();
        await expect(firstP).toHaveText('Congratulations! ');

        // Second <p> tag
        const secondP = pTags.nth(1);
        await expect(secondP).toBeVisible();
        await expect(secondP).toHaveText('Your Stoneberry Account');

        // Third <p> tag
        const thirdP = pTags.nth(2);
        await expect(thirdP).toBeVisible();
        await expect(thirdP).toHaveText(' Order Has Been Approved!');
        // Locate the order confirmation <p> tag using has-text selector
        const orderConfirmation = await this.page.locator('p.text-forestGreen:has-text("Order Confirmation")');
        await expect(orderConfirmation).toBeVisible();
        await expect(orderConfirmation).toBeTruthy();

        console.log('All SVG and p tag text validations passed successfully.');
    }

    async downPaymentDisplay() {
        // Check if the downPaymentHeaderText is visible and return the result
        return await this.downPaymentHeaderText.isVisible();
    }
}