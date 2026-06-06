Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
    # TODO: Sort the items by <sort>
  Then I will sort the items from "<sort>"
    # TODO: Validate all 6 items are sorted correctly by price
  Then I should see the products listed by price from "<sort>"
  Examples:
    # TODO: extend the datatable to parameterize this test
    |        sort |
    | low to high |
    | high to low |