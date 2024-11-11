import test, { expect } from 'playwright/test';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const expectedMessage = 'There are no recent orders in your account, but let’s see if we can find the order you’re looking for.';   

exports.MyAccountOrderPage = class MyAccountOrderPage{
    constructor(page){
        this.page=page;
        this.myaccount_singleorder_ordernumbertextbox=page.getByLabel(myaccountpage_locator.myaccount_singleorder_ordernumbertextbox);
        this.myaccount_singleorder_billingzipcodetextbox=page.getByLabel(myaccountpage_locator.myaccount_singleorder_billingzipcodetextbox);
        this.myaccount_singleorder_viewordersbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_singleorder_viewordersbutton });
        this.myaccount_orders_singleorderlookup=page.getByRole('heading', { name: myaccountpage_locator.myaccount_orders_singleorderlookup });
    }

    
    async validateSingleOrderLookupSection(){
        await this.myaccount_orders_singleorderlookup.waitFor({state:'visible'});
        await expect(this.myaccount_orders_singleorderlookup).toBeVisible();
        await expect(this.myaccount_singleorder_ordernumbertextbox).toBeVisible();
        await expect(this.myaccount_singleorder_billingzipcodetextbox).toBeVisible();
        await expect(this.myaccount_singleorder_viewordersbutton).toBeVisible();
    }

    async enterOrderNumber(ordernumber){
        await this.myaccount_singleorder_ordernumbertextbox.click();
        await this.myaccount_singleorder_ordernumbertextbox.fill(ordernumber);
    }

    async enterZipCode(zipcode){
        await this.myaccount_singleorder_billingzipcodetextbox.click();
        await this.myaccount_singleorder_billingzipcodetextbox.fill(zipcode);
    }

    async clickOnViewOrderButton(){
        await this.myaccount_singleorder_viewordersbutton.click();
    }

    async requiredOrderNumberError(){
        await expect(this.page.getByText(accountpage_data.required_orderNumber_message)).toBeVisible();
    }
    
    async requiredZipError(){
        await expect(this.page.getByText(accountpage_data.required_zip_message)).toBeVisible();
    }

    async noOrderMessage(){
        await expect(this.page.getByText(accountpage_data.order_not_found_message)).toBeVisible();
    }

    async clickOncontactUs(){
        await this.page.locator(myaccountpage_locator.no_Order_contactUs_link).click();
        await expect(this.page).toHaveURL(/.*contact-us/);

    }

    async validateSingleOrderNavigation(){
        await expect(this.page).toHaveURL(/.*orderstatus/);
    }

    async validateNoOrderMessage(){
        const messageElement = this.page.locator('p.my-6');
        const messageText = await messageElement.textContent();
        expect(messageText.trim()).toBe(expectedMessage);
    }

    
}