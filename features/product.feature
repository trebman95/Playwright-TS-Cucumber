Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    And I will login as "standard_user"

  # Validate both price sort options using one outline
  Scenario Outline: Validate product sort by price <uiOption>
    When I sort products by "<uiOption>"
    Then I should see 6 products displayed
    And the product prices should be sorted "<direction>"

    Examples:
      | uiOption             | direction |
      | Price (low to high)  | asc       |
      | Price (high to low)  | desc      |