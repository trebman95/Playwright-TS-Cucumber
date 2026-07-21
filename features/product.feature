Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I will sort the products by '<sort>'
    Then I should see the products sorted by '<sort>'

  Examples:
    | sort |
    | Price (high to low) |
    | Price (low to high) |

  Scenario Outline: Validate product sort by name <sort>
    Then I will login as 'standard_user'
    Then I will sort the products by '<sort>'
    Then I should see the products sorted by '<sort>'

  Examples:
    | sort |
    | Name (A to Z) |
    | Name (Z to A) |