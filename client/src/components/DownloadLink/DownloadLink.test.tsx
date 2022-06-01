import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DownloadLink from './DownloadLink';

describe('rendering of the DownloadLink disadvantaged', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DownloadLink href="https://google.com" linkText="Google"/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
