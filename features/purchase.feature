Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I will open the cart
    Then I will proceed to checkout
    Then I will fill checkout information with "John" "Doe" "12345"
    Then I will continue checkout
    Then I will finish checkout
    Then I should see the successful purchase text "Thank you for your order!"
