Feature: Product Feature

 
Background:
    Given I open the "https://www.saucedemo.com/" page

  # Validate sort using Scenario Outline
  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I sort the items by "<sort>"
    Then I validate all products are sorted correctly by price "<sort>"

  Examples:
    | sort                |
    | Price (low to high) |
    | Price (high to low) |
