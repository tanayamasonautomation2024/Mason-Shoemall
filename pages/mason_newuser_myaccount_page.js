import test, { expect } from 'playwright/test';
const newuser_myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));

const newuser_myaccount_paymentpage_breadcrumb="HomeMy AccountCredit Account";
const newuser_myaccount_paymentpage_pageheader="Credit Account Verification";
const newuser_myaccount_paymentpage_step1="Step 1";
const newuser_myaccount_paymentpage_customernumber_textbox="*Customer Account Number";
const newuser_myaccount_paymentpage_c2text="-C2";
const newuser_myaccount_paymentpage_step2="Step 2";
const newuser_myaccount_paymentpage_ssnradiobutton="Last four digits of social";
const newuser_myaccount_paymentpage_ssntextbox="*Last 4 of SSN";
const newuser_myaccount_paymentpage_dobradiobutton="Date of birth";
const newuser_myaccount_paymentpage_dobtextbox="*Date of Birth (MM/DD/YYYY)";
const newuser_myaccount_paymentpage_continuebutton="Continue";
const newuser_myaccount_orderspage_breadcrumb="HomeMy AccountOrders";
const newuser_myaccount_orderspage_headertext="//section[@class='flex items-center gap-2']//p[contains(text(),'Orders')]";
const newuser_myaccount_orderspage_norecentordertext="There are no recent orders in your account, but let’s see if we can find the order you’re looking for.";
const newuser_myaccount_addresspage_breadcrumb="HomeMy AccountAddresses";
const newuser_myaccount_addresspage_headertext="//section[@class='flex items-center gap-x-4']//h1[contains(text(),'Addresses')]";
const newuser_myaccount_addresspage_norecentaddresstext="There are currently no addresses saved to your account."
const newuser_myaccount_saveccpage_breadcrumb="HomeMy AccountSaved Credit";
const newuser_myaccount_saveccpage_headertext="//section[@class='flex items-center gap-x-4']//h1[contains(text(),'Saved Credit Cards')]";
const newuser_myaccount_saveccpage_norecentcctext="There are currently no cards saved to your account.";
const newuser_myaccount_saveccpage_addnewccbutton="(//button[contains(text(),'Add New Credit/Debit Card')])[1]";
const newuser_myaccount_saveccpage_addnewccbuttondd="(//button[contains(text(),'Add New Credit/Debit Card')])[2]";
const newuser_myaccount_saveccpage_savedefaultcccheckbox="(//button[@role='checkbox'])[1]";
const newuser_myaccount_saveccpage_savedefaultbillshipcheckbox="(//button[@role='checkbox'])[2]";
const newuser_myaccount_wishlistpage_breadcrumb="HomeMy AccountWishlist";
const newuser_myaccount_wishlistpage_headertext="Wish List0 Items";
const newuser_myaccount_wishlistpage_norecentcctext="There are currently no items saved to your wish list.";


exports.NewUserMyAccountPage = class NewUserMyAccountPage{
    constructor(page){
        this.page=page;
        this.newuser_myaccount_paymentpage_breadcrumb=page.locator('nav').filter({ hasText: newuser_myaccount_paymentpage_breadcrumb });
        this.newuser_myaccount_paymentpage_pageheader=page.getByRole('heading', { name: newuser_myaccount_paymentpage_pageheader });
        this.newuser_myaccount_paymentpage_step1=page.getByRole('heading', { name: newuser_myaccount_paymentpage_step1 });
        this.newuser_myaccount_paymentpage_customernumber_textbox=page.getByLabel(newuser_myaccount_paymentpage_customernumber_textbox);
        this.newuser_myaccount_paymentpage_c2text=page.getByText(newuser_myaccount_paymentpage_c2text);
        this.newuser_myaccount_paymentpage_step2=page.getByRole('heading', { name: newuser_myaccount_paymentpage_step2 });
        this.newuser_myaccount_paymentpage_ssnradiobutton=page.getByText(newuser_myaccount_paymentpage_ssnradiobutton);
        this.newuser_myaccount_paymentpage_ssntextbox=page.getByLabel(newuser_myaccount_paymentpage_ssntextbox);
        this.newuser_myaccount_paymentpage_dobradiobutton=page.getByText(newuser_myaccount_paymentpage_dobradiobutton, { exact: true });
        this.newuser_myaccount_paymentpage_dobtextbox=page.getByText(newuser_myaccount_paymentpage_dobtextbox);
        this.newuser_myaccount_paymentpage_continuebutton=page.getByRole('button', { name: newuser_myaccount_paymentpage_continuebutton });
        this.newuser_myaccount_orderspage_breadcrumb=page.getByText(newuser_myaccount_orderspage_breadcrumb);
        this.newuser_myaccount_orderspage_headertext=page.locator(newuser_myaccount_orderspage_headertext);
        this.newuser_myaccount_orderspage_norecentordertext=page.getByText(newuser_myaccount_orderspage_norecentordertext);
        this.newuser_myaccount_addresspage_breadcrumb=page.getByText(newuser_myaccount_addresspage_breadcrumb);
        this.newuser_myaccount_addresspage_headertext=page.locator(newuser_myaccount_addresspage_headertext);
        this.newuser_myaccount_addresspage_norecentaddresstext=page.getByText(newuser_myaccount_addresspage_norecentaddresstext);
        this.newuser_myaccount_saveccpage_breadcrumb=page.getByText(newuser_myaccount_saveccpage_breadcrumb);
        this.newuser_myaccount_saveccpage_headertext=page.locator(newuser_myaccount_saveccpage_headertext);
        this.newuser_myaccount_saveccpage_norecentcctext=page.getByText(newuser_myaccount_saveccpage_norecentcctext);
        this.newuser_myaccount_saveccpage_addnewccbutton=page.locator(newuser_myaccount_saveccpage_addnewccbutton);
        this.newuser_myaccount_saveccpage_addnewccbuttondd=page.locator(newuser_myaccount_saveccpage_addnewccbuttondd);
        this.newuser_myaccount_saveccpage_savedefaultcccheckbox=page.locator(newuser_myaccount_saveccpage_savedefaultcccheckbox);
        this.newuser_myaccount_saveccpage_savedefaultbillshipcheckbox=page.locator(newuser_myaccount_saveccpage_savedefaultbillshipcheckbox);
        this.newuser_myaccount_wishlistpage_breadcrumb=page.getByText(newuser_myaccount_wishlistpage_breadcrumb);
        this.newuser_myaccount_wishlistpage_headertext=page.getByText(newuser_myaccount_wishlistpage_headertext);
        this.newuser_myaccount_wishlistpage_norecentcctext=page.getByText(newuser_myaccount_wishlistpage_norecentcctext);
        this.newuser_myaccount_wishlistpage_wishlistimgicon=page.locator('section').filter({ hasText: /^Wish List0 Items$/ }).getByRole('img');
    }

    async validateNewUserStoneBerryCreditSection(firstLinkName,secondLinkName){
        // Verify Stoneberry logo display
        const logo = await this.page.$('section.h-9.w-72 img[alt="Credit Logo"]');
        expect(logo).not.toBeNull();

        const logoSrc = await logo.getAttribute('src');
        expect(logoSrc).toContain('ZBSite-creditPaymentLogo');

        // Verify "Get Pre-Qualified" link display and redirection
        const getPreQualifiedLink = await this.page.$('a[href="/credit-limit-prequalification/"]');
        expect(getPreQualifiedLink).not.toBeNull();

        const getPreQualifiedLinkText = await getPreQualifiedLink.innerText();
        expect(getPreQualifiedLinkText).toContain(firstLinkName);

        // Verify "Get Pre-Qualified" link redirection
        await getPreQualifiedLink.click();
        await this.page.waitForNavigation();
        //expect(this.page.url()).toContain('/credit-limit-prequalification/');
        expect(this.page).toHaveURL(/.*credit-limit-prequalification/);

        // Navigate back to the original page
        await this.page.goBack();

        // Verify "Learn More" button display and navigation
        const learnMoreButton = await this.page.$(`button:has-text("${secondLinkName}")`);
        expect(learnMoreButton).not.toBeNull();

        const learnMoreButtonText = await learnMoreButton.innerText();
        expect(learnMoreButtonText).toContain('Learn More');

        // Verify "Learn More" button navigation
        await learnMoreButton.click();
        await this.page.waitForNavigation();
        expect(this.page).toHaveURL(/.*buy-now-pay-later/);
    }

    async enterCustomerAccountNumber(enterCustomerAccountNumber){
        await this.newuser_myaccount_paymentpage_customernumber_textbox.fill(enterCustomerAccountNumber);
    }

    async selectSSNOption(){
        await this.newuser_myaccount_paymentpage_ssnradiobutton.click();
    }

    async enterSSNNumber(enterSSNNumber){
        await this.newuser_myaccount_paymentpage_ssntextbox.fill(enterSSNNumber);
    }

    async selectDateOfBirth(){
        await this.newuser_myaccount_paymentpage_dobradiobutton.click();
    }

    async enterDateOfBirth(enterDateOfBirth){
        await this.newuser_myaccount_paymentpage_dobtextbox.fill(enterDateOfBirth);
    }

    async clickOnContinueButton(){
        await this.newuser_myaccount_paymentpage_continuebutton.click();
    }

    async validateCreditAccountVerificationDisplay(){
        await expect(this.newuser_myaccount_paymentpage_breadcrumb).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_pageheader).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_step1).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_customernumber_textbox).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_c2text).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_step2).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_ssnradiobutton).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_dobradiobutton).toBeVisible();
        await expect(this.newuser_myaccount_paymentpage_continuebutton).toBeVisible();
    }

    async navigatetoMakeAPaymentNonCreditUser(){
        await this.page.waitForURL('**/account/creditaccountverification/?destination=payment');
        await this.newuser_myaccount_paymentpage_pageheader.waitFor({ state: 'visible' });

    }

    async clickOnTooltip(){
        await this.page.locator("//button[@aria-label='tooltip']").click();
        const tooltipLocator = this.page.locator('button[data-state="instant-open"][aria-label="tooltip"]');
        // Wait for the tooltip to appear
        await tooltipLocator.waitFor();
        await expect(tooltipLocator).toBeVisible();
    }

    async validateNoRecentOrdersSection(){
        await expect(this.newuser_myaccount_orderspage_breadcrumb).toBeVisible();
        await expect(this.newuser_myaccount_orderspage_headertext).toBeVisible();
        await expect(this.newuser_myaccount_orderspage_norecentordertext).toBeVisible();
    }

    async validateNoRecentAddressesSection(){
        await expect(this.newuser_myaccount_addresspage_breadcrumb).toBeVisible();
        await expect(this.newuser_myaccount_addresspage_headertext).toBeVisible();
        await expect(this.newuser_myaccount_addresspage_norecentaddresstext).toBeVisible();
    }

    async validateNoSavedCCSection(){
        await expect(this.newuser_myaccount_saveccpage_breadcrumb).toBeVisible();
        await expect(this.newuser_myaccount_saveccpage_headertext).toBeVisible();
        await expect(this.newuser_myaccount_saveccpage_norecentcctext).toBeVisible();
        await expect(this.newuser_myaccount_saveccpage_addnewccbutton).toBeVisible();
        await expect(this.newuser_myaccount_saveccpage_addnewccbuttondd).toBeVisible();
    }

    async clickAddNewCCButton(){
        await this.newuser_myaccount_saveccpage_addnewccbuttondd.click();
    }

    async defaultSaveCCCheckboxDisplay(){
        await expect(this.newuser_myaccount_saveccpage_savedefaultcccheckbox).toBeVisible();
    }

    async defaultSaveCCBillShipAddressCheckboxDisplay(){
        await expect(this.newuser_myaccount_saveccpage_savedefaultbillshipcheckbox).toBeVisible();
    }

    async validateNoWishlistSection(){
        await expect(this.newuser_myaccount_wishlistpage_breadcrumb).toBeVisible();
        await expect(this.newuser_myaccount_wishlistpage_headertext).toBeVisible();
        await expect(this.newuser_myaccount_wishlistpage_norecentcctext).toBeVisible();
        await expect(this.newuser_myaccount_wishlistpage_wishlistimgicon).toBeVisible();
    }

    async redirectToMyAccount() {
        await this.page.locator("//img[@alt='My Account']").click();
        await this.page.getByRole('link', { name: 'My Account' }).click({});
        await this.page.waitForSelector('h1.ml-2\\.5');
        await expect(this.page.getByRole('heading', { name: 'My Account' })).toBeVisible();
    }

}
