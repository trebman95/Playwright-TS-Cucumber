Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I will open the cart
    Then I will checkout
    Then I will provide checkout information with first name "Ada", last name "Lovelace", and postal code "10001"
    Then I will continue checkout
    Then I will finish checkout
    Then I should see the order confirmation "Thank you for your order!"
