Feature: All links on the dataset cards should be functional

  Scenario: If I click on any link in the indicators dataset, they should work
    Given I am on the "Methodology" page
    When I look for the "Datasets used in beta methodology" CTA
    Then All links under "Datasets used in beta methodology" should work
