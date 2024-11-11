import test, { expect } from 'playwright/test';
const newuser_myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));

const logo_name='email_icon';
const system_maintenance_subtitle="We\'re currently in the process of performing system maintenance."
const system_maintenance_text="Please try again later, or contact one of our Customer Service Representatives in";
const email='Email Us:';
const email_text='Email your question to';
const mail_id="service@shoemall.com";
const thank_you_text="Thank you for your patience! Your business is very important to us!";

exports.SystemMaintenancePage = class SystemMaintenancePage{
    constructor(page){
        this.page=page;
        this.logo_image=page.getByRole('img', { name: logo_name }).first();
        this.system_maintenance_subtitle=page.getByRole('heading', { name: system_maintenance_subtitle });
        this.system_maintenance_text=page.getByText(system_maintenance_text);
        
    }

    async validateLogoDisplay(){
        await expect(this.logo_image).toBeVisible();
    }

    async validateLogoAtCentre(){
         // Optionally, you can assert the position of the logo if needed
        const logoPosition = await this.logo_image.boundingBox();
        const pageViewport = await this.page.viewportSize();
        const centerX = logoPosition.x + logoPosition.width / 2;
        const centerY = logoPosition.y + logoPosition.height / 2;
        const pageCenterX = pageViewport.width / 2;
        const pageCenterY = pageViewport.height / 2;
        const tolerance = 10; // Tolerance in pixels for center alignment

        // Assert the logo is centered within a certain tolerance
        expect(centerX).toBeGreaterThan(pageCenterX - tolerance);
        expect(centerX).toBeLessThan(pageCenterX + tolerance);
       
    }

    async validateSystemMaintenanceSubtitle(){
        await expect(this.system_maintenance_subtitle).toBeVisible();
    }

    async validateSystemMaintenanceText(){
        await expect(this.system_maintenance_text).toBeVisible();
    }

    async validateSystemTextPositionUnderLogo(){
        const logoBox = await this.logo_image.boundingBox();
        const subtitleBox = await this.system_maintenance_subtitle.boundingBox();

        // Verify subtitle is directly below the logo (within a tolerance)
        const tolerance = 10; // Adjust tolerance as per your layout needs

        expect(subtitleBox.y).toBeGreaterThan(logoBox.y + logoBox.height - tolerance);
        expect(subtitleBox.y).toBeLessThan(logoBox.y + logoBox.height + tolerance);

        // Log verification
        console.log("Subtitle is correctly positioned under the logo.");

    }

    async validateSystemTextPositionUnderSubTitle(){
        
        const subtitleBox = await this.system_maintenance_subtitle.boundingBox();
        const subTextBox = await this.system_maintenance_text.boundingBox();

        // Verify subtitle is directly below the logo (within a tolerance)
        const tolerance = 10; // Adjust tolerance as per your layout needs

        expect(subTextBox.y).toBeGreaterThan(subtitleBox.y + subtitleBox.height - tolerance);
        expect(subTextBox.y).toBeLessThan(subtitleBox.y + subtitleBox.height + tolerance);

        // Log verification
        console.log("Subtitle-text is correctly positioned under the subtitle.");

    }


    async validateEmailSection(){
        await expect(this.page.getByText(email)).toBeVisible();
        await expect(this.page.getByText(email_text)).toBeVisible();
        await expect(this.page.getByRole('link', { name: mail_id })).toBeVisible();
    }

    async clickOnMail(){
        await this.page.getByRole('link', { name: mail_id }).click();
    }

    async validateCallSection(){
        await expect(this.page.getByText('Call Us Toll-Free')).toBeVisible();
        await expect(this.page.locator('p').filter({ hasText: '1-800-704-5480' }).getByRole('link')).toBeVisible();
        await expect(this.page.getByText('6 a.m. to Midnight (CST),')).toBeVisible();
        await expect(this.page.getByText('7 days a week')).toBeVisible();
    }

    async validateThankYouMessage(){
        await expect(this.page.getByText(thank_you_text)).toBeVisible();
    }

    }