import * as React from 'react';
import {render} from '@testing-library/react';

import {LocalizedComponent} from '../../../test/testHelpers';
import MapLegend from '../index';


describe('rendering of the MapLegend', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <MapLegend />
      </LocalizedComponent>,
  );

  it('checks if snapshots have changed', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
