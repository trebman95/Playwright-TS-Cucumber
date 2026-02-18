Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I select the cart from top right
  Then I select Checkout
  Then I fill in First Name "Vibin", Last Name "Thomas", and ZipCode "99470"
  Then I select Continue
  Then I select Finish
  Then I should see the purchase confirmation "Thank you for your order!"

  
    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'