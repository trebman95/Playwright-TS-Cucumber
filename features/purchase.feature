Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    Then I will open the cart
    Then I will select Checkout
    Then I will fill in the First Name "John", Last Name "Doe" and Zip/Postal Code "12345"
    Then I will select Continue
    Then I will select Finish
    Then I will validate the purchase success text