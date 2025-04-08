/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { NumberPopup } from "@point_of_sale/app/utils/input_popups/number_popup";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";

patch(ControlButtons.prototype, {
    async onClickPopupSingleField() {
        console.log("🟢 [POS] Enter Amount Button Clicked");
        const order = this.pos.get_order();
        console.log("🛒 [POS] Current Order:", order);
        if (!order) {
            console.error("❌ [POS] ERROR: No active order found!");
            return;
        }
        
        const selected_orderline = order.get_selected_orderline();
        console.log("📌 [POS] Selected Order Line:", selected_orderline);
        if (!selected_orderline) {
            console.warn("⚠ [POS] WARNING: No product selected! Please select a product first.");
            return;
        }
        
        const selected_product = selected_orderline.get_product();
        console.log("🛒 [POS] Selected Product:", selected_product ? selected_product.display_name : "None");
        if (!selected_product) {
            console.error("❌ [POS] ERROR: Could not retrieve product details.");
            return;
        }
        
        const price_per_kg = selected_product.lst_price;
        console.log("💰 [POS] Price Per Unit:", price_per_kg);
        if (!price_per_kg || price_per_kg <= 0) {
            console.error("❌ [POS] ERROR: Invalid product price detected! Exiting function.");
            return;
        }
        
        if (!this.dialog) {
            console.error("❌ [POS] ERROR: `this.dialog` is not available! POS may be missing dependencies.");
            return;
        }
        
        console.log("📢 [POS] Opening Amount Popup...");
        
        // Create a promise to properly handle the async popup result
        let entered_value = null;
        let was_confirmed = false;
        
        try {
            await new Promise((resolve) => {
                this.dialog.add(NumberPopup, {
                    title: "Enter Amount (₹)",
                    startingValue: "",
                    confirmButtonLabel: "Confirm",
                    isValid: (value) => !isNaN(value) && parseFloat(value) > 0,
                    getPayload: (value) => {
                        // This is called when user confirms
                        console.log("✅ [POS] User confirmed with value:", value);
                        was_confirmed = true;
                        entered_value = value;
                        resolve();
                    },
                    close: () => {
                        // This is called when popup closes (either confirm or cancel)
                        console.log("🟢 [POS] Popup closed");
                        resolve();
                    }
                });
            });
            
            console.log("📥 [POS] Popup Result - Confirmed:", was_confirmed, "Value:", entered_value);
            
            if (was_confirmed && entered_value !== null) {
                const entered_amount = parseFloat(entered_value);
                console.log("💰 [POS] Entered Amount:", entered_amount);
                
                if (!isNaN(entered_amount) && entered_amount > 0) {
                    // Calculate quantity with 3 decimal places for precision
                    const new_quantity = parseFloat((entered_amount / price_per_kg).toFixed(4));
                    console.log("🔄 [POS] Calculated Quantity:", new_quantity);
                    
                    // Update the order line quantity
                    selected_orderline.set_quantity(new_quantity);
                    
                    // Set the fixed price to preserve the exact entered amount
                    const unit_price = entered_amount / new_quantity;
                    selected_orderline.set_unit_price(unit_price);
                    
                    console.log("✅ [POS] Order Line Updated! New Qty:", new_quantity, "Unit Price:", unit_price);
                    
                    // Force POS UI to refresh
                    order.trigger("change", { orderline: selected_orderline });
                    console.log(`✅ [POS] Final Order Line: Qty = ${new_quantity}, Total = ₹${entered_amount}`);
                } else {
                    console.warn("⚠ [POS] WARNING: Invalid amount entered:", entered_amount);
                }
            } else {
                console.warn("⚠ [POS] WARNING: User Canceled Input!");
            }
        } catch (error) {
            console.error("❌ [POS] ERROR: Failed to process popup!", error);
        }
    },
});
