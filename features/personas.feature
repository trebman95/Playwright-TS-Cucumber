@mocked
Feature: Persona Login Fixtures

  # Demonstrates the @problemUser and @performanceGlitchUser tags from
  # hooks/loginFixture.ts - each logs in for real exactly once per suite
  # run (see sessionCache) and reuses that captured session on every
  # later scenario tagged with it. locked_out_user is deliberately not a
  # fixture tag here - that account can never reach an authenticated
  # state, so it stays a manual scenario in login.feature.

  @problemUser
  Scenario: problem_user starts already authenticated with an empty cart
    Given I seed the cart with the "Sauce Labs Backpack" item
    When I go directly to the cart page
    Then I should see 1 item in the cart
    And I should see the item "Sauce Labs Backpack" in the cart

  @performanceGlitchUser
  Scenario: performance_glitch_user starts already authenticated with an empty cart
    Given I seed the cart with the "Sauce Labs Backpack" item
    When I go directly to the cart page
    Then I should see 1 item in the cart
    And I should see the item "Sauce Labs Backpack" in the cart
