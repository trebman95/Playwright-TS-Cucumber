# features/purchase.feature
Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as "standard_user"
    Then I will add the backpack to the cart
    When I select the cart icon
    And I proceed to checkout
    And I fill in the checkout information:
      | firstName  | John  |
      | lastName   | Doe   |
      | postalCode | 12345 |
    And I continue to the overview page
    And I finish the purchase
    Then I should see the successful purchase message "Thank you for your order!"
