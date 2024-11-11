import test, { expect } from 'playwright/test';

const orderStatus_ReturnedText = 'Returned on';
const orderStatus_CancenceledText = 'Canceled';
const orderStatus_DeliveredText = 'Delivered on';
const orderStatus_ShippedText = 'Shipped on';
const orderStatus_PendingShipmentText = 'Pending Shipment';
const order_Section = 'section.mb-7.border';
const product_Section = 'section.mt-4.flex.items-center';
const order_SummaryText = 'Order Summary';
const cancelOrderModal_Text = 'Are you sure you want to cancel your order?';
const cancelOrderModal_HeadingText = 'Cancel order';
const cancelItemModal_HeadingText = 'Cancel Item';
const cancelItemModal_Text = 'Are you sure you want to cancel this item?';
const orderDetailsAwatingShipmentSection = 'Pending Shipment';
const orderDetails_CanceledItem_SuccessMessage = 'Your Item has been canceled.';
const orderDetailsOrderSummarySubTotal = /^Subtotal\s*\(\d+\s*items\):\s*$/;
const orderDetailsOrderSummaryShipping = 'Shipping:';
const orderDetailsOrderSummaryEstSurcharge = 'Shipping Surcharge:';
const orderDetailsOrderSummarySalesTax = 'Sales Tax:';
const orderDetailsOrderSummaryOrderTotal = 'Order Total:';
const tooltipButton = 'button[aria-label="tooltip"]';
const orderDetailsShippingSectionText = 'Shipping';
const orderDetailsShippingSectionAddressText = 'Shipping Address';
const orderDetailsShippingSectionShippingMethodText = 'Shipping Method';
const name = /^[A-Za-z\s]+$/;
const addressLine1 = /^\d+\s[A-Za-z\s]+$/;
const cityStateZip = /^[A-Za-z\s]+,\s[A-Z]{2},\s\d{5}-\d{4}$/;
const phone = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const orderDetailsShippingAddress = 'section.ml-3.pt-9:has-text("Shipping Address")';
const orderDetailsBillingAddress = 'section.mb-9.pr-22:has-text("Billing Address")';
const orderDetailsBillingAddressContactInfo = 'section.mb-9.pr-22:has-text("Contact Info")';
const orderDetailsAccountNumber = 'section.mb-9.mt-8.lg\\:mb-6.lg\\:mt-0:has-text("Payment")';
const orderDetailsShippedSection = 'section.border-radius-\\[6px\\].mt-6:has-text("Shipped")';
const trackShipmentText = 'section.mb-\\[30px\\]:has-text("Track Shipment")';
const orderDetailsProductSection = 'section.hidden.lg\\:block .border-radius-\\[6px\\].mb-\\[31px\\]';
const orderDetailsDeliveredOnSection = 'section.hidden.lg\\:block .border-radius-\\[6px\\] h1:has-text("Delivered on")';
const orderDetailsReturnedOnSection = 'section.hidden.lg\\:block .border-radius-\\[6px\\] h1:has-text("Returned")';
const orderDetailsRefundSection = 'section.bg-tealGreen.p-2\\.5 p:has-text("Post-Order Refund(s)")';
const orderDetailsOrderHeadingRegex = /Order\s*#\d+/;
const dateRegex = /Placed on\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{2},\s+\d{4}/;


exports.OrderDetailsPage = class OrderDetailsPage {

    constructor(page) {
        this.page = page;
        this.orderDetailsLink = page.locator('section.border-b a:has-text("View Order Details")');
        this.orderDetailsCancelOrderButton = page.getByRole('button', { name: 'Cancel order' });
        this.orderDetailsCancelItemButton = page.getByRole('button', { name: 'Cancel Item' });
        this.orderDetailsCancelOrderModalCancelButton = page.getByRole('button', { name: 'Yes, Cancel order' });
        this.orderDetailsCancelOrderModalNoGoBackButton = page.getByRole('button', { name: 'No, Go Back to Order' });
        //this.orderDetailsCancelItemButton = page.getByRole('button', { name: 'Cancel item' });
        this.orderDetailsCancelOrderModalCancelItemButton = page.getByRole('button', { name: 'Yes, Cancel Item' });
        this.orderDetailsCancelOrderModalCloseIcon = page.locator('section').filter({ hasText: 'Cancel orderAre you sure you' }).getByRole('button');
        this.orderDetailsCancelItemModalCloseIcon = page.locator('section').filter({ hasText: 'Cancel ItemAre you sure you' }).getByRole('button');
        this.orderDetailsCanceledItemHeading = page.getByRole('heading', { name: 'Canceled', exact: true });
        this.orderDetailsCanceledItemOnHeading = page.getByRole('heading', { name: 'Canceled on' });
        this.orderDetailsWriteAReviewButton = page.getByRole('button', { name: 'Write a Product Review' });
        this.orderDetailsPowerReviewPageHeading = page.getByRole('heading', { name: 'Write a Review' });
        this.orderDetailsPowerReviewPageRatingText = page.getByText('Your Rating', { exact: true });
        this.orderDetailsBreadCrumb = page.getByText('HomeMy AccountOrdersOrder #');
        //this.orderDetailsOrderNumber = page.getByRole('heading', { name: orderDetailsOrderHeadingRegex });
        this.orderDetailsOrderNumber = page.getByRole('link', { name: 'Order #' });
        this.orderDetailsOrderDate = page.locator(`h2:has-text(/${dateRegex.source}/)`);
        //this.orderLeftNav = page.locator('a.sideBarZBcolor h2');
        this.orderLeftNav = page.getByRole('link', { name: 'Order #' })

    }

    // async validateCancelOrderInOrderDetails() {
    //     // Step 1: Locate all order sections on the page
    //     await this.page.locator(order_Section).first().waitFor({ state: 'visible' });
    //     const orderSections = this.page.locator(order_Section);

    //     // Step 2: Loop through each order section
    //     const totalOrders = await orderSections.count();
    //     for (let i = 0; i < totalOrders; i++) {
    //         const orderSection = orderSections.nth(i);

    //         // Step 3: Locate the product sections within the current order section
    //         const productSections = orderSection.locator(product_Section);
    //         const totalProductSectionsCount = await productSections.count();

    //         // Step 4: Initialize variable to track pending shipment status
    //         let hasPendingShipment = false;

    //         // Step 5: Check each product section for "Pending Shipment" status
    //         for (let j = 0; j < totalProductSectionsCount; j++) {
    //             const productSection = productSections.nth(j);
    //             const statusTextElement = productSection.locator('p');

    //             // Check if the status text matches "Pending Shipment"
    //             const statusText = await statusTextElement.textContent();
    //             if (statusText && statusText.trim() === orderStatus_PendingShipmentText) {
    //                 hasPendingShipment = true;
    //                 break; // No need to check further if one product has the status
    //             }
    //         }

    //         // If the order has at least one product with "Pending Shipment" status, click the link
    //         if (hasPendingShipment) {
    //             const orderDetailsLink = orderSection.locator('a:has-text("View Order Details")');

    //             // Check if the order details link is visible and clickable
    //             if (await orderDetailsLink.isVisible()) {
    //                 const orderHeaderText = await orderSection.locator('h2').textContent();
    //                 console.log(`Clicked on the "View Order Details" link for order: ${orderHeaderText.trim()}`);
    //                 await orderDetailsLink.click();
    //                 await this.orderDetailsCancelOrderButton.waitFor({ state: 'visible' });
    //                 await expect(this.orderDetailsCancelOrderButton).toBeVisible();
    //                 break;  // Exit the loop after clicking the first valid order link
    //             } else {
    //                 const orderNumber = await orderSection.locator('h2').textContent();
    //                 console.log(`"View Order Details" link is not visible for order: ${orderNumber.trim()}`);
    //             }
    //         } else {
    //             const orderNumber = await orderSection.locator('h2').textContent();
    //             console.log(`No "Pending Shipment" status found in products for order: ${orderNumber.trim()}`);
    //         }
    //     }
    // }

    async validateCancelOrderInOrderDetails() {
        // Step 1: Initialize variables
        let hasPendingShipment = false;
        let pageCounter = 0;
        const maxPages = 2; // Safety check to prevent infinite loops

        // Step 2: Define locators
        const orderSectionsLocator = this.page.locator(order_Section);
        const viewMoreButton = this.page.locator('button:has-text("View More")');
        const orderDetailsLinkSelector = 'a:has-text("View Order Details")';

        // Step 3: Start looping through order pages
        while (!hasPendingShipment && pageCounter < maxPages) {
            pageCounter++;

            // Wait for the order sections to be visible
            await orderSectionsLocator.first().waitFor({ state: 'visible' });

            // Get the total count of order sections on the current page
            const totalOrders = await orderSectionsLocator.count();

            // Step 4: Iterate over each order section
            for (let i = 0; i < totalOrders; i++) {
                const orderSection = orderSectionsLocator.nth(i);

                // Locate product sections within the order section
                const productSections = orderSection.locator(product_Section);
                const totalProductSectionsCount = await productSections.count();

                // Step 5: Check each product section for "Pending Shipment" status
                for (let j = 0; j < totalProductSectionsCount; j++) {
                    const productSection = productSections.nth(j);
                    const statusTextElement = productSection.locator('p');

                    // Retrieve status text and trim any whitespace
                    const statusText = await statusTextElement.textContent();

                    // If the status matches "Pending Shipment", update the flag
                    if (statusText && statusText.trim() === orderStatus_PendingShipmentText) {
                        hasPendingShipment = true;
                        break; // Exit loop once a pending shipment is found
                    }
                }

                // If pending shipment is found, click the order details link
                if (hasPendingShipment) {
                    const orderDetailsLink = orderSection.locator(orderDetailsLinkSelector);

                    // Check if the order details link is visible and clickable
                    if (await orderDetailsLink.isVisible()) {
                        const orderHeaderText = await orderSection.locator('h2').textContent();
                        console.log(`Clicked on the "View Order Details" link for order: ${orderHeaderText.trim()}`);
                        await orderDetailsLink.click();
                        await this.orderDetailsCancelOrderButton.waitFor({ state: 'visible' });
                        await expect(this.orderDetailsCancelOrderButton).toBeVisible();
                        return true; // Exit the function successfully
                    } else {
                        const orderNumber = await orderSection.locator('h2').textContent();
                        console.log(`"View Order Details" link is not visible for order: ${orderNumber.trim()}`);
                    }
                } else {
                    const orderNumber = await orderSection.locator('h2').textContent();
                    console.log(`No "Pending Shipment" status found in products for order: ${orderNumber.trim()}`);
                }
            }

            // Step 6: Check if "View More" button is present and clickable
            await this.page.waitForSelector('button:has-text("View More")', { state: 'visible' });
            if (!hasPendingShipment && await viewMoreButton.isVisible()) {
                console.log('Clicking on "View More" to load more orders...');
                await viewMoreButton.click();
                await orderSectionsLocator.first().waitFor({ state: 'visible' });
                //await this.page.waitForLoadState('domcontentloaded');
                // You can also add a small delay here if needed:
                // await this.page.waitForTimeout(1000);
            } else if (!hasPendingShipment) {
                // If no pending shipment is found after exhausting "View More", log and exit
                console.log('No orders with "Pending Shipment" status found after viewing all available orders.');
                return false;
            }
        }

        // Step 7: If no pending shipment is found and no more pages to view, log and return
        console.log('All orders have been checked, and no orders with "Pending Shipment" status were found.');
        return false;
    }

    async validateNoCancelOrderInOrderDetails() {
        // Step 1: Locate all order sections on the page
        await this.page.locator(order_Section).first().waitFor({ state: 'visible' });
        const orderSections = await this.page.locator(order_Section);
        const totalOrders = await orderSections.count();
    
        // Step 2: Iterate through all order sections
        for (let i = 0; i < totalOrders; i++) {
            const orderSection = orderSections.nth(i);
    
            // Step 3: Locate the product sections within the current order section
            const productSections = orderSection.locator(product_Section);
            const totalProductSectionsCount = await productSections.count();
    
            // Step 4: Locate all <p> tags with the text "Shipped" within the product sections
            const shippedTags = orderSection.locator(`section.truncate > p:has-text("${orderStatus_ShippedText}")`);
            const shippedTagsCount = await shippedTags.count();
    
            // Log the count for debugging
            console.log(`Order ${i + 1}: Found ${shippedTagsCount} 'Shipped' tags.`);
    
            // If we find a matching "Shipped" tag, click the "View Order Details" link
            if (shippedTagsCount > 0) {
                console.log(`Found shipped status in order ${i + 1}, clicking on 'View Order Details'`);
    
                // Click the "View Order Details" link for this order
                const orderDetailsLink = orderSection.locator('a:has-text("View Order Details")');
                
                if (await orderDetailsLink.isVisible()) {
                    await orderDetailsLink.click();
                    console.log('Navigating to order details page');
    
                    // Wait for the order details page to load and verify the cancel order button is hidden
                    await this.page.waitForTimeout(5000);
                    await expect(this.orderDetailsCancelOrderButton).toBeHidden();
    
                    // Exit the loop and function after processing this order
                    return;
                } else {
                    console.log(`"View Order Details" link not visible for order ${i + 1}`);
                }
            }
        }
    
        console.log('No order found with "Shipped" status');
    }
    



    async clickCancelOrderButton() {
        await this.orderDetailsCancelOrderButton.click();
    }

    async clickCancelItemButton() {
        await this.orderDetailsCancelItemButton.first().click();
    }

    async clickCloseCancelOrderButton() {
        await this.orderDetailsCancelOrderModalCloseIcon.click();
        await expect(this.page.getByText(order_SummaryText)).toBeVisible();
    }

    async clickCloseCancelItemModalButton() {
        await this.orderDetailsCancelItemModalCloseIcon.click();
        await expect(this.page.getByText(order_SummaryText)).toBeVisible();
    }

    async clickCancelOrderCancelItemButton() {
        await this.orderDetailsCancelOrderModalCancelItemButton.click();
    }

    async clickNoGoBackOrderButton() {
        await this.orderDetailsCancelOrderModalNoGoBackButton.click();
        await expect(this.page.getByText(order_SummaryText)).toBeVisible();
    }

    async validateCancelOrderModal() {
        await this.page.getByRole('heading', { name: cancelOrderModal_HeadingText }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('heading', { name: cancelOrderModal_HeadingText })).toBeVisible();
        await expect(this.page.getByText(cancelOrderModal_Text)).toBeVisible();
        await expect(this.orderDetailsCancelOrderModalCancelButton).toBeVisible();
        await expect(this.orderDetailsCancelOrderModalNoGoBackButton).toBeVisible();
        await expect(this.orderDetailsCancelOrderModalCloseIcon).toBeVisible();
    }

    async validateCancelItemModal() {
        await this.page.getByRole('heading', { name: cancelItemModal_HeadingText }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('heading', { name: cancelItemModal_HeadingText })).toBeVisible();
        await expect(this.page.getByText(cancelItemModal_Text)).toBeVisible();
        await expect(this.orderDetailsCancelOrderModalCancelItemButton).toBeVisible();
        await expect(this.orderDetailsCancelOrderModalNoGoBackButton).toBeVisible();
        await expect(this.orderDetailsCancelItemModalCloseIcon).toBeVisible();
    }

    async validateCancelItemButton() {
        // Step 1: Locate the "Awaiting Shipment" section
        const awaitingShipmentSection = this.page.getByText(orderDetailsAwatingShipmentSection).nth(1);

        // Step 2: Wait for the section to be visible
        await awaitingShipmentSection.waitFor({ state: 'visible' });

        // Step 3: Locate all product sections within the "Awaiting Shipment" section
        const productSections = awaitingShipmentSection.locator('section.border-radius-\\[6px\\].mb-\\[31px\\]');
        const totalProductSectionsCount = await productSections.count();

        // Step 4: Loop through each product section to verify the "Cancel item" button
        for (let i = 0; i < totalProductSectionsCount; i++) {
            const productSection = productSections.nth(i);
            const cancelItemButton = productSection.locator('button:has-text("Cancel item")');

            // Check if the "Cancel item" button is visible
            if (await cancelItemButton.isVisible()) {
                console.log('The "Cancel item" button is displayed for product', await productSection.locator('p.font-bold a').textContent());
            } else {
                console.log('The "Cancel item" button is NOT displayed for product', await productSection.locator('p.font-bold a').textContent());
            }

            // Assert the visibility of the cancel button
            await expect(cancelItemButton).toBeVisible();
        }
    }

    async validateCanceledItem() {
        // Step 1: Locate the "Awaiting Shipment" section
        const awaitingShipmentSection = this.page.getByText(orderDetailsAwatingShipmentSection).nth(1);

        // Step 2: Wait for the section to be visible
        await awaitingShipmentSection.waitFor({ state: 'visible' });

        // Step 3: Locate all product sections within the "Awaiting Shipment" section
        const productSections = awaitingShipmentSection.locator('section.border-radius-\\[6px\\].mb-\\[31px\\]');
        const totalProductSectionsCount = await productSections.count();

        // Step 4: Loop through each product section to verify the "Cancel item" button
        for (let i = 0; i < totalProductSectionsCount; i++) {
            const productSection = productSections.nth(i);
            const cancelItemButton = productSection.locator('button:has-text("Cancel item")');

            // Check if the "Cancel item" button is visible
            if (await cancelItemButton.isVisible()) {
                const productName = await productSection.locator('a').first().textContent();
                await cancelItemButton.click();
                await this.clickCancelOrderCancelItemButton();
                await this.page.getByText(`${productName} was successfully canceled in your order.`).waitFor({ state: 'visible' });
                await expect(this.page.getByText(`${productName} was successfully canceled in your order.`)).toBeVisible();
                //console.log('The "Cancel item" button is displayed for product', await productSection.locator('p.font-bold a').textContent());
            } else {
                console.log('The "Cancel item" button is NOT displayed for product', await productSection.locator('p.font-bold a').textContent());
            }

            // Assert the visibility of the canceled item
            await expect(this.orderDetailsCanceledItemHeading).toBeVisible();
        }

    }

    async getOrderNumberInOrderDetails() {
        const orderNumber = await this.page.locator('h2.text-2xl.font-bold.text-black').textContent();
        return orderNumber;
    }

    async validatedCanceledOrder(orderNumber) {
        await this.orderDetailsCancelOrderModalCancelButton.click();
        await this.page.getByText(`${orderNumber} was successfully canceled.`).waitFor({ state: 'visible' });
        await expect(this.page.getByText(`${orderNumber} was successfully canceled.`)).toBeVisible();
        await expect(this.orderDetailsCanceledItemHeading).toBeVisible();
    }

    async clickViewOrderDetailsLink() {
        await this.orderDetailsLink.first().click();
        await this.page.getByText(order_SummaryText).waitFor({ state: 'visible' });
        await expect(this.page.getByText(order_SummaryText)).toBeVisible();
    }

    // async validateOrderDetailsOrderSummary() {
    //     // Define expected labels
    //     const expectedLabels = [
    //         orderDetailsOrderSummarySubTotal,
    //         orderDetailsOrderSummaryShipping,
    //         orderDetailsOrderSummaryEstSurcharge,
    //         orderDetailsOrderSummarySalesTax,
    //         orderDetailsOrderSummaryOrderTotal
    //     ];

    //     // Check visibility for each label
    //     for (const label of expectedLabels) {
    //         await expect(this.page.getByText(label)).toBeVisible();
    //     }

    //     // Extract and validate text content
    //     const subTotalText = await this.page.getByText(orderDetailsOrderSummarySubTotal).locator('..').locator('p:last-child').textContent();
    //     const estShippingText = await this.page.getByText(orderDetailsOrderSummaryShipping).locator('..').locator('..').locator('p:last-child').textContent();
    //     const shippingTooltipButton = this.page.getByText(orderDetailsOrderSummaryShipping).locator('..').locator(tooltipButton);
    //     await expect(shippingTooltipButton).toBeVisible();
    //     const estSurchargeText = await this.page.getByText(orderDetailsOrderSummaryEstSurcharge).locator('..').locator('..').locator('p:last-child').textContent();
    //     const estSalesTaxText = await this.page.getByText(orderDetailsOrderSummarySalesTax).locator('..').locator('..').locator('p:last-child').textContent();
    //     const salesTaxTooltipButton = this.page.getByText(orderDetailsOrderSummarySalesTax).locator('..').locator(tooltipButton);
    //     await expect(salesTaxTooltipButton).toBeVisible();
    //     const orderTotalText = await this.page.getByText(orderDetailsOrderSummaryOrderTotal).locator('..').locator('p:last-child').textContent();

    //     // Match each value against the currency format regex
    //     expect(subTotalText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
    //     expect(estShippingText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
    //     expect(estSurchargeText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
    //     expect(estSalesTaxText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
    //     expect(orderTotalText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);

    // }

    async validateOrderDetailsOrderSummary() {
        // Define expected labels
        const expectedLabels = [
            orderDetailsOrderSummarySubTotal,
            orderDetailsOrderSummaryShipping,
            orderDetailsOrderSummarySalesTax,
            orderDetailsOrderSummaryOrderTotal
        ];

        // Check visibility for each common label
        for (const label of expectedLabels) {
            await expect(this.page.getByText(label)).toBeVisible();
        }

        // Extract and validate text content for always present elements
        const subTotalText = await this.page.getByText(orderDetailsOrderSummarySubTotal)
            .locator('..').locator('p:last-child').textContent();

        const estShippingText = await this.page.getByText(orderDetailsOrderSummaryShipping)
            .locator('..').locator('..').locator('p:last-child').textContent();

        const shippingTooltipButton = this.page.getByText(orderDetailsOrderSummaryShipping)
            .locator('..').locator(tooltipButton);
        await expect(shippingTooltipButton).toBeVisible();

        const estSalesTaxText = await this.page.getByText(orderDetailsOrderSummarySalesTax)
            .locator('..').locator('..').locator('p:last-child').textContent();

        const salesTaxTooltipButton = this.page.getByText(orderDetailsOrderSummarySalesTax)
            .locator('..').locator(tooltipButton);
        await expect(salesTaxTooltipButton).toBeVisible();

        const orderTotalText = await this.page.getByText(orderDetailsOrderSummaryOrderTotal)
            .locator('..').locator('p:last-child').textContent();

        // Conditional check for Surcharge
        const surchargeLabel = this.page.getByText(orderDetailsOrderSummaryEstSurcharge);

        let estSurchargeText = null;

        if (await surchargeLabel.isVisible()) {
            estSurchargeText = await surchargeLabel.locator('..').locator('..').locator('p:last-child').textContent();
            console.log(`Surcharge text: ${estSurchargeText.trim()}`);
            expect(estSurchargeText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        } else {
            console.log('Surcharge information is not displayed.');
        }

        // Validate common currency formats
        expect(subTotalText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        expect(estShippingText.trim()).toMatch(/^\$?(\d+(\.\d{2})?|FREE)$/);
        expect(estSalesTaxText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);
        expect(orderTotalText.trim()).toMatch(/^\$\d+(\.\d{2})?$/);

        // Log order total for debugging purposes
        console.log('Order Total:', orderTotalText.trim());
        console.log('Shipping:', estShippingText.trim());
    }


    async validateOrderDetailsShippingDetails() {
        await expect(this.page.getByText(orderDetailsShippingSectionText, { exact: true })).toBeVisible();
        await expect(this.page.getByText(orderDetailsShippingSectionAddressText, { exact: true })).toBeVisible();
        await expect(this.page.getByText(orderDetailsShippingSectionShippingMethodText, { exact: true })).toBeVisible();
        const shippingAddressSection = this.page.locator(orderDetailsShippingAddress);

        const shippingAddressText = await shippingAddressSection.locator('p').nth(1).textContent();
        expect(shippingAddressText.trim()).toBeTruthy();

        const nameText = await shippingAddressSection.locator('p').nth(2).textContent();
        expect(nameText.trim()).toBeTruthy();

        const addressLine1Text = await shippingAddressSection.locator('p').nth(3).textContent();
        expect(addressLine1Text.trim()).toBeTruthy();

        const cityStateZipText = await shippingAddressSection.locator('p').nth(4).textContent();
        expect(cityStateZipText.trim()).toBeTruthy();

        const phoneText = await shippingAddressSection.locator('p').nth(5).textContent();
        expect(phoneText.trim()).toBeTruthy();

        const shippingMethodText = await shippingAddressSection.locator('p').nth(6).textContent();
        expect(shippingMethodText.trim()).toBeTruthy();

        const shippingMethod = await shippingAddressSection.locator('p').nth(7).textContent();
        expect(shippingMethod.trim()).toBeTruthy();
    }

    async validateOrderDetailsBillingAddress() {
        // Locate the billing address section
        const billingAddressSection = this.page.locator(orderDetailsBillingAddress);

        // Extract and validate each p tag content within the billing address section
        const billingAddressText = await billingAddressSection.locator('p').nth(0).textContent();
        expect(billingAddressText.trim()).toBeTruthy();

        const nameText = await billingAddressSection.locator('p').nth(1).textContent();
        expect(nameText.trim()).toBeTruthy();

        const addressLine1Text = await billingAddressSection.locator('p').nth(2).textContent();
        expect(addressLine1Text.trim()).toBeTruthy();

        const cityStateZipText = await billingAddressSection.locator('p').nth(3).textContent();
        expect(cityStateZipText.trim()).toBeTruthy();

        const phoneText = await billingAddressSection.locator('p').nth(4).textContent();
        expect(phoneText.trim()).toBeTruthy();

        // Extract and validate the email address
        const contactInfoText = await billingAddressSection.locator('p').nth(5).textContent();
        expect(contactInfoText.trim()).toBeTruthy();

        const emailText = await billingAddressSection.locator('p').nth(6).textContent();
        expect(emailText.trim()).toBeTruthy();
    }

    async validateOrderDetailsPaymentSection() {
        const accountNumberSection = this.page.locator(orderDetailsAccountNumber);
        const paymentMethodText = await accountNumberSection.locator('p').nth(1).textContent();
        expect(paymentMethodText.trim()).toBeTruthy();
        //const paymentMethodsvg = this.page.locator('section.ml-3.lg\\:ml-0 section section p.mb-6 svg');
        const paymentMethodsvg = await accountNumberSection.locator('section').locator('section').locator('p.mb-6 svg');
        const cardNumberText = accountNumberSection.locator('section h1:has-text("Card Number") + p');
        // Determine if paymentMethodSvg is visible
        const isPaymentMethodSvgVisible = await paymentMethodsvg.isVisible();

        // Determine if cardNumberText is visible
        const isCardNumberTextVisible = await cardNumberText.isVisible();

        // Expect that either paymentMethodSvg or cardNumberText should be visible
        if (!isPaymentMethodSvgVisible && !isCardNumberTextVisible) {
            throw new Error("Neither payment method SVG nor card number is visible.");
        }

        // Log visibility status for debugging
        if (isPaymentMethodSvgVisible) {
            console.log('Payment method SVG is visible.');
        } else {
            console.log('Payment method SVG is not visible.');
        }

        if (isCardNumberTextVisible) {
            console.log('Card number text is visible.');
        } else {
            console.log('Card number text is not visible.');
        }
        //expect(paymentMethodsvg).toBeVisible();
        const accountNumberText = await accountNumberSection.locator('p').nth(3).textContent();
        expect(accountNumberText.trim()).toBeTruthy();
        const accountNumberDetails = await accountNumberSection.locator('p').nth(4).textContent();
        expect(accountNumberDetails.trim()).toBeTruthy();
    }

    // async validateShippedOrderInOrderDetails() {
    //     // Step 1: Locate all order sections on the page
    //     await this.page.locator(order_Section).first().waitFor({ state: 'visible' });

    //     // Step 2: Loop through each order section
    //     const orderSections = await this.page.locator(order_Section);
    //     const totalOrders = await orderSections.count();

    //     for (let i = 0; i < totalOrders; i++) {
    //         const orderSection = orderSections.nth(i);

    //         // Step 3: Locate the product sections and "Shipped on" <p> tags within the current order section
    //         const productSections = orderSection.locator(product_Section);
    //         const totalProductSectionsCount = await productSections.count();
    //         const shippedTags = orderSection.locator(`section.truncate > p:has-text("${orderStatus_ShippedText}")`);
    //         const totalTagsCount = await shippedTags.count();

    //         // Step 4: Verify if all products have "Shipped on" status
    //         if (totalTagsCount > 0) {
    //             const orderDetailsLink = orderSection.locator('a:has-text("View Order Details")');

    //             if (await orderDetailsLink.isVisible()) {
    //                 await orderDetailsLink.click();
    //                 console.log('Clicked on the "View Order Details" link for order', await orderSection.locator('h2').textContent());
    //                 const shippedSection = this.page.locator(orderDetailsShippedSection);
    //                 const shippedText = await shippedSection.locator('h1').nth(0).textContent();
    //                 expect(shippedText.trim()).toBeTruthy();
    //                 const shippedOnText = await shippedSection.locator('h1').nth(1).textContent();
    //                 expect(shippedOnText.trim()).toBeTruthy();
    //                 const trackShipment = await this.page.locator(trackShipmentText).nth(0).textContent();
    //                 expect(trackShipment.trim()).toBeTruthy();
    //                 const trackShipmentNumber = await this.page.locator(trackShipmentText).locator('a').nth(0).textContent();
    //                 expect(trackShipmentNumber.trim()).toBeTruthy();
    //                 break;  // Exit the loop after clicking the first valid order link
    //             } else {
    //                 console.log('"View Order Details" link is not visible for order', await orderSection.locator('h2').textContent());
    //             }
    //         } else {
    //             console.log('Not all products have "Shipped" status or count mismatch for order', await orderSection.locator('h2').textContent());
    //         }
    //     }
    // }

    async validateShippedOrderInOrderDetails() {
        // Step 1: Initialize variables
        let hasShippedOrder = false;
        let pageCounter = 0;
        const maxPages = 2; // Safety check to prevent infinite loops

        // Step 2: Define locators
        const orderSectionsLocator = this.page.locator(order_Section);
        const viewMoreButton = this.page.locator('button:has-text("View More")');
        const orderDetailsLinkSelector = 'a:has-text("View Order Details")';

        // Step 3: Start looping through order pages
        while (!hasShippedOrder && pageCounter < maxPages) {
            pageCounter++;

            // Wait for the order sections to be visible
            await orderSectionsLocator.first().waitFor({ state: 'visible' });

            // Get the total count of order sections on the current page
            const totalOrders = await orderSectionsLocator.count();

            // Step 4: Iterate over each order section
            for (let i = 0; i < totalOrders; i++) {
                const orderSection = orderSectionsLocator.nth(i);

                // Locate product sections and shipped status tags within the order section
                const productSections = orderSection.locator(product_Section);
                const totalProductSectionsCount = await productSections.count();
                const shippedTags = orderSection.locator(`section.truncate > p:has-text("${orderStatus_ShippedText}")`);
                const totalTagsCount = await shippedTags.count();

                // Step 5: Verify if all products have "Shipped on" status
                if (totalTagsCount === totalProductSectionsCount && totalTagsCount > 0) {
                    const orderDetailsLink = orderSection.locator(orderDetailsLinkSelector);

                    if (await orderDetailsLink.isVisible()) {
                        // Click on the "View Order Details" link
                        await orderDetailsLink.click();
                        const orderHeaderText = await orderSection.locator('h2').textContent();
                        console.log(`Clicked on the "View Order Details" link for order: ${orderHeaderText.trim()}`);

                        // Verify the details on the order details page
                        const shippedSection = this.page.locator(orderDetailsShippedSection);
                        const shippedText = await shippedSection.locator('h1').nth(0).textContent();
                        expect(shippedText.trim()).toBeTruthy();
                        const shippedOnText = await shippedSection.locator('h1').nth(1).textContent();
                        expect(shippedOnText.trim()).toBeTruthy();
                        const trackShipment = await this.page.locator(trackShipmentText).nth(0).textContent();
                        expect(trackShipment.trim()).toBeTruthy();
                        const trackShipmentNumber = await this.page.locator(trackShipmentText).locator('a').nth(0).textContent();
                        expect(trackShipmentNumber.trim()).toBeTruthy();

                        hasShippedOrder = true; // Update the flag to indicate a successful find
                        return true; // Exit the function successfully
                    } else {
                        const orderNumber = await orderSection.locator('h2').textContent();
                        console.log(`"View Order Details" link is not visible for order: ${orderNumber.trim()}`);
                    }
                } else {
                    const orderNumber = await orderSection.locator('h2').textContent();
                    console.log(`Not all products have "Shipped" status or count mismatch for order: ${orderNumber.trim()}`);
                }
            }

            // Step 6: Check if "View More" button is present and clickable
            await this.page.waitForSelector('button:has-text("View More")', { state: 'visible' });
            if (!hasShippedOrder && await viewMoreButton.isVisible()) {
                console.log('Clicking on "View More" to load more orders...');
                await viewMoreButton.click();
                await orderSectionsLocator.first().waitFor({ state: 'visible' });
                //await this.page.waitForLoadState('domcontentloaded');
                // You can also add a small delay here if needed:
                // await this.page.waitForTimeout(1000);
            } else if (!hasShippedOrder) {
                // If no shipped order is found after exhausting "View More", log and exit
                console.log('No orders with all products shipped status found after viewing all available orders.');
                return false;
            }
        }

        // Step 7: If no shipped order is found and no more pages to view, log and return
        console.log('All orders have been checked, and no orders with all products shipped status were found.');
        return false;
    }


    async clickOnTrackShipmentNumber() {
        await this.page.locator('section.mb-\\[30px\\] a').nth(1).click();
        const pagePromise = this.page.waitForEvent('popup');
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        const regex = /.\/fedextrack\/.*/;
        await expect(newTab).toHaveURL(regex);

    }

    async validateProductSection() {
        // Wait for the first Product section to be visible
        await this.page.locator(orderDetailsProductSection).first().waitFor({ state: 'visible' });

        // Loop through each product section
        const productSections = await this.page.locator(orderDetailsProductSection);
        const totalProducts = await productSections.count();
        for (let i = 0; i < totalProducts; i++) {
            const productSection = productSections.nth(i);

            // Validate all <p> tags
            const pTags = productSection.locator('p');
            const pTagsCount = await pTags.count();
            for (let j = 0; j < pTagsCount; j++) {
                const pText = await pTags.nth(j).textContent();
                expect(pText.trim()).toBeTruthy(); // Ensure each <p> tag has content
                console.log(`Validated <p> tag content: ${pText.trim()}`);
            }

            // Validate product image display
            const productImages = await productSection.locator('.h-\\[150px\\] > a img');
            const imageCount = await productImages.count();
            for (let k = 0; k < imageCount; k++) {
                const productImage = productImages.nth(k);
                await expect(productImage).toBeVisible();
                console.log(`Validated product image is visible: ${await productImage.getAttribute('src')}`);
                // Validate product image content (alt attribute)
                const imgAltText = await productImage.getAttribute('alt');
                expect(imgAltText).toBeTruthy();
                console.log(`Validated product image alt text: ${imgAltText}`);
            }

            // Validate contents of the product section
            const productsSection = productSection.locator('section.mt-3.flex.gap-\\[14px\\]');
            const productDetails = productsSection.locator('section > p');
            const productDetailsCount = await productDetails.count();
            for (let k = 0; k < productDetailsCount; k++) {
                const productDetailText = await productDetails.nth(k).textContent();
                expect(productDetailText.trim()).toBeTruthy();
                console.log(`Validated product detail: ${productDetailText.trim()}`);
            }
        }
    }

    // async validateDeliveredOrderInOrderDetails() {
    //     await this.page.locator(order_Section).first().waitFor({ state: 'visible' });
    //     const orderSections = await this.page.locator(order_Section);
    //     const totalOrders = await orderSections.count();

    //     // Loop through each order section
    //     for (let i = 0; i < totalOrders; i++) {
    //         const orderSection = orderSections.nth(i);

    //         // Wait for the order section to be visible
    //         await orderSection.waitFor({ state: 'visible' });

    //         // Check if the order section contains "Delivered on" status for any product
    //         const deliveredTags = await orderSection.locator(`section.truncate > p:has-text("${orderStatus_DeliveredText}")`);
    //         const totalTagsCount = await deliveredTags.count();

    //         if (totalTagsCount > 0) {
    //             // Click on "View Order Details" link
    //             const orderDetailsLink = await orderSection.locator('a:has-text("View Order Details")');
    //             await orderDetailsLink.click();

    //             // Wait for the order summary text to be visible
    //             await this.page.getByText(order_SummaryText).waitFor({ state: 'visible' });

    //             // Find all product sections on the order details page
    //             const productSections = await this.page.locator(orderDetailsDeliveredOnSection).first();
    //             expect(productSections).toBeVisible();
    //             await this.validateWriteAReviewProduct();
    //             break;
    //         }
    //     }
    // }

    async validateDeliveredOrderInOrderDetails() {
        // Step 1: Initialize variables
        let hasDeliveredOrder = false;
        let pageCounter = 0;
        const maxPages = 2; // Safety check to prevent infinite loops

        // Step 2: Define locators
        const orderSectionsLocator = this.page.locator(order_Section);
        const viewMoreButton = this.page.locator('button:has-text("View More")');
        const orderDetailsLinkSelector = 'a:has-text("View Order Details")';

        // Step 3: Start looping through order pages
        while (!hasDeliveredOrder && pageCounter < maxPages) {
            pageCounter++;

            // Wait for the order sections to be visible
            await orderSectionsLocator.first().waitFor({ state: 'visible' });

            // Get the total count of order sections on the current page
            const totalOrders = await orderSectionsLocator.count();

            // Step 4: Iterate over each order section
            for (let i = 0; i < totalOrders; i++) {
                const orderSection = orderSectionsLocator.nth(i);

                // Wait for the order section to be visible
                await orderSection.waitFor({ state: 'visible' });

                // Step 5: Check for "Delivered on" status
                const deliveredTags = orderSection.locator(`section.truncate > p:has-text("${orderStatus_DeliveredText}")`);
                const totalTagsCount = await deliveredTags.count();

                if (totalTagsCount > 0) {
                    // Step 6: Click on the "View Order Details" link
                    const orderDetailsLink = orderSection.locator(orderDetailsLinkSelector);

                    if (await orderDetailsLink.isVisible()) {
                        await orderDetailsLink.click();
                        const orderHeaderText = await orderSection.locator('h2').textContent();
                        console.log(`Clicked on the "View Order Details" link for order: ${orderHeaderText.trim()}`);

                        // Step 7: Verify the order details page
                        await this.page.getByText(order_SummaryText).waitFor({ state: 'visible' });
                        const productSections = this.page.locator(orderDetailsDeliveredOnSection);
                        expect(productSections.first()).toBeVisible();

                        // Validate "Write a Review" functionality for the products
                        await this.validateWriteAReviewProduct();

                        hasDeliveredOrder = true; // Mark as found
                        return true; // Exit after finding the first delivered order
                    } else {
                        const orderNumber = await orderSection.locator('h2').textContent();
                        console.log(`"View Order Details" link is not visible for order: ${orderNumber.trim()}`);
                    }
                } else {
                    const orderNumber = await orderSection.locator('h2').textContent();
                    console.log(`No "Delivered on" status found in products for order: ${orderNumber.trim()}`);
                }
            }

            // Step 8: Check if "View More" button is present and clickable
            await this.page.waitForSelector('button:has-text("View More")', { state: 'visible' });
            if (!hasDeliveredOrder && await viewMoreButton.isVisible()) {
                console.log('Clicking on "View More" to load more orders...');
                await viewMoreButton.click();
                await orderSectionsLocator.first().waitFor({ state: 'visible' });

                // Optional delay for smooth transition (if necessary)
                // await this.page.waitForTimeout(1000);
            } else if (!hasDeliveredOrder) {
                // If no delivered order is found after exhausting "View More", log and exit
                console.log('No orders with "Delivered on" status found after viewing all available orders.');
                return false;
            }
        }

        // Step 9: If no delivered order is found and no more pages to view, log and return
        console.log('All orders have been checked, and no orders with "Delivered on" status were found.');
        return false;
    }


    async validateWriteAReviewProduct() {
        // Wait for the first Product section to be visible
        await this.page.locator(orderDetailsProductSection).first().waitFor({ state: 'visible' });

        // Loop through each product section
        const productSections = await this.page.locator(orderDetailsProductSection);
        const totalProducts = await productSections.count();
        for (let i = 0; i < totalProducts; i++) {
            const productSection = productSections.nth(i);

            // Validate all write a review button
            const reviewButtonTags = productSection.locator('section.px-4.py-2');
            const reviewButtonCount = await reviewButtonTags.count();
            for (let j = 0; j < reviewButtonCount; j++) {
                await expect(reviewButtonTags.nth(j)).toBeVisible();
            }
        }

    }

    async clickOnWriteAReviewButton() {
        await this.orderDetailsWriteAReviewButton.first().click();
        await this.orderDetailsPowerReviewPageHeading.waitFor({ state: 'visible' });
        await expect(this.orderDetailsPowerReviewPageHeading).toBeVisible();
        await expect(this.orderDetailsPowerReviewPageRatingText).toBeVisible();
    }

    // async validateProductReturnedOn() {
    //     // Wait for the first Product section to be visible
    //     await this.page.locator(orderDetailsProductSection).first().waitFor({ state: 'visible' });

    //     // Loop through each product section
    //     const productSections = await this.page.locator(orderDetailsProductSection);
    //     const totalProducts = await productSections.count();
    //     for (let i = 0; i < totalProducts; i++) {
    //         const productSection = productSections.nth(i);

    //         // Validate all Returned on tags
    //         const returnedOnTags = productSection.locator('section.bg-\\[\\#FFF3E380\\]');
    //         const returnedOnTagsCount = await returnedOnTags.count();
    //         for (let j = 0; j < returnedOnTagsCount; j++) {
    //             await expect(returnedOnTags.nth(j)).toBeVisible();
    //         }
    //     }

    // }

    // async validateReturnedOnOrderInOrderDetails() {
    //     await this.page.locator(order_Section).first().waitFor({ state: 'visible' });
    //     const orderSections = await this.page.locator(order_Section);
    //     const totalOrders = await orderSections.count();

    //     // Loop through each order section
    //     for (let i = 0; i < totalOrders; i++) {
    //         const orderSection = orderSections.nth(i);

    //         // Wait for the order section to be visible
    //         await orderSection.waitFor({ state: 'visible' });

    //         // Check if the order section contains "Returned on" status for any product
    //         const returnedOnTags = await orderSection.locator(`section.truncate > p:has-text("${orderStatus_ReturnedText}")`);
    //         const totalTagsCount = await returnedOnTags.count();

    //         if (totalTagsCount > 0) {
    //             // Click on "View Order Details" link
    //             const orderDetailsLink = await orderSection.locator('a:has-text("View Order Details")');
    //             await orderDetailsLink.click();

    //             // Wait for the order summary text to be visible
    //             await this.page.getByText(order_SummaryText).waitFor({ state: 'visible' });

    //             // Find all product sections on the order details page
    //             const productSections = await this.page.locator(orderDetailsReturnedOnSection).first();
    //             expect(productSections).toBeVisible();
    //             await this.validateProductReturnedOn();
    //             break;
    //         }
    //     }
    // }

    async validateProductReturnedOn() {
        // Step 1: Initialize variables
        const productSections = this.page.locator(orderDetailsProductSection);

        // Wait for the first Product section to be visible
        await productSections.first().waitFor({ state: 'visible' });

        // Step 2: Loop through each product section
        const totalProducts = await productSections.count();
        for (let i = 0; i < totalProducts; i++) {
            const productSection = productSections.nth(i);

            // Step 3: Validate all "Returned on" tags within the product section
            const returnedOnTags = productSection.locator('section.bg-\\[\\#FFF3E380\\]');
            const returnedOnTagsCount = await returnedOnTags.count();

            for (let j = 0; j < returnedOnTagsCount; j++) {
                await expect(returnedOnTags.nth(j)).toBeVisible();
            }
        }
    }

    async validateReturnedOnOrderInOrderDetails() {
        // Step 1: Initialize variables
        let hasReturnedOrder = false;
        let pageCounter = 0;
        const maxPages = 5; // Safety check to prevent infinite loops

        // Step 2: Define locators
        const orderSectionsLocator = this.page.locator(order_Section);
        const viewMoreButton = this.page.locator('button:has-text("View More")');
        const orderDetailsLinkSelector = 'a:has-text("View Order Details")';

        // Step 3: Start looping through order pages
        while (!hasReturnedOrder && pageCounter < maxPages) {
            pageCounter++;

            // Wait for the first order section to be visible
            await orderSectionsLocator.first().waitFor({ state: 'visible' });

            // Get the total count of order sections on the current page
            const totalOrders = await orderSectionsLocator.count();

            // Step 4: Loop through each order section
            for (let i = 0; i < totalOrders; i++) {
                const orderSection = orderSectionsLocator.nth(i);

                // Wait for the order section to be visible
                await orderSection.waitFor({ state: 'visible' });

                // Step 5: Check for "Returned on" status
                const returnedOnTags = orderSection.locator(`section.truncate > p:has-text("${orderStatus_ReturnedText}")`);
                const totalTagsCount = await returnedOnTags.count();

                if (totalTagsCount > 0) {
                    // Step 6: Click on the "View Order Details" link
                    const orderDetailsLink = orderSection.locator(orderDetailsLinkSelector);

                    if (await orderDetailsLink.isVisible()) {
                        await orderDetailsLink.click();
                        const orderHeaderText = await orderSection.locator('h2').textContent();
                        console.log(`Clicked on the "View Order Details" link for order: ${orderHeaderText.trim()}`);

                        // Step 7: Verify the order details page
                        await this.page.getByText(order_SummaryText).waitFor({ state: 'visible' });
                        const productSections = this.page.locator(orderDetailsReturnedOnSection);
                        expect(productSections.first()).toBeVisible();

                        // Validate "Returned on" tags in products
                        await this.validateProductReturnedOn();

                        hasReturnedOrder = true; // Update the flag to indicate a successful find
                        return true; // Exit the function successfully
                    } else {
                        const orderNumber = await orderSection.locator('h2').textContent();
                        console.log(`"View Order Details" link is not visible for order: ${orderNumber.trim()}`);
                    }
                } else {
                    const orderNumber = await orderSection.locator('h2').textContent();
                    console.log(`No "Returned on" status found in products for order: ${orderNumber.trim()}`);
                }
            }

            // Step 8: Check if "View More" button is present and clickable
            await this.page.waitForSelector('button:has-text("View More")', { state: 'visible' });
            if (!hasReturnedOrder && await viewMoreButton.isVisible()) {
                console.log('Clicking on "View More" to load more orders...');
                await viewMoreButton.click();
                await orderSectionsLocator.first().waitFor({ state: 'visible' });

                // Optional delay for smooth transition (if necessary)
                // await this.page.waitForTimeout(1000);
            } else if (!hasReturnedOrder) {
                // If no returned order is found after exhausting "View More", log and exit
                console.log('No orders with "Returned on" status found after viewing all available orders.');
                return false;
            }
        }

        // Step 9: If no returned order is found and no more pages to view, log and return
        console.log('All orders have been checked, and no orders with "Returned on" status were found.');
        return false;
    }

    async validatePostOrderRefundTextVisibility() {
        // Locate the section containing the "Post-Order Refund(s)" text
        const refundSection = await this.page.locator(orderDetailsRefundSection);
        // Check if the refund section exists and is visible
        if (await refundSection.isVisible()) {
            console.log('"Post-Order Refund(s)" text is visible.');
            await expect(refundSection).toBeVisible();
        } else {
            console.log('"Post-Order Refund(s)" text is not visible or not available.');
        }
    }

    async validateOrderDetailsOrderNumberSection() {
        await expect(this.orderDetailsBreadCrumb).toBeVisible();
        await expect(this.orderDetailsOrderNumber).toBeVisible();
        //await expect(this.orderDetailsOrderDate).toBeVisible();
        await this.validatePlacedOnDate();
        const leftNavOrderNumber = await this.orderLeftNav.textContent();
        const orderNumberLeftNav = leftNavOrderNumber.split('#')[1].trim();
        const orderDetailsOrdNumber = await this.orderDetailsOrderNumber.textContent();
        const orderNumberOrdDetails = orderDetailsOrdNumber.split('#')[1].trim();
        expect(orderNumberOrdDetails).toMatch(orderNumberLeftNav);
    }

    async validatePlacedOnDate() {
        // Locate the h2 element containing the text "Placed on"
        const placedOnDateElement = await this.page.locator('h2:has-text("Placed on")');

        // Wait for the element to be visible
        await placedOnDateElement.waitFor({ state: 'visible' });

        // Extract the text content from the element
        const textContent = await placedOnDateElement.textContent();

        // Validate the text content against the regex
        const isValidDate = dateRegex.test(textContent);

        // Assert that the date format is valid
        expect(isValidDate).toBe(true);
    }

}