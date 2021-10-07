Feature: All links on About page are functional

  Scenario: Visitors can learn more about the J40 EO
    Given I am on the "About" page
    When I look for the "The Justice40 Initiative" CTA
    And I click on the "The Justice40 Initiative" "external" link

  Scenario: Federal program officer can find and click on their CTA
    Given I am on the "About" page
    When I look for the "Federal program managers" CTA
    And I click on the "Federal program managers" "internal" link
    Then I see "Methodology" in the title

  Scenario: Community members can find and click on their CTA
    Given I am on the "About" page
    When I look for the "Community members" CTA
    And I click on the "Community members" "internal" link
    Then I see "Explore the tool" in the title

  # Todo: Figure out how to test mailto links, hrefs are tested in integration tests
  Scenario: People can find how to Send feedback
    Given I am on the "About" page
    When I look for the "Community members" CTA

  # Todo: Figure out how to test page content in new tab. This will test that link returns a 200.
  Scenario: Open source community can find and click on their CTA
    Given I am on the "About" page
    When I look for the "Join the open source community" CTA
    And I click on the "Join the open source community" "external" link

