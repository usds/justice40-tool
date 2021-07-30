import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import DatasetCard from '../../DatasetCard';

import {cards} from '../../DatasetContainer/index';

describe('rendering of the DatasetCard', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DatasetCard key={0} datasetCardProps={cards[0]}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
