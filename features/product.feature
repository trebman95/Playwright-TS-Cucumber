Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
  Then I will sort products by "<sort>"
  Then I should see all products sorted by "<sort>"
  Examples:
    | sort                  |
    | Price (low to high)   |
    | Price (high to low)   |

  Scenario: Validate multiple items can be added to cart
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will add product "Sauce Labs Bike Light" to the cart
  Then I will add product "Sauce Labs Bolt T-Shirt" to the cart
  Then the cart badge should show "3"

  Scenario: Validate item can be removed from cart
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  Then I will add product "Sauce Labs Bike Light" to the cart
  Then the cart badge should show "2"
  Then I will remove product "Sauce Labs Backpack" from the cart
  Then the cart badge should show "1"

  Scenario Outline: Validate product sort by name <sort>
  Then I will login as 'standard_user'
  Then I will sort products by "<sort>"
  Then I should see all products sorted by "<sort>"
  Examples:
    | sort                  |
    | Name (A to Z)         |
    | Name (Z to A)         |
