Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    When I select the sort option "<sort>"
    Then the products should be sorted by price "<direction>"

  Examples:
    | sort               | direction |
    | Price (low to high)| ascending |
    | Price (high to low)| descending|