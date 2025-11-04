Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario: Validate product sort by price <sort>
  Then I will login as 'standard_user'
  Then I sort the items by '<sort>'
  Then I verify that all products are sorted by '<sort>'
  Examples:
    # TODO: extend the datatable to paramterize this test
  | sort              |
  | name (a to z)     |
  | name (z to a)     |
  | price (low to high) |
  | price (high to low) |