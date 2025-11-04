@checkout
Feature: Purchase flow

  Background:
    Given I open the "https://www.saucedemo.com/" page
    And I login with username "standard_user" and password "secret_sauce"

  Scenario: Validate successful purchase text
    When I add the product "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | Kishore   | QA       | 500001     |
    And I finish checkout
    Then I should see the order complete header "Thank you for your order!"
    And the order complete text should contain "Your order has been dispatched"
