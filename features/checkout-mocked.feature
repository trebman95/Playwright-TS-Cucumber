@loggedIn @mocked
Feature: Checkout Feature (Mocked Cart)

  # saucedemo.com has no real backend to stub - cart contents live entirely
  # in a "cart-contents" localStorage key that the app reads to render the
  # checkout pages. The @loggedIn tag logs in for real through the UI
  # (see hooks/loginFixture.ts); these scenarios then seed the cart
  # directly and deep-link straight to the checkout page under test,
  # skipping only the "Add to Cart" clicks. purchase.feature remains the
  # full unmocked walkthrough - keep it as the canary that catches real
  # regressions these mocked tests can't see.

  Scenario: Reach the checkout overview page without clicking Add to Cart
    Given I seed the cart with the "Sauce Labs Backpack" item
    When I go directly to the checkout overview page
    Then I should see 1 item in the checkout overview
    And I should see the item "Sauce Labs Backpack" in the checkout overview

  Scenario: Reach the order confirmation page without completing checkout
    Given I seed the cart with the "Sauce Labs Backpack" item
    When I go directly to the checkout complete page
    Then I should see the confirmation message "Thank you for your order!"

  Scenario: Checkout overview totals are correct for a multi-item seeded cart
    Given I seed the cart with the following items:
      | Sauce Labs Bike Light    |
      | Sauce Labs Onesie        |
      | Sauce Labs Fleece Jacket |
    When I go directly to the checkout overview page
    Then the checkout overview subtotal should be "Item total: $67.97"
    And the checkout overview tax should be "Tax: $5.44"
    And the checkout overview total should be "Total: $73.41"
