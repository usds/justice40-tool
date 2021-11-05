import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import GovernmentBanner from './GovernmentBanner';

describe('rendering of the GovernmentBanner', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <GovernmentBanner />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
