Feature: Purchase

  # All purchase tests require a logged-in user.
  Background:
    Given I open the "https://www.saucedemo.com/" page
    When I login as 'standard_user'

  # Walks through the full purchase flow from cart to confirmation.
  Scenario: A user can complete a purchase successfully
    When I add the backpack to the cart
    And I go to the cart
    And I proceed to checkout
    And I enter checkout details "John" "Doe" "12345"
    And I continue to the order summary
    And I place the order
    Then I should see the order confirmation "Thank you for your order!"
