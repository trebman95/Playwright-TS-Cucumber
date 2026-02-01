Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'
     Then I open the cart
     Then I checkout
     Then I enter checkout information first name "Navdeep" last name "Singh" zip "48001"
     Then I continue to overview
     Then I finish the purchase
     Then I should see purchase confirmation text "Thank you for your order!"