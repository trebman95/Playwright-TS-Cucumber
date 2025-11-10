Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will select the cart
  Then I will select checkout
  Then I will fill in the first name "<firstName>","<lastName>", and postal code "<postalcode>"
  Then I will select continue
  Then I will select finish
  Then I should see the confirmation message "Thank you for your order!"

Examples:
  | firstName | lastName | postalcode |
  | sam       |  deo     | 27526      |