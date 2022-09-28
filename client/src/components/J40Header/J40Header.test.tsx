import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import J40Header from './J40Header';

describe('rendering of the J40Header', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <J40Header location={location}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
