Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
    Then I should see the title "Swag Labs"

  Scenario Outline: Login validation as different users
    Then I will login as '<username>' with this password '<password>'
    Then I should see this result '<result>'


    Examples:
      | username        | password     | result            |
      | standard_user   | secret_sauce | inventory page    |
      | locked_out_user | secret_sauce | error message     |
      | invalid_user    | wrong_pass   | error message     |
      |                 |              | username required |