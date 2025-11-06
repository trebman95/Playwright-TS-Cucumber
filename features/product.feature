Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Validate product price sort options using a parameterized Scenario Outline
  Scenario Outline: Validate product sort by price "<sort>"
    Then I will login as 'standard_user'
    Then I will sort the products by "<sort>"
    Then I will validate all products are sorted correctly by price for "<sort>"

  Examples:
    | sort                  |
    | Price (low to high)   |
    | Price (high to low)   |