import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DownloadPacket from '.';

test('download packet component defined', () => {
  render(
      <LocalizedComponent>
        <DownloadPacket />
      </LocalizedComponent>,
  );

  screen.getByRole('button', {name: /download packet/i});
});

