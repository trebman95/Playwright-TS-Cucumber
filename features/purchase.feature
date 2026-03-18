Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart

    Then I open the cart
    Then the cart should contain "Sauce Labs Backpack" with price "$29.99" and quantity "1"
    Then I proceed to checkout
    Then I fill in checkout information
    Then I continue checkout
    Then I finish the purchase
    Then I should see the success message

    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'
