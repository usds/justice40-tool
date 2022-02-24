import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Indicator, {getDisplayValue} from './Indicator';
import {indicatorInfo} from '../AreaDetail/AreaDetail';

const highSchool:indicatorInfo = {
  label: 'some label',
  description: 'some description',
  value: 97,
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

describe('tests the getDisplayValue function', () => {
  expect(getDisplayValue(.98)).toEqual(98);
  expect(getDisplayValue(.07)).toEqual(7);
  expect(getDisplayValue(.123)).toEqual(12);
  expect(getDisplayValue(.789)).toEqual(79);
});
