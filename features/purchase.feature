Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
  Then I will click on shopping cart
    # TODO: Select Checkout
  Then I will click checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
  Then I will fill out and submit checkout form with 'Jackson' and 'Lei' and '1234'
    # TODO: Validate the text 'Thank you for your order!'
  Then I will see the message 'Thank you for your order!'