Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Validate sorting using Scenario Outline
  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    And I sort the products by "<sort>"
    Then I validate products are sorted by price "<sort>"

  Examples:
    | sort               |
    | Price (low to high) |
    | Price (high to low) |