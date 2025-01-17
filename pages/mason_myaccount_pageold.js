import test, { expect } from 'playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { fakerEN_US } from '@faker-js/faker';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));

exports.MyAccountPage = class MyAccountPage{
    constructor(page){
        this.page=page;
        this.myaccount_credit_link=page.getByRole('button', { name: myaccountpage_locator.myaccount_credit_link,exact:true }).first();
        this.myaccount_makepayment_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_makepayment_link, exact:true }).first();
        this.myaccount_makepayment_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_makepayment_link, exact:true }).first();
        this.myaccount_startshopping_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_startshopping_button, exact:true }).first();
        this.myaccount_orders_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_orders_link, exact:true }); 
        this.myaccount_addresses_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_addresses_link, exact:true });
        this.myaccount_savedcreditcards_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_savedcreditcards_link,exact:true });      
        this.myaccount_wishlist_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_wishlist_link,exact:true }).first();
        this.myaccount_needhelp_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_needhelp_link });
        this.myaccount_myprofile_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_myprofile_link, exact:true });
        this.myaccount_orders_section=page.getByRole('heading', { name: myaccountpage_locator.myaccount_orders_section }).nth(1);
        this.myaccount_viewmyprofile_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_viewmyprofile_link });
        this.myaccount_viewsavedcc_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_viewsavedcc_link });
        this.myaccount_vieworders_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_vieworders_link });
        this.myaccount_viewaddresses_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_viewaddresses_link });
        this.myaccount_viewwishlist_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_viewwishlist_link });
        this.myaccount_myaccount_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_myaccount_link });
        this.myaccount_credit_payments=page.getByRole('heading', { name: myaccountpage_locator.myaccount_credit_payments });
        this.myaccount_credit_paymentdue=page.getByRole('heading', { name: myaccountpage_locator.myaccount_credit_paymentdue });
        this.myaccount_credit_minimumdue=page.getByRole('heading', { name: myaccountpage_locator.myaccount_credit_minimumdue });
        this.myaccount_credit_totalbalance=page.getByRole('heading', { name: myaccountpage_locator.myaccount_credit_totalbalance });
        this.myaccount_addnewaddress_section=page.locator('section').filter({ hasText: myaccountpage_locator.myaccount_addnewaddress_section });
        this.myaccount_addnewaddress_firstname=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_firstname);
        this.myaccount_addnewaddress_lastname=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_lastname);
        this.myaccount_addnewaddress_addressline1=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_addressline1);
        this.myaccount_addnewaddress_city=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_city);
        this.myaccount_addnewaddress_zipcode=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_zipcode);
        this.myaccount_addnewaddress_phonenumber=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_phonenumber);
        this.myaccount_addnewaddress_savedefaultaddcheckbox=page.getByRole(myaccountpage_locator.myaccount_addnewaddress_savedefaultaddcheckbox);
        this.myaccount_addnewaddress_selectstate_dropdown=page.getByRole(myaccountpage_locator.myaccount_addnewaddress_selectstate_dropdown);
        this.myaccount_addnewaddress_button=page.getByRole('heading', { name: myaccountpage_locator.myaccount_addnewaddress_button }).getByRole('button');
        this.myaccount_addnewaddress_saveaddressbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_addnewaddress_saveaddressbutton });
        this.myaccount_orders_lastorderdropdown=page.getByRole('button', { name: myaccountpage_locator.myaccount_orders_lastorderdropdown });
        this.myaccount_orders_searchorderplaceholder=page.getByLabel(myaccountpage_locator.myaccount_orders_searchorderplaceholder);
        this.myaccount_myprofile_contactinformation=page.getByRole('heading', { name: myaccountpage_locator.myaccount_myprofile_contactinformation });
        this.myaccount_myprofile_savechanges_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_myprofile_savechanges_button });
        this.myaccount_myprofile_changepassword=page.locator(myaccountpage_locator.myaccount_myprofile_changepassword);
        this.myaccount_savedcc_addccdebitcard_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedcc_addccdebitcard_button });
        this.myaccount_savedaddress_edit_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_edit_button }).first();
        this.myaccount_savedaddress_remove_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_remove_button }).first();
        this.myaccount_savedaddress_setasdefault_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_setasdefault_button });
        this.myaccount_savedaddress_cancel_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_cancel_button }).first();
        this.myaccount_savedaddress_getnames=page.locator(myaccountpage_locator.myaccount_savedaddress_getnames);
        this.myaccount_savedaddress_getaddressline1=page.locator(myaccountpage_locator.myaccount_savedaddress_getaddressline1);
        this.myaccount_editaddress_section=page.getByText(myaccountpage_locator.myaccount_editaddress_section);
        this.myaccount_myprofile_email=page.getByLabel(myaccountpage_locator.myaccount_myprofile_email);
        this.myaccount_changepassword_link = page.getByRole('link', { name: myaccountpage_locator.myaccount_changepassword,exact:true }).first();
        this.myaccount_changepassword_button = page.getByRole('button', { name: myaccountpage_locator.myaccount_changepassword });
        this.myaccount_changepassword_currentpassword=page.getByLabel(myaccountpage_locator.myaccount_changepassword_currentpassword);
        this.myaccount_changepassword_newpassword=page.getByLabel(myaccountpage_locator.myaccount_changepassword_newpassword);
        this.myaccount_orders_vieworderdetails=page.getByRole('link', { name: myaccountpage_locator.myaccount_orders_vieworderdetails }).first();
        this.myaccount_orders_withoutordersbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_orders_withoutordersbutton });
        this.myaccount_orders_singleorderlookup=page.getByRole('heading', { name: myaccountpage_locator.myaccount_orders_singleorderlookup });
        this.myaccount_singleorder_ordernumbertextbox=page.getByLabel(myaccountpage_locator.myaccount_singleorder_ordernumbertextbox);
        this.myaccount_singleorder_billingzipcodetextbox=page.getByLabel(myaccountpage_locator.myaccount_singleorder_billingzipcodetextbox);
        this.myaccount_singleorder_viewordersbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_singleorder_viewordersbutton });
        this.myaccount_savedcc_addccdebitcard_button=page.getByRole('heading', { name: myaccountpage_locator.myaccount_savedcc_addccdebitcard_button }).getByRole('button');
        this.myaccount_cc_savecard_number=page.locator(myaccountpage_locator.myaccount_cc_savecard_number);
        this.myaccount_cc_savecard_expdate=page.locator(myaccountpage_locator.myaccount_cc_savecard_expdate).first();
        this.myaccount_cc_cardnumber_textbox=page.getByLabel(myaccountpage_locator.myaccount_cc_cardnumber_textbox);
        this.myaccount_cc_expirydate_textbox=page.getByLabel(myaccountpage_locator.myaccount_cc_expirydate_textbox);
        this.myaccount_cc_securitycode_textbox=page.getByLabel(myaccountpage_locator.myaccount_cc_securitycode_textbox);
        this.myaccount_cc_savecard_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_cc_savecard_button });
        this.myaccount_savedefaultcc_checkbox=page.locator('form').getByRole(myaccountpage_locator.myaccount_savedefaultcc_checkbox);
        this.myaccount_signout_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_signout_button });
        this.myaccount_makeapayment_acctinformation_headertext=page.getByRole('heading', { name: myaccountpage_locator.myaccount_makeapayment_acctinformation_headertext });
        this.myaccount_makeapayment_acctinformation_custaccountnum=page.getByText(myaccountpage_locator.myaccount_makeapayment_acctinformation_custaccountnum);
        this.myaccount_makeapayment_acctinformation_acctstatus=page.getByText(myaccountpage_locator.myaccount_makeapayment_acctinformation_acctstatus);
        this.myaccount_makeapayment_acctinformation_acctstatuspastdue=page.getByText(myaccountpage_locator.myaccount_makeapayment_acctinformation_acctstatuspastdue);
        this.myaccount_makeapayment_acctinformation_lastsd=page.getByText(myaccountpage_locator.myaccount_makeapayment_acctinformation_lastsd);
        this.myaccount_makeapayment_acctinformation_nextsd=page.getByText(myaccountpage_locator.myaccount_makeapayment_acctinformation_nextsd);
        this.myaccount_makepayment_creditstateadd=page.getByRole('heading', { name: myaccountpage_locator.myaccount_makepayment_creditstateadd });
        this.myaccount_makepayment_creditstateadd_editbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_makepayment_creditstateadd_editbutton });
        this.myaccount_sbc_creditstatement_editaddress=page.locator(`id=${myaccountpage_locator.myaccount_sbc_creditstatement_editaddress}`);
        this.myaccount_sbc_creditstatement_editcity=page.locator(`id=${myaccountpage_locator.myaccount_sbc_creditstatement_editcity}`);
        this.myaccount_sbc_creditstatement_editstate=page.locator(`id=${myaccountpage_locator.myaccount_sbc_creditstatement_editstate}`);
        this.myaccount_sbc_creditstatement_editzipcode=page.locator(`id=${myaccountpage_locator.myaccount_sbc_creditstatement_editzipcode}`);
        this.myaccount_sbc_creditstatement_editphonenumber=page.locator(`id=${myaccountpage_locator.myaccount_sbc_creditstatement_editphonenumber}`);
        this.myaccount_sbc_creditstatement_saveaddressbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_sbc_creditstatement_saveaddressbutton });
        this.myaccount_sbc_creditstatement_canceladdressbutton=page.getByRole('button', { name: myaccountpage_locator.myaccount_sbc_creditstatement_canceladdressbutton });
        this.address_breadcrumb=page.getByText(myaccountpage_locator.address_breadcrumb);
        this.myaccount_orderStatus_link=page.getByRole('link', { name: myaccountpage_locator.myaccount_orderStatus_link, exact:true });
    }

    async displayMyAccountLeftNavigationLink(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.myaccount_credit_link).toBeVisible();
        await expect(this.myaccount_makepayment_link).toBeVisible();
        await expect(this.myaccount_orders_link).toBeVisible();
        await expect(this.myaccount_addresses_link).toBeVisible();
        await expect(this.myaccount_savedcreditcards_link).toBeVisible();
        await expect(this.myaccount_wishlist_link).toBeVisible();
        //await expect(this.myaccount_needhelp_link).toBeVisible();
        await expect(this.myaccount_myprofile_link).toBeVisible();

    }

    async validatedSignedInAccountDrawerItems(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.myaccount_myaccount_link).toBeVisible();
        await expect(this.myaccount_addresses_link).toBeVisible();
        await expect(this.myaccount_savedcreditcards_link).toBeVisible();
        await expect(this.myaccount_needhelp_link).toBeVisible();
        await expect(this.myaccount_myprofile_link).toBeVisible();
        await expect(this.myaccount_changepassword_link).toBeVisible();
        await expect(this.myaccount_signout_button).toBeVisible();

    }

    async displayOrderSection(){
        await expect(this.myaccount_orders_section).toBeVisible();
    }

    async displayAddressSection(){
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_addresses_section);
    }

    async displayViewMyProfileLink(){
        await expect(this.myaccount_viewmyprofile_link).toBeVisible();
    }

    async displayViewSavedCCLink(){
        await expect(this.myaccount_viewsavedcc_link).toBeVisible();
    }
    async displayViewOrdersLink(){
        await expect(this.myaccount_vieworders_link).toBeVisible();
    }
    async displayViewAddressesLink(){
        await expect(this.myaccount_viewaddresses_link).toBeVisible();
    }

    async clickMyAccountCreditLink(){
        await this.myaccount_credit_link.click();
        //await this.page.waitForURL('**account/stoneberrycredit/');
    }
    async clickMyAccountMakeaPaymentLink(){
        await this.myaccount_makepayment_link.click();
    }
    async clickMyAccountOrderLink(){
        await this.myaccount_orders_link.click();
    }
    async clickMyAccountAddressLink(){
        await this.myaccount_addresses_link.click();
        await this.displayAddressSection();
    }
    async clickMyAccountSavedCCLink(){
        await this.myaccount_savedcreditcards_link.click();
    }
    async clickMyAccountWishListLink(){
        await this.myaccount_wishlist_link.click();
        await expect(this.page).toHaveURL(/.*wishlist/);
    }
    async clickMyAccountNeedHelpLink(){
        await this.myaccount_needhelp_link.click();
    }
    async clickMyAccountMyProfileLink(){
        //await this.myaccount_myprofile_link.toBeVisible();
        await this.myaccount_myprofile_link.click();
        const my_profile_button = await this.page.getByRole('link', { name: myaccountpage_locator.myaccount_myprofile_link, exact:true });
        await my_profile_button.click();
        // Fluent wait using waitForFunction to check URL condition
        const regexPattern = /.*myprofile/; 
        await this.page.waitForFunction(
          (regex) => new RegExp(regex).test(document.location.href),
          regexPattern.toString(),
          { timeout: 30000, polling: 1000 } // Maximum timeout of 30 seconds, polling interval of 1 second
        );
    }
    async clickMyAccountViewSavedCCLink(){
        await this.myaccount_viewsavedcc_link.click();
        await expect(this.page).toHaveURL(/.*\/account\/savedcreditcard\//);
    }

    async clickMyAccountOrderStatusLink(){
        await this.myaccount_orderStatus_link.click();
    }

    async clickMyAccountViewMyProfileLink(){
        await this.myaccount_viewmyprofile_link.click();
        await expect(this.page).toHaveURL(/.*\/account\/myprofile\//);
    }
    async clickMyAccountViewOrderLink(){
        await this.myaccount_vieworders_link.click();
        await expect(this.page).toHaveURL(/.*\/account\/orders\//);
    }
    async clickMyAccountViewAddressLink(){
        await this.myaccount_viewaddresses_link.click();
        await expect(this.page).toHaveURL(/.*\/account\/addresses\//);
    }
    async clickMyAccountViewWishListLink(){
        await this.myaccount_viewwishlist_link.click();
        await expect(this.page).toHaveURL(/.*\/account\/wishlist\//);
    }
    async clickAddNewAddressButton(){
        await this.myaccount_addnewaddress_button.click();
    }

    async viewMyAccountDefaultAddress(defaultAddress){
        await expect(this.page.locator('body')).toContainText(defaultAddress);
    }
    async viewMyAccountMyProfileDetails(userProfile){
        await expect(this.page.locator('body')).toContainText(userProfile);
    }
    async clickOnMyAccountLink(){
        await this.myaccount_myaccount_link.click();
        await this.page.waitForURL('**/account/dashboard/');
    }
    async viewMyAccountCreditDetails(){
        await expect(this.myaccount_credit_payments).toBeVisible();
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_credit_creditlimit);
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_credit_availablecredit);
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_credit_paymentdue);
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_credit_minimumdue);
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_credit_totalbalance);
        
    }

    async noDefaultAddressSaved(nodefaultaddresses){
        await expect(this.page.locator('body')).toContainText(nodefaultaddresses);
    }

    async displayAddNewAddressSection(){
        await expect(this.page.locator('section').filter({ hasText: myaccountpage_locator.myaccount_addnewaddress_section }).nth(3)).toBeVisible();
    }

    async enterFirstName(enterFirstName){
        await this.myaccount_addnewaddress_firstname.fill(enterFirstName);
    }
    async enterLastName(enterLastName){
        await this.myaccount_addnewaddress_lastname.fill(enterLastName);
    }
    async enterAddressline1(enterAddressline1){
        await this.myaccount_addnewaddress_addressline1.fill(enterAddressline1);
    }
    async enterCity(enterCity){
        await this.myaccount_addnewaddress_city.fill(enterCity);
    }
    async selectState(selectState){
        await this.myaccount_addnewaddress_selectstate_dropdown.selectOption(selectState);
    }
    async enterZipcode(enterZipcode){
        await this.myaccount_addnewaddress_zipcode.fill(enterZipcode);
    }
    async enterPhoneNumber(enterPhonenumber){
        await this.myaccount_addnewaddress_phonenumber.fill(enterPhonenumber);
    }
    async selectSaveDefaultaddressCheckbox(){
        await this.myaccount_addnewaddress_savedefaultaddcheckbox.click();
    }
    async clickSaveAddressButton(){
        await this.myaccount_addnewaddress_saveaddressbutton.click();
    }
    async displaySavedAddressMessage(successAddressMessage){
        await expect(this.page.locator('body')).toContainText(successAddressMessage);
    }

    async displayOrdersPage(){
        await expect(page.locator('section').filter({ hasText: /^Orders$/ }).getByRole('paragraph')).toBeVisible();
    }

    async displayLastOrderDropdown(){
        await expect(this.myaccount_orders_lastorderdropdown).toBeVisible();
    }

    async displaySearchOrderPlaceHolder(){
        await expect(this.myaccount_orders_searchorderplaceholder).toBeVisible();
    }

    async displayOrderNumberDetails(){
        await expect(page.locator('body')).toContainText(myaccountpage_locator.myaccount_orders_ordernumberdetails);
        
    }

    async displayAddressPage(){
        await this.clickMyAccountAddressLink();
        await expect(this.page).toHaveURL(/.*addresses/);
        await this.displayAddressSection();
        await expect(this.myaccount_addnewaddress_button).toBeVisible();
        await expect(this.page.getByText('HomeMy AccountAddresses')).toBeVisible();
    }

    async validateDefaultShippingAddress(addedAddress){
        await this.page.getByText('Default Billing & Shipping Address').waitFor({ state: 'visible' });
        await expect(this.page.getByText('Default Billing & Shipping Address'+addedAddress)).toBeVisible();

    }

    async validateRemovedDefaultShippingAddress(addedAddress){
        await expect(this.page.getByText('Default Billing & Shipping Address'+addedAddress)).toBeHidden();

    }

    async clickEditAddressButton(){
        await this.page.locator('section.m-4').first().waitFor({ state: 'visible' });
        await this.myaccount_savedaddress_edit_button.click();
    }

    async clickRemoveAddressButton(){
        await this.myaccount_savedaddress_remove_button.click();
        
    }

    async clickSetasDefaultAddressButton(){
        await this.myaccount_savedaddress_setasdefault_button.first().click();
    }

    async clickCancelEditAddressButton(){
        await this.myaccount_savedaddress_cancel_button.click();
    }

    async displayEditAddressSection(){
        await expect(this.myaccount_editaddress_section).toBeVisible();
    }

    async validatedRemovedAddress(removeAddressMessage,removedAddress){
        await expect(this.page.locator('body')).toContainText(removeAddressMessage);
        await expect(this.page.getByText('Default Billing & Shipping Address:'+removedAddress)).toBeHidden();

    }

    async getEditAddressNames(){
        await this.myaccount_savedaddress_getnames.waitFor({ state: 'visible' });
        var firstName = await this.myaccount_savedaddress_getnames.allTextContents();
        return firstName;
        
    }

    async getEditAddressline1(){
        var addressline1 = await this.myaccount_savedaddress_getaddressline1.allTextContents();
        return addressline1;
    }

    async validateUpdatedAddressMessage(updatedAddressMessage){
        await expect(this.page.locator('body')).toContainText(updatedAddressMessage);
    }

    async getDefaultShippingAddress(){
        console.log('default shipping address:' + await this.page.locator('section').filter({ hasText: /^Default Billing & Shipping Address:$/ }).allTextContents());

    }

    async validateDefaultShippingAddressUpdateMessage(defaultAddUpdatedMessage){
        await expect(this.page.locator('body')).toContainText(defaultAddUpdatedMessage);
    }

    async validateUpdatedDefaultAddress(updatedAddress,defaultAddress){
        expect(updatedAddress).not.toEqual(defaultAddress);
    }

    async validateMyProfilePage(){
        await expect(this.page).toHaveURL(/.*myprofile/);
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_myprofile_headertext);
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.myaccount_myprofile_contactinformation })).toBeVisible();
        await expect(this.myaccount_addnewaddress_firstname).toBeVisible();
        const firstNameValue = await this.myaccount_addnewaddress_firstname.inputValue();
        // Log the value of the FirstName textbox
        console.log(`FirstName value: ${firstNameValue}`);
        // Verify that the FirstName textbox is not blank
        expect(firstNameValue).not.toBe('');
        await expect(this.myaccount_addnewaddress_lastname).toBeVisible();
        const lastNameValue = await this.myaccount_addnewaddress_lastname.inputValue();
        // Log the value of the LastName textbox
        console.log(`LastName value: ${lastNameValue}`);
        // Verify that the LastName textbox is not blank
        expect(lastNameValue).not.toBe('');
        await expect(this.myaccount_myprofile_email).toBeVisible();
        const profileEmailID = await this.myaccount_myprofile_email.inputValue();
        // Log the value of the ProfileEmailID textbox
        console.log(`ProfileEmail Id: ${profileEmailID}`);
        // Verify that the ProfileEmailID textbox is not blank
        expect(profileEmailID).not.toBe('');
        await expect(this.myaccount_myprofile_savechanges_button).toBeVisible();
        await expect(this.page.getByText('HomeMy AccountMy Profile')).toBeVisible();
    }

    async validateMyProfileUpdateMessage(profileUpdateMessage){
        try {
            await expect(this.page.locator('body')).toContainText(profileUpdateMessage);
            
        } catch (error) {
            throw new Error('Failed to validate profile update message:'+ error);
        }
        
    }

    async clickMyProfileSaveChangesButton(){
        await this.myaccount_myprofile_savechanges_button.click();
    }

    async clickChangePasswordLink(){
        await this.myaccount_changepassword_link.click();
    }

    async clickChangePasswordButton(){
        await this.myaccount_changepassword_button.click();
    }

    async validateChangePasswordSection(){
        await expect(this.page).toHaveURL(/.*#changePassword/);
        await expect(this.myaccount_myprofile_changepassword).toBeVisible();
        await expect(this.myaccount_changepassword_currentpassword).toBeVisible();
        await expect(this.myaccount_changepassword_newpassword).toBeVisible();
        await expect(this.myaccount_changepassword_button).toBeVisible();
    }

    async validatedOrderNumberDisplaySection(orderNumberPrefix){
        await expect(this.page).toHaveURL(/.*orders/);
        await expect(this.page.getByText('HomeMy AccountOrders')).toBeVisible();
        await expect(this.page.locator('section.border-b h2.font-semibold').first()).toBeVisible();
        //await expect(this.page.locator(`h2.font-semibold:has-text("${orderNumberPrefix}")`).first()).toBeVisible();
        //const orderLocators = this.page.locator(`h2.font-semibold:has-text("${orderNumberPrefix}")`);
        const orderLocators = this.page.locator('section.border-b h2.font-semibold');
        const orderLocatorsCount = await orderLocators.count();
        console.log('Order Date Count :' + orderLocatorsCount);

        // Define the expected <a> text and URL pattern
        const aTextPattern = /View Order Details/;
        const aHrefPattern = /\/account\/orders\/orderdetails\/\?orderId=\d+/;
        
        // Get all elements matching the "Order #" criteria
        const orderElements = await orderLocators.all();
        expect(orderElements.length).toBeGreaterThan(0);

        // Log the count of matching elements
        console.log(`Number of "Order #" elements: ${orderElements.length}`);

        // Alternatively, if you need to interact with each element individually
        for (const element of orderElements) {
            // Perform actions with each element, such as extracting text or attributes
            console.log(await element.innerText());
        } 

        // Iterate through each <h2> element and validate the following <p> element
        for (let i = 0; i < orderLocatorsCount; i++) {
            // Get the <h2> element
            const h2Element = orderLocators.nth(i);
            //console.log('h2Element' + h2Element);

            // Locate the following <p> element
            const pElement = await h2Element.locator('xpath=following-sibling::p');
            //console.log('pElement' + pElement);

            // Get the text content of the <p> element
            const pText = await pElement.textContent();
            console.log('Order Date and Price:' + pText);

            // Validate the text content matches the regex pattern
            expect(pText).toMatch(/^[A-Z][a-z]+\s\d{1,2},\s\d{4}\s\|\s\$?-?\d+(?:\.\d{1,2})?$/);

            // Locate the following <a> element
            const aElement = await h2Element.locator('xpath=following-sibling::a');
            const aText = await aElement.textContent();
            const aHref = await aElement.getAttribute('href');
            // Validate the text content and href attribute
            expect(aText).toMatch(aTextPattern);
            expect(aHref).toMatch(aHrefPattern);

            // Click on the <a> element and verify the navigation
            await Promise.all([
                this.page.waitForNavigation(), // Wait for the navigation to complete
                aElement.click(), // Click the <a> element
            ]);

            // Verify the navigation by checking the URL or specific content on the new page
            await expect(this.page).toHaveURL(/.*\/account\/orders\/orderdetails\/\?orderId=\d+$/);
            // Optionally, you can check for specific content on the new page to confirm successful navigation
            //await expect(this.page.locator('body')).toContainText('Order Details'); // Adjust based on the expected content

            // Navigate back to the original page to continue the loop
            await this.page.goBack();


        }

        
    }

    async clickViewOrderDetailsLink(){
        await this.myaccount_orders_vieworderdetails.click();
    }

    async clickWithoutOrderButton(){
        await this.myaccount_orders_withoutordersbutton.click();
    }

    async clickViewOrdersButton(){
        await this.myaccount_singleorder_viewordersbutton.click();
    }

    async validateSingleOrderLookupSection(){
        await expect(this.myaccount_orders_singleorderlookup).toBeVisible();
        await expect(this.myaccount_singleorder_ordernumbertextbox).toBeVisible();
        await expect(this.myaccount_singleorder_billingzipcodetextbox).toBeVisible();
        await expect(this.myaccount_singleorder_viewordersbutton).toBeVisible();
    }

    async validateOrderDetailsPage(){
        await expect(this.page).toHaveURL(/.*orderDetails/);
    }

    async validateStoneberryCreditPage(){
        await expect(this.page).toHaveURL(/.*stoneberryCredit/);
    }

    async validateMakeaPaymentPage(){
        await expect(this.page).toHaveURL(/.*payment/);
    }

    async validateWishListPage(){
        await expect(this.page).toHaveURL(/.*wishlist/);
    }

    async validateMyAccountDashboardNavigation(){
        await expect(this.page).toHaveURL(/.*dashboard/);
    }

    async displaySavedCCHeaderText(){
        const regex = new RegExp(`^${myaccountpage_locator.myaccount_savedcc_headertext}$`);
        await expect(this.page.locator('section').filter({ hasText: regex })).toBeVisible();
    }

    async clickAddNewCC(){
        await this.myaccount_savedcc_addccdebitcard_button.click();
        
    }

    async validateSaveCreditCardPage(){
        this.displaySavedCCHeaderText();
        await expect(this.page.getByText('HomeMy AccountSaved Credit')).toBeVisible();
        await expect(this.page.locator(`button:text("Add New Credit/Debit Card")[data-state="closed"]`)).toBeVisible();
        await expect(this.page.locator('button:text("Add New Credit/Debit Card")').first()).toBeVisible();
        await this.page.waitForSelector('p:text("Default Credit Card")');
        
    }

    async validateExistingCCDetails(){
        // await expect(this.page.locator('body')).toContainText('Default Credit Card');
        // this.getCCNumber();
        // this.getCCExpDate();
    }

    async getCCNumber(){
        await this.myaccount_cc_savecard_number.waitFor({ state: 'visible' });
        var cardNumber = await this.myaccount_cc_savecard_number.allTextContents();
        //console.log('Credit Card Number:' + cardNumber);
        return cardNumber;

    }

    async getCCExpDate(){
        await this.myaccount_cc_savecard_expdate.waitFor({ state: 'visible' });
        var cardExpDate = await this.myaccount_cc_savecard_expdate.allTextContents();
        //console.log('Credit Card Number:' + cardExpDate);
        return cardExpDate;

    }

    async displaySavedCCNewAddressOptions(){
        await expect(this.page.locator('button[value="new-address"]')).toBeVisible();
    }

    async clickNewCreditCardNewAddressOption(){
        await this.page.locator('button[value="new-address"]').click();
    }

    async displaySavedCCSavedAddressOptions(){
        const regex = new RegExp(`^${myaccountpage_locator.myaccount_savecc_savedaddressradiobutton}$`);
        const savedAddressLocator=this.page.locator('section').filter({ hasText: regex });
        //await expect(this.page.locator('section').filter({ hasText: regex })).toBeVisible();
        if (await savedAddressLocator.count() > 0) {
            await expect(savedAddressLocator).toBeVisible();
        } else {
            console.log('No saved address present');
        }
    }

    async enterCCNumber(enterCardNumber){
        await this.myaccount_cc_cardnumber_textbox.fill(enterCardNumber);

    }

    async enterCCExpDate(enterCardExpDate){
        await this.myaccount_cc_expirydate_textbox.fill(enterCardExpDate);
    }

    async enterCCSecurityCode(enterCardSecCode){
        await this.myaccount_cc_securitycode_textbox.fill(enterCardSecCode);
    }

    async clickSaveCardButton(){
        await this.myaccount_cc_savecard_button.click();
    }

    async validateNewCCSection(){
        await expect(this.myaccount_cc_cardnumber_textbox).toBeVisible();
        await expect(this.myaccount_cc_expirydate_textbox).toBeVisible();
        await expect(this.myaccount_cc_securitycode_textbox).toBeVisible();
        await expect(this.myaccount_cc_savecard_button).toBeVisible();
        await this.displaySavedCCNewAddressOptions();
        await this.displaySavedCCSavedAddressOptions();
        
    }

    async clickDefaultCCCheckbox(){
        await this.myaccount_savedefaultcc_checkbox.click();
    }

    async validateAddNewCardMessage(addnewCardMessage){
        await expect(this.page.locator('body')).toContainText(addnewCardMessage);
    }

    async validateAddNewCard(){
        const cardNumber=await this.page.locator('section.m-4.rounded-md p.font-semibold').nth(0).textContent();
        expect(cardNumber).toMatch(/^\*\*\*[0-9]{4}$/);
        const cardExpDate=await this.page.locator('section.m-4.rounded-md p.font-semibold').nth(1).textContent();
        expect(cardExpDate.trim()).toMatch(/^Expires\s+[0-1][0-9]\/[0-9]{2}$/);
    }

    async validateAccountStatusUpdateText(){
        const loggedInUserName = await this.page.locator('p.block.w-full.translate-y-1.truncate.text-xs>span').textContent();
        await expect(this.page.getByRole('button', { name: new RegExp(`My Account Hi ${loggedInUserName}!`, 'i') })).toBeVisible();
        
    }

    async clickSignOutButton(){
        await this.myaccount_signout_button.click();
    }

    async verifyLeftNavLinks() {
        // Get all links within the <nav> element
    const links = await this.page.$$eval('nav section nav a', anchors => anchors.map(anchor => anchor.href));

    // Check if each link is clickable
    for (const link of links) {
        // Evaluate in the browser context to check clickability
        const isClickable = await this.page.evaluate(async (link) => {
            try {
                await fetch(link, { method: 'HEAD' });
                return true;
            } catch (error) {
                return false;
            }
        }, link);
        
        console.log(`Link: ${link} is clickable: ${isClickable}`);
    }
    }

    async clickAndVerifyHighlightedLink() {
        const locators = this.page.locator('nav section nav a').first();
        await locators.click();
        await expect(this.page.locator('a.border-l-black')).toBeVisible();
        const isHighlighted = await locators.evaluate(link => link.classList.contains('border-l-black'));
        console.log(`Is Highlighted: ${isHighlighted}`);
    }

    async  verifyAllLinksAreClickable() {
        // Find all links on the "My Account" page
        const locators = this.page.locator('nav section nav a');
        const locatorCount = await locators.count();

        // Iterate through each link and click it
        for (let index = 0; index < locatorCount; index++) {
            const locator = await locators.nth(index);

            try {
                await locator.click();
                console.log(`Clicked on link ${index}`);
            } catch (error) {
                console.error(`Error clicking on link ${index}: ${error.message}`);
                // Handle error. Likely just skip this locator
                continue;
            }

            // Wait for navigation to complete
            await this.page.waitForNavigation();

            // Check if the current URL matches the expected href
            const currentUrl = this.page.url();
            console.log(`Current URL after clicking: ${currentUrl}`);

            // Navigate back to the "My Account" page
            await this.page.goBack();
        }
    }

    async creditOverviewSection(){
        // Find and retrieve the text content of "Credit Limit" and "Available Credit" elements
        const creditLimitElement = await this.page.locator(`section p:text("${myaccountpage_locator.myaccount_credit_creditlimit}") + p`);
        const creditLimitText = await creditLimitElement.textContent();
        await expect(creditLimitElement).toHaveText(/\$\d+(\.\d{1,2})?/);
        
        //const availableCreditTextElement = await this.page.$('section.flex p.text-22');
        const availableCreditTextElement = await this.page.locator('section.flex p.text-22');
        // Extract the text content of the value element
        const availableCreditValue = await availableCreditTextElement.textContent();
        await expect(availableCreditTextElement).toHaveText(/\$\d+(\.\d{1,2})?/);

        // Output the content and values
        console.log('Credit Limit Text:', creditLimitText);
        console.log('Available Credit Value:', availableCreditValue);
    }

    async validateAvailableCreditValueColor(){
        //const availableCreditTextElement = await this.page.$('section.flex p.text-22');
        const availableCreditTextElement = await this.page.locator('section.flex p.text-22');
        // Extract the text content of the value element
        const availableCreditValue = await availableCreditTextElement.textContent();
        // Parse the price value (remove the $ and convert to a number)
        const priceValue = parseFloat(availableCreditValue.replace('$', ''));
        console.log('price value:' + priceValue);

        // Determine the expected color based on the price value
        let expectedColor;
        if (priceValue >= 75) {
            expectedColor = 'rgb(21, 128, 61)'; // green color
        } else {
            expectedColor = 'rgb(0, 0, 0)'; // black color
        }

        // Get the computed color style of the element
        const elementColor = await availableCreditTextElement.evaluate((el) => {
            return window.getComputedStyle(el).color;
        });

        // Verify the color of the element
        expect(elementColor).toBe(expectedColor);
    }

    async helpIconTooltip(tooltipLocatorName){
        const tooltipButtonLocator = this.page.locator(`//p[contains(text(), '${tooltipLocatorName}')]/following::button[1]`);
        //const tooltipButtonLocator = this.page.locator('//button[@aria-label="tooltip"]').first();
        const tooltipLocator = this.page.locator('button[data-state="instant-open"][aria-label="tooltip"]');

        // Click on the button to open the tooltip
        await tooltipButtonLocator.click();

        // Wait for the tooltip to appear
        await tooltipLocator.waitFor();
        await expect(tooltipLocator).toBeVisible();
    }

    async paymentOverviewSection(){
        const totalBalanceLocatorValue = this.page.locator(`//p[contains(text(), '${myaccountpage_locator.myaccount_credit_totalbalance}')]/following::p[1]`);
        const minimumDueLocator = this.page.locator(`section.mt-6 p:text("${myaccountpage_locator.myaccount_credit_minimumdue}") + p`);
        const paymentDueLocator = this.page.locator(`section.mt-6 p:text("${myaccountpage_locator.myaccount_credit_paymentdue}") + p`);

        // Extract text content
        const totalBalance = await totalBalanceLocatorValue.textContent();
        const minimumDue = await minimumDueLocator.textContent();
        const paymentDue = await paymentDueLocator.textContent();
        await expect(totalBalanceLocatorValue).toHaveText(/\$\d+(\.\d{1,2})?/);
        await expect(minimumDueLocator).toHaveText(/\$\d+(\.\d{1,2})?/);
        await expect(paymentDueLocator).toHaveText(/\d{2}\/\d{2}\/\d{4}/);

        console.log(`Total Balance: ${totalBalance.trim()}`);
        console.log(`Minimum Due: ${minimumDue.trim()}`);
        console.log(`Payment Due: ${paymentDue.trim()}`);
    }

    async clickMakeAPaymentButton(){
        await this.myaccount_makepayment_button.click();
        //await expect(this.page).toHaveURL(/.*makepayment/);
        await expect(this.page).toHaveURL(/.*\/account\/makepayment\//);

    }

    async makeAPaymentButtonDisplay(){
        const totalBalanceLocatorValue = this.page.locator(`//p[contains(text(), '${myaccountpage_locator.myaccount_credit_totalbalance}')]/following::p[1]`);
        const totalBalance = await totalBalanceLocatorValue.textContent();
        // Parse the balance value (remove the $ and convert to a number)
        const balanceValue = parseFloat(totalBalance.replace('$', ''));

        if (balanceValue === 0) {
            // Verify the "Make a Payment" button is not visible
            await expect(this.page.locator('section.mt-7.grid button.inline-flex:has-text("Make a Payment")')).toBeHidden();
            //await expect(this.myaccount_makepayment_button).not.toBeVisible();
        } else {
            // Verify the "Make a Payment" button is visible
            await expect(this.page.locator('section.mt-7.grid button.inline-flex:has-text("Make a Payment")')).toBeVisible();
        }

    }

    async startShoppingButtonDisplay(){
        await this.myaccount_startshopping_button.waitFor({ state: 'visible' });
        await expect(this.myaccount_startshopping_button).toBeVisible();
    }

    async clickStartShoppingButton(){
        await this.myaccount_startshopping_button.click();
        await expect(this.page).toHaveURL('https://dev--stoneberry-masoncompanies.netlify.app/');
    }

    async clickOnProductNamePlacedOrder(){
        await this.page.locator('section.truncate a.text-sm').first().click();
        await expect(this.page).toHaveURL(/.*\/account\/orders\/orderdetails\//);
    }

    async validateDefaultShippingandBillingAddressSection(){
        // Locate the section containing the default billing and shipping address
        await this.page.getByText(myaccountpage_locator.myaccount_defaultShippingandbillingaddress).waitFor({ state: 'visible' });
        const addressSection = this.page.locator(`section:has-text("${myaccountpage_locator.myaccount_defaultShippingandbillingaddress}")`);
        await expect(this.page.getByText(myaccountpage_locator.myaccount_defaultShippingandbillingaddress)).toBeVisible();

        // Verify the presence and content of the name
        const nameLocator = this.page.locator('strong.text-lg.font-semibold').nth(0);
        await expect(nameLocator).toHaveText(/[\s\S]+/);

        // Verify the presence and content of the address lines
        const addressLine1Locator = addressSection.locator('p.text-base.font-normal').nth(0);
        await expect(addressLine1Locator).toHaveText(/[\s\S]+/);

        const addressLine2Locator = addressSection.locator('p.text-base.font-normal').nth(1);
        await expect(addressLine2Locator).toHaveText(/[\s\S]+/);

        // Verify the presence and content of the phone number
        const phoneLocator = addressSection.locator('p.text-base.font-normal').nth(2);
        await expect(phoneLocator).toHaveText(/\(\d{3}\) \d{3}-\d{4}/);

    }

    async validateEditAndRemoveButtonDisplayForMyAccount(){
        // Locate all address sections
        const addressSections = this.page.locator('section.m-4.rounded-md.border.border-foggyGray');

        // Get the count of address sections
        const addressSectionCount = await addressSections.count();
        console.log(`Found ${addressSectionCount}  sections`);

        // Ensure there are multiple address sections
        expect(addressSectionCount).toBeGreaterThan(0);

        // Verify "Edit" and "Remove" buttons for each address section
        for (let i = 0; i < addressSectionCount; i++) {
            const addressSection = addressSections.nth(i);

            // Locate "Edit" button within the address section
            const editButton = addressSection.locator(`button:has-text("${myaccountpage_locator.myaccount_savedaddress_edit_button}")`);
            const editButtonCount = await editButton.count();
            //console.log(`Address section ${i + 1} has ${editButtonCount} Edit button(s)`);

            // Ensure the "Edit" button is present and visible
            expect(editButtonCount).toBe(1);
            await expect(editButton).toBeVisible();

            // Locate "Remove" button within the address section
            const removeButton = addressSection.locator(`button:has-text("${myaccountpage_locator.myaccount_savedaddress_remove_button}")`);
            const removeButtonCount = await removeButton.count();
            //console.log(`Address section ${i + 1} has ${removeButtonCount} Remove button(s)`);

            // Ensure the "Remove" button is present and visible
            expect(removeButtonCount).toBe(1);
            await expect(removeButton).toBeVisible();
        }
    }

    async validateDefaultSavedCreditCardSection(){
        // Locate the section containing the default billing and shipping address
        await this.page.locator('h1.text-2xl').waitFor({ state: 'visible' });
        await this.page.getByText(myaccountpage_locator.myaccount_default_CC_text).waitFor({ state: 'visible' });
        const creditCardSection  = await this.page.locator(`section:has-text("${myaccountpage_locator.myaccount_default_CC_text}")`);
        await expect(this.page.getByText(myaccountpage_locator.myaccount_default_CC_text)).toBeVisible();
        
        // Select all sections containing the specific <p> elements and iterate over them
        const creditCardSections = await this.page.$$('section.m-4.rounded-md');

        for (const cardSection of creditCardSections) {
            // Extract text from <p> with class 'font-semibold'
            const cardNumber = await cardSection.$('p.font-semibold');
            const cardNumberText = await cardNumber.textContent();
            expect(cardNumberText).toMatch(/^\*\*\*[0-9]{4}$/);

            // Extract text from the second <p> tag within the same section
            const expiryDate = await cardSection.$('p:nth-of-type(2)');
            const expiryDateText = await expiryDate.textContent();
            expect(expiryDateText.trim()).toMatch(/^Expires\s+[0-1][0-9]\/[0-9]{2}$/);

            // Log the extracted text content
            console.log(`Card Number Text: ${cardNumberText.trim()}`);
            console.log(`Expiry Date Text: ${expiryDateText.trim()}`);
        }

        // Select all sections that contain SVG elements within the specified section
        const cardImageSections = await this.page.$$('section.flex.justify-center.pr-5');

        // Iterate over each section
        for (const imageSection of cardImageSections) {
            // Find all SVG elements within this section
            const svgs = await imageSection.$$('svg');

            // Iterate over each SVG element
            for (const svg of svgs) {
                // Perform actions on the SVG element
                // Example: Extract the 'd' attribute from <path> elements within the SVG
                const paths = await svg.$$('path');
                for (const path of paths) {
                    const dAttribute = await path.getAttribute('d');
                    //console.log('SVG path d attribute:', dAttribute);
                    // Optionally, you can validate the d attribute using regex
                    expect(dAttribute).toMatch(/^[a-zA-Z0-9.,\s-]+$/);
                }
            }
        }

    }

    async validateProductImagesWishlist() {
        // Select all <li> elements containing product images
        const productItems = await this.page.$$('li.max-w-48');

        // Iterate over each product item
        for (const item of productItems) {
            // Find the image within the current <li>
            const img = await item.$('img');

            // Ensure the image element exists
            expect(img).not.toBeNull();

            // Get the src attribute of the image
            const src = await img.getAttribute('src');

            // Ensure the src attribute is valid
            //expect(src).not.toBeNull();
            //expect(src).not.toBe('');

            // Optionally, validate the alt text of the image
            const altText = await img.getAttribute('alt');
            //console.log('Image Text:' + altText);
            //expect(altText).toBe('Picture of the author');
        }
    }

    async validateMakeAPaymentAccountInformation(){
        await this.myaccount_makeapayment_acctinformation_headertext.waitFor({ state: 'visible' });
        await expect(this.myaccount_makeapayment_acctinformation_headertext).toBeVisible();
        await expect(this.myaccount_makeapayment_acctinformation_custaccountnum).toBeVisible();
        await expect(this.myaccount_makeapayment_acctinformation_acctstatus).toBeVisible();
        await expect(this.myaccount_makeapayment_acctinformation_lastsd).toBeVisible();
        await expect(this.myaccount_makeapayment_acctinformation_nextsd).toBeVisible();
        await expect(this.myaccount_makepayment_creditstateadd).toBeVisible();
        await expect(this.myaccount_makepayment_creditstateadd_editbutton).toBeVisible();
        const customerAccountValue= this.page.locator(`//strong[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_custaccountnum}")]/following-sibling::strong`);
        await expect(customerAccountValue).toHaveText(/^\d+$/);
        const accountStatusValue= this.page.locator(`//p[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_acctstatus}")]/following-sibling::p`);
        const accountStatusDisplayValue=await accountStatusValue.textContent();
        console.log('account status value:' + accountStatusDisplayValue)
        const amountPastDueLabel=this.page.locator(`//p[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_acctstatuspastdue}")]/following-sibling::p`);
        if (accountStatusDisplayValue === "Past Due") {
            // If Account Status is 'Past Due', expect the Amount Past Due elements to be visible
            await expect(this.myaccount_makeapayment_acctinformation_acctstatuspastdue).toBeVisible();
            await expect(amountPastDueLabel).toBeVisible();
            await expect(accountStatusValue).toHaveText(/Past Due/);
          } else {
            // If Account Status is not 'Past Due', expect the Amount Past Due elements to be hidden or not present
            await expect(amountPastDueLabel).toBeHidden();
            await expect(accountStatusValue).toHaveText(/Suspended|Closed|Inactive|Current/);
          }

        //await expect(accountStatusValue).toHaveText(/Suspended|Closed|Inactive|Current/);
        const lastStatementDateValue= this.page.locator(`//p[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_lastsd}")]/following-sibling::p`);
        await expect(lastStatementDateValue).toHaveText(/\d{2}\/\d{2}\/\d{4}|N\/A/);
        const nextStatementDateValue= this.page.locator(`//p[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_nextsd}")]/following-sibling::p`);
        await expect(nextStatementDateValue).toHaveText(/\d{2}\/\d{2}\/\d{4}|N\/A/);
        console.log('Customer Account Number :' + customerAccountValue);
        console.log('Customer Account Status :' + accountStatusValue);
        console.log('Customer Last Statement Date :' + lastStatementDateValue);
        console.log('Customer Next Statement Date :' + nextStatementDateValue);
    }

    async validateAccountPastDue(){
        const accountStatusDisplayValue =this.page.locator(`//p[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_acctstatus}")]/following-sibling::p`).textContent();
        const amountPastDueLabel=this.page.locator(`//p[contains(text(),"${myaccountpage_locator.myaccount_makeapayment_acctinformation_acctstatuspastdue}")]/following-sibling::p`);
        
        if (accountStatusDisplayValue === 'Past Due') {
            // If Account Status is 'Past Due', expect the Amount Past Due elements to be visible
            await expect(amountPastDueLabel).toBeVisible();
            await expect(amountPastDueLabel).toHaveText(/^\$\d+(\.\d{2})?$/);
          } else {
            // If Account Status is not 'Past Due', expect the Amount Past Due elements to be hidden or not present
            await expect(amountPastDueLabel).toBeHidden();
            await expect(amountPastDueLabel).toHaveText(/^\$\d+(\.\d{2})?$/);
          }
    }

    async validateCreditStatementAddress(){
        await this.page.locator('section.pr-24.pt-6.text-base.font-normal.leading-6').waitFor({state:'visible'});
        const addressSection = this.page.locator('section.pr-24.pt-6.text-base.font-normal.leading-6');

        // Verifying the texts inside the address section using regex
        await expect(addressSection.locator('p').nth(0)).toHaveText(/[\s\S]+/);
        await expect(addressSection.locator('p').nth(1)).toHaveText(/[\s\S]+/);
        await expect(addressSection.locator('p').nth(2)).toHaveText(/[\s\S]+|[A-Za-z\s]+, [A-Z]{2} \d{5}(-\d{4})?/);

        // Locator for the phone number
        const phoneNumber = this.page.locator('p.pt-3.text-base.font-normal.leading-6');

        // Verifying the phone number text using regex
        await expect(phoneNumber).toHaveText(/\(\d{3}\) \d{3}-\d{4}/);
    }

    async clickEditCreditStatementAddress(){
        await this.myaccount_makepayment_creditstateadd_editbutton.click();
    }

    async clickSaveAddressForEditCreditStatementAddress(){
        await this.myaccount_sbc_creditstatement_saveaddressbutton.click();
    }

    async clickCancelForEditCreditStatementAddress(){
        await this.myaccount_sbc_creditstatement_canceladdressbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async validateEditCreditStatementAddress(){
        const addressSection = this.page.locator('p.pl-5.pt-1\\.5.text-base');
        await expect(this.page.getByText('Edit Address')).toBeVisible();
        await expect(this.page.getByText(myaccountpage_locator.myaccount_sbc_creditstatement_creditaccountholdertext)).toBeVisible();
        await expect(addressSection).toHaveText(/[\s\S]+/);
        await expect(this.page.getByText(myaccountpage_locator.myaccount_sbc_creditstatement_changenamedisclaimertext)).toBeVisible();
        await expect(this.myaccount_sbc_creditstatement_editaddress).toBeVisible();
        const addressLine1Value = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editaddress}`, input => input.value);
        console.log('Address Element Value:', addressLine1Value);
        expect(addressLine1Value).toMatch(/[\s\S]+/);
        await expect(this.myaccount_sbc_creditstatement_editcity).toBeVisible();
        const cityValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editcity}`, input => input.value);
        console.log('City Element Value:', cityValue);
        expect(cityValue).toMatch(/[\s\S]+/);
        // Wait for the select element to have populated options
        await this.page.waitForFunction(() => {
            const selectElement = document.querySelector('#state');
            return selectElement && selectElement.options.length > 1;
        });
        await expect(this.myaccount_sbc_creditstatement_editstate).toBeVisible();
        const stateValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editstate}`, selectOption => selectOption.value);
        console.log('State Element Value:', stateValue);
        expect(stateValue).toMatch(/[\s\S]+/);
        await expect(this.myaccount_sbc_creditstatement_editzipcode).toBeVisible();
        const zipcodeValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editzipcode}`, input => input.value);
        console.log('ZipCode Element Value:', zipcodeValue);
        expect(zipcodeValue).toMatch(/^\d{5}$|d{5}(-\d{4})?/);
        await expect(this.myaccount_sbc_creditstatement_editphonenumber).toBeVisible();
        const phonenumberValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editphonenumber}`, input => input.value);
        console.log('PhoneNumber Element Value:', phonenumberValue);
        expect(phonenumberValue).toMatch(/\(\d{3}\) \d{3}-\d{4}/);
        await expect(this.myaccount_sbc_creditstatement_saveaddressbutton).toBeVisible();
        await expect(this.myaccount_sbc_creditstatement_canceladdressbutton).toBeVisible();
       
    }

    async displayRecentAccountTransactions(){
        const recentAccountTrasactionsLocator = await this.page.getByRole('heading', { name: 'Recent Account Transactions' });
        if (!(await recentAccountTrasactionsLocator.isVisible())) {
            return false;
        }
        return true;
    }

    async validateRecentAccountTransactionsStatusColumnData(){
        //await this.page.getByRole('heading', { name: 'Recent Account Transactions' }).waitFor({state:'visible'});
        // Get all elements with class 'text-left' representing the 'Status' column
        const statusElements = await this.page.$$('section.bg-white.grid-cols-5.gap-x-4, section.bg-lightSilver.grid-cols-5.gap-x-4');

        // Iterate through each status element
        for (const statusElement of statusElements) {

            const statusCell = await statusElement.$('p:nth-child(2)');
            // Get the text content of the status element
            const statusText = await statusCell.innerText();

            // Validate the status text
            expect(statusText).toMatch(/^(Pending|Completed)$/);
        }
    }

    async validateRecentAccountTransactionsDescriptionColumnData(){
        await this.page.getByRole('heading', { name: 'Recent Account Transactions' }).waitFor({state:'visible'});
        // Get all elements with class 'text-left' representing the 'Status' column
        const descriptionElements = await this.page.$$('section.bg-white.grid-cols-5.gap-x-4, section.bg-lightSilver.grid-cols-5.gap-x-4');

        // Iterate through each status element
        for (const descriptionElement of descriptionElements) {

            const descriptionCell = await descriptionElement.$('p:nth-child(3)');
            // Get the text content of the status element
            const descriptionText = await descriptionCell.innerText();

            // Validate the status text
            expect(descriptionText).toMatch(/^(Payment - Thank you!|Appeasement|Late Charge|Finance Charge|Credit|Invoice)$/);
        }
    }

    async validateRecentAccountTransactionsPurchaseChargeColumnData(){
        await this.page.getByRole('heading', { name: 'Recent Account Transactions' }).waitFor({state:'visible'});
        // Get all elements with class 'text-left' representing the 'Status' column
        const purchaseChargeElements = await this.page.$$('section.bg-white.grid-cols-5.gap-x-4, section.bg-lightSilver.grid-cols-5.gap-x-4');

        // Iterate through each status element
        for (const purchaseElement of purchaseChargeElements) {

            const purchaseCell = await purchaseElement.$('p:nth-child(4)');
            // Get the text content of the status element
            const purchaseText = await purchaseCell.innerText();
            // Check if the text content is empty or whitespace
            if (purchaseText.trim() === '') {
                // Handle blank value
                console.log('Blank value');
            } else {
                // Remove any non-numeric characters (except decimal point and '-')
                const numericValue = parseFloat(purchaseText.replace(/[^\d.-]/g, ''));

                // Check if the numeric value is a valid number
                if (!isNaN(numericValue)) {
                    // Check if the numeric value is negative, zero, or positive
                    if (numericValue < 0) {
                        // Numeric value is negative
                        console.log('Negative value:', numericValue);
                    } else if (numericValue === 0) {
                        // Numeric value is zero
                        console.log('Zero value:', numericValue);
                    } else {
                        // Numeric value is positive
                        console.log('Positive value:', numericValue);
                    }
                } else {
                    // Check if the value is in the format of a dollar amount
                    const dollarValueMatch = purchaseText.match(/^\$?(\d+(\.\d{1,2})?)$/);
                    if (dollarValueMatch) {
                        // Extract the numeric value from the match
                        const dollarValue = parseFloat(dollarValueMatch[1]);
                        console.log('Dollar value:', dollarValue);
                    } else {
                        // Value does not match any expected format
                        console.log('Invalid value:', purchaseText);
                    }
                }
            }
        }
    }

    async validateRecentAccountTransactionsPaymentCreditColumnData(){
        await this.page.getByRole('heading', { name: 'Recent Account Transactions' }).waitFor({state:'visible'});
        // Get all elements with class 'text-left' representing the 'Status' column
        const paymentCreditElements = await this.page.$$('section.bg-white.grid-cols-5.gap-x-4, section.bg-lightSilver.grid-cols-5.gap-x-4');

        // Iterate through each status element
        for (const paymentElement of paymentCreditElements) {

            const paymentCell = await paymentElement.$('p.text-forestGreen');
            // Get the text content of the status element
            const paymentText = await paymentCell.innerText();
            // Check if the text content is empty or whitespace
            if (paymentText.trim() === '') {
                // Handle blank value
                console.log('Blank value');
            } else {
                // Remove any non-numeric characters (except decimal point and '-')
                const numericValue = parseFloat(paymentText.replace(/[^\d.-]/g, ''));

                // Check if the numeric value is a valid number
                if (!isNaN(numericValue)) {
                    // Check if the numeric value is negative, zero, or positive
                    if (numericValue < 0) {
                        // Numeric value is negative
                        console.log('Negative value:', numericValue);
                    } else if (numericValue === 0) {
                        // Numeric value is zero
                        console.log('Zero value:', numericValue);
                    } else {
                        // Numeric value is positive
                        console.log('Positive value:', numericValue);
                    }
                } else {
                    // Check if the value is in the format of a dollar amount
                    const dollarValueMatch = paymentText.match(/^\$?(\d+(\.\d{1,2})?)$/);
                    if (dollarValueMatch) {
                        // Extract the numeric value from the match
                        const dollarValue = parseFloat(dollarValueMatch[1]);
                        console.log('Dollar value:', dollarValue);
                    } else {
                        // Value does not match any expected format
                        console.log('Invalid value:', paymentText);
                    }
                }
            }
        }
    }

    async validateRecentAccountTransactionsColumnHeader(){
        await this.page.getByRole('heading', { name: 'Recent Account Transactions' }).waitFor({state:'visible'});
        await expect(this.page.getByText('Date', { exact: true })).toBeVisible();
        await expect(this.page.getByText('Status', { exact: true })).toBeVisible();
        await expect(this.page.getByText('Description')).toBeVisible();
        await expect(this.page.getByText('Purchase/Charge')).toBeVisible();
        await expect(this.page.getByText('Payment/Credit')).toBeVisible();
        await expect(this.page.getByText('Note: Please allow up to 48 hours for payments to be applied to your Stoneberry Credit account.').first()).toBeVisible();
    }

    async validateRecentAccountTransactionsDateColumnData(){
        await this.page.getByRole('heading', { name: 'Recent Account Transactions' }).waitFor({state:'visible'});
        // Get all elements with class 'text-left' representing the 'Status' column
        const dateElements = await this.page.$$('section.bg-white.grid-cols-5.gap-x-4, section.bg-lightSilver.grid-cols-5.gap-x-4');

        // Iterate through each status element
        for (const dateElement of dateElements) {

            const dateCell = await dateElement.$('p:nth-child(1)');
            // Get the text content of the status element
            const dateText = await dateCell.innerText();

            // Validate the status text
            expect(dateText).toMatch(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/);
        }
    }

    async validateOrdersSortDropdown(){
        // Array of menu items to check
        const menuItems = ['Last 12 Months', 'Last 2 Years', 'Last 3 Years'];
        await expect(this.page.getByRole('button', { name: 'Last 12 Months' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Last 12 Months' }).click();

        // Loop through each menu item and validate its visibility
        for (const item of menuItems) {
            await expect(this.page.getByRole('menuitem', { name: item })).toBeVisible();
        }
    }

    async validateOrdersSelectedSortDropdownValue(){
        await this.page.locator('html').click();
        // Array of menu items to check
        const menuItems = ['Last 12 Months', 'Last 2 Years', 'Last 3 Years'];
        await expect(this.page.getByRole('button', { name: 'Last 12 Months' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Last 12 Months' }).click();

        // Loop through each menu item and validate its visibility
        for (const item of menuItems) {
            await expect(this.page.getByRole('menuitem', { name: item })).toBeVisible();
            // Click on the menu item
            await this.page.getByRole('menuitem', { name: item }).click();
            await expect(this.page.getByRole('button', { name: item })).toBeVisible();
            await this.page.getByRole('button', { name: item }).click();

        }
    }

    async validateMakeADownPayment(){
        // Wait for the button's state to change (if needed)
        await this.page.waitForSelector(`button:text("Make a Down Payment")[data-state="closed"]`);
        // Locate all buttons with the text "Make a Down Payment"
        const downPaymentButtons = await this.page.$$('button:has-text("Make a Down Payment")');
        //const downPaymentButtons =this.page.getByRole('button', { name: 'Make a Down Payment' });
        //const downPaymentButton = await downPaymentButtons.all();
        console.log('Number of Down payment button :' + downPaymentButtons.length);
        

        // Check if there are any buttons found
        if (downPaymentButtons.length===0) {
            console.log('No "Make a Down Payment" buttons found.');
            return; // Exit the test if no buttons are found
        }

        // Iterate through each button and verify the click action
        for (const button of downPaymentButtons) {
            // Click the button
            await button.click();

            // Wait for the button's state to change (if needed)
            await this.page.waitForSelector(`button:text("Make a Down Payment")[data-state="open"]`);

            // Verify that the button's state has changed to "open"
            const stateAttribute = await button.getAttribute('data-state');
            expect(stateAttribute).toBe('open');
            await expect(this.page.getByRole('heading', { name: 'Down Payment Amount' })).toBeVisible();
            await expect(this.page.getByText('Minimum Due: $')).toBeVisible();
            await expect(this.page.getByText('Order Total: $')).toBeVisible();
            await expect(this.page.locator('#minimumDueRadio')).toBeVisible();
            await expect(this.page.locator('#orderTotalRadio')).toBeVisible();
            await expect(this.page.locator('#otheramountRadio')).toBeVisible();
            await expect(this.page.getByRole('button', { name: 'Review Down Payment' })).toBeVisible();
    }
}

    async validateAddNewAddress() {
        // Generate random data
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        //const state = fakerEN_US.location.state();
        const state = faker.location.state({ abbreviated: true })
        const zipCode = faker.location.zipCode().substring(0, 5); // Get only the first 5 digits
        const phoneNumber = faker.phone.number();
        const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
        // Fill in the required fields
        await this.page.type('#firstName', firstName);
        await this.page.type('#lastName', lastName);
        await this.page.type('#address', address);
        await this.page.type('#city', city);
        await this.page.selectOption('#state', state);
        await this.page.type('#zipCode', zipCode);
        await this.page.type('#phoneNumber', phoneNumber);

        // Click the "Save Address" button
        await this.myaccount_addnewaddress_saveaddressbutton.click();
        await this.page.wa

        await this.verifyAddressSuggestionModal();

        await this.page.getByText('Address added successfully').waitFor({state:'visible'});
        await expect(this.page.getByText('Address added successfully')).toBeVisible();

        // // Wait for the page to navigate or for a success message
        // await Promise.race([
        //     //this.page.waitForNavigation({ timeout: 5000 }), // Adjust timeout as needed
        //     this.page.waitForSelector('.text-forestGreen', { hasText: 'Address added successfully' }) // Assuming there's a success message
        // ]);

        
        const fullAddress = `${city},  ${state} ${zipCode}`;
        // Verify that the form submission was successful
        const successMessage = await this.page.$('.text-forestGreen');
        if (successMessage) {
            console.log('Address added successfully!');

            // Check if the input fields retain the entered data
            const firstNameValue = await this.page.locator('strong').filter({ hasText: firstName }).textContent();
            expect(firstNameValue).toMatch(firstName);
            const lastNameValue = await this.page.locator('strong').filter({ hasText: lastName }).textContent();
            expect(lastNameValue).toMatch(lastName);
            const addressValue = await this.page.locator('p').filter({ hasText: address }).textContent();
            expect(addressValue).toMatch(address);
            const zipCityStateValue = await this.page.locator('p').filter({ hasText: fullAddress }).textContent();
            expect(zipCityStateValue).toMatch(fullAddress);
            //const phoneNumberValue = await this.page.locator('p').filter({ hasText: phoneNumber }).textContent();
            //expect(phoneNumberValue).toMatch(phoneNumberPattern);

            console.log('First Name:', firstNameValue);
            console.log('Last Name:', lastNameValue);
            console.log('Address:', addressValue);
            console.log('City:', zipCityStateValue);
            //console.log('Phone Number:', phoneNumberValue);
        } else {
            console.log('Failed to add address.');
        }
    }

    async removeAddress(){
        await this.page.locator('section.m-4').first().waitFor({ state: 'visible' });
        const addressSections = await this.page.locator('section.m-4');
        const addressSectionsCount = await addressSections.count();
        const deleteAddressCount = (addressSectionsCount -1);
        console.log('Total Saved Address Count:', addressSectionsCount);
        console.log('Total Delete Address Count:', deleteAddressCount);
        
        await this.page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_remove_button }).nth(deleteAddressCount).click();
        await expect(this.page.locator('.text-forestGreen').filter({ hasText: 'Address deleted successfully' })).toBeVisible();
        await this.page.locator('.text-forestGreen').filter({ hasText: 'Address deleted successfully' }).waitFor({ state: 'hidden' });

        // Verify that the form submission was successful
        const successMessage = await this.page.$('.text-forestGreen');
        if (successMessage) {
            const deletedAddressSections = await this.page.locator('section.m-4');
            const deletedAddressSectionsCount = await deletedAddressSections.count();
            await expect(deletedAddressSections).toHaveCount(deleteAddressCount);
            console.log('Address deleted successfully!');
            console.log('Address deleted Count!' + deletedAddressSectionsCount);
        } else {
            console.log('Failed to delete address.');
        }

    }

    async undoRemoveAddress(){
        await this.page.reload();
        await this.page.locator('section.m-4').first().waitFor({ state: 'visible' });
        const addressSections = await this.page.locator('section.m-4');
        const addressSectionsCount = await addressSections.count();
        let nthIndex = 0;
        if (addressSectionsCount > 1) {
            nthIndex = addressSectionsCount - 1;
        }
        //const deleteAddressCount = (addressSectionsCount -1);
        console.log('Total Saved Address Count:', addressSectionsCount);
        //console.log('Total Delete Address Count:', deleteAddressCount);
        
        await this.page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_remove_button }).nth(nthIndex).click();
        await expect(this.page.locator('.text-forestGreen').filter({ hasText: 'Address deleted successfully' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Undo' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Undo' }).click();
        await this.page.locator('.text-forestGreen').filter({ hasText: 'Address deleted successfully' }).waitFor({ state: 'hidden' });
        await this.page.reload();
        await this.displayAddressSection();
        await expect(this.page.locator('section.m-4')).toHaveCount(addressSectionsCount);
        
    }

    async editSavedAccountAddress(){
        await this.page.locator('section.m-4').first().waitFor({ state: 'visible' });
        const sections = await this.page.locator('section.m-4').count();
        let nthIndex = 0;
        if (sections > 1) {
            nthIndex = sections - 1;
        }
        await this.page.getByRole('button', { name: 'Edit',exact:true }).nth(nthIndex).click();
        await expect(this.page.getByText('Edit Address')).toBeVisible();
        const addressLine1Value = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editaddress}`, input => input.value);
        console.log('Address Element Value:', addressLine1Value);
        expect(addressLine1Value).toMatch(/[\s\S]+/);
        await expect(this.myaccount_sbc_creditstatement_editcity).toBeVisible();
        const cityValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editcity}`, input => input.value);
        console.log('City Element Value:', cityValue);
        expect(cityValue).toMatch(/[\s\S]+/);
        await expect(this.myaccount_sbc_creditstatement_editstate).toBeVisible();
        // Wait for the select element to appear
        await this.page.waitForSelector('#state');

        // Wait for the select element to have populated options
        await this.page.waitForFunction(() => {
            const selectElement = document.querySelector('#state');
            return selectElement && selectElement.options.length > 1;
        });
        const stateValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editstate}`, selectOption => selectOption.value);
        console.log('State Element Value:', stateValue);
        expect(stateValue).toMatch(/[\s\S]+/);
        await expect(this.myaccount_sbc_creditstatement_editzipcode).toBeVisible();
        const zipcodeValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editzipcode}`, input => input.value);
        console.log('ZipCode Element Value:', zipcodeValue);
        expect(zipcodeValue).toMatch(/^\d{5}(-\d{4})?$/);
        await expect(this.myaccount_sbc_creditstatement_editphonenumber).toBeVisible();
        const phonenumberValue = await this.page.$eval(`#${myaccountpage_locator.myaccount_sbc_creditstatement_editphonenumber}`, input => input.value);
        console.log('PhoneNumber Element Value:', phonenumberValue);
        expect(phonenumberValue).toMatch(/\(\d{3}\) \d{3}-\d{4}/);
        await expect(this.myaccount_sbc_creditstatement_saveaddressbutton).toBeVisible();
        await expect(this.myaccount_sbc_creditstatement_canceladdressbutton).toBeVisible();
    }

    async validateUpdateSavedAddress() {
        // Generate random data
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        //const state = fakerEN_US.location.state();
        const state = faker.location.state({ abbreviated: true })
        const zipCode = faker.location.zipCode().substring(0, 5); // Get only the first 5 digits
        const phoneNumber = faker.phone.number();
        const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
        
        // Fill in the required fields
        await this.page.locator('#EditfirstName').clear();
        await this.page.type('#EditfirstName', firstName);
        await this.page.locator('#EditlastName').clear();
        await this.page.type('#EditlastName', lastName);
        await this.page.locator('#Editaddress').clear();
        await this.page.type('#Editaddress', address);
        await this.page.locator('#Editcity').clear();
        await this.page.type('#Editcity', city);
        await this.page.selectOption('#state', state);
        await this.page.locator('#EditzipCode').clear();
        await this.page.type('#EditzipCode', zipCode);
        await this.page.locator('#EditphoneNumber').clear();
        await this.page.type('#EditphoneNumber', phoneNumber);

        // Click the "Save Address" button
        //await this.page.click('button[type="submit"]');
        await this.myaccount_addnewaddress_saveaddressbutton.click();

        await this.verifyAddressSuggestionModal();

        await this.page.getByText('Address updated successfully').waitFor({state:'visible'});
        await expect(this.page.getByText('Address updated successfully')).toBeVisible();
        
        const fullAddress = `${city},  ${state} ${zipCode}`;
        // Verify that the form submission was successful
        const successMessage = await this.page.$('.text-forestGreen');
        if (successMessage) {
            console.log('Address updated successfully!');

            // Check if the input fields retain the entered data
            const firstNameValue = await this.page.locator('strong').filter({ hasText: firstName }).textContent();
            expect(firstNameValue).toMatch(firstName);
            const lastNameValue = await this.page.locator('strong').filter({ hasText: lastName }).textContent();
            expect(lastNameValue).toMatch(lastName);
            const addressValue = await this.page.locator('p').filter({ hasText: address }).textContent();
            expect(addressValue).toMatch(address);
            const zipCityStateValue = await this.page.locator('p').filter({ hasText: fullAddress }).textContent();
            expect(zipCityStateValue).toMatch(fullAddress);
            //const phoneNumberValue = await this.page.locator('p').filter({ hasText: phoneNumber }).textContent();
            //expect(phoneNumberValue).toMatch(phoneNumberPattern);

            console.log('First Name:', firstNameValue);
            console.log('Last Name:', lastNameValue);
            console.log('Address:', addressValue);
            console.log('City:', zipCityStateValue);
            //console.log('Phone Number:', phoneNumberValue);
        } else {
            console.log('Failed to update address.');
        }
    }

    async validateAddressLine2(){
        await expect(this.page.getByRole('button', { name: 'Address Line 2 (optional)' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Address Line 2 (optional)' }).click();
        await expect(this.page.locator('#EditadditionalAddressInfo')).toBeVisible();
    }

    async clickEditButton(){
        await this.page.getByRole('button', { name: 'Edit',exact:true }).nth(0).click();
    }

    async validateErrorMessage(){
        // Get all elements with class "text-scarletRed"
        const scarletRedElements = await this.page.$$('.text-scarletRed');

        // Iterate over each element
        for (const element of scarletRedElements) {
            // Get the text content of each element
            const errorMessage = await this.page.evaluate(el => el.textContent, element);
            console.log(errorMessage);
        }
    }

    async enterInvalidDataForEditAddress(){
        // Fill in the required fields
        await this.page.locator('#EditfirstName').clear();
        await this.page.type('#EditfirstName', "#$%^^");
        await this.page.locator('#EditlastName').clear();
        await this.page.type('#EditlastName', "&((^^");
        await this.page.locator('#Editaddress').click();

    }

    async enterInvalidDataForAddAddress(){
        // Fill in the required fields
        await this.page.locator('#firstName').clear();
        await this.page.type('#firstName', "#$%^^");
        await this.page.locator('#lastName').clear();
        await this.page.type('#lastName', "&((^^");
        await this.page.locator('#address').click();
        await this.page.locator('#city').click();

    }

    async cancelEditAddress(){
        await expect(this.page.getByText('Edit Address')).toBeHidden();
    }

    async setDefaultAddress(){
        const setDefaultAddressButtonLocator = this.page.getByRole('button', { name: 'Set as Default',exact:true }).first();
        let buttonVisible = await setDefaultAddressButtonLocator.isVisible();
        const maxRetries = 2; // Set a maximum number of retries to avoid infinite loop
        let retries = 0;

        while (!buttonVisible && retries < maxRetries) {
            await this.clickAddNewAddressButton();
            await this.displayAddNewAddressSection();
            await this.validateAddNewAddress();
            await this.displayAddressSection();
            retries++;
            //await this.page.reload(); // Optional: wait for a short time before rechecking
            buttonVisible = await setDefaultAddressButtonLocator.isVisible();
            await this.page.reload(); 
        }

        if (!buttonVisible) {
            throw new Error('Failed to find the "Set as Default" button after multiple attempts');
        } else {
            const setDefaultAddressFirstName = await this.page.locator('strong.text-lg.font-semibold.leading-6').first().textContent();
            console.log('Default Address First Name:' + setDefaultAddressFirstName);
            const noDefaultAddressFirstName = await this.page.locator('strong.text-lg.font-semibold.leading-6').nth(1).textContent();
            console.log('First Non Default Address First Name:' + noDefaultAddressFirstName);

            // Click on the first "Set as Default" button
            await this.page.getByRole('button', { name: 'Set as Default' }).first().click();
            await this.page.getByText('Primary address updated').waitFor({ state: 'visible' });
            await expect(this.page.getByText('Primary address updated')).toBeVisible();
            await expect(this.page.getByText('Default Billing & Shipping Address')).toBeVisible();
            await this.page.reload();
            await this.displayAddressSection();
            const defaultShippingFirstName = await this.page.locator('section.m-4.rounded-md.border.border-foggyGray > strong').first().textContent();
            expect(defaultShippingFirstName).toMatch(noDefaultAddressFirstName);

        }

    }

    async validateDefaultShippingFirstSection(){
        const expectedText = "Default Billing & Shipping Address";
        // Check if the <p> tag with expected text is visible within the first section
        const isDisplayed = await this.page.isVisible(`section:first-child p:has-text("${expectedText}")`);
        console.log("Is displayed:", isDisplayed);
    }

    async addNewDefaultShippingBillingAddress(){
        // Generate random data
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        //const state = fakerEN_US.location.state();
        const state = faker.location.state({ abbreviated: true })
        const zipCode = faker.location.zipCode().substring(0, 5); // Get only the first 5 digits
        const phoneNumber = faker.phone.number();
        const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
        // Fill in the required fields
        await this.page.type('#firstName', firstName);
        await this.page.type('#lastName', lastName);
        await this.page.type('#address', address);
        await this.page.type('#city', city);
        await this.page.selectOption('#state', state);
        await this.page.type('#zipCode', zipCode);
        await this.page.type('#phoneNumber', phoneNumber);
        await this.selectSaveDefaultaddressCheckbox();
        // Click the "Save Address" button
        await this.myaccount_addnewaddress_saveaddressbutton.click();
        await this.verifyAddressSuggestionModal();
        await this.page.getByText('Address added successfully').waitFor({state:'visible'});
        await expect(this.page.getByText('Address added successfully')).toBeVisible();
        await this.validateDefaultShippingFirstSection();
        await this.page.reload();
        const defaultShippingFirstName = await this.page.locator('section.m-4.rounded-md.border.border-foggyGray > strong').nth(0).textContent();
        expect(defaultShippingFirstName).toMatch(firstName);

    }

    async validateSavedAddress(){
        const addressRegex = /^\d+\s+\d*[a-zA-Z\s]+(?:\s+(?:Apt|Suite|Ste|Unit|#)\s*\d*[a-zA-Z]*)?$/;
        const cityStateZipRegex = /^[A-Za-z\s'-]+,\s*[A-Z]{2}\s*\d{5}(-\d{4})?$/;
        const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
        const savedAddressFirstLastName = await this.page.locator('section.mb-2.mt-3.text-base.pl-8>p').nth(0).textContent();
        expect(savedAddressFirstLastName).toMatch(/[\s\S]+/);
        const savedAddressAddressLine1 = await this.page.locator('section.mb-2.mt-3.text-base.pl-8>p').nth(1).textContent();
        expect(savedAddressAddressLine1).toMatch(addressRegex);
        const savedAddressCityZipState = await this.page.locator('section.mb-2.mt-3.text-base.pl-8>p').nth(2).textContent();
        expect(savedAddressCityZipState).toMatch(cityStateZipRegex);
        const savedAddressPhoneNumber = await this.page.locator('section.mb-2.mt-3.text-base.pl-8>p').nth(3).textContent();
        expect(savedAddressPhoneNumber).toMatch(phoneNumberPattern);
    }

    async editAddressButtonDisplay(){
        await expect(this.myaccount_makepayment_creditstateadd_editbutton).toBeVisible();
    }

    async validatedSuccessMessage(){
        // Wait for the page to navigate or for a success message
        await Promise.race([
            //this.page.waitForNavigation({ timeout: 5000 }), // Adjust timeout as needed
            this.page.waitForSelector('.text-forestGreen') // Assuming there's a success message
        ]);
    }

    async setDefaultCreditCard(){
        const setDefaultAddressButtonLocator = this.page.getByRole('button', { name: 'Set as Default',exact:true }).first();
        let buttonVisible = await setDefaultAddressButtonLocator.isVisible();
        const maxRetries = 2; // Set a maximum number of retries to avoid infinite loop
        let retries = 0;

        while (!buttonVisible && retries < maxRetries) {
            await this.clickAddNewCC();
            await this.validateNewCCSection();
            await this.enterCCNumber('4111111111111111');
            await this.enterCCExpDate('12/34');
            await this.enterCCSecurityCode('123');
            await this.clickSaveCardButton();
            //await this.validatedSuccessMessage();
            await this.page.getByText('Credit card added successfully').waitFor({ state: 'visible' });
            await expect(this.page.getByText('Credit card added successfully')).toBeVisible();
            retries++;
            //await this.page.reload(); // Optional: wait for a short time before rechecking
            buttonVisible = await setDefaultAddressButtonLocator.isVisible();
            await this.page.reload(); 
        }

        if (!buttonVisible) {
            throw new Error('Failed to find the "Set as Default" button after multiple attempts');
        } else {
            const defaultCardNumber = await this.page.locator('section.m-4.rounded-md p.font-semibold').nth(1).textContent();
            console.log('Default Card Number:' + defaultCardNumber);

            // Click on the first "Set as Default" button
            await this.page.getByRole('button', { name: 'Set as Default' }).first().click();
            await this.page.getByText('Primary card updated successfully').waitFor({ state: 'visible' });
            await expect(this.page.getByText('Primary card updated successfully')).toBeVisible();
            await expect(this.page.getByText('Default Credit Card')).toBeVisible();
            await this.page.reload();
            await this.page.locator('section.m-4.rounded-md p.font-semibold').first().waitFor({ state: 'visible' });
            const setDefaultCreditCardNumber = await this.page.locator('section.m-4.rounded-md p.font-semibold').nth(0).textContent();
            expect(setDefaultCreditCardNumber).toMatch(defaultCardNumber);

        }

    }

    async removeCreditCard(){
        await this.page.locator('section.m-4').first().waitFor({ state: 'visible' });
        const addressSections = await this.page.locator('section.m-4');
        const addressSectionsCount = await addressSections.count();
        const deleteAddressCount = (addressSectionsCount -1);
        console.log('Total Saved Address Count:', addressSectionsCount);
        console.log('Total Delete Address Count:', deleteAddressCount);
        
        await this.page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_remove_button }).nth(deleteAddressCount).click();
        await expect(this.page.locator('.text-forestGreen').filter({ hasText: 'Credit card deleted successfully' })).toBeVisible();
        await this.page.locator('.text-forestGreen').filter({ hasText: 'Credit card deleted successfully' }).waitFor({ state: 'hidden' });
        const successMessage = await this.page.$('.text-forestGreen');
        if (successMessage) {
            const deletedAddressSections = await this.page.locator('section.m-4');
            const deletedAddressSectionsCount = await deletedAddressSections.count();
            await expect(deletedAddressSections).toHaveCount(deleteAddressCount);
            console.log('Credit card deleted successfully!');
            console.log('Credit Card deleted Count!' + deletedAddressSectionsCount);
        } else {
            console.log('Failed to delete credit card.');
        }

    }

    async undoRemoveCreditCard(){
        await this.page.reload();
        await this.page.locator('section.m-4').first().waitFor({ state: 'visible' });
        const addressSections = await this.page.locator('section.m-4');
        const addressSectionsCount = await addressSections.count();
        let nthIndex = 0;
        if (addressSectionsCount > 1) {
            nthIndex = addressSectionsCount - 1;
        }

        const deleteAddressCount = (addressSectionsCount -1);
        console.log('Total Saved Credit Card Count:', addressSectionsCount);
        //console.log('Total Delete Credit Card Count:', deleteAddressCount);
        
        await this.page.getByRole('button', { name: myaccountpage_locator.myaccount_savedaddress_remove_button }).nth(nthIndex).click();
        await expect(this.page.locator('.text-forestGreen').filter({ hasText: 'Credit card deleted successfully' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Undo' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Undo' }).click();
        await this.page.locator('.text-forestGreen').filter({ hasText: 'Credit card deleted successfully' }).waitFor({ state: 'hidden' });
        await expect(this.page.locator('section.m-4')).toHaveCount(addressSectionsCount);
        
    }

    async editCreditCard(enterCCNumber){
        const cardNumberValue = await this.page.$eval('#EditcardNumber', input => input.value);
        console.log('Card Number Value:', cardNumberValue);
        expect(cardNumberValue).toMatch(/^\s*$/);
        const cardSecurityValue = await this.page.$eval('#editSecurityCode', input => input.value);
        console.log('Card Security Code Value:', cardSecurityValue);
        expect(cardSecurityValue).toMatch(/^\s*$/);

        const cardNumber = faker.finance.creditCardNumber('visa');
		// Fill in the required fields
        await this.page.type('#EditcardNumber', enterCCNumber);
        await this.page.type('#editSecurityCode', '123');

        const cardExpDateValue = await this.page.$eval('#editExpDate', input => input.value);
        console.log('Card Expiry Date Value:', cardExpDateValue);
        expect(cardExpDateValue).toMatch(/^(0[1-9]|1[0-2])\/\d{2}$/);
        
    }

    async fillNewAddress(){
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        //const state = fakerEN_US.location.state();
        const state = faker.location.state({ abbreviated: true })
        const zipCode = faker.location.zipCode().substring(0, 5); // Get only the first 5 digits
        const phoneNumber = faker.phone.number();
        const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
        // Fill in the required fields
        await this.page.type('#firstName', firstName);
        await this.page.type('#lastName', lastName);
        await this.page.type('#address', address);
        await this.page.type('#city', city);
        await this.page.selectOption('#state', state);
        await this.page.type('#zipCode', zipCode);
        await this.page.type('#phoneNumber', phoneNumber);
    }

    async updateCreditCardSuccessMessage(){
        const addressModalVisible = await this.page.isVisible('role=heading[name="Verify Your Address"]',{ timeout: 15000 });
        if (addressModalVisible) {
            await this.page.getByLabel('Use Original Address').click();
            await this.page.getByRole('button', { name: 'Continue' }).click();
            await this.page.getByText('Card details have been updated successfully').waitFor({ state: 'visible' });
            await expect(this.page.getByText('Card details have been updated successfully')).toBeVisible();          
        } else {
            // Address suggestion modal is not visible, verify the success message and then proceed
            await this.page.getByText('Card details have been updated successfully').waitFor({ state: 'visible' });
            await expect(this.page.getByText('Card details have been updated successfully')).toBeVisible();
        }
    }

    async verifyAddressSuggestionModal(){
        try {
            // Wait for the address modal to appear with a specific timeout
            await this.page.waitForSelector('role=heading[name="Verify Your Address"]', { timeout: 15000 });
    
            // If the modal appears, proceed with the address verification steps
            await this.page.getByLabel('Use Original Address').click();
            await this.page.getByRole('button', { name: 'Continue' }).click();
        } catch (error) {
            // If the modal does not appear within the timeout, log the error (optional) and continue
            console.log('Address suggestion modal did not appear, continuing with the next steps.');
        }
    }

}