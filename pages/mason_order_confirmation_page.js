import test, { expect } from 'playwright/test';

const orderConfirmationOrderSummarySubTotal = 'Subtotal:';
const orderConfirmationOrderSummaryShipping = 'Shipping:';
const orderConfirmationOrderSummaryEstSurcharge = 'Shipping Surcharge:';
const orderConfirmationOrderSummarySalesTax = 'Sales Tax:';
const orderConfirmationOrderSummaryOrderTotal = 'Order Total:';
const tooltipButton = 'button[aria-label="tooltip"]';
const orderConfirmationShippingAddress = 'section.grid.lg\\:grid-cols-2:has-text("Shipping Address")';
const orderConfirmationBillingAddress = 'section.pt-8.md\\:pt-0:has-text("Billing Address")';
const orderConfirmationBillingAddressContactInfo = 'section.pt-8.md\\:pt-0:has-text("Contact Info")';
const orderConfirmationAccountNumber = 'section.mb-9.mt-8.lg\\:mb-6.lg\\:mt-0:has-text("Payment")';
const orderConfirmationShippingSectionText = 'Shipping';
const orderConfirmationShippingSectionAddressText = 'Shipping Address';
const orderConfirmationShippingSectionShippingMethodText = 'Shipping Method';
const orderConfirmationPaymentMethodSection = 'section.flex.w-1\\/2.flex-col.gap-8';
const orderConfirmationProductSection = 'section.w-full.px-4.md\\:max-w-\\[460px\\]';
const orderConfirmationThankYouText = 'Thank you for your order,';
const orderConfirmationThankYouDownPaymentText = 'Thank you for your down payment,';
const orderConfirmationThankYouPendingCreditText = 'Your order has been submitted and is pending credit approval.';
const orderConfirmationThankYouPendingDownPaymentText = 'Your order has been submitted and is pending down payment.';
const orderConfirmationThankYouSuspendedText = 'Your order has been suspended.';
const orderConfirmationEmailText = /A confirmation email was sent to ([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}) with your order information\./;
const orderConfirmationEmailArriveText = 'If the email doesn’t arrive within five minutes, please check your spam folder. If you require further assistance, please Contact Us, and one of our Customer Service Representatives will be happy to help you.';
const orderConfirmationOrderNumber = /Order Confirmation #[A-Z0-9]+/;
const dateRegex = /Placed on\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{2},\s+\d{4}/;
const orderConfirmationPendingApprovalText = 'Your order has been submitted and is pending credit approval.';
const orderConfirmationPendingCreditApprovalText = 'For your security, your Stoneberry® Credit application is pending approval. Your order has been placed successfully, but we will need a few additional days to review and verify the information you provided. If you have any questions, please call us at 1-800-704-5480.';
const items_in_cart_texts = [
    'Items in Your Order',
    'Item in Your Order'
];

const orderConfCreateAccountText = 'Create an account to save time checking out future orders, view your current order status, review past orders, create a wish list, and more!';

exports.OrderConfirmationPage = class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.paymentText = page.getByText('Payment');
        this.cartItems = page.getByText('Items in Order');
        this.orderConfOrderNumber = page.getByText(orderConfirmationOrderNumber);;
        this.orderConfOrderDate = page.locator(`p:has-text(/${dateRegex.source}/)`);
        this.orderConfThankyouText = page.getByText(orderConfirmationThankYouText);
        this.orderConfEmailSent = page.getByText(orderConfirmationEmailText);
        this.orderConfEmailArrive = page.getByText(orderConfirmationEmailArriveText);
        this.orderConfPlaceOnText = page.getByText('Placed on');
        this.orderConfContactUsLink = page.getByRole('link', { name: 'Contact Us' })
        this.orderConfContactUsText = page.getByText('Contact Us');
        this.orderConfPendingApprovalText = page.getByText(orderConfirmationPendingApprovalText);
        this.orderConfPendingCreditApprovalText = page.getByText(orderConfirmationPendingCreditApprovalText);
        this.orderConfPendinApprovalSection = page.locator('p.text-\\[\\#D6A124\\]');
        this.orderConfHeroBanner = page.locator('section.mb-20.mt-6.w-full.md\\:mb-14.md\\:mt-10.md\\:px-4 img');
        this.orderConfCreateAccountHeader = page.locator('span').filter({ hasText: 'Create Account' });
        this.orderConfCreateAccountText = page.getByText(orderConfCreateAccountText);
        this.orderConfCreateAccountEmail = page.getByText('Email Address:');
        this.orderConfCreateAccountEmailID = this.orderConfCreateAccountEmail.locator('xpath=following-sibling::p');
        this.orderConfCreateAccountPassword = page.getByText('*Password');
        this.orderConfCreateAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.orderConfShippingHeaderText = page.getByRole('heading', { name: orderConfirmationShippingSectionText });
        this.orderConfFullWidthBannerImg = page.locator('section.mx-auto.mt-6.md\\:mt-11.max-w-screen-9xl.md\\:px-4 a img');
        this.paypalpaymentmethod = page.locator('image[id="image0_2298_1837"]');

    }

    async checkoutPage() {
        await this.page.getByRole('button', { name: 'Check Out' }).click();
        await this.page.getByRole('button', { name: 'Continue as Guest' }).click();
        await this.page.waitForURL(/.*checkout/);
        await this.page.getByLabel('*First Name').fill('Robert');
        await this.page.getByLabel('*Last Name').fill('Watson');
        await this.page.getByLabel('*Address Line 1').fill('234 Market St');
        await this.page.getByLabel('*City').fill('Onancock');
        await this.page.locator('#state').selectOption('VA');
        await this.page.getByLabel('*Zip Code').fill('23417-4231');
        await this.page.getByLabel('*Phone Number').fill('(243) 233-2432');
        await this.page.getByRole('button', { name: 'Continue to Payment' }).click();
        await this.page.getByLabel('Credit/Debit Card').click();
        await this.page.getByLabel('*Card Number').fill('4012 0000 7777 7777');
        await this.page.getByLabel('*Exp. Date (MM/YY)').fill('12/25');
        await this.page.getByLabel('*Security Code').fill('123');
        const emailID = await this.generateRandomEmail();
        await this.page.getByLabel('*Email Address').fill(emailID);
        await this.page.getByRole('button', { name: 'Continue to Review' }).click();
        await this.page.getByRole('button', { name: 'Place Order' }).first().waitFor({ state: 'visible' });
        await this.page.getByRole('button', { name: 'Place Order' }).first().click();
        await this.page.waitForURL(/.*\/thank-you\/.*/);
        await this.page.getByText('Thank you for your order,').waitFor({ state: 'visible' });
    }

    async generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 11); // Generate a random string of 9 characters
        const domain = 'example.com';
        return `${randomString}@${domain}`;
    }

    async validateOrderConfGuestUserCreateAccount() {
        await expect(this.orderConfCreateAccountHeader).toBeVisible();
        await expect(this.orderConfCreateAccountText).toBeVisible();
        await expect(this.orderConfCreateAccountEmail).toBeVisible();
        expect(await this.orderConfCreateAccountEmailID).toBeTruthy();
        await expect(this.orderConfCreateAccountPassword).toBeVisible();
        await expect(this.orderConfCreateAccountButton).toBeVisible();
    }

    async validateOrderConfThankYouText() {
        const expectedThankYouText = [
            orderConfirmationThankYouText,
            orderConfirmationThankYouDownPaymentText,
            orderConfirmationThankYouPendingCreditText,
            orderConfirmationThankYouSuspendedText,
            orderConfirmationThankYouPendingDownPaymentText
        ];

        // Check if any of the expected texts are visible
        let isAnyTextVisible = false;
        for (const thankyouText of expectedThankYouText) {
            if (await this.page.isVisible(`text=${thankyouText}`)) {
                isAnyTextVisible = true;
                break;
            }
        }
        // Assert that at least one text is visible
        expect(isAnyTextVisible).toBe(true);
    }

    // async validateOrderConfirmationOrderSummary() {
    //     // Define expected labels
    //     const expectedLabels = [
    //         orderConfirmationOrderSummarySubTotal,
    //         orderConfirmationOrderSummaryShipping,
    //         orderConfirmationOrderSummaryEstSurcharge,
    //         orderConfirmationOrderSummarySalesTax,
    //         orderConfirmationOrderSummaryOrderTotal
    //     ];

    //     // Check visibility for each label
    //     for (const label of expectedLabels) {
    //         await expect(this.page.getByText(label)).toBeVisible();
    //     }

    //     // Extract and validate text content
    //     const subTotalText = await this.page.getByText(orderConfirmationOrderSummarySubTotal).locator('..').locator('p:last-child').textContent();
    //     const estShippingText = await this.page.getByText(orderConfirmationOrderSummaryShipping).locator('..').locator('p').textContent();
    //     const estSurchargeText = await this.page.getByText(orderConfirmationOrderSummaryEstSurcharge).locator('..').locator('p').textContent();
    //     const surchargeTooltipButton = this.page.getByText(orderConfirmationOrderSummaryEstSurcharge).locator('..').locator(tooltipButton);
    //     await expect(surchargeTooltipButton).toBeVisible();
    //     const estSalesTaxText = await this.page.getByText(orderConfirmationOrderSummarySalesTax).locator('..').locator('p').textContent();
    //     const salesTaxTooltipButton = this.page.getByText(orderConfirmationOrderSummarySalesTax).locator('..').locator(tooltipButton);
    //     await expect(salesTaxTooltipButton).toBeVisible();
    //     const orderTotalText = await this.page.getByText(orderConfirmationOrderSummaryOrderTotal).locator('..').locator('strong:last-child').textContent();

    //     // Match each value against the currency format regex
    //     expect(subTotalText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
    //     expect(estShippingText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
    //     expect(estSurchargeText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
    //     expect(estSalesTaxText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
    //     expect(orderTotalText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);

    // }

    async validateOrderConfirmationOrderSummary() {
        // Define expected labels
        const expectedLabels = [
            orderConfirmationOrderSummarySubTotal,
            orderConfirmationOrderSummarySalesTax,
            orderConfirmationOrderSummaryOrderTotal
        ];

        // Optional labels
        const optionalLabels = [
            orderConfirmationOrderSummaryShipping,
            orderConfirmationOrderSummaryEstSurcharge
        ];

        // Check visibility for required labels
        for (const label of expectedLabels) {
            await expect(this.page.getByText(label)).toBeVisible();
        }

        // Check visibility for optional labels, if present
        for (const label of optionalLabels) {
            const labelLocator = this.page.getByText(label);
            if (await labelLocator.count() > 0) {
                await expect(labelLocator).toBeVisible();
            }
        }

        // Extract and validate text content
        const subTotalText = await this.page.getByText(orderConfirmationOrderSummarySubTotal).locator('..').locator('p:last-child').textContent();
        const estSalesTaxText = await this.page.getByText(orderConfirmationOrderSummarySalesTax).locator('..').locator('p').textContent();
        const orderTotalText = await this.page.getByText(orderConfirmationOrderSummaryOrderTotal).locator('..').locator('strong:last-child').textContent();

        // Optional text content handling
        let estShippingText = null;
        let estSurchargeText = null;

        if (await this.page.getByText(orderConfirmationOrderSummaryShipping).count() > 0) {
            estShippingText = await this.page
                .getByText(orderConfirmationOrderSummaryShipping)
                .locator('..')
                .locator('p, strong')  // This will select either a <p> or <strong> element
                .textContent();
        }


        if (await this.page.getByText(orderConfirmationOrderSummaryEstSurcharge).count() > 0) {
            estSurchargeText = await this.page.getByText(orderConfirmationOrderSummaryEstSurcharge).locator('..').locator('p').textContent();
            const surchargeTooltipButton = this.page.getByText(orderConfirmationOrderSummaryEstSurcharge).locator('..').locator(tooltipButton);
            await expect(surchargeTooltipButton).toBeVisible();
        }

        // Tooltips validation
        const salesTaxTooltipButton = this.page.getByText(orderConfirmationOrderSummarySalesTax).locator('..').locator(tooltipButton);
        await expect(salesTaxTooltipButton).toBeVisible();

        // Match each value against the currency format regex
        expect(subTotalText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
        expect(estSalesTaxText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
        expect(orderTotalText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);

        if (estShippingText) expect(estShippingText.trim()).toMatch(/^FREE$|^-?\$\d+(\.\d{2})?$/);
        if (estSurchargeText) expect(estSurchargeText.trim()).toMatch(/^-?\$\d+(\.\d{2})?$/);
    }


    async validateOrderConfirmationShippingDetails() {
        //await expect(this.page.getByText(orderConfirmationShippingSectionText, { exact: true })).toBeVisible();
        await expect(this.orderConfShippingHeaderText).toBeVisible();
        await expect(this.page.getByText(orderConfirmationShippingSectionAddressText, { exact: true })).toBeVisible();
        await expect(this.page.getByText(orderConfirmationShippingSectionShippingMethodText, { exact: true })).toBeVisible();
        const shippingAddressSection = this.page.locator(orderConfirmationShippingAddress);

        const shippingAddressText = await shippingAddressSection.locator('p').nth(1).textContent();
        expect(shippingAddressText.trim()).toBeTruthy();

        const shippingMethodText = await shippingAddressSection.locator('p').nth(2).textContent();
        expect(shippingMethodText.trim()).toBeTruthy();

        const shippingMethodValue = await shippingAddressSection.locator('p').nth(3).textContent();
        expect(shippingMethodValue.trim()).toBeTruthy();

        const shippingAddressPhoneNumber = await shippingAddressSection.locator('div.pt-2\\.5').textContent();
        expect(shippingAddressPhoneNumber.trim()).toBeTruthy();


    }

    async validateOrderConfirmationBillingAddress() {
        // Locate the billing address section
        const billingAddressSection = this.page.locator(orderConfirmationBillingAddress);

        // Extract and validate each p tag content within the billing address section
        const billingAddressText = await billingAddressSection.locator('p').nth(0).textContent();
        expect(billingAddressText.trim()).toBeTruthy();

        const billingAddress = await billingAddressSection.locator('p').nth(1).textContent();
        expect(billingAddress.trim()).toBeTruthy();

        const contactInfoText = await billingAddressSection.locator('p').nth(2).textContent();
        expect(contactInfoText.trim()).toBeTruthy();

        const emailText = await billingAddressSection.locator('p').nth(3).textContent();
        expect(emailText.trim()).toBeTruthy();

        const billingAddressPhoneNumber = await billingAddressSection.locator('div.pt-2\\.5').textContent();
        expect(billingAddressPhoneNumber.trim()).toBeTruthy();

    }

    async validateOrderConfirmationPayment() {
        // Locate the Payment section
        const paymentSection = this.page.locator(orderConfirmationPaymentMethodSection);

        // Extract and validate each p tag content within the Payment section
        const paymentMethodText = await paymentSection.locator('p').nth(0).textContent();
        expect(paymentMethodText.trim()).toBeTruthy();

        await expect(paymentSection.locator('svg')).toBeVisible();

        const paymentCardNumberText = await paymentSection.locator('p').nth(1).textContent();
        expect(paymentCardNumberText.trim()).toBeTruthy();

        const paymentCardNumber = await paymentSection.locator('p').nth(2).textContent();
        expect(paymentCardNumber.trim()).toBeTruthy();

        const paymentExpDateText = await paymentSection.locator('p').nth(3).textContent();
        expect(paymentExpDateText.trim()).toBeTruthy();

        const paymentExpDate = await paymentSection.locator('p').nth(4).textContent();
        expect(paymentExpDate.trim()).toBeTruthy();

    }

    async validateOrderConfirmationPaymentPaypal() {
        await expect(this.paypalpaymentmethod).toBeVisible();
    }

    async validateProductSection() {
        // Wait for the first Product section to be visible
        await this.page.locator(orderConfirmationProductSection).first().waitFor({ state: 'visible' });
        for (const text of items_in_cart_texts) {
            try {
                await expect(this.page.getByText(text)).toBeVisible();
                return; // If one text is visible, exit the function
            } catch (error) {
                // Continue checking the next text
            }
        }


        // Loop through each product section
        const productSections = await this.page.locator(orderConfirmationProductSection);
        const totalProducts = await productSections.count();
        for (let i = 0; i < totalProducts; i++) {
            const productSection = productSections.nth(i);

            // Validate all <p> tags
            const pTags = productSection.locator('p');
            const pTagsCount = await pTags.count();
            for (let j = 0; j < pTagsCount; j++) {
                const pText = await pTags.nth(j).textContent();
                expect(pText.trim()).toBeTruthy(); // Ensure each <p> tag has content
                console.log(`Validated <p> tag content: ${pText.trim()}`);
            }

            // Validate product image display
            const productImages = await productSection.locator('section.flex.flex-row section.pt-3 > a img');
            const imageCount = await productImages.count();
            for (let k = 0; k < imageCount; k++) {
                const productImage = productImages.nth(k);
                await expect(productImage).toBeVisible();
                console.log(`Validated product image is visible: ${await productImage.getAttribute('src')}`);
                // Validate product image content (alt attribute)
                const imgAltText = await productImage.getAttribute('alt');
                expect(imgAltText).toBeTruthy();
                console.log(`Validated product image alt text: ${imgAltText}`);
            }

            // Validate contents of the product section
            const productsSection = productSection.locator('pl-3 pt-4');
            const productDetails = productsSection.locator('section > p');
            const productDetailsCount = await productDetails.count();
            for (let k = 0; k < productDetailsCount; k++) {
                const productDetailText = await productDetails.nth(k).textContent();
                expect(productDetailText.trim()).toBeTruthy();
                console.log(`Validated product detail: ${productDetailText.trim()}`);
            }
        }
    }

    async validateOrderConfOrderDetails() {
        await expect(this.orderConfEmailSent).toBeVisible();
        await expect(this.orderConfEmailArrive).toBeVisible();
        await expect(this.orderConfOrderNumber).toBeVisible();
        await this.validateOrderConfPlacedOnDate();
        await this.validateOrderConfThankYouText();
        console.log(await this.orderConfOrderNumber.textContent());
        try {
            await expect(this.orderConfFullWidthBannerImg).toBeVisible();
            console.log('Banner image is visible.');
        } catch (error) {
            console.log('No Banner Available.');
        }
    }
    async validateOrderConfPlacedOnDate() {
        // Wait for the element to be visible
        await this.orderConfPlaceOnText.waitFor({ state: 'visible' });
        // Extract the text content from the element
        const textContent = await this.orderConfPlaceOnText.textContent();
        // Validate the text content against the regex
        const isValidDate = dateRegex.test(textContent);
        // Assert that the date format is valid
        expect(isValidDate).toBe(true);
    }

    async clickOnContactUs() {
        await this.orderConfContactUsLink.first().click();
        await this.page.waitForURL(/.*contact-us/);
        await expect(this.orderConfContactUsText.first()).toBeVisible();

    }

    async validateOrderConfPendingCreditApproval() {
        await expect(this.orderConfPendingApprovalText).toBeVisible();
        const pendingAppText = await this.orderConfPendinApprovalSection.textContent();
        expect(pendingAppText).toBe('Pending Credit Approval');
        await expect(this.orderConfPendingCreditApprovalText).toBeVisible();
    }

    async validatePendingOrderNumber() {
        await expect(this.orderConfPendingApprovalText).toBeVisible();
        await expect(this.orderConfEmailSent).toBeVisible();
        await expect(this.orderConfEmailArrive).toBeVisible();
        await expect(this.orderConfOrderNumber).toBeVisible();
        await this.validateOrderConfPlacedOnDate();
    }

    async validatOrderConfHeroBanner() {
        await expect(this.orderConfHeroBanner).toBeVisible();
    }
}