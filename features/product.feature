Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
  Then I click on filter and choose "<sort_option>" and "<expected_order>"
  Then I validate item order
  Examples:
  | sort_option | expected_order |
  | Price | descending |
  | Price | ascending |
  | Name | descending |
  | Name | ascending |