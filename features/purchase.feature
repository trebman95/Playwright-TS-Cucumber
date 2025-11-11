Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    And I will login as "standard_user"

  # Validate that a user can successfully complete a purchase
  Scenario: Validate successful purchase text
    When I add the "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I fill in checkout information:
      | firstName | lastName | postalCode |
      | Test      |  User    | 12345      |
    And I continue to the overview page
    And I finish the purchase
    Then I should see the confirmation message "Thank you for your order!"