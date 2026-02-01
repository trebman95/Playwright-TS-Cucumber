Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline: Validate product sort by price <sortLabel>
    Then I will login as 'standard_user'
    Then I sort products by "<sortValue>"
    Then products should be sorted in "<sortLabel>" price order

    Examples:
      | sortLabel    | sortValue |
      | low to high  | lohi      |
      | high to low  | hilo      |
