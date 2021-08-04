import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import HowYouCanHelp from '../index';

describe('rendering of the HowYouCanHelp', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <HowYouCanHelp />
      </LocalizedComponent>,
  );

  it('checks if various text fields are visible', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
