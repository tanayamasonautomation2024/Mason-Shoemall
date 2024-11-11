import test, { expect } from 'playwright/test';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

exports.MyAccountSavedCCPage = class MyAccountSavedCCPage{
    constructor(page){
        this.page=page;
        this.myaccount_savedcreditcards_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_savedcreditcards_link,exact:true });
        this.myaccount_savedcc_addccdebitcard_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedcc_addccdebitcard_button });
        this.noCardMessage=page.getByText(accountpage_data.myaccount_savedcc_nodeCard_message);

    }

    async clickSavedCreditCard(){
        await this.myaccount_savedcreditcards_link.click();
        await expect(this.page).toHaveURL(/.*savedcreditcard/);
        
    }

    async displaySavedCCHeaderText(){
        const regex = new RegExp(`^${myaccountpage_locator.myaccount_savedcc_headertext}$`);
        await expect(this.page.locator('section').filter({ hasText: regex })).toBeVisible();
    }

    async validateSaveCreditCardPage(){
        this.displaySavedCCHeaderText();
        await expect(this.page.getByRole('list')).toContainText('HomeMy AccountSaved Credit Cards');
        await expect(this.myaccount_savedcc_addccdebitcard_button).toBeVisible();
    }

    async noCardMessageForNewUser(){
        await expect(this.noCardMessage).toBeVisible();
    }
    



    
}