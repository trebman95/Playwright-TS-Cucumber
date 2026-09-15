Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Verifies the browser title against the value displayed by SauceDemo.
  Scenario: Validate the login page title
    Then I should see the title "Swag Labs"

  # Verifies that a locked user receives the expected business error.
  Scenario: Validate login error message
    Then I will login as 'locked_out_user'
    Then I should see the login error message "Epic sadface: Sorry, this user has been locked out."
