@catalog
Feature: Product sorting

  Background:
    Given I open the "https://www.saucedemo.com/" page
    And I login with username "standard_user" and password "secret_sauce"
    And I am on the inventory page

  @sort
  Scenario Outline: Validate product sort by price
    When I sort products by "<sortOption>"
    Then product prices should be in "<order>" order

    Examples:
      | sortOption           | order |
      | Price (low to high)  | asc   |
      | Price (high to low)  | desc  |
