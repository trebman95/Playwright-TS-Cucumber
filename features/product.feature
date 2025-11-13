Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
  When I sort the items by "<sortValue>"
    Then the items should be sorted by price "<direction>"

  Examples:
    | sort                | sortValue | direction |
    | Price (low to high) | lohi      | asc       |
    | Price (high to low) | hilo      | desc      |
