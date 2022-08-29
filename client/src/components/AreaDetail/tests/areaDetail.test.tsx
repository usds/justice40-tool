import * as React from 'react';
import {render} from '@testing-library/react';
import AreaDetail from '..';
import {LocalizedComponent} from '../../../test/testHelpers';

import * as constants from '../../../data/constants';

const properties = {
  [constants.POVERTY_BELOW_100_PERCENTILE]: .12,
  [constants.HIGH_SCHOOL_PROPERTY_PERCENTILE]: .98,
  [constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE]: .97,
  [constants.UNEMPLOYMENT_PROPERTY_PERCENTILE]: .96,
  [constants.HOUSING_BURDEN_PROPERTY_PERCENTILE]: .95,
  [constants.SCORE_PROPERTY_HIGH]: true,
  [constants.GEOID_PROPERTY]: 98729374234,
  [constants.TOTAL_POPULATION]: 3435435,
  [constants.STATE_NAME]: 'New York',
  [constants.COUNTY_NAME]: 'Brooklyn',
  [constants.POVERTY_BELOW_200_PERCENTILE]: .19,
  [constants.SIDE_PANEL_STATE]: constants.SIDE_PANEL_STATE_VALUES.NATION,
  [constants.COUNT_OF_CATEGORIES_DISADV]: 5,
  [constants.TOTAL_NUMBER_OF_DISADVANTAGE_INDICATORS]: 3,
};
const hash = ['11.54', '36.0762', '-84.4494'];


describe('rendering of the Islan areas in AreaDetail', () => {
  it('checks if indicators for NATION is present', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={properties} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if indicators for PUERTO RICO are present', () => {
    const propertiesPR = {
      ...properties,
      [constants.SIDE_PANEL_STATE]: constants.SIDE_PANEL_STATE_VALUES.PUERTO_RICO,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propertiesPR} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if indicators for ISLAND AREAS are present', () => {
    const propertiesIA = {
      ...properties,
      [constants.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDU_PERCENTILE_FIELD]: .9,
      [constants.ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD]: .8,
      [constants.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDU_PERCENTILE_FIELD]: .6,
      [constants.ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD]: .5,
      [constants.SIDE_PANEL_STATE]: constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propertiesIA} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

