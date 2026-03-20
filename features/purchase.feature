Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then select the cart
    Then select Checkout
    Then fill in "John" "Doe" and "12345"
    Then select Continue
    Then select Finish
    Then should see the confirmation text "Thank you for your order!"