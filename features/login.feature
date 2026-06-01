Feature: Login

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Verifies the correct site loaded.
  Scenario: Login page displays the correct title
    Then the page title should be "Swag Labs"

  # Tests both ways a login can fail using a single outline.
  Scenario Outline: Login failure displays an appropriate error
    When I login as '<username>'
    Then I should see an error containing '<error>'

    Examples:
      | username        | error                                |
      | locked_out_user | Sorry, this user has been locked out |
      | invalid_user    | Username and password do not match   |

  # Confirms the user was actually redirected after a successful login.
  Scenario: Valid credentials navigate to the inventory page
    When I login as 'standard_user'
    Then I should be on the "inventory" page
