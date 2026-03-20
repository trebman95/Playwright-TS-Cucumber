Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    # this step log in with user for me is more list when Step due to it just user action and not validation
    When [Login page] I will login as 'standard_user'
    # this step log in with user for me is more list when Step due to it just user action and not validation
    # When [Products page] I will add the backpack to the cart
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Backpack' item
    Then [Products page] I should see '1' in the cart badge
    When [Products page] I click the cart icon
    Then [Cart] page should be open
    And  [Cart] 'Sauce Labs Backpack' should be present
    When [Cart] I click 'Checkout'
    Then [Checkout] page should be open
    When [Checkout] I fill the checkout page with next value:
      | First Name | Last Name     | Zip code |
      | Standard   | Standrad Last | 000000   |
    Then [Checkout] I click on 'Continue' button
    And  [Checkout] 'Payment Information' section should be present
    And  [Checkout] 'Shipping Information:' section should be present
    And  [Checkout] 'Price Total' should be present with next values:
      | Item total | Tax   | Total  |
      | $29.99     | $2.40 | $32.39 |
    When [Checkout] I click on 'Finish' button
    Then [Checkout] I should see 'Thank you for your order!' text
    # add Back home page step to make sure that the user can navigate back to home page after purchase
    When [Checkout] I click on 'Back Home' button
    Then [Products page] page should be open

  Scenario: Multi-item cart, continue shopping, and checkout totals
    When [Login page] I will login as 'standard_user'
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Backpack' item
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Bike Light' item
    Then [Products page] I should see '2' in the cart badge
    When [Products page] I click the cart icon
    Then [Cart] page should be open
    And  [Cart] the following items should be in the cart:
      | Item                  |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    When [Cart] I click 'Continue shopping'
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Bolt T-Shirt' item
    Then [Products page] I should see '3' in the cart badge
    When [Products page] I click the cart icon
    Then [Cart] the following items should be in the cart:
      | Item                    |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    When [Cart] I click 'Checkout'
    Then [Checkout] page should be open
    When [Checkout] I fill the checkout page with next value:
      | First Name | Last Name | Zip code |
      | Multi      | Buyer     | 90210    |
    When [Checkout] I click on 'Continue' button
    Then [Checkout] 'Payment Information' section should be present
    And  [Checkout] 'Shipping Information:' section should be present
    And  [Checkout] order summary should list products:
      | Product                 |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    And  [Checkout] 'Price Total' should be present with next values:
      | Item total | Tax   | Total  |
      | $55.97     | $4.48 | $60.45 |

  Scenario: Checkout overview then cancel returns to products
    When [Login page] I will login as 'standard_user'
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Backpack' item
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Bike Light' item
    Then [Products page] I should see '2' in the cart badge
    When [Products page] I click the cart icon
    Then [Cart] page should be open
    And  [Cart] the following items should be in the cart:
      | Item                  |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    When [Cart] I click 'Checkout'
    Then [Checkout] page should be open
    When [Checkout] I fill the checkout page with next value:
      | First Name | Last Name | Zip code |
      | Cancel     | Flow      | 10001    |
    When [Checkout] I click on 'Continue' button
    Then [Checkout] 'Payment Information' section should be present
    And  [Checkout] 'Shipping Information:' section should be present
    And  [Checkout] order summary should list products:
      | Product               |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    And  [Checkout] 'Price Total' should be present with next values:
      | Item total | Tax   | Total  |
      | $39.98     | $3.20 | $43.18 |
    When [Checkout] I click on 'Cancel' button
    Then [Products page] page should be open

  Scenario Outline: Verify checkout page errors
    When [Login page] I will login as 'standard_user'
    When [Products page] I click 'Add to Cart' for 'Sauce Labs Backpack' item
    When [Products page] I click the cart icon
    Then [Cart] page should be open
    When [Cart] I click 'Checkout'
    Then [Checkout] page should be open
    When [Checkout] I fill the checkout page with next value:
      | First Name | Last Name | Zip code |
      | <firstName> | <lastName> | <zipCode> |
    When [Checkout] I click on 'Continue' button
    Then [Checkout] I should see error message "<errorMessage>"

    Examples:
      | firstName | lastName | zipCode | errorMessage                      |
      |           |          |         | Error: First Name is required     |
      | John      |          |         | Error: Last Name is required      |
      | John      | Doe      |         | Error: Postal Code is required    |

