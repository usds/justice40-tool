import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Indicator, {IndicatorValueIcon, IndicatorValueSubText, IndicatorValue} from './Indicator';
import {indicatorInfo} from '../AreaDetail/AreaDetail';

import * as EXPLORE_COPY from '../../data/copy/explore';


describe('rendering of the Indicator', () => {
  it('checks if component renders', () => {
    const highSchool:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'percent',
      value: .97,
      isDisadvagtaged: true,
      threshold: 20,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={highSchool}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if the flooring function works', () => {
    const expectedFloorPercent = '42%';

    const highSchool:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'percent',
      value: .426,
      isDisadvagtaged: true,
      threshold: 20,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={highSchool}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    const container = document.querySelectorAll('li[data-cy="indicatorBox"] span');
    expect(container[0].textContent).toBe(expectedFloorPercent);
  });
});

describe('test rendering of Indicator value icons', () => {
  it('renders the up arrow when value is above threshold', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueIcon
            value={90}
            isAboveThresh={true}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    screen.getByAltText(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_UP.defaultMessage);
  });
  it('renders the down arrow when the value is above the threshold', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueIcon
            value={13}
            isAboveThresh={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    screen.getByAltText(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_DOWN.defaultMessage);
  });

  it('renders the down arrow when the value is zero', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueIcon
            value={0}
            isAboveThresh={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    screen.getByAltText(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_DOWN.defaultMessage);
  });

  it('renders the unavailable icon when the value is null', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueIcon
            value={null}
            isAboveThresh={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    screen.getByAltText(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.UNAVAILABLE.defaultMessage);
  });
});

describe('test rendering of Indicator value sub-text', () => {
  it('renders the "above 90 percentile"', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueSubText
            value={95}
            isAboveThresh={true}
            threshold={90}
            type='percentile'
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the "below 90 percentile"', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueSubText
            value={89}
            isAboveThresh={false}
            threshold={90}
            type='percentile'
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the "data is not available"', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueSubText
            value={null}
            isAboveThresh={false}
            threshold={90}
            type='percentile'
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('test that the unit suffix renders correctly', ()=> {
  it('renders correctly when the value is a percentile', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            type={'percentile'}
            displayStat={90}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when the value is a percent', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            type={'percent'}
            displayStat={90}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when the value is a null', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            type={'percentile'}
            displayStat={null}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('renders value correctly for ShowFullBoolean types', () => {
  it('renders the "true" use case correctly', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            type={'showFullBoolean'}
            displayStat={100}
            rawValue={true}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the "false" use case correctly', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            type={'showFullBoolean'}
            displayStat={0}
            rawValue={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
