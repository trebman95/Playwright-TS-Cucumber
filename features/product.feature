@loggedIn
Feature: Product Feature

  # Validate Price sorting using Scenario Outline with a datatable
  Scenario Outline: Validate product sort by price <sort>
    When I sort products by "<sort>"
    Then all product prices should be sorted "<sort>"

  Examples:
    | sort                |
    | Price (low to high) |
    | Price (high to low) |
