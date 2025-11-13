Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # DONE : Added a step to proceed to checkout
  Then I will proceed to checkout

    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # DONE: Added a step to fill in checkout information
  Then I will fill in the checkout information with 'Nikita' as First Name, 'Work' as Last Name, and '12345' as Zip/Postal Code and continue

    # TODO: Select Finish
    # DONE: Added a step to verify the backpack and finish purchase
  Then I will Verify the backpack in the checkout overview and select Finish

    # TODO: Validate the text 'Thank you for your order!'
    # DONE: Added a step to validate successful purchase text
  Then I should see the successful purchase text 'Thank you for your order!'