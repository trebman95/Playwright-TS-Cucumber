Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    # TODO: Fix this failing scenario
    # FIXED : Chnaged the title to match the actual title of the page("Swag Labs")
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login as 'locked_out_user'
    # TODO: Add a step to validate the error message received
    # FIXED : Added a step to validate the error message for locked_out_user
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

# ADDED: New Scenario to validate and logout functionality
  Scenario: Validate and logout functionality
    Then I will login as 'standard_user'
    Then I should be logged in successfully
    When I logout from the application
    Then I should see the login page again