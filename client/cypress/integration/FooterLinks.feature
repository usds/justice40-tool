Feature: All links in the Footer are functional

  Scenario: I can find more information on the Whitehouse
    Given I am on the "About" page
    When I look for the "footer"
    And I click on the "Whitehouse.gov" footer link

  Scenario: I can find more information on FOIA
    Given I am on the "About" page
    When I look for the "footer"
    And I click on the "Freedom of Information Act (FOIA)" footer link

  Scenario: I can find more information on the Privacy Policy
    Given I am on the "About" page
    When I look for the "footer"
    And I click on the "Privacy Policy" footer link

  Scenario: I can find find a contact at USA.gov
    Given I am on the "About" page
    When I look for the "footer"
    And I click on the "Find a contact at USA.gov" footer link