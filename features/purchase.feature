Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    Then I will select the cart
    # TODO: Select Checkout
    Then I will select checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I will fill in checkout info with first name "Ashwitha" last name "Vollem" and zip "12345"
    # TODO: Select Continue
    Then I will select continue
    # TODO: Select Finish
    Then I will select finish
    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the order confirmation text "Thank you for your order!"