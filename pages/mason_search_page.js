import test, { expect } from 'playwright/test';
const myaccountpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

const search_placeholder = "Search for shoes, clothing & more";
const search_icon = "Search";
const no_search_result_text = "Sorry, there are no results";
const search_tips = "Please check spelling, try a more general search, or use fewer keywords.";
const need_help = "Need Help?";
const view_faq = "View FAQs";
const chat_with_us = "Chat with Us";
const email = "Email";
const category_grid = "//ul[@class='grid gap-y-5 grid-cols-3 md:grid-cols-6']/li";
const search_result_title = "Results for";
const item_count = "Items";
const popular_searches = "Popular Searches";
const popular_search_container = "div.m-2.flex.flex-wrap.gap-2\\.5";
const popular_search_terms = "div.flex.gap-1\\.5.rounded-md.border.border-foggyGray.p-2";
const auto_suggestion_container = "ul.m-2\\.5 > li > li";

exports.SearchPage = class SearchPage {
    constructor(page) {
        this.page = page;
        this.search_placeholder = page.getByPlaceholder(search_placeholder);
        this.searchicon = page.getByLabel(search_icon, { exact: true });
        this.no_search_result_text = page.getByText(no_search_result_text);
        this.search_tips = page.getByText(search_tips);
        this.need_help = page.getByText(need_help);
        this.view_faq = page.getByRole('link', { name: view_faq });
        //this.chat_with_us = page.getByRole('button', { name: chat_with_us });
        this.chat_with_us = page.locator('a#openchatwindow');
        this.email = page.getByRole('link', { name: email });
        this.call_number = page.getByRole('link', { name: /Call Us \d{1}-\d{3}-\d{3}-\d{4}/ });
        this.search_result_title = page.getByRole('heading', { name: search_result_title });
        this.itemCount = page.getByText(item_count);
        this.popular_searches = page.getByText(popular_searches);
    }

    async validateSearchField(search_value) {
        await (this.search_placeholder).waitFor({ state: 'visible' });
        await this.search_placeholder.click();
        await this.search_placeholder.fill(search_value);
        await (this.searchicon).waitFor({ state: 'visible' });
        await this.searchicon.click();
        await this.page.waitForTimeout(2000);
        // // Wait for the URL to match either a search results page or a no-result page
        // await Promise.race([
        //     this.page.waitForNavigation({ timeout: 120000 }), // Increase timeout if needed
        //     this.page.waitForTimeout(250000) // Fallback timeout
        // ]);
        await this.page.waitForURL(new RegExp(`.*[?&]q=${search_value}`));
    }

    async validateSearchBreadCrumb(search_value) {
        await (this.page.getByText(`Results for"${search_value}"`, { exact: true })).waitFor({ state: "visible" });
        await expect(this.page.locator('span').filter({ hasText: `"${search_value}"` })).toBeVisible();

    }

    async validateWrongInputError(search_value) {
        await expect(this.search_placeholder).toBeVisible();
        await this.search_placeholder.click();
        await this.search_placeholder.fill(search_value);
        await this.page.waitForTimeout(1000);
        this.validateWrongSearchPageTitle(search_value);
        this.validateSearchTips();
    }

    async goToHomeViaLink(){
        await this.page.getByRole('link', { name: 'ShoeMall' }).click();
    }

    async validateWrongSearchPageTitle(search_value) {
        await this.no_search_result_text.waitFor({ state: 'visible', timeout: 120000 });
        // Get the inner text of the no search result text element
        const actualText = await this.no_search_result_text.innerText();
        console.log(actualText);
        // Check if the actual text contains the search value
        const containsSearchValue = actualText.includes(search_value);

        // Assert that the actual text contains the search value
        expect(containsSearchValue).toBe(true);
    }

    async validateValidSearchPageTitle(search_value) {
        await expect(this.search_result_title).toBeVisible({ timeout: 10000 });
        // Get the inner text of the no search result text element
        const actualText = await this.search_result_title.innerText();
        console.log(actualText);
        // Check if the actual text contains the search value
        const containsSearchValue = actualText.includes(search_value);

        // Assert that the actual text contains the search value
        expect(containsSearchValue).toBe(true);
    }

    async validateSearchTips() {
        await expect(this.search_tips).toBeVisible({ timeout: 10000 });
    }

    async validateNeedHelpsection() {
        // await this.page.waitForTimeout(2000);
        await expect(this.need_help).toBeVisible({ timeout: 10000 });
        await expect(this.view_faq).toBeVisible();
        await expect(this.chat_with_us).toBeVisible();
        await expect(this.email).toBeVisible();
        await expect(this.call_number).toBeVisible();
    }


    async clickFaqlink() {
        await this.view_faq.click();
        //await expect(this.page).toHaveURL(/.*addresses/);

    }

    async clickChatWithUslink() {
        await this.chat_with_us.click();
        //await expect(this.page).toHaveURL(/.*addresses/);

    }

    async clickEmailLink() {
        await this.email.click();
        //await expect(this.page).toHaveURL(/.*addresses/);
    }

    async validateCallNumber() {
        const linkText = await this.call_number.innerText();
        console.log(linkText);
        // Check that the link text includes the expected phone number
        expect(linkText).toMatch(/Call Us\s*\d{1}-\d{3}-\d{3}-\d{4}/);
        //await expect(this.call_number).toContain('1-800-704-5480');
    }
    

    async validateTopCategoryImageandTitle() {
        // Wait for the category grid to be visible
        await this.page.waitForSelector('ul.grid');

        // Get all category tiles within the grid
        const categoryTiles = await this.page.$$('ul.grid li.group');

        // Dynamic expectation: Check if there are category tiles available
        expect(categoryTiles.length).toBeGreaterThan(0);

        // Iterate through each category tile
        for (const tile of categoryTiles) {
            // Get the category title and image URL
            const title = await tile.$eval('p', (p) => p.innerText.trim());
            const imageURL = await tile.$eval('img', (img) => img.getAttribute('src'));

            // Output the title and image URL
            console.log(`Title: ${title}`);
            console.log(`Image URL: ${imageURL}`);

            // Validations
            expect(title).toBeTruthy(); // Ensure the title is not empty or null
            expect(imageURL).toBeTruthy(); // Ensure the image URL is not empty or null
        }
    }


    async validateItemCount() {
        await expect(this.search_result_title).toBeVisible();
        //const regex = /(\d+) Items/;
        const regex = /(\d+) items/i;

        const actualText = await this.search_result_title.innerText();
        console.log(actualText);
        // Check if the actual text contains the search value
        const containsSearchValue = regex.test(actualText);
        expect(containsSearchValue).toBe(true);
    }


    async validatePopularSearch() {
        await this.search_placeholder.click();
        await this.page.waitForTimeout(3000);
        await this.popular_searches.waitFor({state:'visible'});
        await expect(this.popular_searches).toBeVisible();

    }


    async validateRecentSearches(search_value) {
        await this.search_placeholder.click();
        await this.search_placeholder.fill('');
        //await (this.page.getByRole('link', { name: search_value, exact: true })).waitFor({state:'visible'});
        await expect(this.page.locator('li').filter({ hasText: new RegExp(`^${search_value}$`) })).toBeVisible();
        await expect(this.page.locator('li').filter({ hasText: new RegExp(`^${search_value}$`) }).getByRole('button')).toBeVisible();
    }

    async validateClickOnRecentSearch(search_value) {
        await this.search_placeholder.click();
        await this.page.getByRole('link', { name: search_value, exact: true }).click();
        await this.page.waitForNavigation();
        await this.page.waitForURL(new RegExp(`.*[?&]q=${search_value}`));
    }

    async validateRemoveRecentSearchEntry(search_value) {
        await this.search_placeholder.click();
        await expect(this.page.locator('li').filter({ hasText: new RegExp(`^${search_value}$`) }).getByRole('button')).toBeVisible();
        await (this.page.locator('li').filter({ hasText: new RegExp(`^${search_value}$`) }).getByRole('button')).click();
        await expect(this.page.locator('li').filter({ hasText: new RegExp(`^${search_value}$`) }).getByRole('button')).not.toBeVisible();
    }


    async validatePopularSearchItemsCount() {
        // Verify the popular search terms container is visible
        const popularSearchTermsContainer = await this.page.locator(popular_search_container);
        await expect(popularSearchTermsContainer).toBeVisible();

        // Get all popular search term elements
        const popularSearchTerms = popularSearchTermsContainer.locator(popular_search_terms);
        const searchTermCount = await popularSearchTerms.count();

        // Verify there are exactly 10 popular search terms displayed
        expect(searchTermCount).toBe(10);
    }

    async validateAutoSuggestion() {
        await this.search_placeholder.click();
        await this.search_placeholder.fill('pink');
        // Wait for the autocomplete suggestions to appear
        await this.page.waitForSelector(auto_suggestion_container); // replace with the appropriate selector for your suggestion list

        // Get the count of suggestions
        const suggestions = await this.page.$$(auto_suggestion_container); // replace with the appropriate selector for your suggestion list

        // Use expect to ensure the count is 10
        expect(suggestions).toHaveLength(10);

    }


    async logProductDetails(productElement) {
        const title = await productElement.locator('p.min-h-10').innerText().catch(() => 'No title');
        const price = await productElement.locator('p.flex').innerText().catch(() => 'No price');
        //const monthlyPrice = await productElement.locator('strong.inline-block').innerText().catch(() => 'No monthly price');
        //const imageUrl = await productElement.locator('a').getAttribute('alt').catch(() => 'No image URL');
        const imageUrl = await productElement.evaluate(element => {
            const images = Array.from(element.querySelectorAll('a.flex img'));
            return images.map(img => img.alt);
        }).catch(() => 'No image URL');
        const reviews = await productElement.locator('section.flex.items-center.gap-2 p.text-sm').innerText().catch(() => 'No reviews');
        const colorVariants = await productElement.evaluate(element => {
            const images = Array.from(element.querySelectorAll('div[aria-hidden="true"] img'));
            return images.map(img => img.alt);
        }).catch(() => 'No color variants');
        //const addToCartButton = productElement.locator('button[aria-haspopup="dialog"]');

        console.log({
            title,
            price,
            imageUrl,
            reviews,
            colorVariants
            //addToCartButton: await addToCartButton.isVisible() ? 'Present' : 'Not Present'
        });
    }


    async logProductDetailsOld() {
        await this.page.evaluate(() => {
            const productItems = document.querySelectorAll('li.ais-Hits-item');

            productItems.forEach(item => {
                const imageTag = item.querySelector('.swiper-slide img');
                const imageUrl = imageTag ? imageTag.src : 'No image';
                console.log(`Image URL: ${imageUrl}`);

                const titleTag = item.querySelector('a p');
                const title = titleTag ? titleTag.textContent.trim() : 'No title';
                console.log(`Title: ${title}`);

                const priceTag = item.querySelector('.flex.flex-wrap span');
                const price = priceTag ? priceTag.textContent.trim() : 'No price';
                console.log(`Price: ${price}`);

                const ratingTags = item.querySelectorAll('.my-3.min-h\\[32px\\] svg');
                const rating = ratingTags.length ? `Rating count: ${ratingTags.length}` : 'No rating';
                console.log(rating);

                const colorVariantElements = item.querySelectorAll('div.h-7.w-7');
                const colorVariants = [];
                colorVariantElements.forEach(colorElement => {
                    const color = colorElement.textContent.trim();
                    colorVariants.push(color);
                });

                console.log(`Color Variants: ${colorVariants.length ? colorVariants.join(', ') : 'No color variants'}`);
            });
        });
    }


    // Verify product details
    async verifyProducts() {
        //const firstProduct = this.page.locator('.ais-Hits-item').first();
        await this.page.waitForTimeout(3000);
        //await this.logProductDetailsOld();
        const items = this.page.locator('.ais-Hits-item');
        const count = await items.count();

        if (count > 0) {
            const product = items.nth(0);
            await this.logProductDetails(product);

        }
        //await this.clickThroughSwipers();

    }

    async clickThroughSwipers() {
        let morePages = true;

        while (morePages) {
            const swiperInstances = this.page.locator('.swiper');
            const swiperCount = await swiperInstances.count();

            console.log(`Found ${swiperCount} swiper instances.`);

            if (swiperCount === 0) {
                morePages = false;
                break;
            }

            for (let i = 0; i < swiperCount; i++) {
                const swiper = swiperInstances.nth(i);
                const swiperNextButton = swiper.locator('.swiper-button-next');
                const isButtonPresent = await swiperNextButton.count() > 0;
                const isButtonEnabled = await swiperNextButton.evaluate(button => !button.classList.contains('swiper-button-disabled'));

                if (!isButtonPresent || !isButtonEnabled) {
                    morePages = false;
                    break;
                }

                try {
                    await swiperNextButton.click();
                    await this.page.waitForTimeout(2000);
                    const newCount = await swiper.locator('.swiper-button-next').count();
                    if (newCount === 0 || !(await swiperNextButton.evaluate(button => !button.classList.contains('swiper-button-disabled')))) {
                        morePages = false;
                        break;
                    }
                } catch (error) {
                    console.error('Error clicking swiper button:', error);
                    morePages = false;
                }
            }
        }
    }


    async checkItemCountBeforeRunningTest() {
        const hasItems = await this.page.evaluate(() => {
            const h1Element = document.querySelector('h1');
            if (h1Element) {
                const textContent = h1Element.textContent.trim();
                const match = textContent.match(/(\d+) items/);
                if (match) {
                    const itemCount = parseInt(match[1], 10);
                    return itemCount > 0;
                }
            }
            return false;
        });

        if (hasItems) {
            console.log('Items found. Proceeding with test.');
            await this.verifyProducts();
        } else {
            console.log('No items found. Skipping test.');
        }
    }
}