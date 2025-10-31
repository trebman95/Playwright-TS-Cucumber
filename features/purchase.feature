Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    Then I will open the cart

    # TODO: Select Checkout
    Then I will select Checkout

    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I will fill checkout form with "<firstName>" "<lastName>" "<postalCode>"

    # TODO: Select Continue
    Then I will select Continue

    # TODO: Select Finish
    Then I will select Finish

    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the text "<confirmationText>"


  Examples:
    | username       | firstName | lastName | postalCode | confirmationText             |
    | standard_user  | John      | Doe      | 12345      | Thank you for your order!    |
    | problem_user   | Jane      | Smith    | 54321      | Thank you for your order!    |

    Examples:
  | product                    |
  | backpack                   |
  | bike light                 |
  | fleece jacket              |

