Feature: The Explore the tool page will open from all other pages
  
  Scenario: Explore the tool page open when navigating from About page
    Given I am on the "About" page
    When I click on the "Explore the tool" page in the navigation
    Then I see "Explore the tool" in the title

  Scenario: Explore the tool page open when navigating from Methodology page
    Given I am on the "Methodology" page
    When I click on the "Explore the tool" page in the navigation
    Then I see "Explore the tool" in the title
    
  Scenario: Explore the tool page open when navigating from Contact page
    Given I am on the "Contact" page
    When I click on the "Explore the tool" page in the navigation
    Then I see "Explore the tool" in the title