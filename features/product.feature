Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
    # TODO: Sort the items by <sort>
    Then I will sort items by "<sort>"  
    # TODO: Validate all 6 items are sorted correctly by price
    Then I should see items sorted as selected by price "<sort>"
  Examples:
    # TODO: extend the datatable to paramterize this test
    | sort |
    | Price (low to high) |
    | Price (high to low) |
    | Name (A to Z) |
    | Name (Z to A) |

