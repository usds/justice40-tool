import * as React from 'react';
import {render, screen} from '@testing-library/react';
import MapIntroduction from './mapIntroduction';
import {LocalizedComponent} from '../../src/test/testHelpers';

describe('rendering of the component', () => {
  render(
      <LocalizedComponent>
        <MapIntroduction />
      </LocalizedComponent>,
  );

  it('renders the title', () => {
    expect(screen.getByRole('banner')).toHaveTextContent('Zoom and select a census tract to view data');
  });
});
