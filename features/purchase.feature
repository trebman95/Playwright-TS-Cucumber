Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  When I select the cart and then click checkout
  And I fill in the First Name, Last Name, and Zip Code and click Continue
  And Then click Finish
  Then I validate the text 'Thank you for your order!'

Scenario:  Validate product price is same till finish the order
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  When Get the price and click checkout
  When I fill in the First Name, Last Name, and Zip Code and click Continue
  Then Validate the price is same in checkout page