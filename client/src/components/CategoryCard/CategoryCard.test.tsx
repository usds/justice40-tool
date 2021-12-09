import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import CategoryCard from './CategoryCard';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';

describe('rendering of the CategoryCard', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <CategoryCard categoryInfo={METHODOLOGY_COPY.CATEGORIES.CLIMATE_CHANGE}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
