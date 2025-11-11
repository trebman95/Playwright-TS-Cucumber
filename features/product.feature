Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    Then I will login as 'standard_user'

  Scenario Outline: Validate product sort by price <sort>
    When I sort products by "<sort>"
    Then the products should be sorted "<order>"

  Examples:
    | sort                  | order       |
    | Price (low to high)   | ascending   |
    | Price (high to low)   | descending  |