Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
     Then I will login as 'standard_user'
     Then I should see the title "Labs Swag"

  Scenario: Validate login error message
    And I  login as 'locked_out_user'
   Then I should see Login error message
    