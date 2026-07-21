Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    Then I will login as "standard_user"
    Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)- done below
    Then I will open the cart
    # TODO: Extending the testing coverage- done below
    Then I should see the product "Sauce Labs Backpack" in the cart
    # TODO: Select Checkout- done below
    Then I will proceed to checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code- done below
    Then I will fill in checkout information "Nishi" "Mewada" "28262"
    # TODO: Select Continue- done below
    Then I will continue to overview
    # TODO: Select Finish- done below
    Then I will finish the purchase
    # TODO: Validate the text "Thank you for your order!"- done below
    Then I should see the purchase confirmation text "Thank you for your order!"
