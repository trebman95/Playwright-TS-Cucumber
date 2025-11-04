@smoke @login
Feature: Login

  Background:
    Given I open the "https://www.saucedemo.com/" page
  Scenario: Validate the login page title
    Then the page title should be "Swag Labs"

  @negative
  Scenario: Validate login error message
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see a login error "Epic sadface: Sorry, this user has been locked out."

  @negative
  Scenario: Validate wrong credentials error message
    When I login with username "bad_user" and password "bad_password"
    Then I should see a login error "Epic sadface: Username and password do not match any user in this service"
