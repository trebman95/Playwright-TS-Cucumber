Scenario: Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
  And I select the cart (top-right)
  And I select Checkout
  And I fill in checkout details "John" "Doe" "12345"
  And I select Continue
  And I select Finish

  Then I should see the confirmation header
  And I should see the confirmation message
  And I should be on the checkout complete page