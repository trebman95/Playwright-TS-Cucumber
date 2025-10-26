Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    Then I will login as 'standard_user'

  Scenario: Validate successful purchase text
    Then I will add the backpack to the cart for purchase
    And I proceed to checkout
    And I enter checkout information "Sai" "Chaitanya" "28412"
    And I finish the purchase
    Then I should see the success message "Thank you for your order!"