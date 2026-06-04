Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    Then I will click the cart button
    # TODO: Select Checkout
    Then I will click the checkout button
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I will fill the checkout form as "Test" "User", "12345"
    # TODO: Select Continue
    Then I will click the continue button
    # TODO: Select Finish
    Then I will click the finish button
    # TODO: Validate the text 'Thank you for your order!'
    Then The checkout success container should be visible
    And The checkout success header should read 'Thank you for your order!'
    And The checkout success text should read 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'

  Scenario: Add item to cart
    Then I will login as 'standard_user'
    Then I will add "Sauce Labs Backpack" to the cart
    Then The shopping cart badge count should be 1
    And I will add "Sauce Labs Fleece Jacket" to the cart
    Then The shopping cart badge count should be 2
    Then I will click the cart button
    Then The cart should contain "Sauce Labs Backpack"
    And The cart should contain "Sauce Labs Fleece Jacket"

  Scenario: Remove item from cart
    Then I will login as 'standard_user'
    Then I will add "Sauce Labs Backpack" to the cart
    And I will add "Sauce Labs Fleece Jacket" to the cart
    Then The shopping cart badge count should be 2
    Then I will remove "Sauce Labs Backpack" from the cart
    Then The shopping cart badge count should be 1
    Then I will click the cart button
    Then The cart should contain "Sauce Labs Fleece Jacket"
    And The cart should not contain "Sauce Labs Backpack"
