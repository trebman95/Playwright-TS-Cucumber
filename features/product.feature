Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Runs the same sorting validation for both supported price directions.
  Scenario Outline: Validate product sort by price <sort>
    Then I will login as "standard_user"
    Then I sort the products by "<sort>"
    Then the products should be sorted in "<direction>" price order

    Examples:
      | sort                | direction  |
      | Price (low to high) | ascending  |
      | Price (high to low) | descending |

  # Additional coverage: confirms that adding a product updates the cart state.
  Scenario: Validate the cart badge after adding a product
    Then I will login as "standard_user"
    Then I will add the backpack to the cart
    Then the cart badge should display "1"
