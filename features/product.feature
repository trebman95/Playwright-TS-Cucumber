Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  When I login with username "standard_user"
  When I sort products by "low to high"
  Then prices should be sorted correctly
 # Examples:
    # TODO: extend the datatable to paramterize this test
   # | sort |