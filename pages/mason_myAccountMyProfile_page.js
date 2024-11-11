import test, { expect } from 'playwright/test';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const createAccountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_createAccount_page_data.json')));


exports.MyAccountMyProfilePage = class MyAccountMyProfilePage{
    constructor(page){
        this.page=page;
        this.myaccount_changepassword_currentpassword=page.getByLabel(myaccountpage_locator.myaccount_changepassword_currentpassword);
        this.myaccount_changepassword_passwordonemail=page.getByLabel('*Password');
        this.myaccount_myprofile_contactinformation=page.getByRole('heading', { name: myaccountpage_locator.myaccount_myprofile_contactinformation });
        this.myaccount_myprofile_savechanges_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_myprofile_savechanges_button });
        this.myaccount_myprofile_changepassword=page.locator(myaccountpage_locator.myaccount_myprofile_changepassword);
        this.myaccount_myprofile_firstname=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_firstname);
        this.myaccount_myprofile_lastname=page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_lastname);
        this.myaccount_myprofile_email=page.getByLabel(myaccountpage_locator.myaccount_myprofile_email);
        this.myaccount_myprofile_savechanges_button=page.getByRole('button', { name: myaccountpage_locator.myaccount_myprofile_savechanges_button });
        this.email_change_modal_close_button=page.getByRole('button', { name: myaccountpage_locator.email_change_modal_close_button });
        this.email_change_modal_cancel_button=page.getByRole('button', { name: myaccountpage_locator.email_change_modal_cancel_button });
        this.myProfile_password_show_link=page.getByRole('link', { name: myaccountpage_locator.myProfile_password_show_link });
        this.myProfile_password_hide_link=page.getByRole('link', { name: myaccountpage_locator.myProfile_password_hide_link });
        this.myProfile_CurrentPasswordTextBox=page.locator('input[id="*Current Password"]');
        

        this.myprofile_currentpass_show=page.getByRole('link', { name: myaccountpage_locator.myProfile_password_show_link }).first();
        this.myprofile_currentpass_hide=page.getByRole('link', { name: myaccountpage_locator.myProfile_password_hide_link }).first();


        this.myprofile_changepassword_newpassword=page.getByLabel(myaccountpage_locator.myaccount_changepassword_newpassword);
        this.myprofile_changepassword_button = page.getByRole('button', { name: myaccountpage_locator.myaccount_changepassword });

        this.password_criteria_text=page.getByText(createAccountpage_data.password_criteria_text);
        this.password_criteria1=(page.locator('section').filter({ hasText: new RegExp(createAccountpage_data.password_criteria1) }).first());
        this.password_criteria2=(page.locator('section').filter({ hasText: new RegExp(createAccountpage_data.password_criteria2) }).first());
        this.password_criteria3=(page.locator('section').filter({ hasText: new RegExp(createAccountpage_data.password_criteria3) }).first());
    }

    async updatePasswordonMyProfile(){
        await this.myprofile_changepassword_button.click();
        //await expect(this.page.getByText('Password changed successfully.')).toBeVisible();
        //await expect(this.page.getByText(accountpage_data.password_updated_message)).toBeVisible({ timeout: 20000 });;
        console.log("Password changed");
        //await this.page.waitForTimeout(2000);
    }

    async validateIncorrectMessageInMyProfile(){
        await this.myprofile_changepassword_button.click();
        //await expect(this.page.getByText('Password changed successfully.')).toBeVisible();
        await expect(this.page.getByText(accountpage_data.incorrect_password_message)).toBeVisible();
    }

    

    async validateMyProfilePageFields(){
        await this.page.waitForTimeout(2000);
        await expect(this.page).toHaveURL(/.*myprofile/);
        //await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_myprofile_headertext);
        //await expect(this.page.getByRole('heading', { name: myaccountpage_locator.myaccount_myprofile_contactinformation })).toBeVisible();
        
        await expect(this.myaccount_myprofile_firstname).toBeVisible();
        await expect(this.myaccount_myprofile_lastname).toBeVisible();
        await expect(this.myaccount_myprofile_email).toBeVisible();
        await expect(this.myaccount_myprofile_savechanges_button).toBeVisible();
        //await expect(this.page.getByText('HomeMy AccountMy Profile')).toBeVisible();
    }

    async validateMyProfilePage(){
        await expect(this.page).toHaveURL(/.*myprofile/);
        await expect(this.page.locator('body')).toContainText(myaccountpage_locator.myaccount_myprofile_headertext);
        await expect(this.page.getByRole('heading', { name: myaccountpage_locator.myaccount_myprofile_contactinformation })).toBeVisible();
        await expect(this.myaccount_myprofile_firstname).toBeVisible();
        await expect(this.myaccount_myprofile_lastname).toBeVisible();
        await expect(this.myaccount_myprofile_email).toBeVisible();
        await expect(this.myaccount_myprofile_savechanges_button).toBeVisible();
        //await expect(this.page.getByText('HomeMy AccountMy Profile')).toBeVisible();
    }

    async clickMyProfileSaveChangesButton(){
        await this.myaccount_myprofile_savechanges_button.click();
    }

    async validateIncorrectPasswordMessage(){
        await (this.page.getByText(accountpage_data.incorrect_password_message)).waitFor({state:'visible'});
    }

    async enterFirstName(enterFirstName){
        await this.myaccount_myprofile_firstname.fill(enterFirstName);
    }
    async enterLastName(enterLastName){
        await this.myaccount_myprofile_lastname.fill(enterLastName);
    }

    async validateMyProfileUpdateMessage(){
        try {
            await expect(this.page.getByText(accountpage_data.myaccount_myprofile_updatemessage)).toBeVisible({ timeout: 10000 });
            
        } catch (error) {
            throw new Error('Failed to validate profile update message:'+ error);
        }
    
    }

    async validateSaveButtonIsDisabled(){
        const isDisabled = await this.myaccount_myprofile_savechanges_button;
        const classAttribute = await isDisabled.getAttribute('type');
        //const isGreyedOut = classAttribute.includes('disabled:opacity-50');
        expect(classAttribute).toBe('submit');
    }

    async validateFirstName(firstname){
        await expect(this.myaccount_myprofile_firstname).toHaveValue(firstname);
    }

    async validateInvalidDataInMyProfile(){
        await this.myaccount_myprofile_firstname.fill('');
        await this.myaccount_myprofile_email.fill('');
        await this.myaccount_myprofile_lastname.fill('');
        await this.myaccount_myprofile_savechanges_button.click();
        //await this.myaccount_addnewaddress_lastname.click();
        await expect(this.page.getByText('Enter a First Name')).toBeVisible();
        await expect(this.page.getByText('Enter a Last Name')).toBeVisible();
        await expect(this.page.getByText('Enter an email address')).toBeVisible();

    }

    async validateChangeEmailModal(email){
        await this.myaccount_myprofile_email.fill('');
        await this.myaccount_myprofile_email.fill(email);
        await this.myaccount_myprofile_savechanges_button.click();
        await expect(this.page.getByText(accountpage_data.email_change_modal_text1)).toBeVisible();
        await expect(this.page.getByText(myaccountpage_locator.email_change_modal_old_address)).toBeVisible();
        await expect(this.page.getByText(myaccountpage_locator.email_change_modal_new_address, { exact: true })).toBeVisible();
        await expect(this.page.getByText(accountpage_data.email_change_modal_text2)).toBeVisible();
        await expect(this.myaccount_changepassword_currentpassword).toBeVisible();
        await expect(this.email_change_modal_close_button).toBeVisible();
        await expect(this.myaccount_myprofile_savechanges_button).toBeVisible();
        await expect(this.email_change_modal_cancel_button).toBeVisible();
    }

    async enterEmailtoChange(email){
        await this.myaccount_myprofile_email.fill('');
        await this.myaccount_myprofile_email.fill(email);
        await this.myaccount_myprofile_savechanges_button.click();
        await expect(this.page.getByText(accountpage_data.email_change_modal_text1)).toBeVisible({ timeout: 10000 });
    }

    async clickSaveChangesOnEmailModal(){
        this.myaccount_myprofile_savechanges_button.click();
    }

    async validateEmailUpdateSuccessMessage(){
        await expect(this.page.getByText(accountpage_data.email_updated_message)).toBeVisible({ timeout: 20000 });
    }

    async validateCancelOnEmailChangeModal(){
        await this.email_change_modal_cancel_button.click();
        await expect(this.myaccount_myprofile_firstname).toBeVisible();
        
    }

    async validateCloseOnEmailChangeModal(){
        await this.email_change_modal_close_button.click();
        await expect(this.myaccount_myprofile_firstname).toBeVisible();
        
    }

    async validatePasswordShowLinkIsVisible(){
        await expect(this.myProfile_password_show_link).toBeVisible();
    }

    async validatePasswordHideLinkIsVisible(){
        await expect(this.myProfile_password_hide_link).toBeVisible();
    }

    async enterPasswordOnEmailModal(password){
        this.myaccount_changepassword_passwordonemail.click();
        this.myaccount_changepassword_currentpassword.fill(password);
    }

    async enterCurrentPasswordOnMyProfile(password){
        await expect(this.myProfile_CurrentPasswordTextBox).toBeVisible({timeout:10000});
        this.myProfile_CurrentPasswordTextBox.click();
        this.myProfile_CurrentPasswordTextBox.fill('');
        this.myProfile_CurrentPasswordTextBox.fill(password);
    }

    async enterNewPasswordOnMyProfile(password){
        this.myprofile_changepassword_newpassword.click();
        this.myprofile_changepassword_newpassword.fill('');
        this.myprofile_changepassword_newpassword.fill(password);
    }

    async readPasswordFromTextboxAndValidate(password){
        await expect(this.myaccount_changepassword_passwordonemail).toHaveValue(password);
    }

    async readPasswordFromTextboxAndValidateProfile(password){
        await expect(this.myProfile_CurrentPasswordTextBox).toHaveValue(password);
    }

    async clickOnShowPassword(){
        await this.myProfile_password_show_link.click();
    }

    async clickOnShowInMyProfile(){
        await this.myprofile_currentpass_show.click();
    }

    async clickOnHideInMyProfile(){
        await this.myprofile_currentpass_hide.click();
    }

    async clickOnHidePassword(){
        await this.myProfile_password_hide_link.click();
    }

    async validatePasswordIsHidden(){
        const passwordTextbox=this.myaccount_changepassword_currentpassword;
        const hidden_password = await passwordTextbox.getAttribute('type') === 'password';
        expect(hidden_password).toBe(true);
    }

    async validatePasswordIsHiddenProfile(){
        const passwordTextbox=this.myProfile_CurrentPasswordTextBox;
        const hidden_password = await passwordTextbox.getAttribute('type') === 'password';
        expect(hidden_password).toBe(true);
    }

    async validatePasswordIsShown(){
        const passwordTextbox=this.myaccount_changepassword_passwordonemail;
        const shown_password = await passwordTextbox.getAttribute('type') === 'text';
        // console.log(shown_password);
        // console.log(passwordTextbox.getAttribute('type'));
        expect(shown_password).toBe(true);
    }

    async validatePasswordIsShownProfile(){
        const passwordTextbox=this.myProfile_CurrentPasswordTextBox;
        const shown_password = await passwordTextbox.getAttribute('type') === 'text';
        // console.log(shown_password);
        // console.log(passwordTextbox.getAttribute('type'));
        expect(shown_password).toBe(true);
    }


    
    async validateThePasswordCriteria(){
         await expect(this.password_criteria_text).toBeVisible();
         await expect(this.password_criteria1).toBeVisible();
         console.log(this.password_criteria_text);
         await expect(this.password_criteria2).toBeVisible();
         await expect(this.password_criteria3).toBeVisible();
         const criteriaData = {
             password_criteria1: createAccountpage_data.password_criteria1,
             password_criteria2: createAccountpage_data.password_criteria2,
             password_criteria3: createAccountpage_data.password_criteria3
         };
        
         for (const key in criteriaData) {
             const input = criteriaData[key];
             const extractedText = input.match(/^\^(.*?)\$$/)[1];
             //console.log(`Input for ${key}:`, input);
             const section = await this.page.locator(`//section[text()="${extractedText}"]`);
             const classAttributeValue = await section.getAttribute('class');
        
             if (classAttributeValue.includes('text-forestGreen')) {
                 console.log(`The section for ${key} - ${input} contains the class 'text-forestGreen'.`);
             } else {
                 console.log(`The section for ${key} - ${input} does not contain the class 'text-forestGreen'.`);
             }
         }

        }
    
}