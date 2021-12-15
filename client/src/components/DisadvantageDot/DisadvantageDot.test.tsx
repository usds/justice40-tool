import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DisadvantageDot from './DisadvantageDot';

describe('rendering of the DisadvantageDot disadvantaged', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DisadvantageDot isDisadvantaged={true}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
