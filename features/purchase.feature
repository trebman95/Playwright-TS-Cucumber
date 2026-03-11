Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login
  Then I will add the backpack to the cart
  Then I will go to my shopping cart
  Then I will start to checkout
  Then I will fill in my information
  Then I will checkout