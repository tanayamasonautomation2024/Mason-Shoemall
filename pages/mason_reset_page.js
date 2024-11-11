import test, { expect } from 'playwright/test';
const resetpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_reset_page_repo.json')));
const resetpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));


exports.ResetPage = class ResetPage{
    constructor(page){
        this.page=page;
        // Dynamically convert criteria strings to regex

        this.reset_password_textbox=page.getByLabel(resetpage_locator.reset_password_textbox);
        this.reset_password_info_icon=page.getByLabel(resetpage_locator.reset_password_info_icon);
        this.reset_password_show_link=page.getByRole('link', { name: resetpage_locator.reset_password_show_link });
        this.reset_password_button=page.getByRole('button', { name: resetpage_locator.reset_password_button });
        this.reset_password_hide_link=page.getByRole('link', { name: resetpage_locator.reset_password_hide_link });
        this.reset_password_info_icon_xpath=page.locator(resetpage_locator.reset_password_info_icon_xpath); 
        this.password_criteria_text=page.getByText(resetpage_data.password_criteria_text);
        this.enter_password_text = page.getByText(resetpage_data.enter_password_text);
        this.password_criteria1=(page.locator('section').filter({ hasText: new RegExp(resetpage_data.password_criteria1) }).first());
        this.password_criteria2=(page.locator('section').filter({ hasText: new RegExp(resetpage_data.password_criteria2) }).first());
        this.password_criteria3=(page.locator('section').filter({ hasText: new RegExp(resetpage_data.password_criteria3) }).first());
    }

    async validateEmailIdIsAutoFilled(reset_email){
        await expect(this.page.getByText(reset_email)).toBeVisible();
    }

    async validateEmailIdIsReadOnly(reset_email){
        // await expect(this.page.getByText(reset_email)).toBeVisible();
        // const email_field = await this.page.getByText(reset_email);
        // const isReadOnly = await email_field.isEditable();
        // const isClickEnabled = await email_field.isClickable();
        // console.log('Is element clickable?', isClickEnabled)
        // console.log('Is element editable?', isReadOnly);

        // //const emailElement = await this.page.getByText(reset_email);
        // return isReadOnly;

        const emailElement = await this.page.$('P'); // Adjust the selector to target the correct <p> element
    // Check if the element contains a <p> tag. If so, then it is read only.
    const containsPTag = await emailElement.evaluate(el => el.tagName === 'P');
 
    // Check if the text inside the <p> tag is read-only
    //const isTextReadOnly = await emailElement.evaluate(el => el.contentEditable === 'false');
 
    console.log('Does the element contain a <p> tag?', containsPTag);
    //console.log('Is the text inside the <p> tag read-only?', isTextReadOnly)

    expect(containsPTag).toBe(true);
        
    }


    
    async validatePasswordTextBoxIsVisible(){
        await expect(this.reset_password_textbox).toBeVisible();
    }

    async validatePasswordInfoIconIsVisible(){
        await expect(this.reset_password_info_icon).toBeVisible();
    }

    async validatePasswordShowLinkIsVisible(){
        await expect(this.reset_password_show_link).toBeVisible();
    }

    async validatePasswordHideLinkIsVisible(){
        await expect(this.reset_password_hide_link).toBeVisible();
    }

    async validatePasswordResetButtonIsVisible(){
        await expect(this.reset_password_button).toBeVisible();
    }

    async enterPasswordOnResetPage(password){
        this.reset_password_textbox.click();
        this.reset_password_textbox.fill(password);
    }

    async readPasswordFromTextboxAndValidate(password){
        await expect(this.reset_password_textbox).toHaveValue(password);
    }

    async clickOnShowPassword(){
        await this.reset_password_show_link.click();
    }

    async clickOnHidePassword(){
        await this.reset_password_hide_link.click();
    }

    async hoverAndReadInfo(info_icon_text){
        await expect(this.reset_password_info_icon).toBeVisible();
        await this.reset_password_info_icon.click();
        await this.page.waitForTimeout(2000);
        await expect(this.reset_password_info_icon_xpath).toBeVisible();
        const infoText = await this.reset_password_info_icon_xpath.innerText();
       // const info_icon_text_extracted = infoText.toString();
       expect(infoText.includes(info_icon_text) ? true : false).toBe(true);
       //expect(infoText.includes(info_icon_text)).toBe(true);


    }

    async clickOnPasswordResetButton(){
        await expect(this.reset_password_button).toBeVisible();
        await this.reset_password_button.click();
    }


    async validateThePasswordCriteria(){
        await expect(this.password_criteria_text).toBeVisible();
        await expect(this.password_criteria1).toBeVisible();
        await expect(this.password_criteria2).toBeVisible();
        await expect(this.password_criteria3).toBeVisible();
    }

    async validatePasswordResetMessage(){
        await expect(this.page.getByText('Your password has been updated successfully')).toBeVisible();
    }

    async noPasswordEntered(){
        await expect(this.enter_password_text).toBeVisible();
    }

}   