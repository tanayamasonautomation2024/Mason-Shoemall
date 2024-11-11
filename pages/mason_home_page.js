import test, { expect } from 'playwright/test';
const homepage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_home_page_repo.json')));

exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;
        this.homepage_searchbarplaceholder = page.locator('input[id="search-bar"]');
        this.homepage_searchbutton = page.getByLabel(homepage_locator.homepage_searchbutton, { exact: true });
        this.homepage_signin = page.locator(homepage_locator.homepage_signin);
        this.homepage_cart = page.getByRole('button', { name: homepage_locator.homepage_cart });
        this.homepage_category = page.getByRole('button', { name: homepage_locator.homepage_category });
        this.minicart_drawer_heading = page.getByRole('button', { name: homepage_locator.minicart_drawer_heading });
        this.minicart_drawer_subtotalsection = page.getByText(homepage_locator.minicart_drawer_subtotalsection);
        this.minicart_drawer_viewcart_button = page.getByRole('button', { name: homepage_locator.minicart_drawer_viewcart_button });
        this.minicart_drawer_checkout_button = page.getByRole('button', { name: homepage_locator.minicart_drawer_checkout_button });
        this.footer_signupemail_textbox = page.getByPlaceholder(homepage_locator.footer_signupemail_textbox);
        this.footer_signup_button = page.getByRole('button', { name: homepage_locator.footer_signup_button });
        this.addtoCartButtonPLP = page.locator('button:has-text("Add to Cart")');


    }

    async displaySearchBar() {
        await this.homepage_searchbarplaceholder.waitFor({ state: 'visible' });
        await this.homepage_searchbutton.waitFor({ state: 'visible' });
        await expect(this.homepage_searchbarplaceholder).toBeVisible();
        await expect(this.homepage_searchbutton).toBeVisible();
    }

    async displaySignIn() {
        await this.homepage_signin.waitFor({ state: 'visible' });
        await expect(this.homepage_signin).toBeVisible();
    }

    async displayMiniCartIcon() {
        await this.homepage_cart.waitFor({ state: 'visible' });
        await expect(this.homepage_cart).toBeVisible();
    }

    async clickMiniCartIcon() {
        await this.homepage_cart.waitFor({ state: 'visible' });
        await this.homepage_cart.click();
    }

    async displayCategory() {
        await this.homepage_category.waitFor({ state: 'visible' });
        await expect(this.homepage_category).toBeVisible();
    }
    async displaySiteLogo(brandLogoName) {
        await expect(this.page.getByRole('link', { name: brandLogoName, exact: true })).toBeVisible();
    }
    async clickSiteLogo(brandLogoName) {
        await this.page.getByRole('link', { name: brandLogoName, exact: true }).click();

    }

    async homePageRedirectionValidation(homePageUrl) {
        await expect(this.page).toHaveURL(homePageUrl);
    }
    async displayHeroBanner(bannerName) {
        await expect(this.page.getByRole('link', { name: bannerName })).toBeVisible();
    }
    async displayFooter(footerName) {
        await expect(this.page.getByText(footerName)).toBeVisible();
    }

    async clickOnHomePageSignIn() {
        await this.homepage_signin.click();
    }

    async closeSignedInDrawer() {
        await this.page.getByRole('button').nth(1).click();
    }

    async categoryL1ToBeVisibleOnDepartmentHover() {
        await this.page.locator('#mainMenu ul[role="menu"] > li').first().waitFor({ state: 'visible' });
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li').first();
        // Wait for the L1 categories to become visible
        await expect(mainMenuItems).toBeVisible();
    }


    async countAllL1Categories() {
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
        const l1Count = await mainMenuItems.count();
        return l1Count;
    }

    // async checkIfcategoryL1isBold(l1Category) {
    //     //await (this.page.$(`a:text("${l1Category}")`)).hover();
    //     //await this.page.waitForSelector(homepage_locator.homepage_l1category, { state: 'visible' });
    //     const element = await this.page.$(`a:text("${l1Category}")`);
    //     //  const element = await this.page.$('a:text("Clothing, Shoes + Bags")');

    //     if (element) {

    //         await element.hover();
    //         const fontWeight = await element.evaluate(el => window.getComputedStyle(el).fontWeight);
    //         const isBold = parseInt(fontWeight) >= 700 || fontWeight === 'bold';
    //         expect(isBold).toBe(true);
    //     } else {
    //         console.log('Element not found.');
    //     }
    // }

    async checkIfCategoryL1isBold(categoryText) {
        const elements = await this.page.locator('#mainMenu ul[role="menu"] > li');

        let found = false;

        for (let i = 0; i < await elements.count(); i++) {
            const element = elements.nth(i);
            const textContent = await element.innerText();

            if (textContent.trim() === categoryText) {
                await element.hover();
                const fontWeight = await element.evaluate(el => window.getComputedStyle(el).fontWeight);
                const isBold = parseInt(fontWeight) >= 700 || fontWeight === 'bold';
                expect(isBold).toBe(true);
                found = true;
                break;
            }
        }

        if (!found) {
            console.log(`Element with text "${categoryText}" not found.`);
        }
    }

    async getRandomL1CategoryText() {
        const elements = await this.page.locator('#mainMenu ul[role="menu"] > li');

        // Wait for the first element to be visible
        await elements.first().waitFor({ state: 'visible' });

        // Get the midpoint of the elements
        const midpoint = Math.ceil(await elements.count() / 2);

        // Extract texts from the first half of the elements
        const texts = [];
        for (let i = 0; i < midpoint; i++) {
            const text = await elements.nth(i).innerText();
            texts.push(text.trim());
        }

        // Select a random text from the extracted list
        const randomIndex = Math.floor(Math.random() * texts.length);
        const randomText = texts[randomIndex];

        console.log(randomText);
        return [randomText, randomIndex];
    }


    async l2andl3TobeVisibleOnL1Hover(index) {
        const l2Selector = homepage_locator.l2category.replace('${index + 1}', index + 1);
        const l3Selector = homepage_locator.l3category.replace('${index + 1}', index + 1);
        try {
            // Check if L2 element is visible
            await this.page.waitForSelector(l2Selector, { visible: true, timeout: 5000 });
            // Check if L3 element is visible
            await this.page.waitForSelector(l3Selector, { visible: true, timeout: 5000 });
        } catch (error) {
            // Handle timeout error
            console.error("L2 or L3 elements are not available within the timeout.");
        }

    }

    async validateSubCategoriesVisibilityOnL1Hover(index) {
        // Locate the main menu items
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');

        // Ensure the index is within the range
        const mainMenuItemCount = await mainMenuItems.count();
        if (index >= mainMenuItemCount) {
            console.error(`Index ${index} is out of range. Only ${mainMenuItemCount} main menu items available.`);
            return;
        }

        // Hover over the L1 category at the specified index
        const mainMenuItem = mainMenuItems.nth(index);
        await mainMenuItem.hover();

        try {
            // Check if L2 subcategories are visible
            const l2Selector = await mainMenuItem.locator('ul li div.cursor-pointer');
            await this.page.waitForSelector(l2Selector, { visible: true, timeout: 5000 });

            // Check if L3 subcategories (if they exist) are visible
            const l3Selector = await mainMenuItem.locator('ul li ul li div.cursor-pointer');
            await this.page.waitForSelector(l3Selector, { visible: true, timeout: 5000 });

        } catch (error) {
            console.error(`L2 or L3 subcategory not visible within the timeout for L1 category at index ${index}.`);
        }
    }


    // async ensureGreyOverlayOnCategoryHover() {
    //     // Hover over "departments" menu item
    //     await this.homepage_category.hover();
    //     // Evaluate whether the element is beneath the overlay

    //     const pageUnderneathLocator = homepage_locator.page_underneath;
    //     const isBeneathOverlay = await this.page.evaluate((locator) => {
    //         const element = document.evaluate(locator, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //         if (!element) return false; // Return false if the element is not found

    //         const rect = element.getBoundingClientRect();
    //         return !(rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
    //     }, pageUnderneathLocator);

    //     // Assert that the element is beneath the overlay
    //     expect(isBeneathOverlay).toBe(true);

    // }

    async ensureGreyOverlayOnCategoryHover() {
        // Hover over a random main menu category item
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
        const randomIndex = Math.floor(Math.random() * await mainMenuItems.count());
        const mainMenuItem = mainMenuItems.nth(randomIndex);

        await mainMenuItem.hover();
        // Wait for the overlay to appear
        await this.page.waitForTimeout(5000);

        // Evaluate whether the element is beneath the overlay
        const isBeneathOverlay = await this.page.evaluate(() => {
            const overlay = document.querySelector('.relative.mb-3.-z-\\[1\\]');
            if (!overlay) return false;

            const rect = overlay.getBoundingClientRect();
            return !(rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
        });

        // Assert that the element is beneath the overlay
        expect(isBeneathOverlay).toBe(true);
    }

    async navigateToCategoryL1() {
        const mainMenuItemList = ['Women', 'Men', 'Kids', 'Boot Shop'];
        const l1Category = mainMenuItemList[Math.floor(Math.random() * mainMenuItemList.length)];
        // Locate the main menu item by matching the L1 category text
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
        const matchingMenuItem = mainMenuItems.locator(`a:has-text("${l1Category}")`);

        // Wait for the L1 category link to be visible and click it
        await matchingMenuItem.first().waitFor({ state: 'visible' });
        await matchingMenuItem.first().click();

        // Wait for the page to navigate and the breadcrumb to be visible
        await this.page.waitForNavigation();
        await this.page.waitForSelector('nav[aria-label="Breadcrumb"]', { state: 'visible' });

        // Verify the breadcrumb contains the L1 category
        const breadcrumbSelector = this.page.locator('nav[aria-label="Breadcrumb"]').locator(`li:has-text("${l1Category}")`).first();

        // Wait for the breadcrumb element to be visible and assert its visibility
        await breadcrumbSelector.waitFor({ state: 'visible' });
        await expect(breadcrumbSelector).toBeVisible();
    }

    async hoverOnL1(){
       
            const mainMenuItemList = ['Women', 'Men', 'Kids', 'Boot Shop'];
            const l1Category = mainMenuItemList[Math.floor(Math.random() * mainMenuItemList.length)];
            // Locate the main menu item by matching the L1 category text
            const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
            const matchingMenuItem = mainMenuItems.locator(`a:has-text("${l1Category}")`);
    
            // Wait for the L1 category link to be visible and click it
            await matchingMenuItem.first().waitFor({ state: 'visible' });
            await matchingMenuItem.first().hover();
        
    }


    async getRandomL2L3CategoryText(index) {
        const l2Selector = homepage_locator.l2categoryText.replace('${index + 1}', index + 1);
        const l3Selector = homepage_locator.l3categoryText.replace('${index + 1}', index + 1);
        try {
            // Check if L2 element is visible
            await this.page.waitForSelector(l2Selector, { visible: true, timeout: 5000 });
            // Check if L3 element is visible
            await this.page.waitForSelector(l3Selector, { visible: true, timeout: 5000 });
        }
        catch (error) {
            // Handle timeout error
            console.error("L2 or L3 elements are not available within the timeout.");
        }
        // Read the text from all L2 elements
        const l2Texts = await this.page.$$eval(l2Selector, elements => elements.map(element => element.textContent.trim()));
        // Read the text from all L3 elements
        const l3Texts = await this.page.$$eval(l3Selector, elements => elements.map(element => element.textContent.trim()));

        // Function to get a random element from an array
        function getRandomElement(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        // Get a random L2 text and a random L3 text
        const randomL2Text = getRandomElement(l2Texts);
        const randomL3Text = getRandomElement(l3Texts);
        return [randomL2Text, randomL3Text];
    }

    async ensureNoOverlayWhenClickedOutside() {
        // Array of main menu items
        const mainMenuItems = ['Women', 'Men', 'Kids'];

        // Select a random main menu item
        const randomMainMenuItem = mainMenuItems[Math.floor(Math.random() * mainMenuItems.length)];

        // Hover over the random main menu item
        const mainMenuLocator = this.page.locator('#mainMenu ul[role="menu"] > li')
            .filter({ has: this.page.locator(`a.cursor-pointer:has-text("${randomMainMenuItem}")`) })
            .first();

        // await mainMenuLocator.hover();
        const menuLink = mainMenuLocator.locator('a.cursor-pointer');
        await menuLink.first().hover();
        await this.page.locator('div.custom-scrollbar').first().waitFor({ state: 'visible' });
        // Wait for the subcategories to appear
        //await this.page.locator('div.customtablescrollbar.group-hover\\:flex').first().waitFor({ state: 'visible' });
        await this.homepage_searchbarplaceholder.click();
        // Ensure the overlay is closed after clicking outside
        const isOverlayVisible = await this.page.isVisible('a.customtablescrollbar.group-hover\\:flex');
        expect(isOverlayVisible).toBeFalsy();

    }

    // async selectSubCategoryFromMegaMenu() {
    //     try {
    //         // Click the homepage category
    //         await this.homepage_category.click();

    //         // Get the first visible item in the first <ul>
    //         const firstLi = await this.getRandomVisibleItem('ul[role="menu"] > li');
    //         if (!firstLi) {
    //             console.log('No items found in the first <ul>');
    //             return;
    //         }

    //         // Click the first visible item in the first <ul>
    //         await firstLi.hover();
    //         const isBold = await this.checkBoldStyling(firstLi);
    //         if (!isBold) {
    //             console.log('First <li> item is not bold when hovered.');
    //             return;
    //         }
    //         // Get the second visible item in the second <ul>
    //         const secondLi = await this.getRandomVisibleItem(firstLi, 'div.customtablescrollbar > ul > li > a');
    //         if (!secondLi) {
    //             console.log('No items found in the second <ul>');
    //             return;
    //         }
    //         await secondLi.hover();
    //         // Ensure the secondLi is clickable with a timeout
    //         await secondLi.waitFor({ state: 'visible', timeout: 5000 });
    //         // Click the second visible item in the second <ul>
    //         await secondLi.click();
    //         //await this.page.waitForTimeout(5000);
    //         // Wait for the expected URL and the network to be idle
    //         const expectedURL = new RegExp(/.*\/(categories)\/[^\/]+/);
    //         await this.page.waitForURL(expectedURL);
    //         //await expect(this.page).toHaveURL(expectedURL);
    //         await this.addtoCartButtonPLP.first().waitFor({ state: 'visible' });
    //         console.log('Successfully navigated to the subcategory page.');
    //     } catch (error) {
    //         console.error('An error occurred while selecting a subcategory:', error);
    //     }
    // }

    // async getRandomVisibleItem(baseLocator, nestedSelector = null) {
    //     const locator = nestedSelector ? baseLocator.locator(nestedSelector) : this.page.locator(baseLocator);
    //     await locator.first().waitFor({ state: 'visible' });

    //     const itemCount = await locator.count();
    //     if (itemCount > 0) {
    //         const randomIndex = Math.floor(Math.random() * itemCount);
    //         return locator.nth(randomIndex);
    //     }

    //     return null;
    // }

    async checkBoldStyling(element) {
        const fontWeight = await element.evaluate((el) => window.getComputedStyle(el).fontWeight);
        // Font weight 700 or greater typically indicates bold styling
        return parseInt(fontWeight) >= 700;
    }

    async selectRandomSubCategory() {
        // Array of main menu items
        // const mainMenuItems = ['Women', 'Men', 'Kids', 'Boot Shop'];

        // // Select a random main menu item
        // const randomMainMenuItem = mainMenuItems[Math.floor(Math.random() * mainMenuItems.length)];

        // // Hover over the random main menu item
        // const mainMenuLocator = this.page.locator('#mainMenu ul[role="menu"] > li')
        //     .filter({ has: this.page.locator(`a.cursor-pointer:has-text("${randomMainMenuItem}")`) })
        //     .first();

        // //await mainMenuLocator.hover();
        // const menuLink = mainMenuLocator.locator('a.cursor-pointer');
        // await menuLink.first().hover();

        const mainMenuItemList = ['Women', 'Men', 'Kids', 'Boot Shop'];
            const l1Category = mainMenuItemList[Math.floor(Math.random() * mainMenuItemList.length)];
            // Locate the main menu item by matching the L1 category text
            const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
            const matchingMenuItem = mainMenuItems.locator(`a[title="${l1Category}"]`);
    
            // Wait for the L1 category link to be visible and click it
            await matchingMenuItem.waitFor({ state: 'visible' });
            await matchingMenuItem.hover();
        //const subcategoryMenu = matchingMenuItem.locator('div.customtablescrollbar.group-hover\\:flex');
        const subcategoryMenu =  matchingMenuItem.locator('+ div.custom-scrollbar');

    // Wait for the submenu div to be visible
    await subcategoryMenu.waitFor({ state: 'visible' });
        // Ensure you're interacting with the right element by specifying an index or refining further
        //await subcategoryMenu.waitFor({ state: 'visible' });

        // Continue with your subcategory selection and interaction
        const subcategoriesLocator = subcategoryMenu.locator('ul > li a.cursor-pointer');
        const subcategoriesCount = await subcategoriesLocator.count();

        // Select a random subcategory
        const randomSubcategoryIndex = Math.floor(Math.random() * subcategoriesCount);
        const randomSubcategory = subcategoriesLocator.nth(randomSubcategoryIndex);
        const subCatName = await randomSubcategory.textContent();
        console.log(subCatName);
        // Click on the random subcategory
        await randomSubcategory.click();
        // Locate the breadcrumb's last 'li' element
        await this.page.locator('nav[aria-label="Breadcrumb"] ol > li').last().waitFor({ state: 'visible' });
        await this.page.locator('section.plpGrid').first().waitFor({ state: 'visible' });
        const lastBreadcrumbItem = await this.page.locator('nav[aria-label="Breadcrumb"] ol > li').last();
        // Get the text content of the last 'li' element
        const lastBreadcrumbText = await lastBreadcrumbItem.textContent();
        // Extract the last two words of the sub-category name
        const lastTwoWords = subCatName.split(' ').slice(-2).join(' ');

        // Escape special regex characters in the extracted words
        const escapedPattern = lastTwoWords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Create a flexible regex pattern to:
        // 1. Match any starting word(s) (e.g., "All").
        // 2. Match the escaped last two words.
        // 3. Ignore case and apostrophes.
        const regexPattern = new RegExp(`(?:.*\\b)?${escapedPattern.replace(/\\'/g, "")}`, 'i');

        // Check if the last breadcrumb text matches the flexible regex pattern
        expect(lastBreadcrumbText.trim()).toMatch(regexPattern);
    }


}
