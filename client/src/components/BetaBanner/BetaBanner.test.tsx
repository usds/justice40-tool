import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import BetaBanner from './BetaBanner';

describe('rendering of the BetaBanner', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <BetaBanner />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
