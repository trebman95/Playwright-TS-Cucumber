Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario Outline:  Validate product sort by price <sort>
  Then I will login as 'standard_user'
  Then I sort the items by "<sort>"
  Then I should see all 6 items sorted by price "<direction>"
  Examples:
    | sort                 | direction |
    | Price (low to high)  | asc       |
    | Price (high to low)  | desc      |

