import React from 'react';
import {render} from '@testing-library/react';
import J40Footer from './J40Footer';
import {LocalizedComponent} from '../test/testHelpers';

describe('J40Footer', () => {
  it('renders correctly', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <J40Footer />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
