import * as React from 'react';
import {render, screen} from '@testing-library/react';
import DownloadPacket from './downloadPacket';

test('download packet component defined', () => {
  render(<DownloadPacket />);

  screen.getByRole('button', {name: /download packet/i});
});

