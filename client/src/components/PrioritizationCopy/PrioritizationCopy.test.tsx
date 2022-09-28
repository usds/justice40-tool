import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import PrioritizationCopy from './PrioritizationCopy';

describe('rendering of PrioritizationCopy Component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <PrioritizationCopy />
      </LocalizedComponent>,
  );
  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
