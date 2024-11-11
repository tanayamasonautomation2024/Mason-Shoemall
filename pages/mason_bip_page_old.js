import test, { expect } from 'playwright/test';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));

const brand_breadcrumb="HomeBrands";
const brand_title="Brands";
const top_brands="Top Brands";
const brand_logo_section="section.w-full:has(h2:has-text('Top Brands'))";
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
const brand_index="Brand Index"

exports.MasonBIPPage = class MasonBIPPage{
    constructor(page){
        this.page=page;
        this.brand_title=page.getByRole('heading', { name: brand_title, exact: true })
        this.brand_breadcrumb=page.getByText(brand_breadcrumb);
        this.top_brands=page.locator('section').filter({ hasText: top_brands }).locator('section');
        this.alphabets_link=page.getByText(alphabets);
        this.brand_index=page.getByRole('heading', { name: brand_index });
        
    }

    
    async validateBrandBreadCrumb(){
        await expect(this.brand_breadcrumb).toBeVisible();
    }

    async validateBrandPageTitle(){
        await expect(this.brand_title).toBeVisible();
    }

    async validateBannerSection(){
        // Locate the banner section
        const bannerSection = this.page.locator('.mt-6');

        // Verify the banner section is visible
        await expect(bannerSection).toBeVisible();

        // Check if the banner section contains an image or video
        const bannerImage = bannerSection.locator('img');
        const bannerVideo = bannerSection.locator('video');

        let bannerElement;
        if (await bannerImage.count() > 0) {
            bannerElement = bannerImage;
        } else if (await bannerVideo.count() > 0) {
            bannerElement = bannerVideo;
        } else {
            throw new Error('Banner section does not contain an image or video.');
        }

        // Verify the banner element is visible
        await expect(bannerElement).toBeVisible();

        // Check if the banner element is full-width
        const viewportWidth = await this.page.evaluate(() => window.innerWidth);
        const bannerWidth = await bannerElement.evaluate((el) => el.clientWidth);
       // Use a custom threshold for the width comparison
        const tolerance = 10; // Define an acceptable tolerance for the width comparison
        expect(Math.abs(bannerWidth - viewportWidth)).toBeLessThanOrEqual(tolerance);

        // Click on the banner element
       // await bannerElement.click();

        // Verify navigation to the respective URL
        //await expect(page).toHaveURL(expectedUrl);
    }

async validateTopBrandsSection(){
    await expect(this.top_brands).toBeVisible();
    // Locate the brand logos section
    const brandLogosSection = this.page.locator(brand_logo_section);

    // Verify the brand logos section is visible
    await expect(brandLogosSection).toBeVisible();

    // Locate the list of brand logos
    const brandLogos = brandLogosSection.locator('ul > li');

    // Verify there are exactly 6 brand logos
    await expect(brandLogos).toHaveCount(6);


//     // Iterate through each brand logo and verify the image, title text, and hyperlink
//   for (let i = 0; i < 6; i++) {
//     const brandLogo = brandLogos.nth(i);
//     const brandLink = brandLogo.locator('a');
//     const brandImage = brandLink.locator('img');

//     // Verify the brand logo is visible
//     await expect(brandLogo).toBeVisible();

//     // Verify the brand image is visible
//     await expect(brandImage).toBeVisible();

//     // Verify the brand image has a non-empty src attribute
//     const src = await brandImage.getAttribute('src');
//     expect(src).toBeTruthy();

//     // Verify the brand link has a non-empty href attribute
//     const href = await brandLink.getAttribute('href');
//     expect(href).toBeTruthy();

//     // Verify the brand link is clickable and navigates correctly
//     // Note: This step assumes the href attribute contains a valid URL to navigate
//     await page.evaluate((link) => link.click(), await brandLink.elementHandle());
//     // Add navigation verification if the links should lead to specific URLs
//     await expect(page).toHaveURL(href);
//     // Navigate back to the original page
//     await page.goBack();
//   }
}
   
// Function to verify alphabet links
async validateAlphabetLinks(page) {
    await expect(this.brand_index).toBeVisible();
    await expect(this.alphabets_link).toBeVisible();
  }

async validateAlphabetHeader(){
    // Loop through each alphabet from A to Z
    const presentAlphabets = [];
  for (let charCode = 65; charCode <= 90; charCode++) {
    const letter = String.fromCharCode(charCode);
    try {
        await expect(this.page.getByRole('heading', { name: `${letter}`, exact: true })).toBeVisible();
        presentAlphabets.push(letter); 
    } catch (error) {
        console.log(`Alphabet '${letter}' is not present.`);
    }
  }
  const randomIndex = Math.floor(Math.random() * presentAlphabets.length);
    return presentAlphabets[randomIndex];
}


async validateBrandsUnderRandomAlphabet(randomAlphabet) {
    try {
        // Verify the presence of the alphabet heading
        await expect(this.page.getByRole('heading', { name: randomAlphabet, exact: true })).toBeVisible();

        // Find and verify brands starting with the randomly selected alphabet
        //const brandsStartingWithRandomAlphabet = await this.page.$$eval(`#${randomAlphabet} + section ul.brandIndexList`, elements => elements.map(el => el.textContent.trim()));
        // Log brands to console
        //console.log(`Brands under alphabet '${randomAlphabet}':`, brandsStartingWithRandomAlphabet);


        // Find and verify brands starting with the randomly selected alphabet
        const brandListElements = await this.page.$$('#' + randomAlphabet + ' + section ul.brandIndexList li');
        const brandsStartingWithRandomAlphabet = await Promise.all(brandListElements.map(async element => {
            return (await element.$eval('a', node => node.textContent)).trim();
        }));

       // console.log(`Brands under alphabet '${randomAlphabet}':`, brandsStartingWithRandomAlphabet);

        // Verify presence of brands
        for (const brand of brandsStartingWithRandomAlphabet) {
            //console.log(brand);
            expect(brand).toBeTruthy(); // Verify brand name is present
        }

        // Verify alphabetical order
       // const sortedBrands = brandsStartingWithRandomAlphabet.slice().sort();
       const sortedBrands = [...brandsStartingWithRandomAlphabet].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        expect(brandsStartingWithRandomAlphabet).toEqual(sortedBrands);

    } catch (error) {
        console.error(`Error validating brands under alphabet '${randomAlphabet}':`, error);
    }
}
    
}