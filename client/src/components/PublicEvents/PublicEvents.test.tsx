import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PublicEvents from './PublicEvents';

describe('rendering of the PublicEvents', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <PublicEvents />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
