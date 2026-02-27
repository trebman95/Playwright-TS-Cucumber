Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I will sort the items by <sort>
    Then I should see all items sorted correctly by <sort>

  Examples:
    | sort                   |
    | Price (Low to High)    |
    | Price (High to Low)    |