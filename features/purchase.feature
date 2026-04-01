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
    Then I will open the cart
    Then I will select Checkout
    Then I will fill in the checkout info with "Patrice", "Jackson", and "11222"
    Then I will select Continue
    Then I will select Finish
    Then I will validate the purchase message "Thank you for your order!"