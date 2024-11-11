import test, { expect } from 'playwright/test';
const newuser_myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));


const not_found_text="We’re sorry, but we couldn’t find the page you’re looking for. Please check the address, or continue shopping.";
const continue_shopping_button='Continue Shopping'

exports.NotFoundPage = class NotFoundPage{
    constructor(page){
        this.page=page;
        this.not_found_header=page.getByRole('heading', { name: 'Page Not Found' });
        this.not_found_text=page.getByText(not_found_text);
      
        
    }

    async validateNotFoundHeaderDisplay(){
        await (this.not_found_header).waitFor({state:"visible"});
    }

    async validateHeaderAtCentre(){
         // Optionally, you can assert the position of the logo if needed
        const logoPosition = await this.not_found_header.boundingBox();
        const pageViewport = await this.page.viewportSize();
        const centerX = logoPosition.x + logoPosition.width / 2;
        const centerY = logoPosition.y + logoPosition.height / 2;
        const pageCenterX = pageViewport.width / 2;
        const pageCenterY = pageViewport.height / 2;
        const tolerance = 10; // Tolerance in pixels for center alignment

        // Assert the logo is centered within a certain tolerance
        expect(centerX).toBeGreaterThan(pageCenterX - tolerance);
        expect(centerX).toBeLessThan(pageCenterX + tolerance);
       
    }

    async validateNotFoundSubtitle(){
        await expect(this.not_found_text).toBeVisible();
    }

    

    async validateNotFoundTextUnderHeader(){
        const logoBox = await this.not_found_header.boundingBox();
        const subtitleBox = await this.not_found_text.boundingBox();

        // Verify subtitle is directly below the logo (within a tolerance)
        const tolerance = 20; // Adjust tolerance as per your layout needs

        expect(subtitleBox.y).toBeGreaterThan(logoBox.y + logoBox.height - tolerance);
        expect(subtitleBox.y).toBeLessThan(logoBox.y + logoBox.height + tolerance);

        // Log verification
        console.log("Title is correctly positioned under the header.");

    }

    

    async validateContinueShoppingButton(){
        await expect(this.page.getByRole('button', { name: continue_shopping_button })).toBeVisible();
        await this.page.getByRole('button', { name: continue_shopping_button }).click();
    }

    }