import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import MethodologyFormula from './MethodologyFormula';

describe('rendering of the MethodologyFormula', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <MethodologyFormula />
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
