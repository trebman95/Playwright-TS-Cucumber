Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
    # Sort the items by <sort>
  Then I select sort order "<sort>"
  Then I capture all product prices
  Then I verify products are sorted by price "<sort>"
  #Validate all 6 items are sorted correctly by price
  Examples:
    # extend the datatable to paramterize this test
    | sort |
    | Price (low to high) |
    | Price (high to low) |
