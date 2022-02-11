import * as React from 'react';
import {render} from '@testing-library/react';
import AreaDetail from '..';
import {LocalizedComponent} from '../../../test/testHelpers';

import * as constants from '../../../data/constants';

describe('rendering of the AreaDetail', () => {
  const properties = {
    [constants.POVERTY_PROPERTY_PERCENTILE]: .12,
    [constants.EDUCATION_PROPERTY_PERCENTILE]: .98,
    [constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE]: .97,
    [constants.UNEMPLOYMENT_PROPERTY_PERCENTILE]: .96,
    [constants.HOUSING_BURDEN_PROPERTY_PERCENTILE]: .95,
    [constants.SCORE_PROPERTY_HIGH]: .95,
    [constants.GEOID_PROPERTY]: 98729374234,
    [constants.TOTAL_POPULATION]: 3435435,
    [constants.AREA_MEDIAN_INCOME_PERCENTILE]: .19,
  };

  const {asFragment} = render(
      <LocalizedComponent>
        <AreaDetail properties={properties}/>
      </LocalizedComponent>,
  );

  it('checks if various text fields are visible', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
