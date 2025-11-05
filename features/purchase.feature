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
  Then I will select the cart 
  Then I will select Checkout
  Then I will fill the First Name, Last Name, and Zip/Postal Code
  Then I will select Continue
  Then I will Select Finish
  Then I will Validate the text 'Thank you for your order!