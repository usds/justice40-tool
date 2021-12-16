import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Indicator, {readablePercentile} from './Indicator';
import {indicatorInfo} from '../AreaDetail';

const highSchool:indicatorInfo = {
  label: 'some label',
  description: 'some description',
  value: 97,
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

describe('tests the readablePercentile function', () => {
  expect(readablePercentile(.98)).toEqual(98);
  expect(readablePercentile(.07)).toEqual(7);
  expect(readablePercentile(.123)).toEqual(12);
  expect(readablePercentile(.789)).toEqual(79);
});
