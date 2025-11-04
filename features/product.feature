Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
  #Then I will add the backpack to the cart
  #Then I will add the Tshirt to cart
  #Then Select the cart (top-right)
  When I Sort the items by <sort>
  Then I Validate all 6 items are sorted correctly by price
  Examples:
    # TODO: extend the datatable to paramterize this test
    | sort                |
    | Price (high to low) |
