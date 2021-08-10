import * as React from 'react';
import {render} from '@testing-library/react';
import ScoreStepsList from './scoreStepsList';
import {LocalizedComponent} from '../test/testHelpers';

describe('rendering of the component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <ScoreStepsList/>
      </LocalizedComponent>,
  );

  it('should match the snapshot of the MapIntroduction component', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
