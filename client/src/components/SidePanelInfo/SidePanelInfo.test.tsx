import * as React from 'react';
import {render} from '@testing-library/react';
import SidePanelInfo from './SidePanelInfo';
import {LocalizedComponent} from '../../test/testHelpers';

describe('rendering of the component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <SidePanelInfo />
      </LocalizedComponent>,
  );

  it('expects the render to match snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
