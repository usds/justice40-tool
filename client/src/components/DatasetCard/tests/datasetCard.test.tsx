import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../../test/testHelpers';
import DatasetCard from '../../DatasetCard';

import * as METHODOLOGY_COPY from '../../../data/copy/methodology';

describe('rendering of indicator dataset card', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DatasetCard key={0} datasetCardProps={METHODOLOGY_COPY.INDICATORS[0]} additionalIndicator={false}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('rendering of addtional indicator dataset card', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <DatasetCard key={0} datasetCardProps={METHODOLOGY_COPY.ADDITIONAL_INDICATORS[0]} additionalIndicator={true}/>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
