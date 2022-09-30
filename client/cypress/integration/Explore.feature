Feature: The Explore the map page will open from all other pages
  
  Scenario: Explore the map page open when navigating from About page
    Given I am on the "About" page
    When I click on the "Explore the map" page in the navigation
    Then I see "Explore the map" in the title

  Scenario: Explore the map page open when navigating from Methodology page
    Given I am on the "Methodology" page
    When I click on the "Explore the map" page in the navigation
    Then I see "Explore the map" in the title
    
  Scenario: Explore the map page open when navigating from Contact page
    Given I am on the "Contact" page
    When I click on the "Explore the map" page in the navigation
    Then I see "Explore the map" in the title