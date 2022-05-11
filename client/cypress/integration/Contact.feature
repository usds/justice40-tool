Feature: The Contact page will open from all other pages
  
  Scenario: Contact page open when navigating from About page
    Given I am on the "About" page
    When I click on the "Contact" page in the navigation
    Then I see "Contact" in the title

  Scenario: Contact page open when navigating from Explore the map page
    Given I am on the "Explore" page
    When I click on the "Contact" page in the navigation
    Then I see "Contact" in the title
    
  Scenario: Contact page open when navigating from Methodology page
    Given I am on the "Methodology" page
    When I click on the "Contact" page in the navigation
    Then I see "Contact" in the title