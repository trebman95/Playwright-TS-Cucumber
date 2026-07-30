Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I select the cart
    Then I select checkout
    Then I enter first name "Victor", last name "Cardauc", and postal code "32541"
    Then I select continue
    Then I select finish
    Then I should see the purchase confirmation "Thank you for your order!"
