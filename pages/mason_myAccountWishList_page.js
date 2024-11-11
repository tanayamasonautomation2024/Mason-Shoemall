import { count } from 'console';
import test, { expect } from 'playwright/test';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

exports.MyAccountWishListPage = class MyAccountWishListPage{
    constructor(page){
        this.page=page;
        this.myaccount_savedcc_addccdebitcard_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedcc_addccdebitcard_button });
        this.noWishListMessage=page.getByText(accountpage_data.myaccount_no_wishlist_message);
        this.wishlist_remove_success=this.page.getByText(accountpage_data.wishlist_remove_success_message);
        this.miniCartHeaderText = page.getByRole('button', { name: 'My Cart' });
    }

    
    
    async validateWishListPage(){
        await expect(this.page).toHaveURL(/.*wishlist/);
    }

    async noWishListMessageForNewUser(){
        await expect(this.noWishListMessage).toBeVisible();
    }

    async validateWishlistBreadcrumb(){
        await expect(this.page.getByText(myaccountpage_locator.wishlist_breadcrumb)).toBeVisible();    
    }

    async validateItemCountIsDisplayed(){
        // Check that the 'Wish ListX Items' text is visible
        const wishListElement = await this.page.getByText(/Wish List\d+ Items/);
        await (wishListElement).waitFor({state:"visible"});

        // Extract the product count from the text
        const wishListText = await wishListElement.innerText();
        const productCountMatch = wishListText.match(/Wish List(\d+) Items/);
        const productCount = productCountMatch ? productCountMatch[1] + ' Items' : '';
        
        // Verify the product count is shown in the page title
        const pageTitle = await this.page.title();
        console.log(pageTitle);
        // Assert that the page title contains the product count
        expect(pageTitle).toContain(productCount);

        // Get text content of h1 and strong elements
        const wishlistText = await this.page.$eval('section.flex h1', element => element.textContent.trim());
        const itemCountInTitle = await this.page.$eval('section.flex strong', element => element.textContent.trim());

        // Check if both h1 and strong contain the pattern
        const pattern = /Wish List (\d+) Items/;
        const isMatching = pattern.test(wishlistText) && pattern.test(itemCountInTitle);

        // Define the regular expression to extract the number from "Items"
        const regex = /(\d+) Items/;

        // Extract the number of items from the strong text
        const match = regex.exec(itemCountInTitle);
        const itemCount = match ? match[1] : null;

        const itemCountNum = parseInt(itemCount, 10);
        console.log(itemCountNum);
        
    }

    async validateTheWishListedItem(){
        
        // Select all <li> elements containing product images
        const productItems = await this.page.$$(myaccountpage_locator.wishlist_items);
        const itemCount = productItems.length;
        console.log(`Total product items: ${itemCount}`);

        const maxItemsToCheck = Math.min(itemCount, 5);

        const itemsToCheck = productItems.slice(0, maxItemsToCheck);

        // Iterate over each product item
        for (const item of itemsToCheck) {
            // Find the image within the current <li>
            const img = await item.$('img');
            expect(img).not.toBeNull();

            // Find the wishlist icon within the current <li>
            const wishlistIcon = await item.$(myaccountpage_locator.wishlist_icon);
            expect(wishlistIcon).not.toBeNull();

            // Verify Product label
            // const label = await item.$('h6.font-medium.leading-5');
            // expect(label).not.toBeNull();

            // Verify Brand/Product name
            const productName = await item.$(myaccountpage_locator.wishlist_productname);
            expect(productName).not.toBeNull();
          

            // Verify Pricing
            const pricing = await item.$(myaccountpage_locator.wishlist_pricing);
           // expect(pricing).not.toBeNull();
           console.log(pricing);

            // Verify Product reviews
            const reviews = await item.$(myaccountpage_locator.wishlist_productReview);
            console.log(reviews);

            let anyOutOfStock = false;

            const maxItemsToCheck = Math.min(itemCount, 5);



        // Iterate through each product and check if it is out of stock
        for (let i = 0; i < maxItemsToCheck; i++) {
            const product = productItems[i];
            const outOfStockButton = await product.$('button:has-text("'+myaccountpage_locator.wishlist_out_of_stock+'")');

            if (outOfStockButton) {
            const isDisabled = await outOfStockButton.isDisabled();
            expect(isDisabled).toBe(true);
            //console.log("Out of stock is disabled")
            }
            else{
                const addToCartButton = await product.$('button:has-text("'+myaccountpage_locator.wishlist_add_to_cart+'")');
                const isDisabled = await addToCartButton.isDisabled();
                expect(isDisabled).toBe(false);
                //console.log("Add to cart is enabled")
            }

        }

    }
    }


    async validateAlignmentInWishList(){
        const productItems = await this.page.$$(myaccountpage_locator.wishlist_items);
        const itemCount = productItems.length;
        console.log(`Total product items: ${itemCount}`);

        // Iterate over each product item
        for (const item of productItems) {
        const pricing = await item.$(myaccountpage_locator.wishlist_pricing);
        const pricingRect = await pricing.boundingBox();
        //const pricingBottom = pricingRect.bottom;

        const productName = await item.$(myaccountpage_locator.wishlist_productname);
        const productInfoRect = await productName.boundingBox();
        //const productInfoBottom = productInfoRect.bottom;

        const reviews = await item.$(myaccountpage_locator.wishlist_productReview);
        const reviewInfoRect = await reviews.boundingBox();
        //const reviewInfoBottom = reviewInfoRect.bottom;

        // console.log('Pricing Rect:', pricingRect);
        // console.log('Product Info Rect:', productInfoRect);
        
        // Verify pricing is below product name and above reviews
        expect(pricingRect.y).toBeGreaterThan(productInfoRect.y);
        expect(pricingRect.y).toBeLessThan(reviewInfoRect.y);

        // Verify pricing is in the same horizontal row for all products
        expect(pricingRect.x).toBe(productInfoRect.x);

 

        //expect(pricingBottom).toBeLessThanOrEqual(productInfoBottom, 'Pricing should appear at the bottom of product information');
        //expect(reviewInfoBottom).toBeLessThanOrEqual(pricingBottom, 'Pricing should appear at the top of product review');

    }
}

async validateAlignmentInWishListNew() {
    const productItems = await this.page.$$(myaccountpage_locator.wishlist_items);
    const itemCount = productItems.length;
    console.log(`Total product items: ${itemCount}`);

    for (const item of productItems) {
        const pricing = await item.$(myaccountpage_locator.wishlist_pricing);
        const productName = await item.$(myaccountpage_locator.wishlist_productname);
        const reviews = await item.$(myaccountpage_locator.wishlist_productReview);

        if (pricing && productName && reviews) {
            const pricingRect = await pricing.boundingBox();
            const productInfoRect = await productName.boundingBox();
            const reviewInfoRect = await reviews.boundingBox();

            if (pricingRect && productInfoRect && reviewInfoRect) {
                // Verify pricing is below product name and above reviews
                expect(pricingRect.y).toBeGreaterThan(productInfoRect.y);
                expect(pricingRect.y).toBeLessThan(reviewInfoRect.y);

                // Verify pricing is in the same horizontal row for all products
                expect(pricingRect.x).toBe(productInfoRect.x);
            } else {
                console.log('Bounding box not available for one of the elements');
            }
        } else {
            console.log('One of the elements (pricing, productName, reviews) is not available');
        }
    }
}

async validatePricingFormatNew() {
    await this.page.waitForLoadState('networkidle');

    // Select all the product items
    const productItems = await this.page.$$('ul.grid > section > li');
    const itemCount = productItems.length;
    console.log(`Total product items: ${itemCount}`);

    // Define a regular expression to match dollar and cent format (e.g., $xx.xx)
    const priceRegex = /^\$\d+\.\d{2}$/;

    
// Choose a random product item
    const item = productItems[0];
        // Select the pricing element within the current product item
        const pricingElement = await item.waitForSelector('section > section > p');
        await pricingElement.waitForElementState('visible');

        // Get the inner text of the pricing element
        const regularPriceText = await pricingElement.innerText();
        console.log(regularPriceText);

        // Verify regular price format
        expect(regularPriceText).toMatch(priceRegex);
    
}

async validatePricingFormat(){ 
    await this.page.waitForLoadState('networkidle');
    const productItems = await this.page.$$(myaccountpage_locator.wishlist_items);
        const itemCount = productItems.length;
        console.log(`Total product items: ${itemCount}`);

        // Iterate over each product item
            for (const item of productItems) {
            const pricing = await item.waitForSelector(myaccountpage_locator.wishlist_pricing);
            await pricing.waitForElementState('visible');

            

            const regularPriceText = await pricing.innerText();
            console.log(regularPriceText);

        // Define a regular expression to match dollar and cent format (e.g., $xx.xx)
            const priceRegex = /^\$\d+\.\d{2}$/;

        // Verify regular price format
            expect(regularPriceText).toMatch(priceRegex);

}
}

async validateHeartIconIsFilled(){
    const productItems = await this.page.$$(myaccountpage_locator.wishlist_items);
        const itemCount = productItems.length;
        console.log(`Total product items: ${itemCount}`);

        const maxItemsToCheck = Math.min(itemCount, 10);

        for (let i = 0; i < maxItemsToCheck; i++) {
            const productItem = productItems[i];
            const wishlistIcon = await productItem.$(myaccountpage_locator.wishlist_icon);
            expect(wishlistIcon).not.toBeNull();
    
            const pathLocator = this.page.locator(myaccountpage_locator.wishlist_items)
                                        .nth(i)
                                        .locator(myaccountpage_locator.wishlist_icon)
                                        .locator('svg path');
            
            await pathLocator.waitFor({ state: 'visible' });
    
            const fillAttribute = await pathLocator.getAttribute('fill');
            console.log(`Path fill attribute for product ${i}: ${fillAttribute}`);
            expect(fillAttribute).not.toBe('none');
        }
}

async validateRemoveItemFromWishList(){
        
    const productItems = await this.page.$$(myaccountpage_locator.wishlist_items);
    const initialItemCount = productItems.length;
    const initialPageTitle = await this.page.title();
    console.log(initialPageTitle);

    if (initialItemCount === 0) {
        console.log('Wishlist is empty. Skipping removal validation.');
        return; // Exit the function early if wishlist is empty
    }

    // Get a random index to remove a product
    const randomIndex = Math.floor(Math.random() * productItems.length);
    const itemToRemove = productItems[randomIndex];

    // Find the wishlist icon within the item to be removed
    const wishlistIconToRemove = await itemToRemove.$(myaccountpage_locator.wishlist_icon);

    // Click on the wishlist icon to remove the item
    await wishlistIconToRemove.click();

    // Wait for the success message to appear
    await expect(this.page.getByText(accountpage_data.wishlist_remove_partMessage)).toBeVisible({timeout:10000});
    const successMessage = await this.page.getByText(accountpage_data.wishlist_remove_partMessage);
   // await successMessage.waitForElementState('visible');
    const successMessageinnerText = await successMessage.textContent();
    // const successMessageSelector = myaccountpage_locator.wishlist_remove_success;
    // const successMessageElement = await this.page.waitForSelector(successMessageSelector);
    // // Extract the product name from the success message
    // const successMessageText = await successMessageElement.innerText();
    const removedProduct = successMessageinnerText.match(new RegExp(accountpage_data.wishlist_remove_success_message))[1];

    //console.log(removedProduct);

    // Get the updated product count
    const updatedProductItems = await this.page.$$(myaccountpage_locator.wishlist_items);
    const updatedItemCount = updatedProductItems.length;

    // Verify that the count has decreased by one
    expect(updatedItemCount).toBe(initialItemCount - 1);

    // Verify that the success message contains the correct product name
    expect(successMessageinnerText).toContain(removedProduct);


    // Check the page title after removing the item
    // Wait for the section to appear
  //const wishListSection = await this.page.waitForSelector('section.flex');

  

  // Get text content of h1 and strong elements
  const wishlistText = await this.page.$eval('section.flex h1', element => element.textContent.trim());
  const itemCountInTitle = await this.page.$eval('section.flex strong', element => element.textContent.trim());

  // Check if both h1 and strong contain the pattern
  const pattern = /Wish List (\d+) Items/;
  const isMatching = pattern.test(wishlistText) && pattern.test(itemCountInTitle);
   // Define the regular expression
   
   // Define the regular expression to extract the number from "Items"
  const regex = /(\d+) Items/;

  // Extract the number of items from the strong text
  const match = regex.exec(itemCountInTitle);
  const itemCount = match ? match[1] : null;

  const itemCountNum = parseInt(itemCount, 10);

    // Assert that the page title contains the updated product count
    expect(itemCountNum).toBe(updatedItemCount);
    
}


async validatePDPNavigationFromImageLink() {
    // Select all product items
    await this.page.locator('ul.grid > section > li').first().waitFor({state:'visible'});
    const productItems = await this.page.$$('ul.grid > section > li');
    const itemCount = productItems.length;
    console.log(`Total product items: ${itemCount}`);

    // Select the first product item
    const item = productItems[0];

    // Get the link from the <a> tag inside the product item
    const linkElement = await item.$('a'); // Get the <a> element
    if (!linkElement) {
        throw new Error('Link element not found in the product item.');
    }
    const productPageLink = await linkElement.getAttribute('href');

    // Construct the absolute URL for the PDP page
    const expectedPdpUrl = new URL(productPageLink, this.page.url()).toString();
    console.log(`Expected PDP URL: ${expectedPdpUrl}`);

    // Click on the image to navigate to the PDP
    const image = await item.$('img'); // Get the <img> element
    if (!image) {
        throw new Error('Image element not found in the product item.');
    }
    
    await Promise.all([
        this.page.waitForNavigation({ url: expectedPdpUrl }), // Wait for navigation
        image.click(), // Click the image
    ]);

    // Verify that the page navigated to the expected PDP URL
    await expect(this.page).toHaveURL(expectedPdpUrl);
}


async validatePDPNavigationFromTitleLink(){
    const productItemSelector = 'ul.grid > section > li';
    const firstProductItem = this.page.locator(productItemSelector).first();

    const productNameLink = await firstProductItem.locator('a').nth(1).getAttribute('href'); 
    const expectedPdpUrl = new URL(productNameLink, this.page.url()).toString();
    console.log(`Expected PDP URL: ${expectedPdpUrl}`);

    await Promise.all([
        this.page.waitForNavigation({ url: expectedPdpUrl }), 
        firstProductItem.locator('a').nth(1).click(), 
    ]);

    await expect(this.page).toHaveURL(expectedPdpUrl);
}


async validateViewMoreDetails(){
    try {
        
        await this.page.waitForSelector('button'); 
        const moveToCartButtons = await this.page.$$('button:has-text("Move to Bag")');
        if (moveToCartButtons.length === 0) {
            console.log('No "Move to Bag" buttons found.');
          } else {
            // Click the first "Move to Cart" button
            const button = moveToCartButtons[0];
            await button.click();
            console.log('Clicked the first "Move to Bag" button.');
            await this.page.waitForTimeout(2000);
            const myCartVisible = await this.page.isVisible('section.h-full.bg-white.vaul-scrollable');
            if (myCartVisible) {
                console.log('My Cart drawer is visible. Product has no variants.');
              } else {
                const chooseOptionsVisible = await this.page.isVisible(
                  'strong.text-lg.font-bold.leading-5.text-black.vaul-scrollable');
                  console.log('Choose Option drawer is visible. Product has variants.');
                if (chooseOptionsVisible) {
                    console.log('Variants are present.');
                    await this.page.waitForSelector('button:has-text("View More Details")', { state: 'visible' });
                    const viewMoreDetailsButton = await this.page.$(
                      'button:has-text("View More Details")'
                    );

                    if (viewMoreDetailsButton) {
                        await viewMoreDetailsButton.click();
                        console.log('Clicked the "View More Details" button.');
                      } else {
                        console.log('No "View More Details" button found.');
                      }
                    } else {
                      console.log('Neither "My Cart" nor "Choose Options" drawers are visible.');
                     
                    }
                  }
                }
            }

 catch (error) {
    console.error('An error occurred:', error);
  } 
}

async validateCartCount(){
    const cartCountElement = this.page.locator('section.mt.absolute');

        try {
            await cartCountElement.waitFor({ state: 'visible', timeout: 5000 });
            const cartItemsCount = await cartCountElement.textContent();
            console.log(cartItemsCount);
            return cartItemsCount.trim();
        } catch (error) {
            console.log('Cart count element is not visible:', error);
            return '0';
        }
}


async closeMiniCartDrawer() {
    await this.miniCartHeaderText.click();
}


async validateCartCountChange(){
    try {
        
        await this.page.waitForSelector('button'); 
        const moveToCartButtons = await this.page.$$('button:has-text("Move to Bag")');
        if (moveToCartButtons.length === 0) {
            console.log('No "Move to Bag" buttons found.');
          } else {
            const initial_cart_count=await this.validateCartCount();
            const button = moveToCartButtons[0];
            await button.click();
            console.log('Clicked the first "Move to Bag" button.');
            await this.page.waitForTimeout(2000);
            const myCartVisible = await this.page.isVisible('section.h-full.bg-white.vaul-scrollable');
            if (myCartVisible) {
                console.log('My Cart drawer is visible. Product has no variants.');
                await this.closeMiniCartDrawer();
                const current_cart_count=await this.validateCartCount();
                if (current_cart_count > initial_cart_count) {
                    console.log('Cart count increased successfully.');
                } else {
                    console.log('Cart count did not increase.');
                }

              } else {
                console.log("My Cart is not visible");
                  }
                }
            }

 catch (error) {
    console.error('An error occurred:', error);
  } 
}


async validateCreditPriceFormat(){
  const firstProductItem = await this.page.locator('li.max-w-48.lg\\:max-w-72').first();
  const creditPricingPattern = /^\$\d+\.\d{2}\/month\*$/;
  const creditPricingLocator = firstProductItem.locator('section > section > p.font-bold').nth(1);
  const creditPricingText = await creditPricingLocator.textContent();
  console.log(`First Item Credit Pricing: ${creditPricingText}`);
  expect(creditPricingText.trim()).toMatch(creditPricingPattern);

  }
}

