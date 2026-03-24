Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as "standard_user"
  Then I will add the backpack to the cart
  Then I should see cart icon with "1" item
  Then I will go to the cart
  Then I will proceed to Checkout
  Then I will Fill in Checkout information
  Then I will Continue to Checkout
  Then I will Finish the purchase
  Then I should see successful message "Thank you for your order!"