import * as React from 'react';
import {render} from '@testing-library/react';
import ScoreStepsList from './scoreStepsList';
import {LocalizedComponent} from '../test/testHelpers';

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation((...params) => {
    console.error(params);
  });
});

describe('rendering of the component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <ScoreStepsList/>
      </LocalizedComponent>,
  );

  it('should match the snapshot of the MapIntroduction component', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('No console errors', () => {
    expect(console.error).toBeCalledTimes(0);
  });
});
