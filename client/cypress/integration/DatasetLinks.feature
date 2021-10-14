Feature: All links on the dataset cards should be functional

  Scenario: If I click on any link in the indicators dataset, they should work
    Given I am on the "Methodology" page
    When I look for the "Datasets used in methodology" CTA
    Then All links under "Datasets used in methodology" should work

  Scenario: If I click on any link in the additional indicators dataset, they should work
    Given I am on the "Methodology" page
    When I look for the "Additional Indicators" CTA
    Then All links under "Additional Indicators" should work
