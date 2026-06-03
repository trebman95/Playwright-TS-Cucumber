Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I go to the cart
  Then I checkout
  Then I fill in the checkout information with first name "Brian", last name "Johnson", and postal code "12345"
  Then I continue to the overview
  Then I finish the checkout
  Then I should see the text "Thank you for your order!"

  Scenario: Validate checkout requires customer information
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I go to the cart
  Then I checkout
  Then I continue to the overview
  Then I should see the checkout error "Error: First Name is required"
