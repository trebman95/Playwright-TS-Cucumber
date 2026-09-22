Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
  Then I will sort the items by "<sort>"
  Then I should see all products sorted by "<sort>"
  Examples:
    # TODO: extend the datatable to paramterize this test
    | sort |
    | Price (low to high) |
    | Price (high to low) |
  
  Scenario: Validate cart item count
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I should see "1" item in the cart