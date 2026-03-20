Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  ll add the backpack to the cart
   Then Select the cart (top-right)
    Then Select CheScenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I wickout
    Then Fill in the First Name, Last Name, and Zip/Postal Code
    Then Select Continue
    Then Select Finish
    Then Validate the text 'Thank you for your order!'