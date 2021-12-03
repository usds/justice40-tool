import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import MapSearch from './MapSearch';

describe('rendering of the MapSearch', () => {
  const mockGoToPlace = jest.fn((x) => x);

  const {asFragment} = render(
      <LocalizedComponent>
        <MapSearch goToPlace={mockGoToPlace}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
