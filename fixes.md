
# ✅ Task Implementation

## ✔ 1. Fix Login Page Title Scenario

* **Task:** Modify the scenario *"Validate the login page title"* from [`login.feature`](features/login.feature#8), which was running but failing.

* **Root Cause:**
  The expected page title was incorrect:

  * ❌ Expected: `Labs Swag`
  * ✅ Actual: `Swag Labs`

* **Fix Implemented:**
  Updated the Cucumber scenario to validate the correct page title:

  ```
  Swag Labs
  ```

---

## ✔ 2. Extend Login Error Message Scenario

* **Task:** Extend the scenario *"Validate login error message"* from [`login.feature`](features/login.feature#10), which was missing validation.

* **Enhancement Implemented:**
  Added validation for the error message when logging in with a locked user.

* **Expected Behavior:**
  When logging in with `locked_out_user`, the system should display:

  ```
  Sorry, this user has been locked out.
  ```

* **Outcome:**
  Scenario now validates both:

  * Error visibility
  * Correct error message text

---

## ✔ 3. Implement Successful Purchase Flow

* **Task:** Modify and extend *"Validate successful purchase text"* from [`purchase.feature`](features/purchase.feature#6).

* **Implementation Details:**

  * Implemented complete end-to-end purchase flow:

    * Login
    * Add product to cart
    * Open cart
    * Checkout
    * Enter user details
    * Continue
    * Finish purchase
  * Created:

    * `purchase.steps.ts`
    * Updated `product.page.ts`

* **Validation Added:**

  ```
  Thank you for your order!
  ```

---

## ✔ 4. Implement Product Sorting Validation

* **Task:** Modify and extend *"Validate product sort by price"* from [`product.feature`](features/product.feature#6).

* **Implementation Details:**

  * Used **Scenario Outline** with **Examples table**
  * Parameterized sorting options:

    * `Price (low to high)`
    * `Price (high to low)`

* **Validation Added:**

  * Verified product prices are correctly sorted:

    * Ascending order
    * Descending order

---

## ✔ 5. Extend Test Coverage

### 🔹 Added Additional Scenarios:

* **Cart Badge Validation (Add Item)**

  * Verified cart badge count after adding an item

* **Cart Badge Validation (Remove Item)**

  * Verified cart badge is removed after deleting the item from cart
