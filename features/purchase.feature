Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I select the cart (top-right)
    Then I select Checkout
    Then I fill checkout information First Name "Test" Last Name "User" Zip "12345"
    Then I select Continue
    Then I select Finish
    Then I validate the purchase complete text "Thank you for your order!"

  Scenario: Remove item from cart
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I select the cart (top-right)
    Then I remove the backpack from the cart
    Then the cart should be empty
  
