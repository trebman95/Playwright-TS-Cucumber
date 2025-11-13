Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  # Done using Examples table below
  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I will sort the items by '<sort>'
    Then I should see all 6 items sorted correctly by price '<sort>'

  Examples:
    | sort |
    | lohi |
    | hilo |


  # Added a datatable to validate the Name (A to Z) and Name (Z to A) sort options (top-right) using a Scenario Outline
  Scenario Outline: Validate product sort by Name <sort>
    Then I will login as 'standard_user'
    Then I will sort the items by '<sort>'
    Then I should see all 6 items sorted correctly by Name '<sort>'

  Examples:
    | sort |
    | az |
    | za |