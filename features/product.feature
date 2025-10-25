Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    Then I will login as 'standard_user'

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
    When I sort products by "<sortOption>"
    Then the products should be sorted in "<order>"

    # TODO: Sort the items by <sort>
    # TODO: Validate all 6 items are sorted correctly by price
  Examples:
    # TODO: extend the datatable to paramterize this test
    | sortOption           | order       |
    | Price (low to high)  | ascending   |
    | Price (high to low)  | descending  |