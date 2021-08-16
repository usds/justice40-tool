import * as React from 'react';
import {render} from '@testing-library/react';
import Index from './index';
import {LocalizedComponent} from '../test/testHelpers';

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation((...params) => {
    console.error(params);
  });
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
    expect(console.error).toBeCalledTimes(0);
  });
});
