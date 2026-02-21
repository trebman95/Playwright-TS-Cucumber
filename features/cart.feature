Feature: Cart Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate cart item count after adding product
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I should see "1" item in the cart badge

  Scenario: Validate cart is empty after removing product
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I will remove the backpack from the cart
    Then the cart badge should not be visible
