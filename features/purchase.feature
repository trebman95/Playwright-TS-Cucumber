Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
  Then I will select cart on the top-right 
    # TODO: Select Checkout
  Then I will select Checkout  
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
  Then I will Fill in the First Name, Last Name and Zip/Postal Code  
    # TODO: Select Continue
  Then select continue  
    # TODO: Select Finish
  Then select finish  
    # TODO: Validate the text 'Thank you for your order!'
  Then validate the text 'Thank you for your order'  

  #Extra coverage
  Scenario: Validate cart badge count after adding a product
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I should see the cart badge count as "1"