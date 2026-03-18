Feature: Product Feature

  Background:
  
    Given I open the "https://www.saucedemo.com/" page

    Scenario Outline:  Validate product sorting

      Then I will login as "standard_user"
      When I sort products by "<sort>"
      Then all products should be sorted by "<sort>"

    Examples:
      | sort                |
      | Price (low to high) |
      | Price (high to low) |
      | Name (A to Z)       |
      | Name (Z to A)       |



