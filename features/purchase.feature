Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will open the cart
  Then I will select checkout
  Then I will fill in checkout information with "John", "Doe", and "12345"
  Then I will select continue
  Then I should see the item price "$29.99"
  Then I should see the tax "2.40"
  Then I should see the total matches price plus tax
  Then I will select finish
  Then I should see the order completion message "Thank you for your order!"