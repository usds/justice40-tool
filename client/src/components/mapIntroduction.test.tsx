import * as React from 'react';
import {render, screen} from '@testing-library/react';
import MapIntroduction from './mapIntroduction';

describe('rendering of the component', () => {
  render(<MapIntroduction />);

  it('renders the title', () => {
    expect(screen.getByRole('banner')).toHaveTextContent('Zoom and select a census block group to view data');
  });
});
