import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Language from './Language';

describe('rendering of the Language component on mobile', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Language isDesktop={false}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('rendering of the Language component on desktop', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Language isDesktop={true}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
