import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Indicator, {IndicatorValueIcon, IndicatorValueSubText, IndicatorValue} from './Indicator';
import {indicatorInfo} from '../AreaDetail/AreaDetail';

import * as EXPLORE_COPY from '../../data/copy/explore';

const highSchool:indicatorInfo = {
  label: 'some label',
  description: 'some description',
  value: .97,
  isDisadvagtaged: true,
  isPercent: true,
  threshold: 20,
};

describe('rendering of the Indicator', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Indicator indicator={highSchool}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
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
            isPercent={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
    console.log(asFragment());
  });
  it('renders the "below 90 percentile"', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueSubText
            value={89}
            isAboveThresh={false}
            threshold={90}
            isPercent={false}
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
            isPercent={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('test that the unit suffix renders correctly', ()=> {
  it('renders correctly when the value is a percentile', () => {
    const lowLife:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      value: 97,
      isDisadvagtaged: true,
      isPercent: false,
      threshold: 20,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            indicator={lowLife}
            displayStat={90}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders correctly when the value is a percent', () => {
    const lowLife:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      value: 97,
      isDisadvagtaged: true,
      isPercent: true,
      threshold: 20,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            indicator={lowLife}
            displayStat={90}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders correctly when the value is a null', () => {
    const lowLife:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      value: null,
      isDisadvagtaged: true,
      isPercent: false,
    };

    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValue
            indicator={lowLife}
            displayStat={null}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
