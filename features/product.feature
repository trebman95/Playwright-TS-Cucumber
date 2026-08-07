Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as 'standard_user'
    # TODO: Add a step to login as 'standard_user'
    Then I sort items by "<sort>"
    # TODO: Add a step to sort items by "<sort>"
    Then I validate items are sorted by price "<sort>"
    # TODO: Add a step to validate sorted items by price "<sort>"

  Examples:
    | sort |
    | Price (low to high) |
    | Price (high to low) |
