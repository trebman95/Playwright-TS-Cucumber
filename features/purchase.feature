Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    When I login as 'standard_user'
    Then I add the backpack item to the cart
    Then I click on the cart
    Then I select checkout
    Then I fill in the First Name, Last Name, and Zip Postal Code
    Then I select continue
    Then I select finish
    Then I validate the text 'Thank you for your order!'
