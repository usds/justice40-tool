import * as React from 'react';
import {render, screen} from '@testing-library/react';
import MapIntroduction from './mapIntroduction';

describe('rendering of the component', () => {
  render(<MapIntroduction />);

  it('renders the title', () => {
    screen.getByRole('row', {name: /Zoom and select/i});
  });
});
