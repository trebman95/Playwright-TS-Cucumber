Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    Then I should see the title "Swag Labs" 

  Scenario: Validate login error message
    Then I will login as "locked_out_user"
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."  

  Scenario: Login with invalid username
    Then I will login with username "invalid_user_name" and password "secret_sauce"
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with invalid password
    Then I will login with username "standard_user" and password "wrong_password"
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with empty username
    Then I will login with username "" and password "secret_sauce"
    Then I should see the error message "Epic sadface: Username is required"

  Scenario: Login with empty password
    Then I will login with username "standard_user" and password ""
    Then I should see the error message "Epic sadface: Password is required"

  Scenario: Login with empty username and password
    Then I will login with username "" and password ""
    Then I should see the error message "Epic sadface: Username is required"

