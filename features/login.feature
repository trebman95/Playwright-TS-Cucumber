Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
  When I login with username "standard_user"
  Then I should be on the inventory page
  And the page title should be "Swag Labs"
  
Scenario: Validate login error message
 When I login with username "locked_out_user"
  Then I should see the error message "Sorry, this user has been locked out."