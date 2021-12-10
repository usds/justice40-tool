import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import LowIncome from './LowIncome';

describe('rendering of the LowIncome', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <LowIncome />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
