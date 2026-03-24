Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
 When I login with username "standard_user"
  Then I will add the backpack to the cart
  Then I proceed to checkout
  Then I fill in checkout info with "supriya" "keerthipati" "28277"
  Then I complete the purchase
  Then I should see the success message "Thank you for your order!"