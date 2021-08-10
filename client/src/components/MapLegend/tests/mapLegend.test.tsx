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

  const intlPriorityLabel = constants.EXPLORE_TOOL_PAGE_TEXT.PRIORITY_LABEL.defaultMessage;
  const intlThresholdLabel = constants.EXPLORE_TOOL_PAGE_TEXT.THRESHOLD_LABEL.defaultMessage;

  it('checks if various objects in the component rendered', () => {
    expect(getAllByText(intlPriorityLabel)[0]).toHaveTextContent(intlPriorityLabel);
    expect(getAllByText(intlThresholdLabel)[0]).toHaveTextContent(intlThresholdLabel);
  });
});
