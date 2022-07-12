import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import LayerSelector from './LayerSelector';

describe('rendering of the LayerSelector', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <LayerSelector />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
