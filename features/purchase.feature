Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    When I click the shopping cart
    And I click checkout
    And I fill in the shipping information
      | firstName | lastName | zipCode |
      | Pabitra      | Samal      | 12345   |
    And I click continue
    And I click finish
    Then I should see the confirmation message 'Thank you for your order!'