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
    }

    async validateNewUserStoneBerryCreditSection(firstLinkName,secondLinkName){
        // Verify Stoneberry logo display
        const logo = await this.page.$('section.h-9.w-72 img[alt="Stoneberry Logo"]');
        expect(logo).not.toBeNull();

        const logoSrc = await logo.getAttribute('src');
        expect(logoSrc).toContain('StoneberryCreditLogo');

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
        expect(this.page).toHaveURL(/.*buynowpaylater/);
    }

}