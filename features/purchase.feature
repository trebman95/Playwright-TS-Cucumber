Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I open the cart
    Then I start the checkout
    Then I fill the checkout form with first name "Greg", last name "Tester", and zip code "10001"
    Then I continue the checkout
    Then I finish the checkout
    Then I should see the purchase confirmation text "Thank you for your order!"

  Scenario: Validate cart badge after adding a product
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I should see the cart badge count "1"
