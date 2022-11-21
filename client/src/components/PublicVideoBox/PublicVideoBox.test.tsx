import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PublicVideoBox from './PublicVideoBox';

describe('rendering of the PublicVideoBox', () => {
  it('checks if component renders when it is in beta', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <PublicVideoBox isBeta={true} />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if component renders when it is NOT in beta', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <PublicVideoBox isBeta={false} />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
