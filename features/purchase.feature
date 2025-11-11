Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will select the cart icon
  Then I will select Checkout
  Then I will fill in the First Name, Last Name, and Zip/Postal Code
  Then I will select Continue
  Then I will select Finish
  Then I will validate the text 'Thank you for your order!'