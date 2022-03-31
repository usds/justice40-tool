import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import RequestForInfo from './RequestForInfo';

describe('rendering of the RequestForInfo', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <RequestForInfo/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
