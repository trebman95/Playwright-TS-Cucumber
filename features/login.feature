Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    # TODO: Fix this failing scenario
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login without a password as a 'locked_out_user'
    
    # TODO: Add a step to validate the error message received
    Then I should see the error message "Epic sadface: Password is required"