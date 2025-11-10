Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline:  Validate product sort by price <sortBy>
    Given I login as 'standard_user'
    When I sort products by '<sortBy>'
    Then products are listed in this order '<productOrder>'
    Examples:
      | sortBy | productOrder |
      | Price (high to low)| Sauce Labs Fleece Jacket, Sauce Labs Backpack, Sauce Labs Bolt T-Shirt, Test.allTheThings() T-Shirt (Red), Sauce Labs Bike Light, Sauce Labs Onesie |
      | Price (low to high) |   Sauce Labs Onesie, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Test.allTheThings() T-Shirt (Red), Sauce Labs Backpack, Sauce Labs Fleece Jacket |
      | Name (A to Z)| Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red) |
      | Name (Z to A)| Test.allTheThings() T-Shirt (Red), Sauce Labs Onesie, Sauce Labs Fleece Jacket, Sauce Labs Bolt T-Shirt, Sauce Labs Bike Light, Sauce Labs Backpack |