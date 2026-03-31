Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    # TODO: Select the cart (top-right) - DONE
    Then I Select the cart top-right
    # TODO: Select Checkout- DONE
    Then I select checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code - DONE
    Then I Fill in the First Name 'First', Last Name 'Last', and ZipPostal Code '12345'
    # TODO: Select Continue - DONE
    Then I select Continue
    # TODO: Select Finish - DONE
    Then I select Finish
    # TODO: Validate the text 'Thank you for your order!' - DONE
    Then I Validate the text 'Thank you for your order!'