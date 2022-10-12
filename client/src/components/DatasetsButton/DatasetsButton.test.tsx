import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DatasetsButton from './DatasetsButton';

describe('rendering of DatasetsButton Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DatasetsButton />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
