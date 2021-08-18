import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import J40Alert from '../index';

describe('rendering of the J40Alert', () => {
  it('tests the rendering of J40Alert without padding', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <J40Alert isPaddedLeft={false}/>
        </LocalizedComponent>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('tests the rendering of J40Alert with padding', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <J40Alert isPaddedLeft={true}/>
        </LocalizedComponent>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
