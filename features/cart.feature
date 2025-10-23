Feature: Cart Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate cart displays correct items
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will add product "Sauce Labs Bike Light" to the cart
  Then I will select the cart
  Then I should see "2" items in the cart

  Scenario: Validate removing all items from cart
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will add product "Sauce Labs Bike Light" to the cart
  Then I will select the cart
  Then I will remove all items from cart
  Then the cart should be empty

  Scenario: Validate continue shopping from cart
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will select the cart
  Then I will select continue shopping
  Then I should see the products page
