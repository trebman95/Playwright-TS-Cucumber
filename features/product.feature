Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline: Validate product sort by price
    Then I will login as 'standard_user'
    Then I sort the products by "<sort>"
    Then the product prices should be sorted "<order>"

    Examples:
      | sort                | order |
      | Price (high to low) | desc  |
      | Price (low to high) | asc   |

  Scenario: Validate cart badge count after adding backpack
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then the cart badge count should be "1"
  
  Scenario: Validate removing backpack from cart
    Then I will login as 'standard_user'
    Then I will add the backpack to the cart
    Then I remove the backpack from the cart
    Then the cart badge should not be visible