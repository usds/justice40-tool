import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import MapSearchMessage from './MapSearchMessage';

describe('rendering of the MapSearchMessage when search results are empty', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <MapSearchMessage isSearchEmpty={true}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('rendering of the MapSearchMessage when search results are not empty', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <MapSearchMessage isSearchEmpty={false}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
