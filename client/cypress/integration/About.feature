Feature: Does the About page open?
  I want to open the about page
  
  Scenario: About page from Explore Tool page
    Given I am on the Explore Tool page
    When I click on the "About" page in the navigation
    Then I see "About" in the title

  Scenario: About page from Methodology page
    Given I am on the Explore Tool page
    When I click on the "Methodology" page in the navigation
    Then I see "Data and Methodology" in the title
    
  Scenario: About page from Contact page
    Given I am on the Explore Tool page
    When I click on the "Contact" page in the navigation
    Then I see "Contact" in the title