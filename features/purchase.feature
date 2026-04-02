Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I go to the cart
    Then I checkout with first name "John" last name "Doe" postal code "12345"
    Then I continue the checkout
    Then I finish the checkout
    Then I should see the order confirmation "Thank you for your order!"