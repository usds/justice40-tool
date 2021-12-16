import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import Category from './Category';

describe('rendering of the Category disadvantaged', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Category name={'test name'} isDisadvantaged={true}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('rendering of the Category non-disadvantaged', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Category name={'test name'} isDisadvantaged={false}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
