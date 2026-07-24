Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'
    Then I select the cart
    Then I select checkout
    Then I fill in the checkout information with "First", "Last", "12345"
    Then I select continue
    Then I select finish
    Then I validate the successful purchase text is "Thank you for your order!"