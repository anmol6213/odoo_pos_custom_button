# Surendra-Dairy
# Custom Action Button in POS 🚀

## Overview ✨
This module introduces a custom action button to the Point of Sale (POS) interface in Odoo, allowing users to input an amount dynamically during the checkout process. The button triggers a popup that allows the user to enter a custom amount for a product, which is then used to update the order details in real-time. Ideal for scenarios like custom pricing, manual entry of amounts, and quick adjustments during sales.

## Features 🎯
- 💸 **Custom Action Button**: Adds a button labeled "Enter Amount" to the POS screen.
- 🖱 **Interactive Popup**: On clicking the button, a popup allows users to input a custom amount.
- 📊 **Dynamic Price Calculation**: Automatically calculates the quantity based on the entered amount and adjusts the unit price accordingly.
- 🛒 **Real-Time Order Update**: The entered amount updates the order line instantly with the new quantity and price.

## Files Included 🗂
- **`custom_button.css`**: Custom styles for the action button and its hover/active states. 🎨
- **`custom_button.js`**: JavaScript logic for handling the popup functionality, validating the entered amount, and updating the order line. 📜
- **`custom_button.xml`**: XML template for adding the custom button to the POS control interface. 🔧
- **`__manifest__.py`**: Odoo manifest file to define module details, dependencies, and assets. ⚙️

## Directory Structure 📁
```
custom_button/
├── static/
│   └── src/
│       ├── js/
│       │   └── custom_button.js      # Core logic and popup control
│       ├── xml/
│       │   └── custom_button.xml     # UI Button template
│       └── css/
│           └── custom_button.css     # Styling for the button
├── manifest.py                      # Module manifest
├── README.md                        # You're reading it
```

## Installation 🔧
1. Download and extract the module files.
2. Place the module in the Odoo custom modules directory.
3. Install the module from the Odoo Apps menu.

## Usage 📚
- Once installed, you will see a new button labeled **"Enter Amount"** in the POS interface.
- Click on the button to trigger the popup, where you can enter the desired amount for the selected product.
- The product quantity and price will be updated based on the entered value.

## Dependencies ⚙️
- Odoo 18.0+ (Tested with version 14)
- **`point_of_sale`** module
- **`base`** module

## Credits 🙌
- **Developed by**: Surendra Dairy POS Team
- **Maintainer**: [Spopli Web Development Services]
- **Contact**: [anmolpatil832003@gmail.com]

## License 📄
This module is licensed under the **LGPL-3** license.
