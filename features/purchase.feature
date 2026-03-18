Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    When I will navigate to the cart
    # TODO: Select Checkout
    And I will select checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I will fill First Name "Jerome", Last Name "Nithish", and Postal code "600091"
    # TODO: Select Continue
    When I will select continue
    # TODO: Select Finish
    And I will select finish
    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the success message "Thank you for your order!"