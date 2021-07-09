// / <reference types="Cypress" />
import * as constants from '../../src/data/constants';
import {LngLat} from 'maplibre-gl';

describe('Tests for the Explore the Map page', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('http://localhost:8000/en/cejst');
  });

  // The below values all assume a 13-inch MB as set in viewport above.
  // Values will be different for different screens
  const tests = {
    'Lower 48': '3.83/38.07/-95.87',
    'Alaska': '3.36/63.28/-140.24',
    'Hawaii': '5.94/20.574/-161.438',
    'Puerto Rico': '8.24/18.2/-66.583',
  };

  for (const [territory, zxy] of Object.entries(tests)) {
    it(`Can zoom to ${territory} `, () => {
      cy.getMap().then((map) => {
        cy.get(`[aria-label="Zoom to ${territory}"]`).click();
        cy.waitForMapIdle(map);
        cy.url().should('include', zxy);
      });
    });
  };


  it('Highlights selected regions', () => {
    // The area around Punxsutawney PA
    cy.visit('http://localhost:8000/en/cejst#10.29/40.8187/-78.9375');

    cy.intercept('GET', `${constants.FEATURE_TILE_BASE_URL}/10/287/384.pbf`).as('getTile');
    cy.wait('@getTile');

    const getFeatureState = (map, id) => {
      return map.getFeatureState(
          {
            'id': id,
            'source': constants.SCORE_SOURCE_NAME,
            'sourceLayer': constants.SCORE_SOURCE_LAYER,
          },
      );
    };

    const punx1001Info = {
      'id': '420639601001',
      'coords': new LngLat(40.911134, -79.027089),
    };

    cy.getMap().then((map) => {
      cy.waitForMapIdle(map);
      map.fire('click', {lngLat: punx1001Info.coords});
      const punx1001FeatureState = getFeatureState(map, punx1001Info.id);
      expect(punx1001FeatureState).to.deep.equal({'selected': true});
    });
  });
});