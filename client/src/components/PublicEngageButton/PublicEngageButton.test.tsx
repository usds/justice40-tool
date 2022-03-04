import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PublicEngageButton from './PublicEngageButton';

describe('rendering of the PublicEngageButton', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <PublicEngageButton/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
