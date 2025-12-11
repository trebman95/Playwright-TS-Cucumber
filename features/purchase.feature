Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will select the cart
  Then I will select checkout
  Then I will fill in first name 'test' and last name 'user'
  Then I will fill in zip code '12345'
  Then I will select continue
  Then I will select finish
  Then I should see 'Thank you for your order!'

    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'