import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import ReleaseUpdate from './ReleaseUpdate';

describe('rendering of ReleaseUpdate Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <ReleaseUpdate />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
