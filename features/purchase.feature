Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    And I will add the backpack to the cart
    When I click on the cart
    Then I should see the backpack in the cart
    When I click on checkout button
    Then I should see the title of the page as 'Checkout: Your Information'
    And I fill in the firstName as 'firstName', lastName as 'LastName', and postalCode as '12345'
    When I click on the continue button
    And I click on the finish button
    Then I should see the text 'Thank you for your order!'
    
    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'