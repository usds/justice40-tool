import * as React from 'react';
import {render, screen} from '@testing-library/react';
import AreaDetail from '..';
import {LocalizedComponent} from '../../../test/testHelpers';

import * as constants from '../../../data/constants';
import * as EXPLORE_COPY from '../../../data/copy/explore';

// Setting these while BE is being fixed:
const tempTrue = '1';
const tempFalse = '0';

// Todo: Update tests to take into account tribal layer selected
describe('rendering of the AreaDetail', () => {
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

  it('checks if indicators for historic underinvestment = true renders', () => {
    const propertiesHistUnderPass = {
      ...properties,
      [constants.HISTORIC_UNDERINVESTMENT]: tempTrue,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propertiesHistUnderPass} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#sustain-house li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('Yes');
    screen.getByText(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIST_UNDERINVEST.defaultMessage);
  });

  it('checks if indicators for historic underinvestment = false renders', () => {
    const propertiesHistUnderPass = {
      ...properties,
      [constants.HISTORIC_UNDERINVESTMENT]: tempFalse,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propertiesHistUnderPass} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#sustain-house li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('No');
    screen.getByText(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIST_UNDERINVEST.defaultMessage);
  });

  it('checks if indicators for historic underinvestment = null does not render', () => {
    const propertiesHistUnderFail = {
      ...properties,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propertiesHistUnderFail} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#sustain-house li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('95thabove 90th percentile');
  });

  it('checks if indicators for abandoned land mines = true renders', () => {
    const propsALM = {
      ...properties,
      [constants.ABANDON_LAND_MINES]: tempTrue,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propsALM} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#leg-pollute li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('Yes');
    screen.getByText(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ABANDON_MINES.defaultMessage);
  });

  it('checks if indicators for abandoned land mines = false does not render', () => {
    const propsALM = {
      ...properties,
      [constants.ABANDON_LAND_MINES]: tempFalse,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propsALM} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#leg-pollute li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('data is not available');
  });

  it('checks if indicators for abandoned land mines = null does not render', () => {
    const propsALM = {
      ...properties,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propsALM} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#leg-pollute li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('data is not available');
  });

  it('checks if indicators for FUDS = true renders', () => {
    const propsFUDS = {
      ...properties,
      [constants.FORMER_DEF_SITES]: tempTrue,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propsFUDS} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#leg-pollute li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('Yes');
    screen.getByText(EXPLORE_COPY.SIDE_PANEL_INDICATORS.FORMER_DEF_SITES.defaultMessage);
  });

  it('checks if indicators for FUDS = false does not render', () => {
    const propsFUDS = {
      ...properties,
      [constants.FORMER_DEF_SITES]: tempFalse,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propsFUDS} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#leg-pollute li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('data is not available');
  });

  it('checks if indicators for FUDS = null does not render', () => {
    const propsFUDS = {
      ...properties,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <AreaDetail properties={propsFUDS} hash={hash} isCensusLayerSelected={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    // eslint-disable-next-line max-len
    const container = document.querySelectorAll(
        '#leg-pollute li[data-cy="indicatorBox"] div div:nth-child(2)',
    );
    expect(container[0].textContent).toBe('data is not available');
  });
});
