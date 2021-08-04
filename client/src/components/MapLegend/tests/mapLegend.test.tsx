import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import MapLegend from '../index';
import * as constants from '../../../data/constants';

describe('rendering of the MapLegend', () => {
  const {getAllByText} = render(
      <LocalizedComponent>
        <MapLegend />
      </LocalizedComponent>,
  );

  // Snapshot testing was unusable as the Tooltip lib rendered hash based class
  // names on each render
  it('checks if various objects in the component rendered', () => {
    expect(getAllByText(constants.PRIORITIZED_COMMUNITY)[0]).toHaveTextContent(constants.PRIORITIZED_COMMUNITY);
    expect(getAllByText(constants.PRIORITIZED_COMMUNITY)[1]).toHaveTextContent(constants.PRIORITIZED_COMMUNITY);
    expect(getAllByText(constants.THRESHOLD_COMMUNITY)[0]).toHaveTextContent(constants.THRESHOLD_COMMUNITY);
    expect(getAllByText(constants.THRESHOLD_COMMUNITY)[1]).toHaveTextContent(constants.THRESHOLD_COMMUNITY);
  });
});
