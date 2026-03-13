Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    And I will login as 'standard_user'

  Scenario Outline: Validate product sort by price <sortOption>
    When I select sort option "<sortOption>"
    Then I should see products sorted by "<sortOption>"

    Examples:
      | sortOption          |
      | Price (low to high) |
      | Price (high to low) |


