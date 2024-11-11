import test, { expect } from 'playwright/test';
const myaccountpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

const brand_breadcrumb = "HomeBrands";
const brand_title = "Brands";
const top_brands = "Top Brands";
const brand_logo_section = "section.w-full:has(h2:has-text('Top Brands'))";
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
const brand_index = "Brand Index"

exports.MasonBLPPage = class MasonBLPPage {
    constructor(page) {
        this.page = page;
        this.brand_title = page.getByRole('heading', { name: brand_title, exact: true })
        this.brand_breadcrumb = page.getByText(brand_breadcrumb);
        this.top_brands = page.locator('section').filter({ hasText: top_brands }).locator('section');
        this.alphabets_link = page.getByText(alphabets);
        this.brand_index = page.getByRole('heading', { name: brand_index });

    }

    async clickOnTopBrandsInHomePageOld() {
        // Wait for the section with the heading "Top Brands"
        await this.page.waitForSelector('h4.text-center.text-\\[25px\\].font-bold.leading-8.text-black');

        // Find the h4 element with "Top Brands" text
        const topBrandsHeader = await this.page.$('h4.text-center.text-\\[25px\\].font-bold.leading-8.text-black:has-text("Top Brands")');

        // Find the <ul> list under the "Top Brands" section
        const ulList = await this.page.$('h4.text-center.text-[25px].font-bold.leading-8.text-black:has-text("Top Brands") + ul.grid.grid-cols-2.gap-5.md\\:grid-cols-4');

        // Get the list of items within the <ul> list
        const items = await ulList.$$('li');

        // Iterate through each item
        for (let item of items) {
            // Extract information from the <a> tag
            const link = await item.$('a');
            const ariaLabel = await link.getAttribute('aria-label');
            const href = await link.getAttribute('href');

            // Extract information from the <img> tag
            const img = await link.$('img');
            const alt = await img.getAttribute('alt');
            const src = await img.getAttribute('src');

            // Output the information (you can modify this part as needed)
            console.log(`Brand: ${ariaLabel}`);
            console.log(`URL: ${href}`);
            console.log(`Image Alt: ${alt}`);
            console.log(`Image URL: ${src}`);
            console.log('------------------');
        }
    }


    async validateTopBrandsInHomePage() {
        await this.page.locator('h4:has-text("Top Brands")').first().scrollIntoViewIfNeeded();
        const ulElement = await this.page.waitForSelector('section:has-text("Top Brands") + ul');

        // Get all <li> elements within the <ul>
        const liElements = await ulElement.$$('li');


        for (let item of liElements) {
            // Extract information from the <a> tag
            const link = await item.$('a');
            const ariaLabel = await link.getAttribute('aria-label');
            const href = await link.getAttribute('href');

            // Extract information from the <img> tag
            const img = await link.$('img');
            const alt = await img.getAttribute('alt');
            const src = await img.getAttribute('src');

            // Output the information (you can modify this part as needed)
            console.log(`Brand: ${ariaLabel}`);
            console.log(`URL: ${href}`);
            console.log(`Image Alt: ${alt}`);
            console.log(`Image URL: ${src}`);
            console.log('------------------');
        }

    }

    async clickOnTopBrandsInHomePage() {
        await this.page.locator('h4:has-text("Top Brands")').first().scrollIntoViewIfNeeded();
        const ulElement = await this.page.waitForSelector('section:has-text("Top Brands") + ul');
        const liElements = await ulElement.$$('li');

        // Check if there are any <li> elements
        if (liElements.length === 0) {
            console.error('No <li> elements found.');
            return;
        }

        // Randomly select one <li> element
        const randomIndex = Math.floor(Math.random() * liElements.length);
        const randomLiElement = liElements[randomIndex];

        // Extract information from the <a> tag within the randomly selected <li>
        const link = await randomLiElement.$('a');
        const ariaLabel = await link.getAttribute('aria-label') || 'No aria-label';
        const href = await link.getAttribute('href') || 'No href';

        // Extract information from the <img> tag within the <a> tag
        const img = await link.$('img');
        const alt = await img.getAttribute('alt') || 'No alt text';
        const src = await img.getAttribute('src') || 'No src';


        console.log(`Selected Brand: ${ariaLabel}`);
        console.log(`URL: ${href}`);
        console.log(`Image Alt: ${alt}`);
        console.log(`Image URL: ${src}`);

        // Ensure the 'Top Brands' heading is visible
        await expect(this.page.getByRole('heading', { name: 'Top Brands' })).toBeVisible();

        // Click the link and wait for navigation to complete
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }), // Wait for the navigation
            link.click() // Click the link
        ]);

        // Verify that the URL of the new page matches the href
        const currentUrl = this.page.url();
        if (currentUrl === new URL(href, this.page.url()).href) {
            console.log(`Navigation successful: ${currentUrl}`);
        } else {
            console.error(`Navigation failed. Expected ${new URL(href, page.url()).href}, but got ${currentUrl}`);
        }


    }

    async validateNavigationFromPDP() {
        await (this.page.getByRole('link', { name: 'Shop All' })).waitFor({ state: "visible" });
        await this.page.getByRole('link', { name: 'Shop All' }).click();
        const shopAllLink = this.page.getByRole('link', { name: 'Shop All' });
        const shopAllText = await shopAllLink.innerText();
        console.log(shopAllText);
        // Extract the text after "Shop All"
        const searchText = 'Shop All';
        const startIndex = shopAllText.indexOf(searchText);
        const textAfterShopAll = shopAllText.substring(startIndex + searchText.length).trim();

        console.log(`Text after "Shop All": ${textAfterShopAll}`);
        await this.page.getByLabel('Breadcrumb').getByText(textAfterShopAll).waitFor({ state: 'visible' });
        await expect(this.page.getByLabel('Breadcrumb').getByText(textAfterShopAll)).toBeVisible();
        //await expect(this.page.locator('div').filter({ hasText: /^Global Banner Stoneberry$/ }).first()).toBeVisible();
        await expect(this.page.locator('strong').filter({ hasText: textAfterShopAll })).toBeVisible();
        //await expect(this.page.getByRole('main').getByLabel('Brands').getByText(textAfterShopAll)).toBeVisible(); 
    }

    async validateNavigationFromBIP(randomAlphabet) {
        try {
            // Verify the presence of the alphabet heading
            await expect(this.page.getByRole('heading', { name: randomAlphabet, exact: true })).toBeVisible();
            const brandListElements = await this.page.$$('#' + randomAlphabet + ' + section ul.brandIndexList li');
            // Randomly select one <li> element
            const randomIndex = Math.floor(Math.random() * brandListElements.length);
            const randomLiElement = brandListElements[randomIndex];

            // Extract information from the <a> tag within the randomly selected <li>
            const link = await randomLiElement.$('a');
            //const ariaLabel = await link.getAttribute('aria-label');
            const href = await link.getAttribute('href');


            console.log(`Selected Link: ${link}`);
            const brandHandle = await link.evaluateHandle(node => node.innerText); // Get JSHandle for innerText
            const brandInnerText = await brandHandle.jsonValue(); // Extract inner text from JSHandle

            console.log(`Selected Brand: ${brandInnerText}`);
            // // Click on the link
            // await link.click();
            await this.page.getByRole('link', { name: brandInnerText, exact: true }).click();
            // Wait for the breadcrumb to be visible
            //await this.page.waitForSelector('Breadcrumb', { state: 'visible' });
            await this.page.waitForNavigation();
            await (this.page.getByText('HomeBrands')).waitFor({ State: "visible" });

        } catch (error) {
            console.error(`Error navigating to a brands under alphabet '${randomAlphabet}':`, error);
        }

    }


}