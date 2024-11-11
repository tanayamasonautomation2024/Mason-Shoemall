import test, { expect } from 'playwright/test';

const emptyCartHeaderContent = 'Shopping Bag';
const emptyCartContent = 'Your shopping bag is empty.';
const emptyCarAccountSignInButtonContent = 'Have an account? Sign in';
const emptyCartAccountSignInContent = 'Have an account? Sign in to view items that were previously added to your bag.';
const emptyCartSignInButtonContent = 'Sign In';
const emptyCartContinueShoppingButtonContent = 'Continue Shopping';

exports.EmptyCartPage = class EmptyCartPage {
    constructor(page) {
        this.page = page;
        this.emptyCartHeaderText = page.getByRole('heading', { name: emptyCartHeaderContent });
        this.emptyCartText = page.getByText(emptyCartContent);
        this.emptyCartAccountSignInButton = page.getByRole('button', { name: emptyCarAccountSignInButtonContent });
        this.emptyCartAccountSignInText =page.getByText(emptyCartAccountSignInContent)
        this.emptyCartSignInButton = page.getByRole('button', { name: emptyCartSignInButtonContent, exact: true });
        this.emptyCartContinueShoppingButton = page.getByRole('button', { name: emptyCartContinueShoppingButtonContent });
    }

    async validateEmptyCartMessageGuestUser(){
        await this.emptyCartHeaderText.waitFor({state:'visible'});
        expect(await this.emptyCartHeaderText).toBeVisible();
        expect(await this.emptyCartText).toBeVisible();
       
    }

    async validateEmptyCartAccountSignInText(){
        await this.emptyCartAccountSignInButton.waitFor({state:'visible'});
        expect(await this.emptyCartAccountSignInButton).toBeVisible();
        expect(await this.emptyCartAccountSignInText).toBeVisible();
        expect(await this.emptyCartSignInButton).toBeVisible();
        expect(await this.emptyCartContinueShoppingButton).toBeVisible();
    }

    async clickSignInTextEmptyCart(){
        await this.emptyCartAccountSignInButton.click();

    }

    async clickSignInButtonEmptyCart(){
        await this.emptyCartSignInButton.click();

    }

    async clickContinueShoppingButtonEmptyCart(){
        await this.emptyCartContinueShoppingButton.click();

    }

    async validateEmptyCartLoggedInUser(){
        await this.emptyCartHeaderText.waitFor({state:'visible'});
        expect(await this.emptyCartHeaderText).toBeVisible();
        expect(await this.emptyCartText).toBeVisible();
        expect(await this.emptyCartContinueShoppingButton).toBeVisible();
        expect(await this.emptyCartAccountSignInButton).toBeHidden();
        expect(await this.emptyCartAccountSignInText).toBeHidden();
        expect(await this.emptyCartSignInButton).toBeHidden();
    }
}