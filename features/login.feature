Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # The actual title is "Swag Labs" (not "Labs Swag"). Step [Login page] clarifies which page title is checked.
  Scenario: Validate the login page title
    Then [Login page] "Swag Labs" title should be present

  Scenario Outline: Validate login error message
    When [Login page] I login with UserName "<userName>" and Password "<passwordType>"
    Then [Login page] I should see the error message "<errorMessage>"
    Examples:
      | userName        | passwordType | errorMessage                                                              |
      | standard_user   | invalid      | Epic sadface: Username and password do not match any user in this service |
      | Invalid_user    | valid        | Epic sadface: Username and password do not match any user in this service |
      | locked_out_user |              | Epic sadface: Password is required                                        |
      |                 | valid        | Epic sadface: Username is required                                        |
      |                 |              | Epic sadface: Username is required                                        |
