Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    Then I should see the title "Swag Labs"

  Scenario: Validate the login error message
    Then I will login as 'locked_out_user'
    Then I should see the login error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Validate successful login navigation
    Then I will login as 'standard_user'
    Then I should be redirected to the inventory page