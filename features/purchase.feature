Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Covers the complete checkout journey from login to order confirmation.
  Scenario: Validate successful purchase text
    Then I will login as "standard_user"
    Then I will add the backpack to the cart
    Then I open the cart
    Then I proceed to checkout
    Then I enter checkout information with first name "Test", last name "User", and postal code "28202"
    Then I continue checkout
    Then I finish the purchase
    Then I should see the successful purchase message "Thank you for your order!"
