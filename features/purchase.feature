Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

    

  Scenario:  Validate successful purchase text
  Then I will login as 'standard_user'
  Then I will add the backpack to the cart
    # TODO: Select the cart (top-right)
    Then I will navigate to the cart
    # TODO: Select Checkout
    Then I will proceed to checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    Then I will enter checkout information
    # TODO: Select Continue
    Then I will continue checkout
    # TODO: Select Finish
    Then I will finish the purchase
    # TODO: Validate the text 'Thank you for your order!'
    Then I should see the order confirmation text "Thank you for your order!"


Scenario Outline:  Validate adding item to cart
      Then I will login as 'standard_user'  
      Then I will add the "<item>" to the cart
      Then I should see the product added to the cart
    Examples:
      | item          | count |
      | Backpack      | 1     |
      | Bike Light    | 1     |
      | Bolt T-Shirt  | 1     |
