Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I sort products by "<sort>"
    Then I validate products are sorted "<direction>"

  Examples:
    | sort               | direction  |
    | Price (low to high) | ascending |
    | Price (high to low) | descending |
