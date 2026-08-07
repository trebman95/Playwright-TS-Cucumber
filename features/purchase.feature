Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will validate Cart Badge shows 1 item
    # TODO: Select the cart (top-right)
  Then I will click on the cart icon
    # TODO: Select Checkout
    Then I will click on the checkout button
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I will Fill in the First Name, Last Name, and Zip Code
    # TODO: Select Continue
    Then I will click on the continue button
    # TODO: Select Finish
    Then I will click on the finish button
    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the text 'Thank you for your order!'