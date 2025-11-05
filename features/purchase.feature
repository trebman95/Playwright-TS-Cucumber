Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will view the cart
    # Select the cart (top-right)
    Then I will proceed to checkout
    # Select Checkout
    Then I will fill in purchase information: 'Regular', 'Buyer', '12345'
      # Fill in the First Name, Last Name, and Zip/Postal Code
    #Then I will continue to the overview page
    # Select Continue
    Then I will finish the purchase
    # Select Finish
    Then I should see the order confirmation text 'Thank you for your order!'
    # Validate the text 'Thank you for your order!'