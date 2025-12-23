Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I select the cart icon
    Then I proceed to checkout
    Then I fill in the checkout information:
      | firstName  | Harish |
      | lastName   | Kumar  |
      | postalCode | 48009  |
    Then I continue to the overview page
    Then I finish the purchase
    Then I should see the successful purchase message "Thank you for your order!"
