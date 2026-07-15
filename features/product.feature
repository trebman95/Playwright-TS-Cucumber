Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I will sort products by <sort>
    Then I should validate all products are sorted by <sort>

  Examples:
    | sort |
    | Price (low to high) |
    | Price (high to low) |
    | Name (A to Z) |
    | Name (Z to A) |

  Scenario: Validate add backpack to cart
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart