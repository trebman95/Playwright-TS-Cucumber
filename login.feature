Feature: Login Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate the login page title
  
    # TODO: Fix this failing scenario
    Then I should see the title "Swag Labs"
@error
  Scenario: Validate login error message
    When I will login as 'locked_out_user'
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."
    # TODO: Add a step to validate the error message received 

    @successful
     Scenario: Successful login with valid credentials 
     When I login as "standard_user" with password "secret_sauce"
    And I click the login button
    Then I should see the inventory page with title "Products"

    @performance
  Scenario: Validate login with performance glitch user
    When I login as "performance_glitch_user" with password "secret_sauce"
    And I click the login button
    Then I should see the inventory page

    @visual
  Scenario: Validate login with visual user
    When I login as "visual_user" with password "secret_sauce"
    And I click the login button
    Then I should see the inventory page
   