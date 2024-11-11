import test, { expect } from 'playwright/test';
const newuser_myaccountpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));

const expectedCategories = [
  'Furniture',
  'Health + Beauty',
  'Clothing, Shoes + Bags',
  'Bed + Bath',
  'Kitchen + Dining'
];


exports.CLPPage = class CLPPage {
  constructor(page) {
    this.page = page;

  }

  async validateAccordionExpandAndClose() {
    // Define a selector for accordion buttons
    const accordionSelector = "//button[@data-orientation='vertical']";;

    // Get all accordion buttons
    const buttons = await this.page.$$(accordionSelector);

    for (let button of buttons) {
      try {
        const svg = await button.$('svg');
        // Check if the button contains an SVG element
        const hasSvg = await button.$('svg') !== null;

        if (hasSvg) {
          // Check if the button is expanded
          const isExpanded = await button.evaluate(el => el.getAttribute('aria-expanded') === 'true');

          if (!isExpanded) {
            // Click to expand
            await svg.click();
            console.log(`Expanded: ${await button.evaluate(el => el.getAttribute('aria-controls'))}`);

            // Wait for content to expand
            await this.page.waitForTimeout(1000);  // Adjust time as needed
          }

          // Click to collapse if it was expanded
          if (await button.evaluate(el => el.getAttribute('aria-expanded') === 'true')) {
            await svg.click();
            console.log(`Collapsed: ${await button.evaluate(el => el.getAttribute('aria-controls'))}`);

            // Wait for content to collapse
            await this.page.waitForTimeout(1000);  // Adjust time as needed
          }
        }
      } catch (e) {
        console.error(`Error interacting with button: ${e}`);
      }
    }

  }


  async validate2ColumnImageTiles() {
    const tilesSection = this.page.locator('.column-grid-cta');
    await tilesSection.scrollIntoViewIfNeeded();

    // Locate the list items within the tiles section
    const listItems = tilesSection.locator('ul > li');

    // Get the count of list items
    const count = await listItems.count();
    console.log(count);

    // Assert that there are exactly 2 list items
    expect(count).toBe(2);
  }


  async validate2ColumnTiles() {
    const tiles = this.page.locator('section.column-grid-cta ul.grid li');

    // Retrieve the number of tiles present
    const tileCount = await tiles.count();
    expect(tileCount).toBe(2); // Verify that there are exactly 2 tiles

    // Loop through each tile and validate content dynamically
    for (let i = 0; i < tileCount; i++) {
      const tile = tiles.nth(i);

      // Verify image content dynamically
      const img = tile.locator('a img');
      const altText = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      expect(altText).not.toBeNull(); // Ensure alt text is not null
      expect(src).not.toBeNull(); // Ensure image source is not null

      // Verify title dynamically
      const title = tile.locator('h2');
      const titleText = await title.textContent();
      expect(titleText).not.toBeNull(); // Ensure title text is not null

      // Verify description dynamically
      const description = tile.locator('p');
      const descriptionText = await description.textContent();
      expect(descriptionText).not.toBeNull(); // Ensure description text is not null

      // Verify CTA button dynamically
      const cta = tile.locator('a').nth(1); // Assuming CTA is the second link within the tile
      const ctaText = await cta.textContent();
      const ctaHref = await cta.getAttribute('href');
      expect(ctaText).not.toBeNull(); // Ensure CTA text is not null
      expect(ctaHref).not.toBeNull(); // Ensure CTA href is not null
    }
  }


  async validateBestSellerWidgetOld() {
    const bestSellersSection = this.page.locator('section:has-text("Best Sellers")');
    await bestSellersSection.scrollIntoViewIfNeeded();
    await expect(bestSellersSection).toBeVisible();

    // Wait for the carousel to load
    await this.page.waitForSelector('.swiper-wrapper');

    // Check how many best-seller products are visible in the first .swiper-wrapper
    const visibleBestSellers = await this.page.evaluate(() => {
      // Get the first .swiper-wrapper element
      const firstSwiperWrapper = document.querySelectorAll('.swiper-wrapper')[0];

      if (!firstSwiperWrapper) {
        throw new Error('No .swiper-wrapper elements found.');
      }

      // Get all swiper-slide elements within the first .swiper-wrapper
      const bestSellerSlides = Array.from(firstSwiperWrapper.querySelectorAll('.swiper-slide'))
        .filter(slide => slide.querySelector('span')?.textContent === 'Best-Seller');

      // Check how many of these slides are visible
      return bestSellerSlides.filter(slide => {
        const rect = slide.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      }).length;
    });

    console.log(`Number of visible best-seller products: ${visibleBestSellers}`);

    // Validate that only 3 best-sellers are visible at any given time
    if (visibleBestSellers === 3) {
      console.log('Validation Passed: Exactly 3 best-seller products are visible.');
    } else {
      console.error('Validation Failed: The number of visible best-seller products is not 3.');
    }
  }



  async validateBestSellerWidgetNew() {
    // Locate the section containing the "Best Sellers" heading and be more specific in your selector
    const bestSellersSection = this.page.locator('strong.text-2xl:has-text("Best Sellers")');

    // Ensure the section is visible and scroll into view if needed
    await bestSellersSection.scrollIntoViewIfNeeded();
    await expect(bestSellersSection).toBeVisible();

    // Wait for the swiper-wrapper elements within the specific best-sellers section
    await this.page.locator('.swiper-wrapper').first().waitFor({ state: 'visible' });

    // Check how many best-seller products are visible in the first .swiper-wrapper
    const visibleBestSellers = await this.page.evaluate(() => {
      // Get the first .swiper-wrapper element within the "Best Sellers" section
      const firstSwiperWrapper = document.querySelectorAll('.swiper-wrapper')[0];

      if (!firstSwiperWrapper) {
        throw new Error('No .swiper-wrapper elements found.');
      }

      // Get all swiper-slide elements within the first .swiper-wrapper
      const bestSellerSlides = Array.from(firstSwiperWrapper.querySelectorAll('.swiper-slide'))
        .filter(slide => slide.querySelector('span')?.textContent === 'Best-Seller');

      // Check how many of these slides are visible
      return bestSellerSlides.filter(slide => {
        const rect = slide.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      }).length;
    });

    console.log(`Number of visible best-seller products: ${visibleBestSellers}`);

    // Validate that only 3 best-sellers are visible at any given time
    if (visibleBestSellers === 3) {
      console.log('Validation Passed: Exactly 3 best-seller products are visible.');
    } else {
      console.error('Validation Failed: The number of visible best-seller products is not 3.');
    }
  }



  async validateBestSellerWidget() {
    // Locate the heading for "Best Sellers"
    const bestSellersHeading = this.page.locator('strong.text-2xl:has-text("Best Sellers")');

    // Ensure the heading is visible and scroll into view if needed
    await bestSellersHeading.scrollIntoViewIfNeeded();
    await expect(bestSellersHeading).toBeVisible();

    // Wait for the swiper-wrapper elements within the best-sellers section
    const firstSwiperWrapper = this.page.locator('.swiper-wrapper').first();
    await firstSwiperWrapper.waitFor({ state: 'visible' });

    // Locate the first swiper-pagination container
    const firstPaginationContainer = this.page.locator('.swiper-pagination').first();

    // Wait for the pagination bullets to be present
    await firstPaginationContainer.waitFor({ state: 'visible' });

    // Count the number of pagination bullets in the first container
    const bulletCount = await firstPaginationContainer.locator('.swiper-pagination-bullet').count();

    console.log(`Number of pagination bullets in the first container: ${bulletCount}`);

    // Validate that there are exactly 3 bullets
    if (bulletCount === 3) {
      console.log('Validation Passed: Exactly 3 pagination bullets are present in the first container.');
    } else {
      console.error('Validation Failed: The number of pagination bullets in the first container is not 3.');
    }

  }

  async validateBestSellerWidgetDiv() {
    // Get the element by role and filter the divs with specific text
    const mainRoleLocator = this.page.locator('role=main');
    const bestSellerLocator = mainRoleLocator.locator('div').filter({ hasText: 'Best-Seller' });

    // Get the count of matching div elements
    const count = await bestSellerLocator.count();

    // Output the count
    console.log(`Number of div elements containing 'Best-Seller': ${count}`);
  }

  async validateSwipeInBestSellerWidget() {
    // Count the number of div elements with the class 'swiper-slide'
    const count = await this.page.$$eval('div.swiper-slide', elements => elements.length);

    // Log the count to the console
    console.log(`Number of swiper-slide divs: ${count}`);


    await expect(this.page.locator('.swiper-button-next')).toBeVisible();
    await this.page.locator('.swiper-button-next').click();
  }


  async validateCategoryGrid() {
    // Use XPath to select the grid
    const gridXPath = '//ul[contains(@class,"sm:grid-cols-3 lg:grid-cols-4")]';
    const grid = await this.page.locator(gridXPath);

    // Get all grid items
    const gridItems = await grid.locator('li').all();
    console.log(`Found ${gridItems.length} grid items.`);

    for (let i = 0; i < gridItems.length; i++) {
      const item = gridItems[i];
      const link = await item.locator('a');
      const image = await link.locator('img');
      const text = await link.locator('p');

      // Check if the image alt text is 'Image'
      const altText = await image.getAttribute('alt');
      if (altText !== 'Image') {
        console.error(`Item ${i + 1}: Expected 'Image' alt text, but found '${altText}'`);
      }

      // Check if the title text is not empty
      const titleText = await text.textContent();
      if (!titleText) {
        console.error(`Item ${i + 1}: Title text is empty.`);
      }

      // Verify the href attribute of the link
      const href = await link.getAttribute('href');
      if (!href) {
        console.error(`Item ${i + 1}: href attribute is missing.`);
      }

      console.log(`Item ${i + 1} Title: ${titleText}`);
      console.log(`Item ${i + 1} href/link: ${href}`);
    }
  }

  async validateNavigationFromHref() {
    try {

      const gridXPath = '//ul[contains(@class,"sm:grid-cols-3 lg:grid-cols-4")]';
      const grid = await this.page.locator(gridXPath);

      // Get all grid items
      const gridItems = await grid.locator('li').all();
      console.log(`Found ${gridItems.length} grid items.`);

      if (gridItems.length === 0) {
        console.error('No grid items found.');
        return;
      }

      // Randomly choose one grid item
      const randomIndex = Math.floor(Math.random() * gridItems.length);
      const selectedItem = gridItems[randomIndex];
      const link = await selectedItem.locator('a');
      const href = await link.getAttribute('href');

      if (!href) {
        console.error('No href attribute found for the selected item.');
        return;
      }
      console.log(`Randomly selected href: ${href}`);

      // Store the current URL
      const originalUrl = this.page.url();

      // Click the link and wait for navigation
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load' }), // Wait for the page navigation
        link.click() // Click the link
      ]);

      // Check if the new page URL contains the href value
      const newUrl = this.page.url();
      if (!newUrl.includes(href)) {
        console.error(`Navigation failed: Expected URL to include '${href}', but found '${newUrl}'`);
      } else {
        console.log(`Navigation succeeded: ${newUrl}`);
      }


    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async validatePricingOfBestSellerProduct() {
    const formatPrice = (price) => {
      // Split price ranges by ' - ' if present
      const prices = price.split(' - ').map(p => p.trim().replace(/[^0-9.]/g, ''));

      // Format each price with commas and two decimal places
      return prices.map(p => {
        // If price is empty, set to '0.00'
        if (p === '') return '0.00';

        // Ensure two decimal places
        p = p.replace(/^(\d*\.\d{0,2})\d*$/, '$1');

        // Format with commas
        p = p.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        return `$${p}`;
      }).join(' - ');
    };

    // Select products
    const products = await this.page.$$('.swiper-slide'); // Adjust selector if necessary

    for (const product of products) {
      // Check regular price
      const regularPriceElement = await product.$('p span');
      if (regularPriceElement) {
        const regularPriceText = await regularPriceElement.textContent();
        console.log(`Regular Price - '${regularPriceText}'`);
        const formattedRegularPrice = formatPrice(regularPriceText);
        expect(formattedRegularPrice).toMatch(/^\$[0-9,]+(\.[0-9]{2})?(\s-\s\$[0-9,]+(\.[0-9]{2})?)?$/);
      }

      const creditPriceElement = await product.$('strong.text-lg'); // Adjusted selector
      if (creditPriceElement) {
        const creditPriceText = await creditPriceElement.textContent();
        console.log(`Credit Price - '${creditPriceText}'`);
        // Remove any trailing text like '/month*' for the sake of validation
        const formattedCreditPrice = creditPriceText.replace(/\/month\*$/, '');
        expect(formattedCreditPrice).toMatch(/^\$[0-9,]+(\.[0-9]{2})?$/);
      }

      // Check promo price
      const promoPriceElement = await product.$('strong.text-base.font-bold');
      const regularPromoPriceElement = await product.$('em.line-through');
      if (promoPriceElement && regularPromoPriceElement) {
        const promoPriceText = await promoPriceElement.textContent();
        console.log(`Promo Price - '${promoPriceText}'`);
        const regularPromoPriceText = await regularPromoPriceElement.textContent();
        const formattedPromoPrice = formatPrice(promoPriceText);
        const formattedRegularPromoPrice = formatPrice(regularPromoPriceText);

        console.log(`Formatted Promo Price - '${formattedPromoPrice}'`);
        console.log(`Formatted Regular Price - '${formattedRegularPromoPrice}'`);

        // Verify the promo price style
        const promoPriceColor = await promoPriceElement.evaluate(el => window.getComputedStyle(el).color);
        const promoPriceFontWeight = await promoPriceElement.evaluate(el => window.getComputedStyle(el).fontWeight);

        console.log(`Formatted Promo Price Color - '${promoPriceColor}'`);
        console.log(`Formatted Promo Price Font Weight - '${promoPriceFontWeight}'`);

        // Verify the regular price style
        const regularPriceTextDecoration = await regularPromoPriceElement.evaluate(el => window.getComputedStyle(el).textDecoration);
        expect(regularPriceTextDecoration).toContain('line-through'); // Strikethrough style

        expect(promoPriceColor).toBe('rgb(223, 36, 41)'); // Expected color for red
        expect(promoPriceFontWeight).toBe('700'); // Bold weight

        expect(formattedPromoPrice).toMatch(/^\$[0-9,]+(\.[0-9]{2})?(\s-\s\$[0-9,]+(\.[0-9]{2})?)?$/);
        expect(formattedRegularPromoPrice).toMatch(/^\$[0-9,]+(\.[0-9]{2})?(\s-\s\$[0-9,]+(\.[0-9]{2})?)?$/);
      }
    }
  }


  async validateViewMore() {
    // Verify Global Text block content is present above the footer
    const contentBlock = await this.page.locator('//section[contains(@class,"mx-auto mt-11")]');
    await expect(contentBlock).toBeVisible();

    // Verify "View More" text link
    const viewMoreLink = await this.page.locator('a:has-text("View More")');

    // Check if the "View More" link is visible
    const isVisible = await viewMoreLink.isVisible();

    if (!isVisible) {
      console.log('"View More" link is not present.');
    } else {
      console.log('"View More" link is present. Clicking it now...');
      await viewMoreLink.click();
    }
  }

  async selectSubCategoryFromMegaMenu() {
    try {
      const randomCategory = expectedCategories[Math.floor(Math.random() * expectedCategories.length)];
      // Click the homepage category
      await this.homepage_category.click();

      // Get the first visible item in the first <ul>
      //const firstLi = await this.getRandomVisibleItem(`ul[role="menu"] > li:has-text("${randomCategory}")`);
      const firstLi = await this.getRandomVisibleItem('ul[role="menu"] > li');
      if (!firstLi) {
        console.log('No items found in the first <ul>');
        return;
      }

      // Click the first visible item in the first <ul>
      await firstLi.hover();

      await firstLi.click();
      // Wait for the expected URL and the network to be idle
      const expectedURL = new RegExp(/.*\/(categories)\/[^\/]+/);
      await this.page.waitForURL(expectedURL);
      //await expect(this.page).toHaveURL(expectedURL);
      console.log('Successfully navigated to the subcategory page.');
    } catch (error) {
      console.error('An error occurred while selecting a subcategory:', error);
    }
  }

  async getRandomVisibleItem(baseLocator, nestedSelector = null) {
    const locator = nestedSelector ? baseLocator.locator(nestedSelector) : this.page.locator(baseLocator);
    await locator.first().waitFor({ state: 'visible' });

    const itemCount = await locator.count();
    if (itemCount > 0) {
      const randomIndex = Math.floor(Math.random() * itemCount);
      return locator.nth(randomIndex);
    }

    return null;
  }


  async validateStyleFinder() {
    await expect(this.page.getByRole('heading', { name: 'Style Finder' })).toBeVisible();
    // await expect(this.page.locator('button').filter({ hasText: 'All Categories' })).toBeVisible();
    // await expect(this.page.locator('button').filter({ hasText: 'All Widths' })).toBeVisible();
    // await expect(this.page.locator('section').filter({ hasText: /^All Colors$/ }).nth(2)).toBeVisible();
    // await expect(this.page.locator('button').filter({ hasText: 'All Sizes' })).toBeVisible();
    await expect(this.page.locator('#mainContent')).toContainText('All Departments');
    await expect(this.page.locator('#mainContent')).toContainText('All Widths');
    await expect(this.page.locator('#mainContent')).toContainText('All Categories');
    await expect(this.page.locator('#mainContent')).toContainText('All Colors');
    await expect(this.page.locator('#mainContent')).toContainText('All Sizes');
    await expect(this.page.getByRole('button', { name: 'Find Now' })).toBeVisible();
  }

  async clickAllCategories() {
    await this.page.locator('button').filter({ hasText: 'All Categories' }).click();
  }

  async clickAllWidths() {
    await this.page.locator('button').filter({ hasText: 'All Widths' }).click();
  }

  async clickAllSizes() {
    await this.page.locator('button').filter({ hasText: 'All Sizes' }).click();
  }

  async selectColorInStyleFinder() {
    await (this.page.locator('section').filter({ hasText: /^All Colors$/ }).nth(2)).click();
    // this.page.locator('section').filter({ hasText: /^Style FinderWomenAll CategoriesAll WidthsAll ColorsAll SizesFind Now$/ }).getByRole('img').first().click();
    await this.page.locator('section').filter({ hasText: /^Blue$/ }).click();
    await this.page.getByRole('button', { name: 'Find Now' }).click();
    await this.page.waitForURL(/[\?&](filters=|facet=)/, { timeout: 15000 });
  }

}
