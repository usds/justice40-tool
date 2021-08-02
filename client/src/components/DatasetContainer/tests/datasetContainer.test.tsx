import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import DatasetContainer from '../../DatasetContainer';

describe('rendering of the DatasetContainer', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DatasetContainer />
      </LocalizedComponent>,
  );

  it('checks if various text fields are visible', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
