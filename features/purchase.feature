Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login with 'standard_user' as the user
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
  Then I will go to the cart
    # TODO: Select Checkout
  Then I will click 'checkout'
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
  Then I will fill in my First Name, Last Name, and Postal Code
    # TODO: Select Continue
  Then I will select continue
    # TODO: Select Finish
  Then I will click 'finish'
    # TODO: Validate the text 'Thank you for your order!'
  Then I should see the header 'Thank you for your order!'