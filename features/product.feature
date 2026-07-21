Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  
  Scenario Outline: Validate product sort by price <sort>
    Then I will login as "standard_user"
    # TODO: Sort the items by <sort>- done below
    Then I will sort products by "<sort>"
    # TODO: Validate all 6 items are sorted correctly by price- done below
    Then I should see all items sorted by "<order>"
    # TODO: extend the datatable to paramterize this test- done below
    Examples:
    | sort                | order |
    | Price (low to high) | asc   |
    | Price (high to low) | desc  |