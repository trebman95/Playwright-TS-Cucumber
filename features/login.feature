Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
  Given  Login page is available after loading
  When   I will login as 'standard_user'
    # TODO: Fix this failing scenario
  Then I should see the title "Swag Labs"

  Scenario Outline: Validate login error message
  Given  Login page is available after loading
  When I will login as 'locked_out_user'
    # TODO: Add a step to validate the error message received
 Then I see error message "Epic sadface: Sorry, this user has been locked out."

 Examples:
      | username        | errorMessage                                      |
      | locked_out_user | Epic sadface: Sorry, this user has been locked out. |
      | problem_user    | Swag Labs       |
