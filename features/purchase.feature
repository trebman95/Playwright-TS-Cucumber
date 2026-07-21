Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will click the cart icon
  Then I will click Checkout
  Then I will fill in first name as 'Noble', last name as 'Obodum', and zip code as '28206'
  Then I will click Continue
  Then I will click Finish
  Then I should see the confirmation message 'Thank you for your order!'