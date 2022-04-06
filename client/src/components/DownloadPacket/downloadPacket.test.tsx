import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DownloadPacket from './DownloadPacket';

describe('download packet component defined', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DownloadPacket />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

