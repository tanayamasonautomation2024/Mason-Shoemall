import test, { expect } from 'playwright/test';

const cartProductNameLinkLocator = 'p.text-base.font-bold.leading-\\[20\\.8px\\].text-black';
const cartItemTotalPriceLocator = 'p:has-text("Total Price:") strong';
const cartAvailabilityLocator = 'p:has-text("Availability:") strong';
const cartArrivesByLocator = 'p:has-text("Arrives by") strong';
const cartDeleviringTo = 'section.-ml-1.mt-1.flex p';
const cartEditButton = 'button:has-text("Edit")';
const cartRemoveButton = 'button:has-text("Remove")';
const cartSaveForLaterButton = 'button:has-text("Save for Later")';
const cartMovetoCartButton = 'button:has-text("Move to Bag")';
const cartQtyInputLocator = 'input.numberInputCounter';
const cartEditItemDrawerHeader = 'strong:has-text("Edit Item")';
const cartEditItemDrawerCloseButton = 'section.z-10.flex button';
const pdp_colorvariant_button_locator = 'section.flex.flex-wrap.items-center.gap-5 button[aria-label="choose color button"]';
const pdp_sizevariant_button_locator = 'section.flex.flex-wrap.items-center.gap-2\\.5.pt-4 button.min-w-\\[130px\\]';
const sizechart_button_text = 'Size Chart';
const cartApplyPromoCode = 'Apply Promo Code (optional)';
const cartOrderSummarySubTotal = /^Subtotal\s*\(\d+\s*Items\):\s*$/;
const cartOrderSummaryOrderTotal = 'Order Total:';
const cartOrderSummaryEstShipping = 'Shipping:';
const cartOrderSummaryEstSurcharge = 'Shipping Surcharge:';
const cartOrderSummaryEstSalesTax = 'Estimated Sales Tax:';
const cartNeedHelpFAQ = 'View FAQs:';
const cartNeedHelpChatUs = 'Chat With Us:';
const cartNeedHelpEmailUs = 'Email Us:';
const cartNeedHelpCallUs = 'Call Us Toll-Free:';
const cartNeedHelp = 'Need Help?';

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.cartShoppingCartHeaderText = page.locator('strong', { hasText: 'Shopping Bag' });
        this.cartTotalItems = this.cartShoppingCartHeaderText.locator('xpath=following-sibling::p[1]');
        this.cartOrderTotalText = page.locator('p.text-base.font-normal.leading-\\[22\\.4px\\]', { hasText: 'Order Total' });
        this.cartOrderTotal = this.cartOrderTotalText.locator('xpath=preceding-sibling::strong[1]');
        this.cartProductItems = page.locator('ul.grid.gap-3.p-3 li');
        this.cartSavedForLaterProductItems = page.locator('ul.grid.gap-3.bg-grayLight.p-3.lg\\:gap-3.lg\\:p-5');
        this.cartSavedForLaterProductName = page.locator('section.mb-3.grid p');
        this.productNameLocator = page.locator('h1.text-lg.font-bold.leading-7.lg\\:text-\\[22px\\]');
        this.cartProductNameLocator = page.locator('p.text-base.font-bold.leading-\\[20\\.8px\\].text-black');
        this.reviewsLocator = page.locator('section.flex.items-center.pt-2 p.pl-2\\.5.text-sm.font-normal.leading-5');
        this.linkLocator = page.locator('section.pt-18 a.underline-inset-2.text-sm.font-normal.leading-5.underline');
        this.sizechart_button = page.getByRole('button', { name: sizechart_button_text });
        this.priceSectionLocator = page.locator('section.flex.items-center.gap-x-1.pt-30');
        this.paymentSectionLocator = page.locator('section.flex.items-center.gap-1.pt-5');
        this.creditMessageLocator = page.locator('section.mt-4.py-5');
        //this.qtyMinusButton = page.locator('div.flex > button:nth-child(1)');
        this.qtyMinusButton = page.locator('button[aria-label="Decrease Quantity"]');
        this.qtyPlusButton = page.locator('button[aria-label="Increase Quantity"]');
        //this.qtyPlusButton = page.locator('div.flex > button:nth-child(3)');
        //this.defaultQtyPlusButton = page.locator('div.flex > button:nth-child(2)');
        this.defaultQtyPlusButton = page.locator('button[aria-label="Increase Quantity"]');
        this.qtyInputTextBox = page.locator('input.numberInputCounter');
        this.qtyText = page.getByText('Qty:');
        this.availabilityText = page.getByText('Availability:');
        this.pdp_colorvariant_button = page.locator(pdp_colorvariant_button_locator);
        this.pdp_sizevariant_button = page.locator(pdp_sizevariant_button_locator);
        this.updateCartButton = page.getByRole('button', { name: 'Update Bag' });
        this.cancelUpdateCartButton = page.getByRole('button', { name: 'Cancel' });
        this.removeCartButton = page.getByRole('button', { name: 'Remove' });
        this.cartSuccessMessage = page.locator('p.text-forestGreen.font-medium.leading-6');
        this.cartUndoButton = page.getByRole('button', { name: 'Undo' });
        this.cartSavedForLaterSection = page.locator('section.mb-5.grid');
        this.cartSavedForLaterText = page.locator('section.mb-5.grid strong');
        this.cartSavedForLaterItems = page.locator('section.mb-5.grid p').nth(1);
        this.cartSaveForLaterButton = page.getByRole('button', { name: 'Save for Later' });
        this.cartMoveToCartButton = page.getByRole('button', { name: 'Move to Bag' });
        this.cartRemoveButtonSaveLater = page.locator(`section.mt-4.flex ${cartRemoveButton}`);
        this.cartApplyPromoCodeOption = page.getByRole('button', { name: cartApplyPromoCode });
        this.cartApplyPromoCodeTextBox = page.locator('#promo-code');
        this.cartApplyPromoCodeButton = page.getByRole('button', { name: 'Apply Code' });
        this.cartRemovePromoCodeButton = page.locator('section.mt-5.border-t.border-silverGray button');
        this.cartPromoCodeRedColor = page.locator('p:has-text("Promo code") strong.text-scarletRed');
        this.cartPromoSection = page.locator('mt-5 border-t border-silverGray pt-4');
        this.cartOrderSummary = page.locator('section:has-text("Order Summary")');
        this.prodNameOnPDP = page.locator('section.pb-6.pt-2 h1');

    }

    async cartGetTotalItemsCount() {
        // Extract the text content of the <p> tag
        const cartItemsCount = await this.cartTotalItems.textContent();
        return cartItemsCount;
    }

    async cartGetOrderTotal() {
        const orderTotalStrongText = await this.cartOrderTotal.textContent();
        // Expected order total value
        const dollarAmountPattern = /\$\d{1,3}(,\d{3})*(\.\d{2})?/;
        // Verify that the <strong> tag contains the expected order total
        expect(orderTotalStrongText).toBeTruthy();
        // Print the content to the console for verification
        console.log(`Content of the <strong> tag: ${orderTotalStrongText}`);
    }

    async cartLineItemProductDetails() {
        await this.cartProductItems.first().waitFor({ state: 'visible' });
        // Get the count of product items
        const productCount = await this.cartProductItems.count();
        expect(productCount).toBeGreaterThan(0); // Ensure there is at least one product item

        // Iterate through each product item
        for (let i = 0; i < productCount; i++) {
            const productItem = await this.cartProductItems.nth(i);

            // Verify the product image
            const productImage = productItem.locator('a[href*="/product/"] img').first();
            await expect(productImage).toBeVisible();

            // Verify the product name link and text
            const productNameLink = productItem.locator('a[href*="/product/"]').first();
            await expect(productNameLink).toBeVisible();
            const productNameText = await productNameLink.locator(cartProductNameLinkLocator).textContent();
            expect(productNameText).toBeTruthy();

            // Verify the item number
            const itemNumber = productItem.locator('p:has-text("Item  #:")').first();
            await expect(itemNumber).toBeVisible();
            const itemNumberText = await itemNumber.locator('span:nth-of-type(2)').textContent();
            expect(itemNumberText).toMatch(/\d+/); // Ensure it contains a number

            // Verify the total price
            const totalPrice = productItem.locator(cartItemTotalPriceLocator).first();
            await expect(totalPrice).toBeVisible();
            const totalPriceText = await totalPrice.textContent();
            expect(totalPriceText).toMatch(/\$\d{1,3}(,\d{3})*(\.\d{2})?/); // Match dollar amount format

            // Verify the individual price
            const individualPrice = productItem.locator('p.break-words:has-text("$")').nth(0);
            await expect(individualPrice).toBeVisible();
            const individualPriceText = await individualPrice.textContent();
            expect(individualPriceText).toMatch(/\$\d{1,3}(,\d{3})*(\.\d{2})?/); // Match dollar amount format

            // Verify the availability
            const availability = await productItem.locator(cartAvailabilityLocator).first();
            await expect(availability).toBeVisible();
            const availabilityText = await availability.textContent();
            expect(availabilityText).toBeTruthy();

            // Verify the arrives by
            const arrivesBy = productItem.locator(cartArrivesByLocator).first();
            await expect(arrivesBy).toBeVisible();
            const arriversByText = await arrivesBy.textContent();
            expect(arriversByText).toBeTruthy();

            // Verify the Deleviring To
            const deleviringTo = productItem.locator(cartDeleviringTo).first();
            await expect(deleviringTo).toBeVisible();
            const deleviringToText = await deleviringTo.textContent();
            expect(deleviringToText).toBeTruthy();

            //we will enable this code once we had a confirmation that cart page should display all items size, color etc
            // // Verify the flex flex-col gap-1 section p tag content
            // const flexColSection = productItem.locator('section.flex.flex-col.gap-1');
            // const flexColPTags = flexColSection.locator('p');
            // const flexColPCount = await flexColPTags.count();
            // expect(flexColPCount).toBeGreaterThan(0); // Ensure there is at least one <p> tag

            // for (let j = 0; j < flexColPCount; j++) {
            //     const pTag = await flexColPTags.nth(j);
            //     expect(pTag).toBeVisible(); // Ensure each <p> tag has text content
            //     // const pTagText = await flexColPTags.nth(j).textContent();
            //     // expect(pTagText).toBeTruthy(); // Ensure each <p> tag has text content
            // }

            // Verify the Edit button
            const editButton = productItem.locator(cartEditButton).first();
            await expect(editButton).toBeVisible();

            // Verify the Remove button
            const removeButton = productItem.locator(cartRemoveButton).first();
            await expect(removeButton).toBeVisible();

            // Verify the Save for Later button
            const saveForLaterButton = productItem.locator(cartSaveForLaterButton).first();
            await expect(saveForLaterButton).toBeVisible();
        }
    }

    async cartUpdateQtyPlusMinus() {
        // Locate the first product item
        const firstProductItem = this.cartProductItems.first();
        //await this.page.getByRole('spinbutton').fill('1');

        // Verify initial total price
        const totalPriceLocator = firstProductItem.locator(cartItemTotalPriceLocator).first();
        await expect(totalPriceLocator).toBeVisible();
        const initialTotalPriceText = await totalPriceLocator.textContent();
        const initialTotalPrice = parseFloat(initialTotalPriceText.replace(/[^0-9.-]+/g, ''));

        // Locate the quantity input and plus/minus buttons
        const quantityInput = firstProductItem.locator(cartQtyInputLocator).first();
        const plusButton = firstProductItem.locator('button[aria-label="Increase Quantity"]');
        const minusButton = firstProductItem.locator('button[aria-label="Decrease Quantity"]');

        // Get initial quantity
        const initialQuantity = await quantityInput.inputValue();
        const initialQuantityNumber = parseInt(initialQuantity);

        // Click the plus button
        await plusButton.click();
        await expect(quantityInput).toBeEditable({ timeout: 20000 });

        // Verify the updated total price
        const updatedTotalPriceTextPlus = await totalPriceLocator.textContent();
        const updatedTotalPricePlus = parseFloat(updatedTotalPriceTextPlus.replace(/[^0-9.-]+/g, ''));
        const expectedTotalPricePlus = initialTotalPrice * (initialQuantityNumber + 1) / initialQuantityNumber;
        expect(updatedTotalPricePlus).toBeCloseTo(expectedTotalPricePlus, 2);

        // Click the minus button
        await minusButton.click();
        await expect(quantityInput).toBeEditable({ timeout: 20000 });

        // Verify the updated total price
        const updatedTotalPriceTextMinus = await totalPriceLocator.textContent();
        const updatedTotalPriceMinus = parseFloat(updatedTotalPriceTextMinus.replace(/[^0-9.-]+/g, ''));
        const expectedTotalPriceMinus = initialTotalPrice;
        expect(updatedTotalPriceMinus).toBeCloseTo(expectedTotalPriceMinus, 2);
    }

    async clickCartEditButton() {
        await this.page.locator(cartEditButton).first().click();
        await this.page.locator(cartEditItemDrawerHeader).waitFor({ state: 'visible' });

    }


    async clickCloseCartEditDrawer() {
        await this.page.locator(cartEditItemDrawerCloseButton).click();
    }

    async validateEditCartDrawerProductDetails() {
        // Locate the product name element and extract text content
        await this.productNameLocator.waitFor({ state: 'visible' });
        const productName = await this.productNameLocator.textContent();
        console.log(`Product Name: ${productName}`);

        // Try to locate the reviews element and extract text content
        await this.page.locator('section.flex.gap-x-0\\.5.pl-2\\.5').waitFor({ state: 'visible' });
        let reviewsText = '';
        let noReviewsPresent = false;
        try {
            // Check if "No Reviews" element is present
            if (await this.page.getByText('No Reviews').count() > 0) {
                noReviewsPresent = true;
                console.log('No reviews present for the product.');
            } else {
                // Check if review count element is present
                //reviewsText = await this.page.locator('section.flex.gap-x-0\\.5.pl-2\\.5 >> text=(\\d+ Reviews)').textContent();
                reviewsText = await this.page.getByText('Reviews').textContent();
                console.log(`Reviews: ${reviewsText}`);
            }
        } catch (error) {
            console.log('No reviews element present for the product.');
        }

        // Perform validations
        expect(productName).toBeTruthy(); // Ensure product name is not empty
        if (!noReviewsPresent && reviewsText) {
            expect(reviewsText).toMatch(/\(\d+ Reviews\)/); // Ensure reviews text matches the expected pattern
        }

        const colorButtons = this.pdp_colorvariant_button;
        // Verify that the color buttons are visible
        for (let i = 0; i < await colorButtons.count(); i++) {
            const colorButton = colorButtons.nth(i);
            await expect(colorButton).toBeVisible();
            // const isVisible = await button.isVisible();
            // console.log(`Button ${i + 1} is visible: ${isVisible}`);
        }

        const sizeButtons = this.pdp_sizevariant_button;
        // Verify that the color buttons are visible
        for (let i = 0; i < await sizeButtons.count(); i++) {
            const sizeButton = sizeButtons.nth(i);
            await expect(sizeButton).toBeVisible();
            // const isVisible = await button.isVisible();
            // console.log(`Button ${i + 1} is visible: ${isVisible}`);
        }

        await expect(this.updateCartButton).toBeVisible();
        await expect(this.cancelUpdateCartButton).toBeVisible();

    }

    async clickRemoveCartButton() {
        const removedProdName = await this.getCartFirstItemProductName();
        const removedItemMessage = `${removedProdName} was successfully removed from your Bag`;
        await this.removeCartButton.first().click();
        await this.page.getByText(removedItemMessage).waitFor({ state: 'visible' });
        await expect(this.page.getByText(removedItemMessage)).toBeVisible();

    }

    async getCartFirstItemProductName() {
        await this.cartProductNameLocator.first().waitFor({ state: 'visible' });
        const productName = await this.cartProductNameLocator.first().textContent();
        return productName;
    }

    async getCartSavedForLaterFirstItemProductName() {
        await this.cartSavedForLaterProductItems.first().waitFor({ state: 'visible' });
        const productName = await this.cartSavedForLaterProductName.first().textContent();
        return productName;
    }

    async clickOnSavedForLaterFirstItemProductName() {
        await this.cartSavedForLaterProductItems.first().waitFor({ state: 'visible' });
        await this.cartSavedForLaterProductItems.locator('a').first().click();
        await this.page.waitForURL('**/product/**');
    }

    async validateProductNameByText(productName) {
        expect(await this.prodNameOnPDP.textContent()).toMatch(productName);
    }

    async cartRemoveSuccessMessage(removedMessage) {
        // await this.cartSuccessMessage.nth(1).waitFor({ state: 'visible' });
        // await expect(this.cartSuccessMessage.nth(1)).toContainText(removedMessage);
        await expect(this.page.getByText(removedMessage)).toBeVisible();
        await expect(this.cartUndoButton).toBeVisible();
    }

    async cartSavedForLaterSuccessMessage(savedForLaterMessage) {
        // await this.cartSuccessMessage.nth(1).waitFor({ state: 'visible' });
        // await expect(this.cartSuccessMessage.nth(1)).toContainText(savedForLaterMessage);
        await expect(this.page.getByText(savedForLaterMessage)).toBeVisible();
    }

    async cartMovedToCartSuccessMessage(moveToCartMessage) {
        // await this.cartSuccessMessage.nth(1).waitFor({ state: 'visible' });
        // await expect(this.cartSuccessMessage.nth(1)).toContainText(moveToCartMessage);
        await expect(this.page.getByText(moveToCartMessage)).toBeVisible();
    }

    async cartRemoveSaveForLaterSuccessMessage(removeSaveForLaterMessage) {
        // await this.cartSuccessMessage.nth(1).waitFor({ state: 'visible' });
        // await expect(this.cartSuccessMessage.nth(1)).toContainText(moveToCartMessage);
        await expect(this.page.getByText(removeSaveForLaterMessage)).toBeVisible();
    }

    async clickCartUndoButton() {
        await this.cartUndoButton.click();
        await this.page.waitForTimeout(5000);

    }

    async clickSaveForLaterButton() {
        const saveForLaterProdName = await this.getCartFirstItemProductName();
        const saveForLaterMessage = `${saveForLaterProdName} was successfully saved for later.`;
        await this.cartSaveForLaterButton.first().click();
        await this.page.getByText(saveForLaterMessage).waitFor({ state: 'visible' });
        await expect(this.page.getByText(saveForLaterMessage)).toBeVisible();
    }

    async clickMoveToCartButton() {
        const moveToCartProdName = await this.getCartSavedForLaterFirstItemProductName();
        const moveToCartMessage = `${moveToCartProdName} was successfully moved to your Bag`;
        await this.cartMoveToCartButton.first().click();
        await this.page.getByText(moveToCartMessage).waitFor({ state: 'visible' });
        await expect(this.page.getByText(moveToCartMessage)).toBeVisible();
    }

    async clickOnRemoveButtonSaveLater() {
        const saveForLaterProdName = await this.getCartSavedForLaterFirstItemProductName();
        const saveForLaterItemRemoveMessage = `${saveForLaterProdName} was successfully removed from save for later wishlist.`;
        await this.cartRemoveButtonSaveLater.first().click();
        await this.page.getByText(saveForLaterItemRemoveMessage).waitFor({ state: 'visible' });
        await expect(this.page.getByText(saveForLaterItemRemoveMessage)).toBeVisible();
    }

    async validateUndoCartItems(undoProductCount) {
        await this.cartTotalItems.waitFor({ state: 'visible' });
        expect(await this.cartTotalItems.textContent()).toBe(undoProductCount);
    }

    async cartSavedForLaterLineItemProductDetails() {
        await this.cartSavedForLaterProductItems.first().waitFor({ state: 'visible' });
        // Get the count of product items
        const productCount = await this.cartSavedForLaterProductItems.count();
        expect(productCount).toBeGreaterThan(0); // Ensure there is at least one product item

        // Iterate through each product item
        for (let i = 0; i < productCount; i++) {
            const productItem = await this.cartSavedForLaterProductItems.nth(i);

            // Verify the product image
            const productImage = productItem.locator('a[href*="/product/"] img').first();
            await expect(productImage).toBeVisible();

            // Verify the product name link and text
            const productNameLink = productItem.locator('a[href*="/product/"]').first();
            await expect(productNameLink).toBeVisible();
            const productNameText = await productNameLink.locator(cartProductNameLinkLocator).textContent();
            expect(productNameText).toBeTruthy();

            // Verify the item number
            const itemNumber = productItem.locator('p:has-text("Item  #:")').first();
            await expect(itemNumber).toBeVisible();
            const itemNumberText = await itemNumber.locator('span:nth-of-type(2)').textContent();
            expect(itemNumberText).toMatch(/\d+/); // Ensure it contains a number

            // Verify the total price
            const totalPrice = productItem.locator(cartItemTotalPriceLocator).first();
            await expect(totalPrice).toBeVisible();
            const totalPriceText = await totalPrice.textContent();
            expect(totalPriceText).toMatch(/\$\d{1,3}(,\d{3})*(\.\d{2})?/); // Match dollar amount format

            // Verify the individual price
            const individualPrice = productItem.locator('p.break-words:has-text("$")').nth(0);
            await expect(individualPrice).toBeVisible();
            const individualPriceText = await individualPrice.textContent();
            expect(individualPriceText).toMatch(/\$\d{1,3}(,\d{3})*(\.\d{2})?/); // Match dollar amount format

            // Verify the availability
            const availability = productItem.locator(cartAvailabilityLocator).first();
            await expect(availability).toBeVisible();
            const availabilityText = await availability.textContent();
            expect(availabilityText).toBeTruthy();

            // Verify the arrives by
            const arrivesBy = productItem.locator(cartArrivesByLocator).first();
            await expect(arrivesBy).toBeVisible();
            const arriversByText = await arrivesBy.textContent();
            expect(arriversByText).toBeTruthy();

            // Verify the Deleviring To
            const deleviringTo = productItem.locator(cartDeleviringTo).first();
            await expect(deleviringTo).toBeVisible();
            const deleviringToText = await deleviringTo.textContent();
            expect(deleviringToText).toBeTruthy();

            //we will enable this code once we had a confirmation that cart page should display all items size, color etc
            // // Verify the flex flex-col gap-1 section p tag content
            // const flexColSection = productItem.locator('section.flex.flex-col.gap-1');
            // const flexColPTags = flexColSection.locator('p');
            // const flexColPCount = await flexColPTags.count();
            // expect(flexColPCount).toBeGreaterThan(0); // Ensure there is at least one <p> tag

            // for (let j = 0; j < flexColPCount; j++) {
            //     const pTag = await flexColPTags.nth(j);
            //     expect(pTag).toBeVisible(); // Ensure each <p> tag has text content
            //     // const pTagText = await flexColPTags.nth(j).textContent();
            //     // expect(pTagText).toBeTruthy(); // Ensure each <p> tag has text content
            // }

            // Verify the Remove button
            const removeButton = productItem.locator(cartRemoveButton).first();
            await expect(removeButton).toBeVisible();

            // Verify the Save for Later button
            const moveToCartButton = productItem.locator(cartMovetoCartButton).first();
            await expect(moveToCartButton).toBeVisible();
        }
    }

    async validateCartSaveForLater() {
        const isVisible = await this.cartSavedForLaterSection.isVisible();
        if (isVisible) {
            expect(await this.cartSavedForLaterText.textContent()).toBe('Saved for Later');
            expect(await this.cartSavedForLaterItems).toBeVisible();
            return true;
        } {
            return false;
        }
    }

    async getAddedProdQty() {
        const prodQty = await this.qtyInputTextBox.inputValue();
        return prodQty;
    }

    async clickPlusButton() {
        await this.qtyPlusButton.click();
    }

    async clickUpdateCartButton() {
        await this.updateCartButton.click();

    }

    async validatePromoCode() {
        const promoSection = await this.page.locator('section:has-text("Promo code")').nth(3);
        await promoSection.waitFor({ state: 'visible' });

        // Locate the "Remove" button within the promo section
        const removeButton = await promoSection.locator('button:has-text("Remove")');
        //await this.cartPromoSection.waitFor({ state: 'visible' });
        const isRemoveButtonVisible = await removeButton.isVisible({ timeout: 5000 });
        if (isRemoveButtonVisible) {
            console.log('Remove button is visible, clicking on it...');
            // Click the "Remove" button
            await removeButton.click();
            await this.page.waitForTimeout(10000);
            await expect(this.cartApplyPromoCodeOption).toBeVisible();
            await this.cartApplyPromoCodeOption.click();
            await expect(this.cartApplyPromoCodeTextBox).toBeVisible();
            await expect(this.cartApplyPromoCodeButton).toBeVisible();
        } else {
            console.log('Remove button is not visible, proceeding to the next action...');
            // Proceed to the next action
            await expect(this.cartApplyPromoCodeOption).toBeVisible();
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

    }

    async enterPromoCode(enterCode) {
        await this.cartApplyPromoCodeTextBox.waitFor({ state: 'visible' });
        //await this.cartApplyPromoCodeTextBox.click();
        await this.cartApplyPromoCodeTextBox.fill(enterCode);
    }

    async validateAppliedPromoCodeMessage(message) {
        await expect(this.page.getByText(`Promo code ${message} applied to order`)).toBeVisible();
    }

    async validateAppliedPromoCodeTopMessage(message) {
        await expect(this.page.getByText(`Promo code ${message} has been applied to your order`)).toBeVisible();
    }

    async validateRemovedPromoCodeMessage(message) {
        await expect(this.page.getByText(`Promo code ${message} has been removed from your order`)).toBeVisible();
    }

    async getEnteredPromoCode() {
        const promoCode = await this.cartApplyPromoCodeTextBox.inputValue();
        return promoCode;
    }

    async clickApplyCodeButton() {
        const promoCode = await this.getEnteredPromoCode();
        const promoCodeMessage = `Promo code ${promoCode} applied to order`;
        const promoCodeTopMessage = `Promo code ${promoCode} has been applied to your order`;
        await this.cartApplyPromoCodeButton.click();
        await this.page.getByText(promoCodeTopMessage).waitFor({ state: 'visible' });
        await this.page.getByText(promoCodeMessage).waitFor({ state: 'visible' });
        await expect(this.page.getByText(promoCodeMessage)).toBeVisible();
        await expect(this.page.getByText(promoCodeTopMessage)).toBeVisible();
    }

    async clickPromoCodeOption() {
        // Wait for the promo code section to be visible
        const promoSection = this.page.locator('section:has-text("Promo code")').nth(3);
        await promoSection.waitFor({ state: 'visible' });

        // Locate the "Remove" button within the promo section
        const removeButton = promoSection.locator('button:has-text("Remove")');
        //await this.cartPromoSection.waitFor({ state: 'visible' });
        const isRemoveButtonVisible = await removeButton.isVisible({ timeout: 5000 });
        if (isRemoveButtonVisible) {
            console.log('Remove button is visible, clicking on it...');
            // Click the "Remove" button
            await removeButton.click();
            await this.page.waitForTimeout(10000);
            await this.cartApplyPromoCodeOption.click();
        } else {
            console.log('Remove button is not visible, proceeding to the next action...');
            const isPromoCodeTextBoxVisible = await this.cartApplyPromoCodeTextBox.isVisible();
            if (!isPromoCodeTextBoxVisible) {
                // If not visible, click on the option to reveal it
                await this.cartApplyPromoCodeOption.click();
                // Wait for the promo code text box to become visible
                await this.cartApplyPromoCodeTextBox.waitFor({ state: 'visible' });
            }

        }

    }

    async validatePromoCodeColor() {
        await expect(this.cartPromoCodeRedColor).toBeVisible();
    }

    async getCartTotal() {
        const orderTotal = await this.cartOrderTotal.textContent();
        const productPrice = parseFloat(orderTotal.replace('$', ''));
        return productPrice;
    }

    async clickPromoCodeRemoveButton() {
        await this.cartRemovePromoCodeButton.click();
        await this.page.waitForTimeout(5000);
    }

    async validateOrderSummary() {
        // Define expected labels
        const expectedLabels = [
            cartOrderSummarySubTotal,
            cartOrderSummaryEstShipping,
            cartOrderSummaryEstSalesTax,
            cartOrderSummaryOrderTotal
        ];

        // Check visibility and extract text content for mandatory labels
        for (const label of expectedLabels) {
            await expect(this.page.getByText(label)).toBeVisible();
        }

        // Extract and validate text content for mandatory labels
        const subTotalText = await this.page.getByText(cartOrderSummarySubTotal).locator('..').locator('p:last-child').textContent();
        //const estShippingText = await this.page.getByText(cartOrderSummaryEstShipping).locator('..').locator('p:last-child').textContent();
        const estSalesTaxText = await this.page.getByText(cartOrderSummaryEstSalesTax).locator('..').locator('p:last-child').textContent();
        const orderTotalText = await this.page.getByText(cartOrderSummaryOrderTotal).locator('..').locator('strong:last-child').textContent();

        // Match each value against the currency format regex
        expect(subTotalText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        //expect(estShippingText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        expect(estSalesTaxText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        expect(orderTotalText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);

        // Handle Est. Shipping label
        const estShippingLocator = this.page.getByText(cartOrderSummaryEstShipping).locator('..');

        // Check if the shipping cost is provided as a price or "FREE"
        const isFreeShipping = await estShippingLocator.locator('strong.text-scarletRed').isVisible();

        if (isFreeShipping) {
            const freeShippingText = await estShippingLocator.locator('strong.text-scarletRed').textContent();
            expect(freeShippingText.trim()).toBe('FREE');
        } else {
            const estShippingText = await estShippingLocator.locator('p:last-child').textContent();
            expect(estShippingText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        }

        // Handle optional Est. Surcharge label
        const isSurchargeVisible = await this.page.getByText(cartOrderSummaryEstSurcharge).isVisible();

        if (isSurchargeVisible) {
            const estSurchargeText = await this.page.getByText(cartOrderSummaryEstSurcharge).locator('..').locator('p:last-child').textContent();
            expect(estSurchargeText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        } else {
            console.log('Est. Surcharge label is not visible.');
        }
    }


    async validateNeedHelp() {
        const expectedLabels = [
            cartNeedHelpFAQ,
            cartNeedHelpChatUs,
            cartNeedHelpEmailUs,
            cartNeedHelpCallUs,
            cartNeedHelp
        ];

        // Check visibility for each label
        for (const label of expectedLabels) {
            await this.page.getByText(label).waitFor({ state: 'visible' });
            await expect(this.page.getByText(label)).toBeVisible();
        }

    }





}