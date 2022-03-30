import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import ExceedBurden from './ExceedBurden';
import * as EXPLORE_COPY from '../../data/copy/explore';

describe('test rendering of Exceeds one or more burdens when', () => {
  it('is burdended', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <ExceedBurden text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_ONE_OR_MORE} isBurdened={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('is NOT burdended', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <ExceedBurden text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_ONE_OR_MORE} isBurdened={false}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('test rendering of Exceeds both socioeco burdens when', () => {
  it('is burdended', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <ExceedBurden text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_ONE_OR_MORE} isBurdened={true}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('is NOT burdended', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <ExceedBurden text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_BOTH_SOCIO} isBurdened={false}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
