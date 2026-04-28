Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I open the cart
  Then I proceed to checkout
  Then I enter checkout details "Parth" "Ramani" "400001"
  Then I continue checkout
  Then I finish checkout
  Then I should see text "Thank you for your order!"
