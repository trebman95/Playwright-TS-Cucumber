Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    Then I click on the cart
    # TODO: Select Checkout
    Then I proceed to checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I complete the purchase with first name "Sreeja", last name "Damera", and postal code "48108"
    # TODO: Select Continue
    Then I click Continue
    # TODO: Select Finish
    Then I click Finish
    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the successful purchase message "Thank you for your order!"