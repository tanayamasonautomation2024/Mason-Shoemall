import test, { expect } from 'playwright/test';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

exports.MyAccountAddressPage = class MyAccountAddressPage{
    constructor(page){
        this.page=page;
        this.myaccount_addresses_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_addresses_link, exact:true });
        this.address_breadcrumb=page.getByText(myaccountpage_locator.address_breadcrumb);
        this.myaccount_addnewaddress_button=page.getByRole('heading', { name: myaccountpage_locator.myaccount_addnewaddress_button }).getByRole('button');
        this.noAddressMessage=page.getByText(accountpage_data.myaccount_sb_nodefaultaddress_section);

    }

    async clickMyAccountAddressLink(){
        await this.myaccount_addresses_link.click();
    }


    async displayAddressSection(){
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_addresses_section);
    }
    

    async displayAddressPage(){
        await this.clickMyAccountAddressLink();
        await expect(this.page).toHaveURL(/.*addresses/);
        await this.displayAddressSection();
        await expect(this.myaccount_addnewaddress_button).toBeVisible();
        await expect(this.address_breadcrumb).toBeVisible();
    }

    async displayAddNewAddressLink(){
        const addaddress_link = new RegExp(`^${myaccountpage_locator.address_add_new_address_link}$`);
       // await expect(this.page.getByRole('button', { name: myaccountpage_locator.address_add_new_address_link})).toBeVisible();
        await expect(this.page.locator('section').filter({ hasText:addaddress_link }).getByRole('button')).toBeVisible();
    }

    async noAddressMessageForNewUser(){
        await expect(this.noAddressMessage).toBeVisible();
    }
    



    
}