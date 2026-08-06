Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I will sort the products by "<sort>"
    Then all 6 product prices should be sorted "<direction>"

  Examples:
    | sort                | direction  |
    | Price (low to high) | ascending  |
    | Price (high to low) | descending |

  Scenario: Validate cart reflects the selected item
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then the cart item count should be 1
