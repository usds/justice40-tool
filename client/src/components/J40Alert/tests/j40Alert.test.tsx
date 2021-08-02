import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import J40Alert from '../../J40Alert';

describe('rendering of the J40Alert', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <J40Alert />
      </LocalizedComponent>,
  );

  it('checks if various text fields are visible', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
