@api
Feature: Saucedemo HTTP Contract

  # saucedemo.com is a static site on GitHub Pages with a client-side-only
  # router - confirmed here with Playwright's request API, independent of
  # any browser or JS. These scenarios test the raw HTTP contract that
  # every UI scenario in this suite is quietly built on top of.

  Scenario: The home page resolves
    When I send a GET request to "/"
    Then the response status should be 200
    And the response header "content-type" should contain "text/html"

  Scenario Outline: Deep-linked SPA routes 404 at the HTTP layer
    When I send a GET request to "<path>"
    Then the response status should be 404

    Examples:
      | path                     |
      | /inventory.html          |
      | /cart.html               |
      | /checkout-step-one.html  |
      | /checkout-step-two.html  |
      | /checkout-complete.html  |

  # This is the mechanism the rest of this suite's deep-linking relies on:
  # GitHub Pages serves a 404 for any path that isn't a real file, and a
  # client-side redirect shim embedded in that 404 response hands control
  # back to the real app. A browser rescues it; a bare HTTP client - like
  # the one running this whole feature - does not.
  Scenario: A genuinely unknown path also 404s
    When I send a GET request to "/this-page-does-not-exist"
    Then the response status should be 404

  Scenario: Static assets resolve
    When I send a GET request to "/robots.txt"
    Then the response status should be 200

  # Documents current reality, not a recommendation - this is a public
  # demo app, not a finding that would matter on a real product.
  Scenario: Common security headers are absent
    When I send a GET request to "/"
    Then the response header "content-security-policy" should be absent
    And the response header "x-frame-options" should be absent
    And the response header "strict-transport-security" should be absent

  Scenario: The home page responds within a reasonable time
    When I send a GET request to "/"
    Then the response time should be under 3000 ms
