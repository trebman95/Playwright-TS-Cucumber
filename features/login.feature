Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    # TODO: Fix this failing scenario
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login as 'locked_out_user'
    And the error message should be "Epic sadface: Sorry, this user has been locked out."

  Scenario: Validate login fails when password is missing
    When I enter username only 'standard_user'
    And I click the login button
    Then the error message should be "Epic sadface: Password is required"