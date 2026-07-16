Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    And I will add the backpack to the cart
    And I go to the cart
    And I click checkout
    And I fill in my details with first name "John" last name "Doe" and zip "12345"
    And I click continue
    And I click finish
    Then I should see the confirmation message "Thank you for your order!"