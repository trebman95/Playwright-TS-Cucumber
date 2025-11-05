Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
    And sort the items by <sort>
  Then the items onscreen are sorted correctly according to <sort>
  Examples:
    | sort |
    | "Price (low to high)" |
    | "Price (high to low)" |