Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline:  Validate product sort by price <sort>
  Then I will login
  Then I will sort by '<sort>', and the results should be '<prices>'
  Examples:
    | sort                | prices                                   |
    | Price (high to low) | 49.99, 29.99, 15.99, 15.99, 9.99, 7.99   |
    | Price (low to high) | 7.99 ,9.99, 15.99, 15.99, 29.99, 49.99   |