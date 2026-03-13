Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  When  Select the cart 
  And Select Checkout
  And Fill in the 'test1', 'test2', and '1234'
  And   Select Continue
  And Select Finish
  Then Validate the text 'Thank you for your order!'