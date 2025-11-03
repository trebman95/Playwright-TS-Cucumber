Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline: Validate product sort by price <sort>
    When I login as "standard_user"
    And I sort the products by "<sort>"
    Then I should see all products sorted correctly by "<sort>"

  Examples:
    | sort               |
    | Price (low to high) |
    | Price (high to low) |
