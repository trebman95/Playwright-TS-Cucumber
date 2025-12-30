Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    When I will select the cart
    And I will select Checkout
    And I will fill in the checkout information
    And I will select Continue
    And I will select Finish