Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    # TODO: Fix this failing scenario- done below
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login as "locked_out_user"
    # TODO: Add a step to validate the error message received- done below
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

  # TODO: Extending the testing coverage- done below
  Scenario: Validate login with invalid credentials
    Then I will login with username "invalid" and password "invalid"
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"

  # TODO: Extending the testing coverage- done below
  Scenario: Validate user logout
    Then I will login as "standard_user"
    Then I will logout
    Then I should see the login page