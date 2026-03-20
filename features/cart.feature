Feature: Shopping cart

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Add item, open cart, remove item, and continue shopping
    When [Login page] I will login as 'standard_user'
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Backpack' item
    When [Products page] I click the cart icon
    Then [Cart] page should be open
    And  [Cart] 'Sauce Labs Backpack' should be present
    When [Cart] I click 'Remove' for 'Sauce Labs Backpack' item
    Then [Cart] 'Sauce Labs Backpack' should not be present
    When [Cart] I click 'Continue shopping'
    Then [Products page] page should be open

