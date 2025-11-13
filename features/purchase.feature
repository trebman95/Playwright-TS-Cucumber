Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I open the cart
  Then I select checkout
  Then I enter the checkout information with first name "Test", last name "User", and postal code "12345"
  Then I continue to the overview
  Then I finish the purchase
  Then I should see the purchase confirmation message "Thank you for your order!"
