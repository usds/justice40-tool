import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractPrioritization from './TractPrioritization';

describe('rendering of TractPrioritization Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <TractPrioritization />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
