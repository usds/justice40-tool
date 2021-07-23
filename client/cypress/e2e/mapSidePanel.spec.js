// / <reference types="Cypress" />

/*
A risk with this test is that if the feature/area that is currently being selected become non-prioritized, then this
test will fail. However it would be a major win for that area!
*/

const devices = [
  [1024, 720],
  ['iphone-6', 'portrait'],
  ['samsung-s10', 'portrait'],
];

describe('tests that the map side panel renders MapIntroduction component', () => {
  devices.forEach((device) => {
    it(`should render MapIntroduction component on ${device[0]} x ${device[1]}`, () => {
      cy.visit('http://localhost:8000/en/cejst');
      cy.viewport(device[0], device[1]);
      cy.get('div[class*="mapIntroContainer"]').should('be.visible');
    });
  });
});

// Todo VS: Figure out why this forEach block doesn't work:
// describe('tests that the map side panel renders AreaDetail component', () => {
//   devices.forEach((device) => {
//     it(`should render AreaDetail component on ${device[0]} x ${device[1]}`, () => {
//       if (!device[0].isIteger) cy.viewport(device[0], device[1]);
//       cy.visit('http://localhost:8000/en/cejst');
//       cy.getMap().then((map) => {
//         const zoomLevel = device[0].isInteger ? 11 : 10;
//         for (let zoom=3; zoom<=zoomLevel; zoom++) {
//           cy.get('.mapboxgl-ctrl-zoom-in > .mapboxgl-ctrl-icon').click();
//           cy.waitForMapIdle(map);
//         }
//         cy.get('.overlays').click('bottomRight');
//         cy.get('div[class*="areaDetailContainer"]').should('be.visible');
//         cy.get('div[class*="score"]').should('be.visible');
//         cy.get('div[class*="topRowSubTitle"]').should('be.visible');
//         cy.get('div[class*="indicatorBox"]').should('be.visible');
//         cy.get('div[class*="indicatorBox"]')
//         // currently the padding-top on desktop = 1.5rem => 24px
//         // currently the padding-top on mobile = .8 rem => 8px
//             .each((indicator) => cy.wrap(indicator)
//                 .should('have.css', 'padding-top', `${device[0].isInteger ? '24px' : '8px'}`));
//       });
//     });
//   });
// });

it('should render AreaDetail component on desktop', () => {
  cy.visit('http://localhost:8000/en/cejst');
  cy.getMap().then((map) => {
    const zoomLevel = 11;
    for (let zoom=3; zoom<=zoomLevel; zoom++) {
      cy.get('.mapboxgl-ctrl-zoom-in > .mapboxgl-ctrl-icon').click();
      cy.waitForMapIdle(map);
    }
    cy.get('.overlays').click('bottomRight');
    cy.get('div[class*="areaDetailContainer"]').should('be.visible');
    cy.get('div[class*="score"]').should('be.visible');
    cy.get('div[class*="topRowSubTitle"]').should('be.visible');
    cy.get('div[class*="indicatorBox"]').should('be.visible');
    cy.get('div[class*="indicatorBox"]')
    // currently the padding-top = 1.5rem => 24px
        .each((indicator) => cy.wrap(indicator).should('have.css', 'padding-top', '24px'));
  });
});

it('should render AreaDetail component on iPhone 6 (iOS)', () => {
  cy.viewport('iphone-6');
  cy.visit('http://localhost:8000/en/cejst');
  cy.getMap().then((map) => {
    const zoomLevel = 10;
    for (let zoom=3; zoom<=zoomLevel; zoom++) {
      cy.get('.mapboxgl-ctrl-zoom-in > .mapboxgl-ctrl-icon').click();
      cy.waitForMapIdle(map);
    }
    cy.get('.overlays').click('bottomRight');
    cy.get('div[class*="areaDetailContainer"]').should('be.visible');
    cy.get('div[class*="score"]').should('be.visible');
    cy.get('div[class*="topRowSubTitle"]').should('be.visible');
    cy.get('div[class*="indicatorBox"]').should('be.visible');
    cy.get('div[class*="indicatorBox"]')
    // currently the padding-top = .5rem => 8px
        .each((indicator) => cy.wrap(indicator).should('have.css', 'padding-top', '8px'));
  });
});

it('should render AreaDetail component on Samsung Galaxy S10 (android)', () => {
  cy.viewport('samsung-s10');
  cy.visit('http://localhost:8000/en/cejst');
  cy.getMap().then((map) => {
    const zoomLevel = 10;
    for (let zoom=3; zoom<=zoomLevel; zoom++) {
      cy.get('.mapboxgl-ctrl-zoom-in > .mapboxgl-ctrl-icon').click();
      cy.waitForMapIdle(map);
    }
    cy.get('.overlays').click('bottomRight');
    cy.get('div[class*="areaDetailContainer"]').should('be.visible');
    cy.get('div[class*="score"]').should('be.visible');
    cy.get('div[class*="topRowSubTitle"]').should('be.visible');
    cy.get('div[class*="indicatorBox"]').should('be.visible');
    cy.get('div[class*="indicatorBox"]')
    // currently the padding-top = .5rem => 8px
        .each((indicator) => cy.wrap(indicator).should('have.css', 'padding-top', '8px'));
  });
});
