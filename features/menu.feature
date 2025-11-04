Feature: Menu Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Validate that Reset App State clears the cart items
  Scenario: Validate Reset App State clears cart
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I open the menu
    Then I click on "Reset App State"
    Then I verify that the cart is empty
