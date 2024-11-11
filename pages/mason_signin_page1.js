import test, { expect } from 'playwright/test';
const signinpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_signin_page_repo.json')));

exports.SignInPageNew = class SignInPageNew {
    constructor(page) {
        this.page = page;
        this.signin_button_name = page.getByRole('button', { name: signinpage_locator.signin_button_name, exact: true });
        this.create_account_button_name = page.getByRole('button', { name: signinpage_locator.create_account_button_name });
        this.create_account_link_name = page.getByRole('link', { name: signinpage_locator.create_account_button_name });
        this.myaccount_img_icon_name = page.getByRole('img', { name: signinpage_locator.myaccount_img_icon_name });
        // this.signin_emailaddress_textbox=page.locator(signinpage_locator.signin_emailaddress_textbox);
        // this.signin_password_textbox=page.locator(signinpage_locator.signin_password_textbox);
        this.signin_emailaddress_textbox = page.getByLabel(signinpage_locator.signin_emailaddress_textbox);
        this.signin_password_textbox = page.getByLabel(signinpage_locator.signin_password_textbox);
        this.signin_img_button = page.locator(signinpage_locator.signin_img_button);
        this.signin_stoneberrycredit_button = page.getByRole('button', { name: signinpage_locator.signin_stoneberrycredit_button });
        this.signin_makeapayment_button = page.getByRole('button', { name: signinpage_locator.signin_makeapayment_button });
        this.signin_orders_link = page.getByRole('link', { name: signinpage_locator.signin_orders_link });
        this.signin_orders_link_guest = page.getByRole('link', { name: signinpage_locator.signin_orders_link_guest });
        this.signin_wishlist_link = page.getByRole('link', { name: signinpage_locator.signin_wishlist_link });
        this.signin_needhelp_link = page.getByRole('link', { name: signinpage_locator.signin_needhelp_link });
        this.forgot_password_link = page.getByRole('button', { name: signinpage_locator.forgot_password_link });

    }

    async validateWelcomeSignInDialog() {
        await expect(this.myaccount_img_icon_name).toBeVisible();
        await expect(this.signin_button_name).toBeVisible();
        await expect(this.create_account_button_name).toBeVisible();
    }

    async validateSignInDialog() {
        await expect(this.signin_emailaddress_textbox).toBeVisible();
        await expect(this.signin_password_textbox).toBeVisible();
        await expect(this.signin_button_name).toBeVisible();
        //await expect(this.create_account_button_name).toBeVisible();
    }

    async validateWelcomeTextSignInDialog(welcomeText) {
        await expect(this.page.getByText(welcomeText)).toBeVisible();
    }

    async login(enterUserName, enterPassword) {
        await this.signin_emailaddress_textbox.fill(enterUserName);
        await this.signin_password_textbox.fill(enterPassword);
    }

    async clickSignIn() {
        await this.signin_button_name.click();
    }

    async waitForMyAccountDashboardLoad() {
        await this.page.waitForURL('**/account/dashboard/');
    }

    async clickSignInImage() {
        await this.signin_img_button.click();
    }

    async validateSignedInMessage(SignedInMessage) {
        await expect(this.page.getByRole('banner')).toContainText(SignedInMessage);
    }

    async waitForHiddenSignedInMessage() {
        await this.page.getByText('You have been successfully signed in to your account✕').waitFor({ state: 'hidden' });
        //await expect(page.getByText('You have been successfully signed in to your account✕')).toBe();
    }

    async validateSignInAccountDrawer() {
        await expect(this.signin_button_name).toBeVisible();
        await expect(this.create_account_button_name).toBeVisible();
        await expect(this.signin_orders_link_guest).toBeVisible();
        await expect(this.signin_wishlist_link).toBeVisible();
        await expect(this.signin_needhelp_link).toBeVisible();
    }

    async validateSignedInAccountDrawer() {
        await expect(this.signin_stoneberrycredit_button).toBeVisible();
        await expect(this.signin_makeapayment_button).toBeVisible();
        await expect(this.signin_orders_link).toBeVisible();
        await expect(this.signin_wishlist_link).toBeVisible();
        await expect(this.signin_needhelp_link).toBeVisible();

    }

    async validateSignInMessage(signInSuccessMessage) {
        //await this.page.getByText(signInSuccessMessage).waitFor({ state: 'visible' });
        //await expect(this.page.getByText(signInSuccessMessage)).toBeVisible();
        //await this.page.locator(`p:has-text("${signInSuccessMessage}")`).toBeVisible();
        await this.page.locator('.text-forestGreen').filter({ hasText: signInSuccessMessage }).waitFor({ state: 'visible' });
        await expect(this.page.locator('.text-forestGreen').filter({ hasText: signInSuccessMessage })).toBeVisible();
        //await this.page.locator('div.h-16.w-16.animate-spin').waitFor({state:'hidden'});
    }

    async waitForLoaderComplete() {
        await this.page.locator('div.h-16.w-16.animate-spin').waitFor({ state: 'hidden' });
    }

    async validateSignOutMessage(signOutMessage) {
        await expect(this.page.getByText(signOutMessage)).toBeVisible();
    }

    async pageTextValidation(enterPageText) {
        await expect(this.page.getByText(enterPageText)).toBeVisible();
    }

    async signoutPageHeaderTextValidation(signoutPageHeaderText) {
        await expect(this.page.getByRole('heading', { name: signoutPageHeaderText })).toBeVisible();
    }

    async keepmeSignInCheckbox(checkboxLabelName) {
        await expect(this.page.getByLabel(checkboxLabelName)).toBeVisible();
    }

    async validateSignOutPageFormFields() {
        await expect(this.signin_button_name).toBeVisible();
        await expect(this.create_account_link_name).toBeVisible();
        await expect(this.signin_emailaddress_textbox).toBeVisible();
        await expect(this.signin_password_textbox).toBeVisible();
        await expect(this.forgot_password_link).toBeVisible();

    }

    async invalidUserLoginValidation(invalidLoginErrorMessage) {
        await expect(this.page.getByText(invalidLoginErrorMessage)).toBeVisible();
    }

    async validateLoginError() {
        // Select all elements with the class 'text-scarletRed'
        //await this.page.waitForSelector('.text-scarletRed', { state: 'visible', timeout: 5000 });
        await this.page.waitForTimeout(5000);
        const scarletRedElements = await this.page.locator('.text-scarletRed').isVisible();
        return scarletRedElements;
    }
}