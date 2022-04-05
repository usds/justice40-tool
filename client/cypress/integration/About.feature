Feature: The About page will open from all other pages
  
  Scenario: About page open when navigating from Methodology page
    Given I am on the "Methodology" page
    When I click on the "About" dropdown in the navigation
    When I click on the "About" page in the navigation
    Then I see "About" in the title
    
  Scenario: About page open when navigating from Explore the Tool page
    Given I am on the "Explore the tool" page
    When I click on the "About" dropdown in the navigation
    When I click on the "About" page in the navigation
    Then I see "About" in the title
    
  Scenario: About page open when navigating from Contact page
    Given I am on the "Contact" page
    When I click on the "About" dropdown in the navigation
    When I click on the "About" page in the navigation
    Then I see "About" in the title
