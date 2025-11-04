Feature: Product Feature

    Background:
        Given I open the "https://www.saucedemo.com/" page

            # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
    Scenario Outline:  Validate product sort by price <sort>
        Then I will login as 'standard_user'
        When I select the sort option as '<sort>'
        Then I should see all the items are sorted by price correctly
            | <priceOrder1> | <priceOrder2> | <priceOrder3> | <priceOrder4> | <priceOrder5> | <priceOrder6> |

    Examples:
        | sort                | priceOrder1 | priceOrder2 | priceOrder3 | priceOrder4 | priceOrder5 | priceOrder6 |
        | Price (low to high) | $7.99       | $9.99       | $15.99      | $15.99      | $29.99      | $49.99      |
        | Price (high to low) | $49.99      | $29.99      | $15.99      | $15.99      | $9.99       | $7.99       |


        # TODO: Sort the items by <sort>
        # TODO: Validate all 6 items are sorted correctly by price
        # TODO: extend the datatable to paramterize this test