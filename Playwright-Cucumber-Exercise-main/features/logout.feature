Feature: Logout Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate user logout
    Then I will login as 'standard_user'
    And I open the menu
    And I click logout
    Then I should be redirected to login page