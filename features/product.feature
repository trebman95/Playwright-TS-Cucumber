Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    Then I will login as "standard_user"
    When I sort the items by "<sortValue>"
    Then the items should be sorted by price "<direction>"

    Examples:
      | sort                | sortValue | direction |
      | Price (low to high) | lohi      | asc       |
      | Price (high to low) | hilo      | desc      |
