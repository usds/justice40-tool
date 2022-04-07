import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PublicEngagementPage from '../public-engagement';

describe('rendering of the DatasetContainer', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <PublicEngagementPage location={window.location}/>
      </LocalizedComponent>,
  );

  it('checks if various text fields are visible', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
