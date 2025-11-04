Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    Then I will login as 'standard_user'
  Then I will add the backpack to the cart 

  Scenario:  Validate successful purchase text
  
  Then Select the cart (top-right)
  Then Select Checkout
  Then Fill in the First Name, Last Name, and Zip/Postal Code
  Then Select Continue
  Then Select Finish
  Then Validate the text 'Thank you for your order!'