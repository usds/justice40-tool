import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Language from './Language';

describe('rendering of the Language', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Language />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
