Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  When I will login as 'standard_user'
  When I sort products by "<sort>"
  Then all product prices should be sorted "<sort>"

  Examples:
    | sort |
    | Price (low to high) |
    | Price (high to low) |