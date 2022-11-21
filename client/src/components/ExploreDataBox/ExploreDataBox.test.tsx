import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import ExploreDataBox from './ExploreDataBox';

describe('rendering of ExploreDataBox Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <ExploreDataBox />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
