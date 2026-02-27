Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    Then I will login as 'standard_user'

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
    Then I sort the items by <sort>
    Then I should see all items sorted correctly by price in <sort> order

    Examples:
      | sort                |
      | Name (A to Z)       |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |