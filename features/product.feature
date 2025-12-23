Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
    Then I will login as 'standard_user'
    Then I sort the products by price "<sort>"
    Then the products should be sorted by price "<sort>"
  Examples:
    | sort        |
    | low to high |
    | high to low |

  @regression
  Scenario: Validate total number of products displayed
    Then I will login as 'standard_user'
    Then I should see 6 products on the page
