Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I open the cart
    Then I proceed to checkout
    Then I enter checkout details with first name "John", last name "Doe", and postal code "12345"
    Then I continue checkout
    Then I finish the purchase
    Then I should see the purchase confirmation text "Thank you for your order!"