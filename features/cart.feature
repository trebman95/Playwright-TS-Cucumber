Feature: Cart behavior

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Add and remove item updates cart badge
    Then I will login as 'standard_user'
    When I add the backpack to the cart
    Then the cart badge should show "1"
    When I open the cart
    And I remove the 'Sauce Labs Backpack' from the cart
    Then the cart badge should not be visible
