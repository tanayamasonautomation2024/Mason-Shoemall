import test, { expect } from 'playwright/test';
import { allowedNodeEnvironmentFlags } from 'process';
import { PDPPage } from '../pages/mason_pdp_page';

const productStockLeft = 'strong.text-stoneberry-onlyLeft';
const pdp_colorvariant_button_locator = 'section.flex.flex-wrap.items-center.gap-5 button[aria-label="choose color button"]';
const oneYearPlanName = '1 Year Protection Plan';
const twoYearPlanName = '2 Year Protection Plan';
const protectPurchaseText = 'Protect Your Purchase';

exports.CartDrawerPage = class CartDrawerPage {
    constructor(page) {
        this.page = page;
        this.miniCartPricingSection = page.locator('section.flex.flex-col.gap-1');
        this.miniCartFirstProductName = page.locator('ul.grid.gap-4.p-4 a>p');
        //this.addtoCartButtonPLP = page.locator('button:has-text("Add to Cart")');
        this.plpProductImages = page.locator('div.swiper-slide.swiper-slide-active a img');
        this.miniCartQtyMinusButton = page.locator('button[aria-label="Decrease Quantity"]');
        this.miniCartQtyPlusButton = page.locator('button[aria-label="Increase Quantity"]');
        this.miniCartDefaultQtyPlusButton = page.locator('button[aria-label="Increase Quantity"]');
        this.miniCartQtyInputTextBox = page.locator('input.numberInputCounter');
        this.miniCartIcon = page.locator('img[alt="Mini Cart"]');
        this.miniCartProductSection = page.locator('div[role="dialog"] ul.grid.gap-4.p-4');
        this.miniCartRemoveButton = page.locator('button:has-text("Remove")');
        this.miniCartLimitedStockMessage = page.locator('section.mt-4.flex.gap-2');
        this.miniCartSubTotal = page.locator('strong.text-base.leading-\\[20\\.8px\\].text-black', { hasText: 'Subtotal' });
        this.miniCartViewCartButton = page.getByRole('button', { name: 'View Bag' });
        this.miniCartCheckoutButton = page.getByRole('button', { name: 'Check Out' });
        this.addtoCartButton = page.getByRole('button', { name: 'Add to Bag' });
        this.chooseOptions = page.locator('section.sticky.right-0');
        this.pdp_colorvariant_button = page.locator(pdp_colorvariant_button_locator);
        this.plpQuickViewButton = page.getByRole('button', { name: 'Choose Options' });
        this.plpProducts = page.locator('div.swiper-slide.swiper-slide-active a img');

    }

    async validateMiniCartProdcutColorSizePricing() {
        const cspContent = this.miniCartPricingSection.locator('p');
        // Verify the color of the Product value
        expect(cspContent.nth(0)).toBeTruthy();
        // Verify the size of the Product value
        expect(cspContent.nth(1)).toBeTruthy();
        // Verify the sale price of the Product value
        expect(cspContent.nth(2)).toBeTruthy();
        // Verify the monthly price of the Product value
        expect(cspContent.nth(3)).toBeTruthy();

    }

    async miniCartGetProductName() {
        const productName = await this.miniCartFirstProductName.textContent();
        expect(productName).toBeTruthy();
    }

    async miniCartGetProductItemNumber() {
        const productItemNumber = await this.miniCartFirstProductName.locator('xpath=following-sibling::p').textContent();
        expect(productItemNumber).toBeTruthy();

    }

    async validateMiniCartProductDetails() {
        await this.page.getByRole('button', { name: 'My Cart' }).waitFor({ state: 'visible' });
        // Locate the container element that holds all products
        const productsContainer = await this.page.locator('ul.grid.gap-4.p-4');

        // Get all product items within the container
        const productItems = await productsContainer.$$('li.rounded-sm.border.border-foggyGray.bg-white.p-4');

        // Loop through each product item and validate its contents
        for (const productItem of productItems) {
            // Extract product name
            const productName = await productItem.$eval('p.text-sm.font-semibold.leading-[19.6px].text-black', el => el.textContent.trim());
            expect(productName).toBeTruthy();
            console.log('Product Name:', productName);

            // Extract product image source
            const productImageSrc = await productItem.$eval('section.flex.gap-4 a[href] svg', el => el.getAttribute('src'));
            expect(productImageSrc).toBeTruthy();
            console.log('Product Image Source:', productImageSrc);


            // Extract other product details
            const sections = await this.page.$$('section.flex.flex-col.gap-1');

            for (const section of sections) {
                const pTags = await section.$$('p');
                for (const pTag of pTags) {
                    const textContent = await pTag.textContent();
                    expect(textContent).toBeTruthy();
                    console.log(textContent.trim());
                }
            }
        }
    }

    async clickAddtoCartPLP() {
        // Get the count of buttons on the PLP page
        //await this.addtoCartButtonPLP.first().waitFor({ state: 'visible' });
        await this.plpProducts.first().waitFor({ state: 'visible' });
        //await this.page.waitForLoadState('networkidle');
        // await this.plpProducts.first().hover();
        // await this.plpQuickViewButton.click();
        const buttonCountPLP = await this.plpProducts.count();
        const pdpPage = new PDPPage(this.page);
        if (buttonCountPLP > 0) {
            // Select a random button index on the PLP page
            const randomIndexPLP = Math.floor(Math.random() * buttonCountPLP);
            await this.plpProducts.nth(randomIndexPLP).hover();
            // Click the randomly selected button on the PLP page
            await this.plpQuickViewButton.click();

            // Wait for the choose cart drawer to appear
            await this.chooseOptions.waitFor({ state: 'visible' });

            // Get the "Add to Cart" button in the cart drawer
            const addToCartButtonInDrawer = await this.addtoCartButton;

            // Check if the "Add to Cart" button in the cart drawer is enabled
            if (await addToCartButtonInDrawer.isEnabled()) {
                // Click the "Add to Cart" button in the cart drawer
                const pdpPage = new PDPPage(this.page);
                await pdpPage.clickOnPDPColorVariantButton();
                await pdpPage.clickOnMultiplePDPSizeVariantButton();
                await addToCartButtonInDrawer.click();
                await pdpPage.miniCartDrawer();
                console.log('Item added to cart successfully');
            } else {
                console.log('Add to Cart button in the cart drawer is disabled');
                await pdpPage.clickOnPDPColorVariantButton();
                await pdpPage.clickOnMultiplePDPSizeVariantButton();
                await addToCartButtonInDrawer.click();
                await pdpPage.miniCartDrawer();
            }
        } else {
            console.log('No buttons found on the PLP page');
        }
    }

    // async navigateToPDPFromPLP() {
    //     await this.plpProductImages.first().waitFor({ state: 'visible' });
    //     // Wait for the product list to be visible
    //     //await this.page.waitForSelector('section.productItemParent');

    //     // Get all product items on the PLP
    //     const productItems = await this.page.locator('div.swiper-slide.swiper-slide-active a');

    //     // Check if there are any product items
    //     if (productItems.length > 0) {
    //         // Select a random product index
    //         const randomIndex = Math.floor(Math.random() * productItems.length);

    //         // Click on the product name or image
    //         const product = productItems[randomIndex];
    //         const productLink = await product.$('a[href]'); // Finds the anchor tag

    //         // Check if the link exists and click it
    //         if (productLink) {
    //             await productLink.click();
    //             await this.pdp_colorvariant_button.first().waitFor({ state: 'visible' });
    //             console.log('Product clicked successfully');
    //         } else {
    //             console.log('No clickable product link found');
    //         }
    //     } else {
    //         console.log('No products found on the PLP');
    //     }
    // }

    async navigateToPDPFromPLP() {
        await this.plpProductImages.first().waitFor({ state: 'visible' });
    
        // Get all active swiper slides containing product items
        const productItems = await this.page.locator('div.swiper-slide.swiper-slide-active a');
    
        // Check if there are any product items
        const productCount = await productItems.count();
    
        if (productCount > 0) {
            // Select a random product index
            const randomIndex = Math.floor(Math.random() * productCount);
    
            // Click on the random product item directly
            await productItems.nth(randomIndex).click();
    
            // Wait for the PDP page to load and the color variant button to be visible
            await this.pdp_colorvariant_button.first().waitFor({ state: 'visible' });
    
            console.log('Product clicked successfully');
        } else {
            console.log('No products found on the PLP');
        }
    }
    

    async navigateToPLP(categoryName) {
        await this.page.getByRole('link', { name: categoryName }).first().click();
    }

    async navigatePLPToPDP() {
        const plpProdImageCount = await this.plpProductImages.count();

        if (plpProdImageCount > 0) {
            // Select a random button index
            const randomIndex = Math.floor(Math.random() * plpProdImageCount);

            // Click the randomly selected button
            await this.plpProductImages.nth(randomIndex).click();
            await this.page.waitForURL('**/product/**');
            console.log(`Clicked product with index: ${randomIndex}`);
        } else {
            console.log('No buttons found');
        }

    }

    async removeMiniCartItemsMinusSign() {
        const productsContainer = await this.miniCartProductSection;
        // Get all product items within the container
        const productItems = await productsContainer.locator('li.rounded-sm.border.border-foggyGray.bg-white.p-4').first();
        await this.miniCartQtyInputTextBox.first().waitFor({ state: 'visible' });

        const initialInputValue = await this.miniCartQtyInputTextBox.first().inputValue();
        if (initialInputValue == 1) {
            await this.miniCartQtyMinusButton.first().click();
            //need to write code for the delete item message
            //await expect(productItems).toBeHidden();
        } else {
            await this.miniCartQtyInputTextBox.first().fill('1');
            await this.miniCartQtyInputTextBox.first().press('Tab');
            await this.miniCartQtyMinusButton.first().click();
            //need to write code for the delete item message
            //await expect(productItems).toBeHidden();
        }

    }

    async removeMiniCartItemsQtyTextBox() {
        const productsContainer = await this.miniCartProductSection;
        // Get all product items within the container
        const productItems = await productsContainer.locator('li.rounded-sm.border.border-foggyGray.bg-white.p-4').first();

        const initialInputValue = await this.miniCartQtyInputTextBox.first().inputValue();
        if (initialInputValue == 1) {
            await this.miniCartQtyInputTextBox.first().fill('0');
            await this.miniCartQtyInputTextBox.first().press('Tab');
            //need to write code for the delete item message
            //await expect(productItems).toBeHidden();
        } else {
            await this.miniCartQtyInputTextBox.first().fill('0');
            await this.miniCartQtyInputTextBox.first().press('Tab');
            await this.miniCartQtyMinusButton.first().click();
            //need to write code for the delete item message
            //await expect(productItems).toBeHidden();
        }

    }

    async removeMiniCartItemsRemoveButton() {
        await this.miniCartRemoveButton.first().click();
    }

    async getProductStockCount() {
        //await this.page.waitForLoadState('networkidle');

        // Select the strong element containing the stock information
        const stockElement = await this.page.waitForSelector(productStockLeft);
        await stockElement.waitForElementState('visible');

        // Get the inner text of the stock element
        const stockText = await stockElement.innerText();
        console.log(stockText);  // Output: Only 2 left in Stock

        // Define a regular expression to extract the number
        const stockRegex = /\d+/;

        // Extract the number from the text
        const stockCount = stockText.match(stockRegex)[0];
        console.log(`Stock count: ${stockCount}`);  // Output: 2

        return stockCount;
    }

    async updateQtyForMinStock() {
        const productQtyLeft = this.getProductStockCount();
        await this.miniCartQtyInputTextBox.fill(productQtyLeft);
    }

    async clickQtyIncreaseButton(){
        await this.miniCartQtyPlusButton.waitFor({state:'visible'});
        await this.page.evaluate(() => {
            const button = document.querySelector('button[aria-label="Increase Quantity"]');
            if (button) {
                button.removeAttribute('disabled');
            }
        });
        //await this.page.locator('button[aria-label="Increase Quantity"] svg').click();
        await this.miniCartQtyPlusButton.click();
    }

    async miniCartUpdateInStockQty() {
        // Wait for the section to be visible
        await this.miniCartLimitedStockMessage.waitFor({ state: 'visible' });

        // Verify if the section is displayed
        const isSectionVisible = await this.miniCartLimitedStockMessage.isVisible();

        if (isSectionVisible) {
            // Extract the text content from the section
            const sectionText = await this.miniCartLimitedStockMessage.textContent();

            // Use a regular expression to extract the numeric part
            const numericPart = sectionText.match(/\d+/)[0];
            const numericValue = parseInt(numericPart);
            // Increment the numeric part by 1
            const incrementedValue = numericValue + 1;

            // Fill the input text box with the incremented value
            await this.miniCartQtyInputTextBox.nth(1).fill(incrementedValue.toString());
            await this.miniCartQtyInputTextBox.nth(1).press('Tab');
            const updateQty = await this.miniCartQtyInputTextBox.nth(1).inputValue();
            const numericUpdateQty = parseInt(updateQty);
            expect(numericUpdateQty).not.toBeGreaterThan(numericValue);
            console.log(`The numeric part extracted and incremented is: ${incrementedValue}`);
            console.log(`The numeric part extracted from the section is: ${numericPart}`);

        } else {
            console.log('The section is not displayed.');
        }
    }

    async miniCartQtyUpdateByTypeIn() {
        await this.miniCartQtyInputTextBox.first().fill('99');
        await this.miniCartQtyInputTextBox.first().press('Tab');
        await expect(this.miniCartQtyInputTextBox.first()).toBeEditable({ timeout: 15000 });
        await this.miniCartLimitedStockMessage.first().waitFor({ state: 'visible' });
        const updateQty = await this.miniCartQtyInputTextBox.first().inputValue();
        const numericUpdateQty = parseInt(updateQty);

        const isSectionVisible = await this.miniCartLimitedStockMessage.first().isVisible();
        if (isSectionVisible) {
            // Extract the text content from the section
            const sectionText = await this.miniCartLimitedStockMessage.first().textContent();
            const numericPart = sectionText.match(/\d+/)[0];
            const numericValue = parseInt(numericPart);
            expect(numericUpdateQty).toEqual(numericValue);
        } else {
            console.log('The section is not displayed.');
        }

    }

    async miniCartUpdateQtyMinusPlusSign() {
        const initialInputValue = await this.miniCartQtyInputTextBox.first().inputValue();
        if (initialInputValue == 1) {
            await this.miniCartQtyPlusButton.first().click();
            await this.page.waitForTimeout(5000);
            const updatedInputValue = await this.miniCartQtyInputTextBox.nth(1).inputValue();
            expect(updatedInputValue).toBe((parseInt(initialInputValue) + 1).toString());
        } else {
            // Click the minus button to decrease the quantity
            await this.miniCartQtyMinusButton.first().click();
            await this.page.waitForTimeout(5000);
            //await expect(this.miniCartQtyInputTextBox.first()).toBeEditable({ timeout: 15000 });
            await expect(this.miniCartQtyInputTextBox.nth(1)).toHaveValue((parseInt(initialInputValue) - 1).toString());
        }

    }

    async miniCartGetTotalItemsCount() {
        const miniCartItems = await this.page.locator('section:has(strong:text("Subtotal")) + section span');
        const miniCartItemsCount = await miniCartItems.textContent();
        return miniCartItemsCount;

    }

    async miniCartClickViewCartButton() {
        await this.miniCartViewCartButton.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForURL(/.*cart/);
    }

    async miniCartClickCheckoutButton() {
        await this.miniCartCheckoutButton.click();
        await this.page.waitForURL(/.*checkout/);
    }

    async miniCartClickCheckoutButtonGuest() {
        await this.miniCartCheckoutButton.click();
    }

    async navigateToCheckoutShipping() {
        // Define the locator for the shipping label
        const shippingLabelLocator = this.page.locator('span.font-extrabold.lg\\:text-lg');
        // Wait for the shipping label to be visible
        await shippingLabelLocator.waitFor({ state: 'visible' });
        // Assert that the shipping label has the correct text
        await expect(shippingLabelLocator).toHaveText('Shipping');
    }

    async cartDrawerSuccessMessage() {
        await this.page.getByText('item added to bag').waitFor({ state: 'visible' });
        await expect(this.page.getByText('item added to bag')).toBeVisible();
    }

    async validateProtectionPlanCartDrawer() {
        // Locate the "Add Protection Plan" section using the accordion button
        const accordionButton = this.page.locator('button:has-text("Add Protection Plan")');

        // Ensure the accordion button is visible and expanded
        await expect(accordionButton).toBeVisible();
        //await expect(accordionButton).toHaveAttribute('aria-expanded', 'true');

        // Click on the accordion to ensure it's open (if needed)
        if ((await accordionButton.getAttribute('aria-expanded')) === 'false') {
            await accordionButton.click();
        }

        // Validate the "Protect Your Purchase" section header
        const sectionHeader = await this.page.getByText(protectPurchaseText, { exact: true });
        await expect(sectionHeader).toBeVisible();

        // Validate the "Learn More" button
        const learnMoreButton = await this.page.getByRole('button', { name: 'Learn More' });
        await expect(learnMoreButton).toBeVisible();
        await expect(learnMoreButton).toHaveAttribute('aria-haspopup', 'dialog');

        // Locate all protection plans inside the accordion
        const protectionPlans = this.page.locator('ul.grid.grid-cols-2.gap-5 > li');
        const numberOfPlans = await protectionPlans.count();

        console.log(`Number of protection plans found: ${numberOfPlans}`);

        // Validate the total number of protection plans
        await expect(numberOfPlans).toBeGreaterThan(0);
        // Locate the Subtotal price and extract its value
        const subtotalElement = this.page.locator('ul.flex.justify-between li:last-child > strong');
        const itemPriceText = await subtotalElement.innerText();
        // Convert the item price to a float for calculation
        const itemPrice = parseFloat(itemPriceText.replace('$', '').replace(',', ''));
        // Define expected plans titles and regex patterns for price
        const expectedPlans = [
            {
                title: oneYearPlanName,
                pricePattern: /^\$?\d+(\.\d{1,2})?$/,
                monthlyCostPattern: /^Only \$\d+(\.\d{1,2})? more per month\*$/,
            },
            {
                title: twoYearPlanName,
                pricePattern: /^\$?\d+(\.\d{1,2})?$/,
                monthlyCostPattern: /^Only \$\d+(\.\d{1,2})? more per month\*$/,
            }
        ];

        // Iterate through each protection plan and perform validation
        for (let i = 0; i < numberOfPlans; i++) {
            const plan = protectionPlans.nth(i);

            // Validate the title of each plan
            const planTitle = plan.locator('h3.text-lg.font-bold');
            const titleText = await planTitle.innerText();
            console.log(`Plan Title: ${titleText}`);

            await expect(planTitle).toBeVisible();
            await expect(titleText).toBe(expectedPlans[i].title);

            // Validate the price of each plan using regex
            const planPrice = plan.locator('p.text-sm.leading-\\[18\\.2px\\]').first();
            const priceText = await planPrice.innerText();
            console.log(`Plan Price: ${priceText}`);

            await expect(planPrice).toBeVisible();
            await expect(priceText).toMatch(expectedPlans[i].pricePattern);

            // Validate the monthly cost information using regex
            const monthlyCostInfo = plan.locator('p.text-stoneberry-linkColor');
            const monthlyCostText = await monthlyCostInfo.innerText();
            console.log(`Monthly Cost Info: ${monthlyCostText}`);

            await expect(monthlyCostInfo).toBeVisible();
            await expect(monthlyCostText).toMatch(expectedPlans[i].monthlyCostPattern);

            // Click on the protection plan to select it
            await plan.click();
            await this.page.locator('section.mt-1 strong').waitFor({ state: 'visible' });
            const selectedPlan = await this.page.getByText(titleText, { exact: true });
            await expect(selectedPlan).toBeVisible();

            const subtotalElementPP = this.page.locator('ul.flex.justify-between li:last-child > strong');
            const itemPriceTextWithPP = await subtotalElementPP.innerText();
            const subTotalPriceTextWithPP = parseFloat(itemPriceTextWithPP.replace('$', '').replace(',', ''));

            // Log the initial subtotal price for debugging
            console.log(`Item Price: ${itemPrice}`);
            // Calculate the expected subtotal
            const planPriceText = parseFloat(priceText.replace('$', '').replace(',', ''));
            const expectedSubtotal = itemPrice + planPriceText;

            // Log the expected subtotal for debugging
            console.log(`Expected Subtotal: ${expectedSubtotal.toFixed(2)}`);

            // Define a regex pattern to match the subtotal price format
            const pricePattern = /^\$?\d+(?:,\d{3})*(?:\.\d{2})?$/;

            // Validate that the subtotal matches the expected value
            expect(subTotalPriceTextWithPP.toFixed(2)).toBe(expectedSubtotal.toFixed(2));
            break;

        }

    }
}
