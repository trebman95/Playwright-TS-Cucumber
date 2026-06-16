Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I click on the cart icon
    Then I click on Checkout
    Then I enter first name "John"
    Then I enter last name "Doe"
    Then I enter zip code "12345"
    Then I click on Continue
    Then I click on Finish
    Then I should see the message "Thank you for your order!"
