Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  When I will login as 'standard_user'
  Then I will add the backpack to the cart

  Then I click the shopping cart icon
  Then I click on the Checkout button
  Then I enter checkout information with First name "Jane" last name "Doe" postal code "20170"
  Then I click on Continue
  Then I click on Finish
  Then I should see the confirmation message "Thank you for your order!"
  
