Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
  Scenario Outline: Validate product sort by price
    Then I will login as 'standard_user'
    And I will sort items by '<price sort>'
    Then The items should be sorted by price '<price sort>'

    Examples:
      | price sort          |
      | Price (low to high) |
      | Price (high to low) |

  Scenario Outline: Validate product sort by name
    Then I will login as 'standard_user'
    And I will sort items by '<name sort>'
    Then The items should be sorted by name '<name sort>'

    Examples:
      | name sort     |
      | Name (A to Z) |
      | Name (Z to A) |
