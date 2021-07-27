import * as React from 'react';
import {render} from '@testing-library/react';
import AreaDetail, {getCategorization, readablePercent} from './areaDetail';
import {LocalizedComponent} from '../test/testHelpers';
import * as constants from '../data/constants';

describe('rendering of the AreaDetail', () => {
  const properties = {
    [constants.POVERTY_PROPERTY_PERCENTILE]: 99,
    [constants.EDUCATION_PROPERTY_PERCENTILE]: 98,
    [constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE]: 97,
    [constants.UNEMPLOYMENT_PROPERTY_PERCENTILE]: 96,
    [constants.HOUSING_BURDEN_PROPERTY_PERCENTILE]: 95,
    [constants.SCORE_PROPERTY_HIGH]: 95,
    [constants.GEOID_PROPERTY]: 98729374234,
    [constants.TOTAL_POPULATION]: 3435435,
  };

  const {asFragment} = render(
      <LocalizedComponent>
        <AreaDetail properties={properties}/>
      </LocalizedComponent>,
  )
  ;

  it('checks if various text fields are visible', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('tests the readablePercent function', () => {
  expect(readablePercent(.9877665443)).toEqual('98.8');
});

describe('tests the getCategorization function', () => {
  it(`should equal Prioritized for value >= ${constants.SCORE_BOUNDARY_LOW}`, () => {
    expect(getCategorization(.756)).toEqual(['Prioritized', undefined]);
  });

  it(`should equal Threshold for .60 <= value < ${constants.SCORE_BOUNDARY_THRESHOLD}`, () => {
    expect(getCategorization(.65)).toEqual(['Threshold', undefined]);
  });

  it(`should equal Non-prioritized for value < ${constants.SCORE_BOUNDARY_PRIORITIZED}`, () => {
    expect(getCategorization(.53)).toEqual(['Non-prioritized', undefined]);
  });
});
