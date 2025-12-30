Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    And I checkout the cart
    And I complete the checkout information
    And I finish the purchase
    Then I should see the purchase confirmation message "Thank you for your order!"