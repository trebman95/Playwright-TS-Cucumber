Feature: Logout Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page
    Then I will login

  Scenario: Validate that a user is able to logout of the application
    Then I logged out of the application
    Then I should see the title "Swag Labs"

