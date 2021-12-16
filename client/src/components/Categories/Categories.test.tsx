import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Categories from './Categories';

describe('rendering of the Categories', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Categories />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
