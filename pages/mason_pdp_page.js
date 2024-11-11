import test, { expect } from 'playwright/test';

const pdp_colorvariant_button_locator = 'section.flex.flex-wrap.items-center.gap-5 button[aria-label="choose color button"]';
const pdp_sizevariant_button_locator = 'section.flex.flex-wrap.items-center.gap-2\\.5.pt-4 button';
//const pdp_product_big_image = 'img[data-nimg="1"]';
const pdp_product_big_image = '.group > img:nth-of-type(2)';
const carousel_rightArrowButtonLocator = 'button.absolute.right-4';
const carousel_leftArrowButtonLocator = 'button.absolute.left-4';
const pdp_thumbnail_img = 'div.min-w-0[aria-roledescription="slide"]';
const thumbnailimg_rightArrowButtonLocator = 'button.absolute.right-0';
const thumbnailimg_leftArrowButtonLocator = 'button.absolute.left-0';
const selected_thumbnail_blackborderlocator = 'div.min-w-0[aria-roledescription="slide"] img.border-black';
const sizechart_button_text = 'Size Chart';
const oneYearPlanName = '1 Year Protection Plan';
const twoYearPlanName = '2 Year Protection Plan';
const protectPurchaseText = 'Protect Your Purchase';



exports.PDPPage = class PDPPage {
    constructor(page) {
        this.page = page;
        this.pdp_colorvariant_button = page.locator(pdp_colorvariant_button_locator);
        this.pdp_sizevariant_button = page.locator(pdp_sizevariant_button_locator);
        this.carousel_rightArrowButton = page.locator(carousel_rightArrowButtonLocator);
        this.carousel_leftArrowButton = page.locator(carousel_leftArrowButtonLocator);
        this.thumbnail_image = page.locator(pdp_thumbnail_img);
        this.thumbnailimg_rightArrowButton = page.locator(thumbnailimg_rightArrowButtonLocator);
        this.thumbnailimg_leftArrowButton = page.locator(thumbnailimg_leftArrowButtonLocator);
        this.selected_thumbnail_blackborder = page.locator(selected_thumbnail_blackborderlocator);
        this.productNameLocator = page.locator('h1.text-lg.font-bold.leading-7.lg\\:text-\\[22px\\]');
        //this.reviewsLocator = page.locator('section.flex.items-center.pt-2 p.pl-2\\.5.text-sm.font-normal.leading-5');
        this.reviewsLocator = page.locator('section.flex.items-center.pt-2 p.text-sm.font-normal.leading-5').nth(1);
        this.linkLocator = page.locator('section.pt-18 a.underline-inset-2.text-sm.font-normal.leading-5.underline');
        this.sizechart_button = page.getByRole('button', { name: sizechart_button_text });
        this.priceSectionLocator = page.locator('section.flex.items-center.gap-x-1.pt-30');
        this.paymentSectionLocator = page.locator('section.flex.gap-1.pt-5');
        this.creditMessageLocator = page.locator('section.mt-4.py-5');
        // this.qtyMinusButton = page.locator('button[aria-label="Decrease Quantity"]');
        // this.qtyPlusButton = page.locator('button[aria-label="Increase Quantity"]');
        // this.defaultQtyPlusButton = page.locator('button[aria-label="Increase Quantity"]');
        this.qtyMinusButton = page.locator('.whitespace-nowrap').first();
        this.qtyPlusButton = page.getByRole('button', { name: '+' });
        this.defaultQtyPlusButton = page.locator('div.flex > button:nth-child(3)').first();
        this.qtyInputTextBox = page.locator('input.numberInputCounter');
        this.qtyText = page.getByText('Qty:');
        this.availabilityText = page.getByText('Availability:');
        this.addtoCartButton = page.getByRole('button', { name: 'Add to Bag' });
        this.addtoWishListButton = page.getByRole('button', { name: 'Add to Wish List' });
        this.miniCartHeaderText = page.getByRole('button', { name: 'My Bag' });
        this.miniCart = page.locator('img[alt="Mini Cart"]');
        this.personalizeButton = page.getByRole('button', { name: 'Personalize' });
        this.personalizeGiftLink = page.frameLocator('#artifiPersonalization iframe').getByRole('link', { name: 'Personalize this Gift' });
        this.personalizationParagraph = page.frameLocator('#artifiPersonalization iframe').getByRole('paragraph');
        this.personalizationTextBox = page.frameLocator('#artifiPersonalization iframe').getByPlaceholder('Placeholder Text');
        this.personalizationLabel = page.frameLocator('#artifiPersonalization iframe').locator('#text-controls').getByText('Name');
        this.personalizationAddtoCartButton = page.frameLocator('#artifiPersonalization iframe').getByRole('button', { name: ' Add To Cart' });
        this.miniCartPersonalizationText = page.getByText('Personalization:');

    }

    async clickOnPDPColorVariantButton() {
        await this.pdp_colorvariant_button.first().waitFor({ state: 'visible' });
        const selectVariant = await this.pdp_colorvariant_button;
        // Get the count of buttons
        const variantCount = await selectVariant.count();

        if (variantCount > 0) {
            // Select a random button index
            const randomIndex = Math.floor(Math.random() * variantCount);

            // Click the randomly selected button
            await selectVariant.nth(randomIndex).click();
            console.log(`Clicked button with index: ${randomIndex}`);
        } else {
            console.log('No buttons found');
        }
    }

    // async clickOnPDPColorVariantButton() {
    //     await this.pdp_colorvariant_button.first().waitFor({ state: 'visible' });
    //     const selectVariant = await this.pdp_colorvariant_button;

    //     // Get the count of buttons
    //     const variantCount = await selectVariant.count();

    //     if (variantCount > 0) {
    //         let addToCartButtonEnabled = false;

    //         while (!addToCartButtonEnabled) {
    //             // Select a random button index
    //             const randomIndex = Math.floor(Math.random() * variantCount);

    //             // Click the randomly selected button
    //             await selectVariant.nth(randomIndex).click();
    //             console.log(`Clicked button with index: ${randomIndex}`);

    //             // Check if the Add to Cart button is enabled
    //             addToCartButtonEnabled = await this.addtoCartButton.isEnabled();

    //             if (addToCartButtonEnabled) {
    //                 console.log('Add to Cart button is enabled.');
    //                 return; // Exit the function once Add to Cart button is enabled
    //             }
    //         }
    //     } else {
    //         console.log('No buttons found');
    //     }
    // }


    async verifyImageChangesOnVariantSelection() {
        // Step 1: Wait and capture the initial Selected Product Color
        await this.page.waitForSelector(pdp_product_big_image, { state: 'visible' });
        const initialSelectedColor = await this.page.locator('section.text-4.flex strong').first().textContent();
        const initialImageUrl = await this.page.getAttribute(pdp_product_big_image, 'src');
        console.log('Initial Selected Product Color:', initialSelectedColor);

        // Step 2: Get all color variant buttons
        const colorButtons = await this.page.locator('button[aria-label="choose color button"]').all();

        // Find the currently selected button
        const selectedButton = await this.page.locator('button.ring-[3px], button.lg\\:ring-[4px]');

        // Filter out the selected button
        const otherButtons = colorButtons.filter(async button => {
            return await button.evaluate(node => !node.classList.contains('ring-[3px]') && !node.classList.contains('lg:ring-[4px]'));
        });

        // Choose a random button other than the selected one
        const randomIndex = Math.floor(Math.random() * otherButtons.length);
        const newButton = otherButtons[randomIndex];

        // Step 3: Click on the new color variant button
        await newButton.click();
        await this.page.waitForSelector(pdp_product_big_image, { state: 'visible' });

        // Step 5: Capture the new Selected Product Color
        const newSelectedColor = await this.page.locator('section.text-4.flex strong').first().textContent();
        const newImageUrl = await this.page.getAttribute(pdp_product_big_image, 'src');
        console.log('New Selected Product Color:', newSelectedColor);

        // Step 6: Compare the initial and new URLs to verify the change
        expect(initialSelectedColor).not.toBe(newSelectedColor);
    }


    async clickLeftRightCarouselButton() {
        await this.carousel_rightArrowButton.waitFor({ state: 'visible' });
        const initialImageUrl = await this.page.getAttribute(pdp_product_big_image, 'src');
        console.log('Initial Image URL:', initialImageUrl);
        await this.carousel_rightArrowButton.click();
        await this.page.waitForSelector(pdp_product_big_image, { state: 'visible' });
        console.log('Clicked the right arrow button');

        const isLeftArrowVisible = await this.carousel_leftArrowButton.isVisible();
        if (isLeftArrowVisible) {
            // Click the left arrow button if it is visible
            await this.carousel_leftArrowButton.click();
            await this.page.waitForSelector(pdp_product_big_image, { state: 'visible' });
            console.log('Clicked the left arrow button');
            // Capture the new image URL
            const newImageUrl = await this.page.getAttribute(pdp_product_big_image, 'src');
            console.log('New Image URL:', newImageUrl);
            // Compare the initial and new URLs to verify the change
            expect(initialImageUrl).toBe(newImageUrl);

        } else {
            console.log('Left arrow button is not visible');
        }

    }

    async thumbnailImageLeftRightArrowDisplay() {
        await this.thumbnail_image.first().waitFor({ state: 'visible' });
        const selectImageVariant = await this.thumbnail_image;
        // Get the count of thumbnail images
        const imgVariantCount = await selectImageVariant.count();

        if (imgVariantCount > 5) {
            await expect(this.thumbnailimg_rightArrowButton).toBeVisible();
            await this.thumbnailimg_rightArrowButton.click();
            await expect(this.thumbnailimg_leftArrowButton).toBeVisible();
        } else {
            await expect(this.thumbnailimg_rightArrowButton).toBeHidden();
            await expect(this.thumbnailimg_leftArrowButton).toBeHidden();
        }

    }

    async validateThumbnailImageSelection() {
        await this.thumbnail_image.first().waitFor({ state: 'visible' });
        const selectImageVariant = await this.thumbnail_image;
        // Get the count of thumbnail images
        const imgVariantCount = await selectImageVariant.count();

        if (imgVariantCount > 0) {
            // Select a random image index
            const randomIndex = Math.floor(Math.random() * imgVariantCount);

            // Click the randomly selected thumbnail image
            await selectImageVariant.nth(randomIndex).click();
            await expect(this.selected_thumbnail_blackborder).toBeVisible();
            const initialImageUrl = await this.selected_thumbnail_blackborder.getAttribute('src');
            const initialBaseUrl = initialImageUrl.split('?')[0];
            console.log('Initial Image URL:', initialBaseUrl);
            const newImageUrl = await this.page.getAttribute(pdp_product_big_image, 'src');
            const newBaseUrl = newImageUrl.split('?')[0];
            console.log('New Image URL:', newBaseUrl);
            expect(initialBaseUrl).toBe(newBaseUrl);

        } else {
            console.log('No Thumbnail Image Found');
        }
    }

    async validateProductDetails() {
        // Locate the product name element and extract text content
        //const productNameLocator = this.page.locator('h1.text-lg.font-bold.leading-7.lg\\:text-\\[22px\\]');
        await this.productNameLocator.waitFor({ state: 'visible' });
        const productName = await this.productNameLocator.textContent();
        console.log(`Product Name: ${productName}`);

        // Locate the reviews element and extract text content
        //const reviewsLocator = this.page.locator('section.flex.items-center.pt-2 p.pl-2\\.5.text-sm.font-normal.leading-5');
        const reviewsText = await this.reviewsLocator.textContent();
        console.log(`Reviews: ${reviewsText}`);

        // Locate the link element and extract the href attribute and text content
        //const linkLocator = this.page.locator('section.pt-18 a.underline-inset-2.text-sm.font-normal.leading-5.underline');
        const linkHref = await this.linkLocator.getAttribute('href');
        const linkText = await this.linkLocator.textContent();
        const parts = linkText.split(" ");
        const linkTextName = parts.slice(2).join(" ");
        console.log(`Link: ${linkText} - Href: ${linkHref}`);

        // Perform validations
        expect(productName).toBeTruthy(); // Ensure product name is not empty
        expect(reviewsText).toMatch(/\(\d+ Reviews\)|No Reviews/); // Ensure reviews text matches the expected pattern
        expect(linkText).toBe('Shop All ' + linkTextName); // Ensure link text matches expected value
        expect(linkHref).toBeTruthy(); // Ensure link href matches the expected value

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

        await this.sizeChartDisplay();

    }

    async sizeChartDisplay() {
        await expect(this.sizechart_button).toBeVisible();
        await this.sizechart_button.click();
        await this.page.waitForSelector('button[data-state="open"]');
        const button = await this.page.locator('button:has-text("Size Chart")');
        const dataState = await button.getAttribute('data-state');
        expect(dataState).toMatch('open');
    }

    async validateSelectSizeValue() {
        await this.clickOnPDPSizeVariantButton();
        const selectedSizeValue = await this.page.locator('p:has-text("Size") + strong.font-bold').textContent();
        expect(selectedSizeValue).toBeTruthy();

    }

    // async clickOnPDPSizeVariantButton() {
    //     await this.pdp_sizevariant_button.first().waitFor({ state: 'visible' });
    //     const selectSizeVariant = await this.pdp_sizevariant_button;
    //     // Get the count of buttons
    //     const sizeVariantCount = await selectSizeVariant.count();

    //     if (sizeVariantCount > 0) {
    //         let randomIndex;
    //         let isDisabled;

    //         do {
    //             // Select a random button index
    //             randomIndex = Math.floor(Math.random() * sizeVariantCount);
    //             // Check if the button is disabled
    //             isDisabled = await selectSizeVariant.nth(randomIndex).getAttribute('disabled');
    //         } while (isDisabled !== null); // Continue loop if button is disabled

    //         // Click the randomly selected button that is not disabled
    //         await selectSizeVariant.nth(randomIndex).click();
    //         console.log(`Clicked button with index: ${randomIndex}`);
    //     } else {
    //         console.log('No buttons found');
    //     }
    // }

    // async clickOnPDPSizeVariantButton() {
    //     await this.pdp_sizevariant_button.first().waitFor({ state: 'visible' });
    //     const selectSizeVariant = await this.pdp_sizevariant_button;
    //     // Get the count of buttons
    //     const sizeVariantCount = await selectSizeVariant.count();

    //     if (sizeVariantCount > 0) {
    //         let addToCartButtonEnabled = false;

    //         while (!addToCartButtonEnabled) {
    //             // Select a random button index
    //             const randomIndex = Math.floor(Math.random() * sizeVariantCount);

    //             // Click the randomly selected button
    //             await selectSizeVariant.nth(randomIndex).click();
    //             console.log(`Clicked button with index: ${randomIndex}`);

    //             // Check if the Add to Cart button is enabled
    //             addToCartButtonEnabled = await this.addtoCartButton.isEnabled();

    //             if (addToCartButtonEnabled) {
    //                 console.log('Add to Cart button is enabled.');
    //                 return; // Exit the function once Add to Cart button is enabled
    //             }
    //         }
    //     } else {
    //         console.log('No buttons found');
    //     }
    // }

    async selectSize(selectSize, prodQTY) {
        await this.pdp_sizevariant_button.first().waitFor({ state: 'visible' });
        //await this.page.locator(`section.flex.flex-wrap.items-center.gap-2\\.5.pt-4 button:has-text("${selectSize}")`).click();
        await this.page.getByRole('button', { name: selectSize, exact: true }).click();
        await this.page.locator('input.numberInputCounter').fill(prodQTY);
    }

    // async clickOnPDPSizeVariantButton() {
    //     // Wait for the first size variant button to be visible
    //     await this.page.locator('section.pb-6.pt-2').waitFor({ state: 'visible' });
    //     const firstButtonVisible = await this.pdp_sizevariant_button.first().isVisible();
    //     // Initialize sizeVariantCount based on the visibility of the first button
    //     const sizeVariantCount = firstButtonVisible ? await this.pdp_sizevariant_button.count() : 0;

    //     if (sizeVariantCount > 0) {
    //         let addToCartButtonEnabled = false;

    //         while (!addToCartButtonEnabled) {
    //             // Select a random button index
    //             const randomIndex = Math.floor(Math.random() * sizeVariantCount);

    //             // Click the randomly selected button
    //             await this.pdp_sizevariant_button.nth(randomIndex).click();
    //             console.log(`Clicked button with index: ${randomIndex}`);

    //             // Check if the Add to Cart button is enabled
    //             addToCartButtonEnabled = await this.addtoCartButton.isEnabled();

    //             if (addToCartButtonEnabled) {
    //                 console.log('Add to Cart button is enabled.');
    //                 return; // Exit the function once Add to Cart button is enabled
    //             }
    //         }
    //     } else {
    //         console.log('No buttons found');
    //     }
    // }

    async clickOnPDPSizeVariantButton() {
        // Wait for the size variant section to be visible
        await this.page.locator('section.flex.flex-wrap.items-center.gap-2\\.5.pt-4').first().waitFor({ state: 'visible' });

        // Find all enabled size variant buttons
        const enabledButtons = await this.page.locator('section.flex.flex-wrap.items-center.gap-2\\.5.pt-4 button:not([disabled])');

        // Check the count of enabled buttons
        const enabledButtonCount = await enabledButtons.count();

        if (enabledButtonCount > 0) {
            let addToCartButtonEnabled = false;

            while (!addToCartButtonEnabled) {
                // Select a random enabled button
                const randomIndex = Math.floor(Math.random() * enabledButtonCount);

                // Click the randomly selected enabled button
                await enabledButtons.nth(randomIndex).click();
                console.log(`Clicked enabled button with index: ${randomIndex}`);

                // Check if the Add to Cart button is enabled
                addToCartButtonEnabled = await this.addtoCartButton.isEnabled();

                if (addToCartButtonEnabled) {
                    console.log('Add to Cart button is enabled.');
                    return; // Exit the function once the Add to Cart button is enabled
                }
            }
        } else {
            console.log('No enabled buttons found');
        }
    }

    async clickOnMultiplePDPSizeVariantButton() {
        await this.page.waitForTimeout(5000);
        await this.page.locator('section.flex.flex-wrap.items-center.gap-2\\.5.pt-4').first().waitFor({ state: 'visible' });
        // Locate all sections that contain the size variants
        const sections = await this.page.locator('section.flex.flex-wrap.items-center.gap-2\\.5.pt-4');

        // Get the total number of sections
        const sectionCount = await sections.count();

        for (let i = 0; i < sectionCount; i++) {
            // Wait for the current section to be visible
            await sections.nth(i).waitFor({ state: 'visible' });

            // Find all enabled size variant buttons within the current section
            const enabledButtons = await sections.nth(i).locator('button:not([disabled])');

            // Check the count of enabled buttons
            const enabledButtonCount = await enabledButtons.count();

            if (enabledButtonCount > 0) {
                let addToCartButtonEnabled = false;

                while (!addToCartButtonEnabled) {
                    // Select a random enabled button
                    const randomIndex = Math.floor(Math.random() * enabledButtonCount);

                    // Click the randomly selected enabled button
                    await enabledButtons.nth(randomIndex).click();
                    console.log(`Clicked enabled button with index: ${randomIndex} in section: ${i}`);

                    // Check if the Add to Cart button is enabled
                    addToCartButtonEnabled = await this.addtoCartButton.isEnabled();

                    if (addToCartButtonEnabled) {
                        console.log('Add to Cart button is enabled.');
                        return; // Exit the function once the Add to Cart button is enabled
                    }
                }
            } else {
                console.log(`No enabled buttons found in section: ${i}`);
            }
        }

        console.log('No enabled buttons found in any section');
    }



    async validateSelectColorValue() {
        await this.clickOnPDPColorVariantButton();
        const selectedColorValue = await this.page.locator('p:has-text("Color") + strong.font-bold').textContent();
        expect(selectedColorValue).toBeTruthy();

    }

    async validatePricingSection() {
        await this.page.waitForLoadState('networkidle');
        // Define the locator for pricing sections
        await this.page.locator('.flex.items-center.gap-x-1.pt-30').waitFor({ state: 'visible' });
        // Define the locator for pricing sections
        const sections = this.page.locator('.flex.items-center.gap-x-1.pt-30');

        // Get the count of sections
        const sectionCount = await sections.count();

        for (let i = 0; i < sectionCount; i++) {
            const section = sections.nth(i);

            // Attempt to match discounted prices
            const discountedPriceLocator = section.locator('span.text-\\[22px\\]'); // More specific for discounted price
            const originalPriceLocator = section.locator('span.line-through');
            const savingsLocator = section.locator('span:has-text("Save")'); // Target savings by text

            // Use conditional checks based on element presence
            const hasDiscountedPrice = await discountedPriceLocator.count() > 0;
            const hasOriginalPrice = await originalPriceLocator.count() > 0;
            const hasSavings = await savingsLocator.count() > 0;

            if (hasDiscountedPrice && hasOriginalPrice && hasSavings) {
                // Extract values with innerText()
                const discountedPrice = await discountedPriceLocator.first().textContent();
                const originalPrice = await originalPriceLocator.textContent();
                const savings = await savingsLocator.nth(1).textContent();

                // Use regex to parse the price values
                const originalPriceRange = originalPrice.match(/\$([0-9]+\.[0-9]{2})\s*-\s*\$([0-9]+\.[0-9]{2})/);
                const savingsMatch = savings.match(/Save\s*\$([0-9]+\.[0-9]{2})\s*\((\d{1,2}(?:\.\d{1,2})?)%\)/);

                if (originalPriceRange && savingsMatch) {
                    const [_, originalMinPrice, originalMaxPrice] = originalPriceRange;
                    const [__, savingsAmount, savingsPercentage] = savingsMatch;

                    console.log('Discounted Price Section Found:');
                    console.log(`Discounted Price: ${discountedPrice.trim()}`);
                    console.log(`Original Price Range: ${originalMinPrice} - ${originalMaxPrice}`);
                    console.log(`Savings Amount: ${savingsAmount}`);
                    console.log(`Savings Percentage: ${savingsPercentage}%`);
                    console.log('---');
                }
            } else {
                // Check for a normal price
                const normalPriceLocator = section.locator('span.text-black.font-normal');

                if (await normalPriceLocator.count() > 0) {
                    const normalPrice = await normalPriceLocator.innerText();
                    console.log('Normal Price Section Found:');
                    console.log(`Price: ${normalPrice.trim()}`);
                    console.log('---');
                }
            }
        }


        // // Locate the second section and extract its text//Not applicable for Shoemall
        // const orText = await this.paymentSectionLocator.locator('p.inline-block.text-sm.font-normal').first().textContent();
        // const monthlyText = await this.paymentSectionLocator.locator('strong.inline-block.text-lg.font-bold').textContent();
        // const creditText = await this.paymentSectionLocator.locator('p.inline-block.text-sm.font-normal').nth(1).textContent();

        // // Validate the text content of the second section
        // expect(orText.trim()).toMatch('or');
        // expect(monthlyText.trim()).toMatch(/^\$\d{1,3}\.\d{2}\/month\*$/);
        // expect(creditText.trim()).toBeTruthy();
    }

    async validateCreditMessageSection() {
        //await this.page.waitForSelector('section.mt-4.py-5', { state: 'visible' });
        // Check if the section is visible
        const creditMessageVisible = await this.creditMessageLocator.isVisible();
        if (creditMessageVisible) {
            const h1Text = await this.creditMessageLocator.locator('h1.text-2xl.font-extrabold.leading-8').textContent();
            expect(h1Text.trim()).toMatch(/.+?/);
            const pText = await this.creditMessageLocator.locator('p.inline-block.text-base.font-bold.leading-5').textContent();
            expect(pText.trim()).toMatch(/.+?/);
            const aText = await this.creditMessageLocator.locator('a.text-sm.font-normal.leading-5.underline').textContent();
            expect(aText.trim()).toBe('Get Started');
        } else {
            console.log('Credit Message Not Available For This Product');
        }

    }

    async validateDescription() {
        await this.clickOnDescription();
    }

    async clickOnDescription() {
        const desciptionButton = await this.page.locator('button:has-text("Description")');
        const dataState = await desciptionButton.getAttribute('data-state');
        if (dataState === 'open') {
            expect(dataState).toMatch('open');
        } else {
            await desciptionButton.click();
            expect(dataState).toMatch('open');
        }

    }

    async clickOnSpecifications() {
        const specificationsButton = await this.page.locator('button:has-text("Specifications")');
        await specificationsButton.click();
        const dataState = await specificationsButton.getAttribute('data-state');
        expect(dataState).toMatch('open');
    }

    async validateSpecifications() {
        await this.clickOnSpecifications();
    }

    async clickOnShipping() {
        // Check if the "Shipping" button is present
        const shippingButton = await this.page.locator('button:has-text("Shipping")');

        if (await shippingButton.count() > 0) {
            // If the button is present, click it
            await shippingButton.click();

            // Check the 'data-state' attribute after clicking
            const dataState = await shippingButton.getAttribute('data-state');
            expect(dataState).toBe('open');
            console.log('Shipping button clicked and verified');
        } else {
            // Log a message or handle the case when the button is absent
            console.log('Shipping button not found');
        }
    }

    async validateShipping() {
        await this.clickOnShipping();
    }


    async validateShipping() {
        await this.clickOnShipping();
    }

    async validateWaysToWearIt() {
        // Locate all sections within the main section
        const sections = this.page.locator('section.grid.grid-cols-2.gap-5.lg\\:grid-cols-4 > section');

        // Count the total number of sections
        const sectionCount = await sections.count();
        expect(sectionCount).toBe(4); // Ensure there are 4 sections

        // Validate each section's content
        for (let i = 0; i < sectionCount; i++) {
            const section = sections.nth(i);

            // Validate the image with href
            const image = section.locator('a > img');
            await expect(image).toBeVisible();

            // Ensure the href attribute is present
            const href = await image.evaluate(node => node.parentElement.getAttribute('href'));
            expect(href).toBeTruthy();

            // Validate the title text and description
            const title = section.locator('section.py-4.text-center a > strong');
            await expect(title).toBeVisible();

            const description = section.locator('section.py-4.text-center p > a');
            await expect(description).toBeVisible();
        }
    }

    async clickOnReviews() {
        await this.page.locator('button:has-text("Reviews")').click();
    }

    async validateReviews() {
        await this.page.locator('section.flex.flex-wrap.items-center.gap-2\\.5.pt-4').first().waitFor({ state: 'visible' });
        await this.page.locator('button:has-text("Reviews")').waitFor({ state: 'visible' });
        const reviewsButton = await this.page.locator('button:has-text("Reviews")');
        const dataState = await reviewsButton.getAttribute('data-state');
        if (dataState === "closed") {
            await this.clickOnReviews();
            const dataStateAfterClick = await reviewsButton.getAttribute('data-state');
            expect(dataStateAfterClick).toMatch('open');
            await expect(this.page.locator('div[id="pr-reviewdisplay"]')).toBeVisible();
        } else {
            expect(dataState).toMatch('open');
            await expect(this.page.locator('div[id="pr-reviewdisplay"]')).toBeVisible();

        }
    }

    async clickOnQuestionsAnswers() {
        await this.page.locator('button:has-text("Questions & Answers")').click();
    }

    async validateQuestionsAnswers() {
        const qaButton = await this.page.locator('button:has-text("Questions & Answers")');
        const dataState = await qaButton.getAttribute('data-state');
        if (dataState === "closed") {
            await this.clickOnQuestionsAnswers();
            await this.page.locator('div[id="pr-q-a"]').waitFor({ state: 'visible' });
            const dataStateAfterClick = await qaButton.getAttribute('data-state');
            expect(dataStateAfterClick).toMatch('open');
            await expect(this.page.locator('div[id="pr-q-a"]')).toBeVisible();
        } else {
            expect(dataState).toMatch('open');
            await expect(this.page.locator('div[id="pr-q-a"]')).toBeVisible();

        }
    }

    async validateProductQTYSection() {
        await this.qtyText.waitFor({ state: 'visible' });
        await expect(this.qtyText).toBeVisible();
        const initialInputValue = await this.qtyInputTextBox.inputValue();
        if (initialInputValue == 1) {
            //await expect(this.qtyMinusButton).toBeHidden();
            await expect(this.defaultQtyPlusButton).toBeVisible();
        } else {
            await expect(this.qtyMinusButton).toBeVisible();
            await expect(this.qtyPlusButton).toBeVisible();
        }
        await expect(this.qtyInputTextBox).toBeVisible();

    }

    async validateProductAvailabilityMessage() {
        await this.clickOnMultiplePDPSizeVariantButton();
        await this.availabilityText.waitFor({ state: 'visible' });
        await expect(this.availabilityText).toBeVisible();
        // Locate the p element with the text "Availability:"
        const pElement = await this.page.locator('p:has-text("Availability:")');
        // Locate the strong element that follows the p element
        const strongElement = pElement.locator('xpath=following-sibling::strong');
        // Get the text content of the strong element
        const strongText = await strongElement.textContent();
        expect(strongText).toBeTruthy();
    }

    // async validateProductQTYIncreaseDecrease() {
    //     await this.qtyText.waitFor({ state: 'visible' });
    //     // Check if both buttons are disabled    
    //     const isPlusButtonDisabled = await this.page.locator('.whitespace-nowrap').nth(1).isDisabled();
    //     const isMinusButtonDisabled = await this.page.locator('.whitespace-nowrap').first().isDisabled();


    //     // If both buttons are disabled, assert that the quantity cannot be updated
    //     if (isMinusButtonDisabled && isPlusButtonDisabled) {
    //         console.log("Both buttons are disabled. Quantity cannot be updated.");
    //         const initialInputValue = await this.qtyInputTextBox.inputValue();
    //         await this.qtyMinusButton.click(); // Attempt to change the quantity
    //         const updatedMinusValue = await this.qtyInputTextBox.inputValue();
    //         expect(initialInputValue).toBe(updatedMinusValue, 'Quantity should not change when both buttons are disabled');
    //         await this.defaultQtyPlusButton.click(); // Attempt to change the quantity
    //         const updatedPlusValue = await this.qtyInputTextBox.inputValue();
    //         expect(initialInputValue).toBe(updatedPlusValue, 'Quantity should not change when both buttons are disabled');
    //     } else {
    //         // If either button is enabled, update the quantity accordingly
    //         const initialInputValue = await this.qtyInputTextBox.inputValue();

    //         if (!isMinusButtonDisabled) {
    //             // Click the minus button to decrease the quantity
    //             await this.qtyMinusButton.click();
    //             const newValueAfterMinus = await this.qtyInputTextBox.inputValue();
    //             expect(parseInt(newValueAfterMinus)).toBe(parseInt(initialInputValue) - 1, 'Quantity should decrease by 1');
    //         }

    //         if (!isPlusButtonDisabled) {
    //             // Click the plus button to increase the quantity
    //             const updatedInputValue = await this.qtyInputTextBox.inputValue();
    //             await this.defaultQtyPlusButton.click();
    //             const newValueAfterPlus = await this.qtyInputTextBox.inputValue();
    //             expect(parseInt(newValueAfterPlus)).toBe(parseInt(updatedInputValue) + 1, 'Quantity should increase by 1');
    //         }
    //     }

    // }

    async validateProductQTYIncreaseDecrease() {
        await this.qtyText.waitFor({ state: 'visible' });
        await this.clickOnMultiplePDPSizeVariantButton();

        // Check if the Plus button is displayed and enabled
        const isPlusButtonDisplayed = await this.page.locator('.whitespace-nowrap').nth(1).isVisible();
        const isPlusButtonDisabled = isPlusButtonDisplayed ? await this.page.locator('.whitespace-nowrap').nth(1).isDisabled() : true;

        // Check if the Minus button is enabled
        const isMinusButtonDisabled = await this.page.locator('.whitespace-nowrap').first().isDisabled();

        // Get the initial input value
        const initialInputValue = await this.qtyInputTextBox.inputValue();

        // If both buttons are disabled or only the Plus button is displayed but disabled, assert that the quantity cannot be updated
        if (isMinusButtonDisabled && (isPlusButtonDisplayed ? isPlusButtonDisabled : true)) {
            console.log("Both buttons are disabled or only Plus button is displayed but disabled. Quantity cannot be updated.");

            // Attempt to change the quantity and assert no change
            await this.qtyMinusButton.click(); // Attempt to change the quantity
            const updatedMinusValue = await this.qtyInputTextBox.inputValue();
            expect(initialInputValue).toBe(updatedMinusValue, 'Quantity should not change when both buttons are disabled or only Plus button is disabled');

            if (isPlusButtonDisplayed) {
                await this.defaultQtyPlusButton.click(); // Attempt to change the quantity
                const updatedPlusValue = await this.qtyInputTextBox.inputValue();
                expect(parseInt(updatedPlusValue)).toBe(parseInt(initialInputValue) + 1, 'Quantity should increase by 1 when Plus button is clicked');
            }
        } else {
            // If Plus button is enabled and displayed, or Minus button is enabled
            if (!isPlusButtonDisabled) {
                // Click the Plus button to increase the quantity
                await this.defaultQtyPlusButton.click();
                const newValueAfterPlus = await this.qtyInputTextBox.inputValue();
                expect(parseInt(newValueAfterPlus)).toBe(parseInt(initialInputValue) + 1, 'Quantity should increase by 1');
            }

            if (!isMinusButtonDisabled) {
                // Click the Minus button to decrease the quantity
                const updatedInputValue = await this.qtyInputTextBox.inputValue();
                await this.qtyMinusButton.click();
                const newValueAfterMinus = await this.qtyInputTextBox.inputValue();
                expect(parseInt(newValueAfterMinus)).toBe(parseInt(updatedInputValue) - 1, 'Quantity should decrease by 1');
            }
        }
    }


    async validateProductQTYUpdateByTypeIn(enterProductQty) {
        const initialQtyValue = await this.qtyInputTextBox.inputValue();
        await this.qtyInputTextBox.fill(enterProductQty);
        await this.qtyInputTextBox.press('Tab');

        // Verify the new quantity value is set correctly
        const updatedQtyValue = await this.qtyInputTextBox.inputValue();
        expect(updatedQtyValue).toBe(enterProductQty);
    }

    async addtoCart() {
        await this.addtoCartButton.waitFor({ state: 'visible' });
        await this.addtoCartButton.click();
        await this.page.waitForTimeout(7000);

    }

    async addtoWishList() {
        await expect(this.addtoWishListButton).toBeVisible();
        await this.addtoWishListButton.click();

    }

    async miniCartDrawer() {

        await this.miniCartHeaderText.waitFor({ state: 'visible' });
        await expect(this.miniCartHeaderText).toBeVisible();
        await this.page.getByRole('button', { name: 'My Bag' }).waitFor({ state: 'visible' });
        // Locate the container element that holds all products
        const productsContainer = await this.page.locator('ul.grid.gap-4.p-4');

        // Get all product items within the container
        const productItems = await productsContainer.locator('li.rounded-sm.border.border-foggyGray.bg-white.p-4');
        const productItemCount = await productItems.count();
        // Loop through each product item and validate its contents
        for (let i = 0; i < productItemCount; i++) {
            const productItem = productItems.nth(i);
            // Extract product name
            const productName = await productItem.locator('p.text-sm.font-semibold.text-black').textContent();
            expect(productName).toBeTruthy();
            console.log('Product Name:', productName.trim());

            // Check for the image display
            const productImage = await productItem.locator('section.mt-4.flex.gap-4 img');
            //expect(await productImage.isVisible()).toBe(true);
            await expect(productImage).toBeVisible({ timeout: 10000 });
            console.log('Product image is visible');

            // Extract other product details
            const detailSections = await productItem.locator('section.flex.flex-col.gap-1');

            // Count the number of detail sections
            const detailSectionCount = await detailSections.count();

            // Loop through each detail section
            for (let j = 0; j < detailSectionCount; j++) {
                const detailSection = detailSections.nth(j);
                const pTags = detailSection.locator('p');

                // Count the number of <p> tags
                const pTagCount = await pTags.count();

                // Loop through each <p> tag and log its text content
                for (let k = 0; k < pTagCount; k++) {
                    const pTag = pTags.nth(k);
                    const textContent = await pTag.textContent();
                    //expect(textContent).toBeTruthy();
                    console.log('Detail:', textContent.trim());
                }
            }
        }

    }

    async minCartItemCount() {
        //const miniCartCountElement = this.miniCart.locator('xpath=following-sibling::section');
        const miniCartCountElement = this.page.locator('section.mt.absolute');
        // Get the text content of the strong element
        const miniCartCount = await miniCartCountElement.textContent();
        expect(miniCartCount).toBeTruthy();
    }

    async closeMiniCartDrawer() {
        await this.miniCartHeaderText.click();
    }

    async getProductQty() {
        const productQty = this.qtyInputTextBox.inputValue();
        return productQty;

    }

    async getCartItemCount() {
        const cartCountElement = this.page.locator('section.mt.absolute');

        try {
            // Wait for the cart count element to be visible with a timeout of 10 seconds
            await cartCountElement.waitFor({ state: 'visible', timeout: 5000 });
            // If the element is visible, get the text content and return it
            const cartItemsCount = await cartCountElement.textContent();
            return cartItemsCount.trim();
        } catch (error) {
            // If the element is not visible within the timeout, return '0' as the default value
            console.log('Cart count element is not visible:', error);
            return '0';
        }
    }

    async validateSimilarItem() {
        await this.page.waitForSelector('section[id="similarItems"]');
        // Locate the 'Similar Items' section
        const similarItemsSection = this.page.locator('section[id="similarItems"]');

        // Assert that the 'Similar Items' header is present
        const similarItemsHeader = this.page.locator('strong:text("Similar Items")');
        await expect(similarItemsHeader).toBeVisible();

        // Locate all similar item products
        const similarItems = similarItemsSection.locator('.swiper-slide');

        // Count the number of similar items
        const itemCount = await similarItems.count();

        // Log the item count for debugging
        console.log(`Number of similar items: ${itemCount}`);

        // Iterate through each similar item and validate its contents
        for (let i = 0; i < itemCount; i++) {
            const item = similarItems.nth(i);

            // Extract the product title
            const productTitle = await item.locator('h3[class*="min-h-10"]').innerText();
            console.log(`Product Title: ${productTitle}`);

            // Validate the product title is not empty
            await expect(productTitle).not.toBe('');

            // Extract the product link
            const productLink = await item.locator('a[href]').first().getAttribute('href');
            console.log(`Product Link: ${productLink}`);

            // Validate the product link is a valid URL
            await expect(productLink).toMatch(/^\/product\/.+$/);

            // Check if the product has a price (if applicable)
            const priceElement = item.locator('strong[class*="text-[#DF2429]"]');
            if (await priceElement.count() > 0) {
                const price = await priceElement.innerText();
                console.log(`Price: ${price}`);

                // Validate the price format (optional)
                //await expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
                expect(price).toBeTruthy();
            }

            // Validate rating and number of reviews
            const ratingElement = item.locator('section.flex.items-center svg');
            const ratingCount = await ratingElement.count();
            console.log(`Rating Count: ${ratingCount}`);

            // Assert the rating count is within the expected range (e.g., 0 to 5 stars)
            await expect(ratingCount).toBeGreaterThanOrEqual(0);
            await expect(ratingCount).toBeLessThanOrEqual(5);

            // Validate the additional attributes (e.g., product ID)
            const additionalInfo = await item.evaluate((node) => {
                const data = node.querySelector('a')?.getAttribute('href');
                const id = data ? data.split('/')[3] : null;
                return { id };
            });

            // Log the additional information for debugging
            console.log(`Product ID: ${additionalInfo.id}`);

            // Validate the extracted product ID
            await expect(additionalInfo.id).not.toBeNull();
        }
    }

    async validateRecentlyViewedItem() {
        await this.page.waitForSelector('section.auc-Recommend');
        // Locate the 'Similar Items' section
        const similarItemsSection = this.page.locator('section.auc-Recommend');

        // Assert that the 'Similar Items' header is present
        const similarItemsHeader = this.page.locator('strong:text("Recently Viewed")');
        await expect(similarItemsHeader).toBeVisible();

        // Locate all similar item products
        const similarItems = similarItemsSection.locator('.swiper-slide');

        // Count the number of similar items
        const itemCount = await similarItems.count();

        // Log the item count for debugging
        console.log(`Number of similar items: ${itemCount}`);

        // Iterate through each similar item and validate its contents
        for (let i = 0; i < itemCount; i++) {
            const item = similarItems.nth(i);

            // Extract the product title
            const productTitle = await item.locator('p[class*="min-h-10"]').innerText();
            console.log(`Product Title: ${productTitle}`);

            // Validate the product title is not empty
            await expect(productTitle).not.toBe('');

            // Extract the product link
            const productLink = await item.locator('a[href]').first().getAttribute('href');
            console.log(`Product Link: ${productLink}`);

            // Validate the product link is a valid URL
            await expect(productLink).toMatch(/^\/product\/.+$/);

            // Check if the product has a price (if applicable)
            const priceElement = item.locator('strong[class*="text-[#DF2429]"]');
            if (await priceElement.count() > 0) {
                const price = await priceElement.innerText();
                console.log(`Price: ${price}`);

                // Validate the price format (optional)
                await expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
            }

            // Validate rating and number of reviews
            const ratingElement = item.locator('section.flex.items-center svg');
            const ratingCount = await ratingElement.count();
            console.log(`Rating Count: ${ratingCount}`);

            // Assert the rating count is within the expected range (e.g., 0 to 5 stars)
            await expect(ratingCount).toBeGreaterThanOrEqual(0);
            await expect(ratingCount).toBeLessThanOrEqual(5);

            // Validate the additional attributes (e.g., product ID)
            const additionalInfo = await item.evaluate((node) => {
                const data = node.querySelector('a')?.getAttribute('href');
                const id = data ? data.split('/')[3] : null;
                return { id };
            });

            // Log the additional information for debugging
            console.log(`Product ID: ${additionalInfo.id}`);

            // Validate the extracted product ID
            await expect(additionalInfo.id).not.toBeNull();
        }
    }

    async validateProtectionPlanPDP() {
        // Wait for the "Protect Your Purchase" section to be visible
        const protectSection = await this.page.locator('section.rounded-sm');
        await protectSection.waitFor({ state: 'visible' });

        // Verify the "Protect Your Purchase" header
        const header = protectSection.locator('h2.text-22.font-bold');
        await expect(header).toBeVisible();
        await expect(header).toHaveText(protectPurchaseText);

        // Validate the "Learn More" button
        const learnMoreButton = protectSection.locator('button:has-text("Learn More")');
        await expect(learnMoreButton).toBeVisible();
        await expect(learnMoreButton).toHaveAttribute('aria-haspopup', 'dialog');

        // Locate all protection plans
        const protectionPlans = protectSection.locator('ul.grid > div');
        const planCount = await protectionPlans.count();

        console.log(`Number of protection plans available: ${planCount}`);

        // Iterate through each protection plan to validate its content
        for (let i = 0; i < planCount; i++) {
            const plan = protectionPlans.nth(i);

            // Check if the plan's title is visible and not empty
            const planTitle = plan.locator('h2.text-xl.font-bold');
            await expect(planTitle).toBeVisible();
            const planTitleText = await planTitle.innerText();
            await expect(planTitleText).not.toBe('');

            console.log(`Protection Plan Title: ${planTitleText}`);

            // Validate price if available
            const priceElement = plan.locator('p');
            if (await priceElement.count() > 0) {
                const price = await priceElement.innerText();
                console.log(`Price: ${price}`);

                // Validate the price format
                await expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
            }

            // Validate the checkbox input for the protection plan
            const checkboxInput = await this.page.locator('input[type="checkbox"]').nth(i);
            await expect(checkboxInput).toBeHidden();
            await expect(checkboxInput).toHaveAttribute('type', 'checkbox');

        }
        // Validate specific protection plans 
        const oneYearPlan = await this.page.locator('h2').filter({ hasText: oneYearPlanName });
        const twoYearPlan = await this.page.locator('h2').filter({ hasText: twoYearPlanName });

        // Check the "1 Year Protection Plan"
        await oneYearPlan.check();
        await expect(oneYearPlan).toBeChecked();

        // Verify the checkmark for the "1 Year Protection Plan"
        const oneYearCheckmark = protectSection.locator('section.absolute > svg').first();
        await expect(oneYearCheckmark).toBeVisible();

        // Check the "2 Year Protection Plan"
        await twoYearPlan.check();
        await expect(twoYearPlan).toBeChecked();

        // Verify the checkmark for the "2 Year Protection Plan"
        const twoYearCheckmark = protectSection.locator('section.absolute > svg').nth(1);
        await expect(twoYearCheckmark).toBeVisible();
    }

    async validatePersonalization() {
        await this.personalizeButton.waitFor({ state: 'visible' });
        await this.personalizeButton.click();
        await this.personalizeGiftLink.waitFor({ state: 'visible' });
        await expect(this.personalizeGiftLink).toBeVisible();
        await expect(this.personalizationParagraph).toBeVisible();
        await expect(this.personalizationTextBox).toBeVisible();
        await expect(this.personalizationLabel).toBeVisible();
    }

    async validatePersonalizationContent() {
        await this.personalizationTextBox.click();
        await this.personalizationTextBox.fill('Happy');
        await this.personalizationAddtoCartButton.click();
        await expect(this.page.locator('div.loading-msg')).toBeHidden();
        await this.miniCartDrawer();

    }

    async validateMiniCartPersonalizationContent() {
        await this.miniCartPersonalizationText.waitFor({ state: 'visible' });
        await expect(this.miniCartPersonalizationText).toBeVisible();
    }

}