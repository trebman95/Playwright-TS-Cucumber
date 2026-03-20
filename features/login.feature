Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    # TODO: Fix this failing scenario - fixed
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login as 'locked_out_user'
    # TODO: Add a step to validate the error message received - fixed
    Then I should see the login error "Epic sadface: Sorry, this user has been locked out."

#Extend the testing coverage
 Scenario: Validate successful login redirects to inventory page
    Then I will login as 'standard_user'
    Then I should be on the inventory page