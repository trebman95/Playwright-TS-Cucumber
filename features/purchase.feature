Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  When  I  login as "standard_user"
  And I add the "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I enter checkout information:
      | firstName | Abrahan  |
      | lastName  | Lincon   |
      | zipCode   | 56783    |
    And I continue checkout
    And I finish the purchase
    Then I should see the confirmation message "Thank you for your order!"
