Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I click on the cart
  Then I Select Checkout
  Then I Fill in the "Jon", "Doe", and "53356"
  Then I Select Continue
  Then I Select Finish
  Then I Validate the text 'Thank you for your order!'