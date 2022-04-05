Feature: The Methodology page will open from all other pages
  
  Scenario: Methodology page open when navigating from About page
    Given I am on the "About" page
    When I click on the "Methodology" dropdown in the navigation
    When I click on the "Methodology" page in the navigation
    Then I see "Methodology" in the title

  Scenario: Methodology page open when navigating from Explore the tool page
    Given I am on the "Explore the tool" page
    When I click on the "Methodology" dropdown in the navigation
    When I click on the "Methodology" page in the navigation
    Then I see "Methodology" in the title
    
  Scenario: Methodology page open when navigating from Contact page
    Given I am on the "Contact" page
    When I click on the "Methodology" dropdown in the navigation
    When I click on the "Methodology" page in the navigation
    Then I see "Methodology" in the title