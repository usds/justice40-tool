import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PublicVideoBox from './PublicVideoBox';

describe('rendering of the PublicVideoBox', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <PublicVideoBox />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
