import * as React from 'react';
import {render} from '@testing-library/react';
import Index from './index';
import {LocalizedComponent} from '../test/testHelpers';

jest.spyOn(console, 'error').mockImplementation(() => {});

afterAll(() => {
  // Restore mock after all tests are done, so it won't affect other test suites
  jest.resetAllMocks();
});

describe('rendering of the component', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Index location={window.location}/>
      </LocalizedComponent>,
  );

  it(`should not contain 'undefined" anywhere`, () => {
    expect(asFragment()).not.toContain('undefined');
  });

  it('No console errors', () => {
    expect(global.console.error).toBeCalledTimes(0);
  });
});

