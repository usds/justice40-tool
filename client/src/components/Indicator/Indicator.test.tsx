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
  it('renders the unavailable icon when the value is null', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <IndicatorValueIcon
            value={null}
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
  it(`renders missing data `, () => {
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

describe('renders value correctly for historic underinvest.', () => {
  it('checks if it renders when HRS_ET = true', () => {
    const historicUnderinvest:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: true,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={historicUnderinvest}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if it renders when HRS_ET = false:', () => {
    const historicUnderinvest:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: false,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={historicUnderinvest}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if it renders nothin when HRS_ET = null:', () => {
    const historicUnderinvest:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: null,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={historicUnderinvest}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('renders value correctly for abandoned land mines', () => {
  it('checks if it renders when AML_RAW = true', () => {
    const abandonMines:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: true,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={abandonMines}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if it renders when AML_RAW = false:', () => {
    const abandonMines:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: false,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={abandonMines}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if it renders nothin when AML_RAW = null:', () => {
    const abandonMines:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: null,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={abandonMines}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('renders value correctly for Former defense sites', () => {
  it('checks if it renders when FUDS_RAW = true', () => {
    const formerDefSites:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: true,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={formerDefSites}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if it renders when FUDS_RAW = false:', () => {
    const formerDefSites:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: false,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={formerDefSites}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if it renders nothin when FUDS_RAW = null:', () => {
    const formerDefSites:indicatorInfo = {
      label: 'some label',
      description: 'some description',
      type: 'boolean',
      value: null,
      isDisadvagtaged: true,
    };
    const {asFragment} = render(
        <LocalizedComponent>
          <Indicator indicator={formerDefSites}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
