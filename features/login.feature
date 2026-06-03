Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    Then I should see the title "Swag Labs"

  Scenario: Validate login error message
    Then I will login as 'locked_out_user'
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Validate successful login displays the inventory page
    Then I will login as 'standard_user'
    Then I should see 6 products on the inventory page

  Scenario Outline: Validate login error for <description>
    When I attempt to login with username "<username>" and password "<password>"
    Then I should see the error message "<error>"
    Examples:
      | description    | username      | password | error                              |
      | empty username |               |          | Epic sadface: Username is required |
      | empty password | standard_user |          | Epic sadface: Password is required |
