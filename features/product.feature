Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then sort the items by "<sort>"
    Then all items are sorted correctly by "<sort>"
  Examples:
    | sort                  |
    | Price (low to high)   |
    | Price (high to low)   |