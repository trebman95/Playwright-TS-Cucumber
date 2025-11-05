Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I will open the cart
    Then I will click on Checkout
    Then I will enter customer information "John" "Doe" "12345"
    Then I will click on Continue
    Then I will click on Finish
    Then I should see the confirmation message "Thank you for your order!"
