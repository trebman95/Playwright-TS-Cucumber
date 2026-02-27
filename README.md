# Playwright Cucumber Exercise - Completed

## Tasks Completed

### ✅ Task 1: Validate the login page title
**File:** `login.feature`  
**Issue:** Test was failing due to incorrect expected title  
**Fix:** Updated expected title to "Swag Labs"  
**Status:** Passing

### ✅ Task 2: Validate login error message
**File:** `login.feature`, `login.steps.ts`  
**Issue:** Missing validation step for error message  
**Fix:** Added step to validate error message text  
**Status:** Passing

### ✅ Task 3: Validate successful purchase text
**Files:** `purchase.feature`, `purchase.page.ts` (new), `purchase.steps.ts` (new)  
**Implementation:**
- Created Purchase page object with cart, checkout, and completion methods
- Added step definitions for each comment in the feature file
- Validated success message "Thank you for your order!"  
**Status:** Passing

### ✅ Task 4: Validate product sort by price
**Files:** `product.feature`, `product.page.ts`, `product.steps.ts`  
**Implementation:**
- Used Scenario Outline with Examples table
- Parameterized test for Price (low to high) and Price (high to low)
- Created validation method comparing actual vs expected sorted arrays  
**Status:** Passing

### ✅ Task 5: Extend testing coverage
**Additional coverage added:**
- Name sorting validation (A to Z, Z to A)
- Universal sorting method supporting both price and name
- Used regex patterns for flexible step matching

---

*Original setup and run instructions remain unchanged*
