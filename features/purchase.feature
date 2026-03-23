Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I select the cart
  Then I select Checkout
  Then I fill in the checkout information
  Then I select Continue
  Then I select Finish
  Then I should see the success message "Thank you for your order!"