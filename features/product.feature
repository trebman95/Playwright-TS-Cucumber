Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    When [Login page] I will login as 'standard_user'
    Then [Products page] Page should be opened
    And  [Products page] '6' Products should be present on the page
    When [Products page] I click on 'Sort' dropdown button
    Then [Products page] 'Sort' dropdown menu should be present with next options:
      | Options             |
      | Name (A to Z)       |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |
    When [Products page] I click on '<sort>' option
    Then [Products page] 'Sort' dropdown menu should be closed
    And  [Products page] '<sort>' value should be present in the 'Sort' dropdown field
    And  [Products page] Products should be sorted with the next values:
      | Name           | Price           |
      | <productName1> | <productPrice1> |
      | <productName2> | <productPrice2> |
      | <productName3> | <productPrice3> |
      | <productName4> | <productPrice4> |
      | <productName5> | <productPrice5> |
      | <productName6> | <productPrice6> |

    Examples:
      | sort                | productName1             | productPrice1 | productName2          | productPrice2 | productName3            | productPrice3 | productName4                      | productPrice4 | productName5          | productPrice5 | productName6             | productPrice6 |
      | Price (low to high) | Sauce Labs Onesie        | $7.99         | Sauce Labs Bike Light | $9.99         | Sauce Labs Bolt T-Shirt | $15.99        | Test.allTheThings() T-Shirt (Red) | $15.99        | Sauce Labs Backpack   | $29.99        | Sauce Labs Fleece Jacket | $49.99        |
      | Price (high to low) | Sauce Labs Fleece Jacket | $49.99        | Sauce Labs Backpack   | $29.99        | Sauce Labs Bolt T-Shirt | $15.99        | Test.allTheThings() T-Shirt (Red) | $15.99        | Sauce Labs Bike Light | $9.99         | Sauce Labs Onesie        | $7.99         |

  Scenario: Add item then remove it from products page
    When [Login page] I will login as 'standard_user'
    Then [Products page] Page should be opened
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Backpack' item
    Then [Products page] I should see '1' in the cart badge
    When [Products page] I click 'Remove' for 'Sauce Labs Backpack' item
    When [Products page] I click the cart icon
    Then [Cart] 'Sauce Labs Backpack' should not be present

  Scenario: Open product details page and add/remove item
    When [Login page] I will login as 'standard_user'
    Then [Products page] Page should be opened
    When [Products page] I click image for 'Sauce Labs Bike Light' item
    Then [Product details page] should be open
    And  [Product details page] should show expected content:
      | Name                  | Description                                                                                                                                                     | Price |
      | Sauce Labs Bike Light | A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. | $9.99 |
    When [Product details page] I click 'Add to Cart' button
    Then [Products page] I should see '1' in the cart badge
    When [Product details page] I click 'Remove' button
    Then [Products page] cart badge should be removed
    When [Product details page] I click 'Back to products' button
    Then [Products page] page should be open

  Scenario: Verify navigation menu open and close
    When [Login page] I will login as 'standard_user'
    Then [Products page] Page should be opened
    When [Products page] I click navigation bar button
    Then [Navigation] should be open
    And  [Navigation] options should be present with next options:
      | Options         |
      | All Items       |
      | About           |
      | Logout          |
      | Reset App State |
    When [Navigation] I click close
    Then [Navigation] should be closed

  Scenario: Logout from navigation
    When [Login page] I will login as 'standard_user'
    Then [Products page] Page should be opened
    When [Products page] I click navigation bar button
    When [Navigation] I click logout
    Then [Login page] "Swag Labs" title should be present

