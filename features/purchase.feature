Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    When I click the shopping cart icon
    # TODO: Select Checkout
    And I click the Checkout button
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    And I enter the shipping details "Sandeep", "Kumar", and "27616"
    # TODO: Select Continue
    And I click the Continue button
    # TODO: Select Finish
    And I click the Finish button
    # TODO: Validate the text 'Thank you for your order!'
    Then the purchase confirmation message should be "Thank you for your order!"