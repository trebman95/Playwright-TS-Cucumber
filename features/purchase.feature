Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I open the cart
    Then I checkout the product
    Then I enter checkout details "John" "Doe" "560001"
    Then I finish the purchase
    Then I should see confirmation message "Thank you for your order!"