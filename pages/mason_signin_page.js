import test, { expect } from 'playwright/test';
const signinpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_signin_page_repo.json')));
const signinpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));

exports.SignInPage = class SignInPage{
    constructor(page){
        this.page=page;
        this.create_an_account_button=page.getByRole('button',{name:'Create Account'});
        this.signin_button_name=page.getByRole('button', { name: signinpage_locator.signin_button_name });
        //this.create_account_button_name=page.getByRole('button', { name: signinpage_locator.create_account_button_name });
        this.myaccount_img_icon_name=page.getByRole('img', { name: signinpage_locator.myaccount_img_icon_name });
        // this.signin_emailaddress_textbox=page.locator(signinpage_locator.signin_emailaddress_textbox);
        // this.signin_password_textbox=page.locator(signinpage_locator.signin_password_textbox);
        this.signin_emailaddress_textbox=page.getByLabel(signinpage_locator.signin_emailaddress_textbox);
        this.signin_password_textbox=page.getByLabel(signinpage_locator.signin_password_textbox);
        this.signin_img_button=page.locator(signinpage_locator.signin_img_button);  
        this.forgot_password_button= page.getByRole('button', { name:signinpage_locator.forgot_password_button});
        this.submit_forgot_password=page.getByRole('button', { name:signinpage_locator.submit_forgot_password});
        //this.forgot_password_text = page.getByRole('heading', {hasText:signinpage_locator.forgot_password_text});
        this.forgot_emailaddress_textbox=page.locator(signinpage_locator.forgot_emailaddress_textbox);
        this.submit_forgot_password=page.getByRole('button',{name: signinpage_locator.submit_forgot_password});
        this.sign_out_button=page.getByRole('button',{name: signinpage_locator.sign_out_button});
       // this.create_an_account_button=page.getByRole('button',{name: signinpage_locator.create_an_account_button});

       //this.failed_message=page.locator(signinpage_locator.failed_message);
       this.failed_message=page.getByText('The supplied email address or');
       this.signin_password_show_link=page.getByRole('link', { name: signinpage_locator.signin_password_show_link });
       this.signin_password_hide_link=page.getByRole('link', { name: signinpage_locator.signin_password_hide_link });
    }

    async validateWelcomeSignInDialog(){
        await expect(this.myaccount_img_icon_name).toBeVisible();
        await expect(this.signin_button_name).toBeVisible();
        await expect(this.create_an_account_button).toBeVisible();
    }

    async validateSignInDialog(){
        await expect(this.signin_emailaddress_textbox).toBeVisible();
        await expect(this.signin_password_textbox).toBeVisible();
        await expect(this.signin_button_name).toBeVisible();
        //await expect(this.create_account_button_name).toBeVisible();
    }

    async validateWelcomeTextSignInDialog(welcomeText){
        await expect(this.page.getByText(welcomeText)).toBeVisible();
    }

    async login(enterUserName,enterPassword){
        //await
        await this.signin_emailaddress_textbox.fill(enterUserName);
        await this.signin_password_textbox.fill(enterPassword);
    }

    async clickSignIn(){
        await this.signin_button_name.click();
        await this.signin_emailaddress_textbox.waitFor({state:'visible'});
    }

    async clickSignInImage(){
        await this.signin_img_button.click();
        await this.create_an_account_button.waitFor({state:'visible'});
    }

    async validateSignedInMessage(SignedInMessage){
        await expect(this.page.getByRole('banner')).toContainText(SignedInMessage);
    }

    async waitForHiddenSignedInMessage(){
        await this.page.getByText('You have been successfully signed in to your account✕').waitFor({ state: 'hidden' });
        //await expect(page.getByText('You have been successfully signed in to your account✕')).toBe();
    }

    async checkLoaderwhileSignIn(){
        await this.page.waitForSelector(signinpage_locator.sign_in_loader);
        const loader = await this.page.isVisible(signinpage_locator.sign_in_loader);
        //expect(loader).not.toBeNull();
        //console.log(loader);
    }

    async closeSignIsSuccessMessage(){
        //await this.page.getByRole('button', { name: '✕' }).click();
        await this.page.getByRole('button').nth(4).click();
    }

    async loginFailMessage(){
        await this.failed_message.waitFor({state:'visible'});
        await expect(this.failed_message).toContainText(signinpage_data.login_fail_message);
    }

    //Account - Reset/Forgot Password : SB-LOGREG024
    async clickOnForgotPassword(){
        await this.forgot_password_button.waitFor({state:'visible'});
        await expect(this.forgot_password_button).toBeVisible();
        await this.forgot_password_button.click();
    }

    //Account - Reset/Forgot Password : SB-LOGREG024
    async validateForgotPasswordModal(forgot_password_text,forgot_password_paragraph){
        await expect(this.page.getByRole('heading')).toContainText(forgot_password_text);
        await expect(this.page.getByRole('paragraph')).toContainText(forgot_password_paragraph);
    }

    //Account - Reset/Forgot Password : SB-LOGREG024
    async fillEmailAddressForgotPassword(email) {
        await this.forgot_emailaddress_textbox.click();
        await this.forgot_emailaddress_textbox.fill(email);
    }

    async validateNullEmailAddressOnForgotPassword() {
        // await this.forgot_emailaddress_textbox.click();
        // await this.forgot_emailaddress_textbox.fill(  );
        await (this.submit_forgot_password).click();
        await expect(this.page.getByText(signinpage_data.null_email_message)).toBeVisible(); 
    }

    async validateInvalidEmailAddressOnForgotPassword() {
        await this.forgot_emailaddress_textbox.click();
        await this.forgot_emailaddress_textbox.fill(signinpage_data.signin_dailog_text);
        await (this.submit_forgot_password).click();
        await expect(this.page.getByText(signinpage_data.invalid_email)).toBeVisible(); 
    }

    //Account - Reset/Forgot Password : SB-LOGREG024
    async submitForgotPasswordForm() {
        await (this.submit_forgot_password).click();
    }

    async waitForSuccessMessage(forgot_password_submission_text) {
        await expect(this.page.getByText(forgot_password_submission_text)).toBeVisible();

    }

    async logout(){
        await expect(this.sign_out_button).toBeVisible();
        await (this.sign_out_button).click();
    }

    async clickCreateAnAccount(){
        await this.create_an_account_button.waitFor({state:'visible'});
        await expect(this.create_an_account_button).toBeVisible();
        await this.create_an_account_button.click();
    }

    async validatePasswordShowLinkIsVisible(){
        await expect(this.signin_password_show_link).toBeVisible();
    }

    async validatePasswordHideLinkIsVisible(){
        await expect(this.signin_password_hide_link).toBeVisible();
    }

    async clickOnShowPassword(){
        await this.signin_password_show_link.click();
    }

    async clickOnHidePassword(){
        await this.signin_password_hide_link.click();
    }

    async validatePasswordIsHidden(){
        const passwordTextbox=this.signin_password_textbox;
        const hidden_password = await passwordTextbox.getAttribute('type') === 'password';
        expect(hidden_password).toBe(true);
    }

    async validatePasswordIsShown(){
        const passwordTextbox=this.signin_password_textbox;
        const shown_password = await passwordTextbox.getAttribute('type') === 'text';
        // console.log(shown_password);
        // console.log(passwordTextbox.getAttribute('type'));
        expect(shown_password).toBe(true);
    }



}
// Code to read the reset link from Console
/*
try {

            let resetPasswordURL = '';
        await expect(this.page.getByText(forgot_password_submission_text)).toBeVisible();
        console.log('Submission message is displayed')
            this.page.on('console', async(msg) => {
                console.log('inside page.on')
                console.log(msg)
        if (msg.text().includes('Reset')) {
                resetPasswordURL = msg.text().replace('URL for Reset Password:', '').trim();
             }
             else {
                 console.log('No Reset URL');
             }
             });
         
             await this.page.waitForFunction(() => !!window.resetPasswordURL, { pollingInterval: 100 });

        // Extracted reset password URL
        const extractedResetPasswordURL = await this.page.evaluate(() => window.resetPasswordURL);
        console.log('Reset Password URL:', extractedResetPasswordURL);

          } catch (error) {
             console.error('Error:', error);
           } finally {
            
            //await browser.close();
        } 
        }*/

    