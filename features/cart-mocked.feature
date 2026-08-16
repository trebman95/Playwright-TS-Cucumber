@loggedIn @mocked
Feature: Cart Feature (Mocked Cart)

  # The @loggedIn tag logs in for real through the UI (see
  # hooks/loginFixture.ts). These scenarios then seed "cart-contents" in
  # localStorage directly instead of clicking "Add to Cart", and verify
  # the result on the real, unmocked cart and inventory pages. Only real,
  # existing catalog items are seeded - the app resolves cart entries by
  # product id against its own built-in catalog, so an id that doesn't
  # exist there renders nothing.

  Scenario Outline: Cart page renders a single seeded item correctly
    Given I seed the cart with the "<item>" item
    When I go directly to the cart page
    Then I should see 1 item in the cart
    And I should see the item "<item>" in the cart

  Examples:
    | item                              |
    | Sauce Labs Bike Light             |
    | Sauce Labs Bolt T-Shirt           |
    | Sauce Labs Onesie                 |
    | Test.allTheThings() T-Shirt (Red) |

  Scenario: Cart page renders multiple seeded items correctly
    Given I seed the cart with the following items:
      | Sauce Labs Bike Light    |
      | Sauce Labs Onesie        |
      | Sauce Labs Fleece Jacket |
    When I go directly to the cart page
    Then I should see 3 items in the cart
    And I should see the item "Sauce Labs Bike Light" in the cart
    And I should see the item "Sauce Labs Onesie" in the cart
    And I should see the item "Sauce Labs Fleece Jacket" in the cart

  Scenario: Cart icon badge reflects a seeded cart without clicking Add to Cart
    Given I seed the cart with the following items:
      | Sauce Labs Bike Light    |
      | Sauce Labs Onesie        |
      | Sauce Labs Fleece Jacket |
    When I go directly to the inventory page
    Then the cart icon should show 3 items

  Scenario: An empty seeded cart shows no items
    Given I seed an empty cart
    When I go directly to the cart page
    Then I should see 0 items in the cart
