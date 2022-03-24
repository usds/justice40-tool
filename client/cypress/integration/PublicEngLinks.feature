Feature: All links on Public Eng page are functional

  Scenario: Anyone should be able to register on Mar 22th
    Given I am on the "Public" page
    When I look for the "Mar 22 Reg Link" CTA
    And I click on the "Mar 22 Reg Link" event
    Then the link should respond successfully

  Scenario: Anyone should be able to register on Apr 15th
    Given I am on the "Public" page
    When I look for the "Apr 15 Reg Link" CTA
    And I click on the "Apr 15 Reg Link" event
    Then the link should respond successfully

