Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
    # TODO: Sort the items by <sort>
    When I sort the products by "<SortType>"
    # TODO: Validate all 6 items are sorted correctly by price
    Then the product prices should be displayed in "<ExpectedOrder>" order
  Examples:
    # TODO: extend the datatable to paramterize this test
    |        SortType         |   ExpectedOrder   |
    | Price (Low to High)     |    ascending      |
    | Price (High to Low)     |    descending     |