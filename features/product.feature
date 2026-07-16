Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    And I will sort products by "<sort>"
    Then all products should be sorted by price "<order>"

  Examples:
    | sort                 | order |
    | Price (low to high)  | asc   |
    | Price (high to low)  | desc  |