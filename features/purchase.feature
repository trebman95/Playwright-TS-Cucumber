Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I select the cart
  Then I select Checkout
  Then I fill in the First Name "test_FirstName", Last Name "test_LastName", and Zip/Postal Code "28262"
  Then I select Continue
  Then I select Finish
  Then I should see the text "Thank you for your order!"