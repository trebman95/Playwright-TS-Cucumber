Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
  Then I go to the cart
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
  Then I proceed to checkout with details:
    | FirstName | LastName | PostalCode |
    | John      | Doe      | 12345      |

    # TODO: Select Continue
    # TODO: Select Finish
  Then I complete the purchase

    # TODO: Validate the text 'Thank you for your order!'
  Then I should see the success message "Thank you for your order!"

