import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PublicEvent from './PublicEvent';

import * as PUBLIC_ENG_COPY from '../../data/copy/publicEngage';

describe('rendering of the PublicEvent', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <PublicEvent event={PUBLIC_ENG_COPY.EVENTS[0]}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
