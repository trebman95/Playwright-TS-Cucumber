Feature: Product Feature

Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
    When I login as 'standard_user'
    Then I sort products by "<sort>"
    Then I validate if the prices of items are sorted low to high
    Then I validate if the prices of items are sorted high to low

    Examples:
    | sort |
    | Price (low to high) |
    | Price (high to low) |
