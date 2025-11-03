Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    When I login as "standard_user"
    And I add the "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout
    And I fill in checkout details:
      | firstName | lastName | postalCode |
      | John       | Doe      | 12345      |
    And I continue checkout
    And I finish the purchase
    Then I should see the message "Thank you for your order!"
