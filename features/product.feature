Feature: Product

  # All product tests require a logged-in user.
  Background:
    Given I open the "https://www.saucedemo.com/" page
    When I login as 'standard_user'

  # Makes sure all products loaded on the page.
  Scenario: Inventory page displays all products
    Then the inventory should show 6 products

  # Tests both sort options since either one can break on its own.
  Scenario Outline: Products can be sorted by price
    When I sort products by price "<sort>"
    Then all products should be sorted by price "<sort>"

    Examples:
      | sort        |
      | low to high |
      | high to low |

  # Checks the cart icon updates when an item is added.
  Scenario: Adding a product updates the cart badge count
    When I add the backpack to the cart
    Then the cart badge should show "1"
