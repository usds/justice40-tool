import React from 'react';
import {render} from '@testing-library/react';
import J40Header from './J40Header';
import {LocalizedComponent} from '../test/testHelpers';

describe('J40Header', () => {
  it('renders correctly', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <J40Header/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
