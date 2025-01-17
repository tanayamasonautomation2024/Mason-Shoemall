import test, { expect } from 'playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import exp from 'constants';
const myaccountpage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));


const text_under_logo = 'Already have a Stoneberry account? Sign in to make it even easier to complete this form.';
const get_prequalifiedText = 'Get Pre-Qualified Instantlyfor Stoneberry Credit with no impact to your credit';
const create_account_text = 'Use your account to see your available credit, save time checking out, and more! Already have a Stoneberry account? Sign In to complete this form.';
const terms_and_conditions = '*I agree that I am providing \'written instructions\' to Stoneberry under the Fair Credit Reporting Act authorizing the company to obtain information from my personal credit report. This authorization allows Stoneberry to obtain such information solely to conduct a pre-qualification for credit. Checking the box above constitutes my electronic signature.';
const electronic_communication = 'I consent to receive disclosures from you electronically through this website. By consenting, I agree that you may provide electronically any and all communications concerning your products and services, my transactions with you, your privacy policy and other agreements between me and you, and any further disclosures required by federal or state law (the “Disclosures”). My consent applies to all products or services that I obtain from you. I understand that Disclosures may be made available to me on your website, and I must have a personal computer with Internet access through a web browser to access the Disclosures and the ability to either print or electronically store the Disclosures. I represent that I have the hardware, software, email address and email capacities described above. I may withdraw my consent to electronic receipt of Disclosures at any time by contacting you. I have the option to receive any Disclosures that you provide electronically in paper form at no cost to me.';

exports.MasonDPQPage = class MasonDPQPage {
  constructor(page) {
    this.page = page;
    this.logo_image = page.getByRole('img', { name: 'Credit Logo' });
    this.text_under_logo = page.getByText(text_under_logo);
    this.get_prequalifiedText = page.getByText(get_prequalifiedText);

    // this.makepayment_newAddress=page.locator('section').filter({ hasText: new RegExp(myaccountpage_locator.makepayment_newAddress) });
    this.yourInfo_fname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_firstname);
    this.yourInfo_lname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_lastname);
    this.yourInfo_address1 = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_addressline1);
    this.yourInfo_address2 = page.getByRole('button', { name: myaccountpage_locator.makepayment_newAddress_address2 });
    this.yourInfo_city = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_city);
    this.yourInfo_state = page.locator('[id="\\*State"]');
    this.yourInfo_zipcode = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_zipcode);
    this.yourInfo_phonenumber = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_phonenumber);
    this.yourInfo_dob = page.getByLabel('*Date of Birth (MM/DD/YYYY)');
    this.yourInfo_ssn = page.getByLabel('*Last 4 of SSN');



  }

  async validateDPQLink() {
    await expect(this.page.locator('li').filter({ hasText: /^Apply for Credit$/ })).toBeVisible();
  }

  async clickDPQLink() {
    //await this.page.getByRole('link', { name: 'Apply for Credit' }).click();
    await this.page.getByRole('link', { name: 'Get Pre-Qualified for' }).click();
  }

  async validateLogoImage() {
    await this.logo_image.waitFor({ state: 'visible' });
  }

  async validateLogoAtCentre() {
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

  async validateTextUnderLogo() {
    await expect(this.page.locator('body')).toContainText(text_under_logo);
  }

  async validateTextPositionUnderLogo() {
    const logoBox = await this.logo_image.boundingBox();
    const subtitleBox = await this.text_under_logo.boundingBox();

    // Verify subtitle is directly below the logo (within a tolerance)
    const tolerance = 20; // Adjust tolerance as per your layout needs

    expect(subtitleBox.y).toBeGreaterThan(logoBox.y + logoBox.height - tolerance);
    expect(subtitleBox.y).toBeLessThan(logoBox.y + logoBox.height + tolerance);

    // Log verification
    console.log("Subtitle is correctly positioned under the logo.");

  }


  async validateSignInButton() {
    await expect(this.page.getByRole('button', { name: 'Sign In' }).nth(1)).toBeVisible();
    await (this.page.getByRole('button', { name: 'Sign In' }).nth(1)).click();
    await this.page.waitForSelector('h1', { text: 'Sign In to Your Stoneberry Account', visible: true });
  }

  async validateGetPreQualifiedText() {
    await (this.get_prequalifiedText).waitFor({ state: "visible" });
  }

  async validateYourInformationSection() {
    await expect(this.yourInfo_fname).toBeVisible();
    await expect(this.yourInfo_lname).toBeVisible();
    await expect(this.yourInfo_address1).toBeVisible();
    await expect(this.yourInfo_address2).toBeVisible();
    await expect(this.yourInfo_city).toBeVisible();
    await expect(this.yourInfo_state).toBeVisible();
    await expect(this.yourInfo_zipcode).toBeVisible();
    await expect(this.yourInfo_phonenumber).toBeVisible();
    await expect(this.yourInfo_dob).toBeVisible();
    await expect(this.yourInfo_ssn).toBeVisible();
  }

  async fillDOB() {
    // Generate a random past date using faker
    // const randomDate = faker.date.past();
    //        let randomDate;  
    //        // Generate a random date of birth for someone above 18 years old
    //   do {
    //     randomDate = faker.date.between(new Date(new Date().getFullYear() - 100, 0, 1), new Date());
    //   } while (this.calculateAge(randomDate) > 18);

    //   // Extract month, day, and year from the generated date
    //   const month = (randomDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits for month
    //   const day = randomDate.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    //   const year = randomDate.getFullYear().toString(); // Ensure 4 digits for year

    //   // Format the date as MM/DD/YYYY

    //         // Format the date as MM/DD/YYYY
    //         const formattedDate = `${month}/${day}/${year}`;

    //         console.log(formattedDate);

    // Calculate the minimum date of birth which ensures age > 18
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minBirthYear = currentYear - 35;

    // Generate a random birth year between minBirthYear and (currentYear - 18)
    const birthYear = Math.floor(Math.random() * (currentYear - minBirthYear - 1)) + minBirthYear + 1;

    // Generate a random birth month (from 1 to 12)
    const birthMonth = Math.floor(Math.random() * 12) + 1;

    // Generate a random birth day based on the month and year
    const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    const birthDay = Math.floor(Math.random() * daysInMonth) + 1;

    // Format the components into MM/DD/YYYY format
    const formattedDate = `${String(birthMonth).padStart(2, '0')}/${String(birthDay).padStart(2, '0')}/1980`;

    await this.yourInfo_dob.fill(formattedDate);
  }


  // Function to calculate age based on date of birth
  async calculateAge(birthDate) {
    const today = new Date();
    const diff = today - birthDate;
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  async fillSNN() {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    // Assuming `this.yourInfo_ssn` is an input element, you can set its value
    await this.yourInfo_ssn.fill(randomNumber.toString());
  }


  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();

    //await expect(this.page).toHaveURL(/\/\?dpq_exp=\d+/);
  }

  async validateTheSubmissionProgress() {
    await this.page.getByRole('heading', { name: 'Please wait while we process' }).waitFor({ state: "visible" });
    await this.page.getByLabel('Please wait while we process').waitFor({ state: "visible" });
    await expect(this.page.getByText('Don’t click the back button,')).toBeVisible();
    let dpqExpDigit;

    try {
      // Wait for navigation to a URL matching the pattern /\/\?dpq_exp=\d+/ with a longer timeout
      await this.page.waitForURL(/\/\?dpq_exp=\d+/, { timeout: 15000 });

      // Get the current URL
      const currentUrl = await this.page.url();

      // Extract the digit after dpq_exp=
      const match = currentUrl.match(/dpq_exp=(\d+)/);
      if (match && match[1]) {
        dpqExpDigit = match[1];
      } else {
        throw new Error('Unable to extract dpq_exp digit from URL.');
      }

      // Assert the URL matches the expected pattern (optional)
      expect(currentUrl).toMatch(/\/\?dpq_exp=\d+/);

    } catch (error) {
      throw new Error(`Error during navigation and URL assertion: ${error.message}`);
    }

    return dpqExpDigit;
  }

  async validateCreateAccountSection() {
    await expect(this.page.getByText('Create an Account')).toBeVisible();
    await expect(this.page.getByText(create_account_text)).toBeVisible();
    await expect(this.page.getByLabel('*Email Address')).toBeVisible();
    await expect(this.page.getByLabel('*Password')).toBeVisible();
  }

  async validateTermsAndConditionSection() {
    await expect(this.page.getByText('Terms & Conditions')).toBeVisible();
    await expect(this.page.getByText('*I agree that I am providing')).toBeVisible();
    await expect(this.page.locator('body')).toContainText(terms_and_conditions);
    await expect(this.page.locator('section').filter({ hasText: '*I agree that I am providing' }).nth(4)).toBeVisible();
    await expect(this.page.getByRole('checkbox')).toBeVisible();
    await (this.page.getByRole('checkbox')).click();
  }

  async validateElectronicCommunication() {
    await expect(this.page.getByRole('button', { name: 'Electronic Communications' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Electronic Communications' }).click();
    await expect(this.page.getByLabel('Electronic Communications').locator('div')).toContainText(electronic_communication);
    await expect(this.page.locator('section').filter({ hasText: /^Submit$/ })).toBeVisible();
  }

  async validateSubmissionPageUnavailable() {
    await (this.page.getByRole('heading', { name: 'Thank You for Your Interest' })).waitFor({ state: "visible" });
    await expect(this.page.getByText('We are unable to identify a')).toBeVisible();
    await expect(this.page.locator('body')).toContainText('We are unable to identify a credit limit for you at this time, but you can still place an order with us today on Stoneberry Credit to apply.');
    await expect(this.page.getByRole('button', { name: 'Start Shopping' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Shop Top Category' })).toBeVisible();
    //await expect(this.page.getByRole('link', { name: 'ZBSite - Single Image Banner2' })).toBeVisible();
    // Wait for the first <img> element matching the selector to be visible
    const imgElement = await this.page.locator('img[alt="ZBSite - Single Image Banner2"]').first();
    await imgElement.waitFor({ state: 'visible' });
    await expect(this.page.getByRole('heading', { name: 'Top Brands' })).toBeVisible();
    //await expect(this.page.locator('div').filter({ hasText: /^Top Brands$/ }).getByRole('list')).toBeVisible();
    await this.checkTopBrandImageTiles();
    await this.verifyBrandLogos();
  }

  async verifyBrandLogos() {
    // Wait for the container element to be visible
    await this.page.waitForSelector('.flex.flex-wrap.items-center.justify-center.gap-x-5.gap-y-6.md\\:justify-between.md\\:gap-x-6');

    // Get all list items (each containing a brand logo)
    const brandLogos = await this.page.$$('.flex.flex-wrap.items-center.justify-center.gap-x-5.gap-y-6.md\\:justify-between.md\\:gap-x-6 li');

    // Assert that there are exactly 6 brand logos
    if (brandLogos.length === 6) {
      console.log('Verification passed: 6 brand logos are displayed.');
    } else {
      throw new Error(`Expected 6 brand logos, but found ${brandLogos.length}.`);
    }
  }


  // async checkTopBrandImageTiles() {
  //     // Wait for the container element containing all image tiles to be visible
  //     await this.page.waitForSelector('.grid.grid-cols-2.gap-5.md\\:grid-cols-4');

  //     // Get all image tiles inside the container
  //     const imageTiles = await this.page.$$('.grid.grid-cols-2.gap-5.md\\:grid-cols-4 li');

  //     // Assert that there are exactly 4 image tiles
  //     if (imageTiles.length === 4) {
  //       console.log('There are 4 image tiles (Top Brands) as expected.');
  //     } else {
  //       throw new Error(`Expected 4 image tiles (Top Brands), but found ${imageTiles.length}.`);
  //     }
  //   }

  async checkTopBrandImageTiles() {
    // Selectors
    const containerSelector = '.grid.grid-cols-2.gap-5.md\\:grid-cols-4';
    const imageTileSelector = `${containerSelector} li`;
    const headingSelector = 'h1'; // Replace with your heading selector
    const headingText = 'Top Brands';

    // await expect(this.page.getByRole('heading', { name: 'Top Brands' })).toBeVisible();

    // //await this.page.waitForSelector(`${headingSelector}:has-text("${headingText}")`, { state: 'visible' });

    // // Get the heading element
    // const headingElement = await this.page.locator(`//${headingSelector}[contains(text(), "${headingText}")]`);
    // await headingElement.scrollIntoView();
    // // Wait for the container element to be visible

    await this.page.evaluate(() => {
      window.scrollBy(0, window.innerHeight + 400);
    });

    await this.page.waitForSelector(containerSelector, { state: 'visible' });

    // Get all image tiles inside the container
    const imageTiles = await this.page.$$(imageTileSelector);

    // Assert that there are exactly 4 image tiles
    if (imageTiles.length === 4) {
      console.log('Verification passed: 4 image tiles (Top Brands) are displayed.');
    } else {
      throw new Error(`Expected 4 image tiles, but found ${imageTiles.length}.`);
    }
  }



  async addAddress() {
    const address = faker.location.streetAddress();
    await (this.yourInfo_address1).fill(address);
    const city = faker.location.city();
    await (this.yourInfo_city).fill(city);
    const state = faker.location.state({ abbreviated: true });
    await (this.yourInfo_state).selectOption(state);
    const zipCode = faker.location.zipCode().substring(0, 5); // Get only the first 5 digits
    await (this.yourInfo_zipcode).fill(zipCode);
    const phoneNumber = faker.phone.number();
    const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
    //await this.page.type('#phoneNumber', phoneNumber);
    await (this.yourInfo_phonenumber).fill(phoneNumber);
    //return firstName, lastName;
  }

  async addAddressForStatus14() {
    const address = faker.location.streetAddress();
    await (this.yourInfo_address1).fill(address);
    const city = 'Aurora';
    await (this.yourInfo_city).fill(city);
    const state = 'IL';
    await (this.yourInfo_state).selectOption(state);
    const zipCode = '60504'; // Get only the first 5 digits
    await (this.yourInfo_zipcode).fill(zipCode);
    const phoneNumber = faker.phone.number();
    const phoneNumberPattern = new RegExp(/\(\d{3}\) \d{3}-\d{4}/);
    //await this.page.type('#phoneNumber', phoneNumber);
    await (this.yourInfo_phonenumber).fill(phoneNumber);
    //return firstName, lastName;
  }

  async validateSubmissionSuccess() {
    await (this.page.getByText('Congratulations,')).waitFor({ state: "visible" });
    await expect(this.page.getByText('You are pre-qualified for a $')).toBeVisible();
    await expect(this.page.getByText('Stoneberry Credit limit!*')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Start Shopping Now' })).toBeVisible();
    await expect(this.page.locator('body')).toContainText('By accepting this offer, you agree that you are requesting an extension of credit and authorizing a review of your credit history that will result in a hard inquiry on your customer credit report. *Credit offer expires');
  }

  async validateSubmissionSuccessWithDownPayment() {
    await (this.page.getByText('Congratulations,')).waitFor({ state: "visible" });
    await expect(this.page.getByText('You are pre-qualified for a $')).toBeVisible();
    await expect(this.page.getByText('Stoneberry Credit limit!*')).toBeVisible();
    await expect(this.page.getByText('A down payment of $')).toBeVisible();
    await expect(this.page.getByText('is required when you place your first order')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Start Shopping Now' })).toBeVisible();
    await expect(this.page.locator('body')).toContainText('By accepting this offer, you agree that you are requesting an extension of credit and authorizing a review of your credit history that will result in a hard inquiry on your customer credit report. *Credit offer expires');
  }


  async clickStartShopping() {
    await this.page.getByRole('link', { name: 'Start Shopping Now' }).click();
  }

  async validateSubmissionPageFailure() {
    await (this.page.getByRole('heading', { name: 'Stoneberry Credit Pre-Qualification Results' })).waitFor({ state: "visible" });
    await expect(this.page.getByText('Thank you for your interest in Stoneberry Credit! Unfortunately, we are unable to approve a pre-qualified limit for you at this time.')).toBeVisible();
    await expect(this.page.locator('body')).toContainText('You can keep shopping and apply for credit during checkout by simply placing an order. A down payment may be required to approve your credit request and complete your order.');
    await expect(this.page.getByRole('button', { name: 'Start Shopping' })).toBeVisible();
  }

  async handleSubmissionScenario(dpqExpDigit) {
    switch (dpqExpDigit) {
      case 1:
        await this.validateSubmissionSuccess();
        console.log('Success scenario was checked.');
        break;
      case 11:
        await this.validateSubmissionPageFailure();
        console.log('Failure scenario was checked.');
        break;
      case 9:
        await this.validateSubmissionPageFailure();
        console.log('Failure scenario was checked.');
        break;
      case 14:
        await this.validateSubmissionSuccessWithDownPayment();
        console.log('Success with down payment scenario was checked.');
        break;
      case 5:
        await this.validateSubmissionPageUnavailable();
        console.log('Page unavailable scenario was checked.');
        break;
      default:
        console.log(`Dpq-${dpqExpDigit} is not covered in automation suite.`);
    }
  }

}