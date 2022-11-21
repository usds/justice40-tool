import React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import DonutCopy from './DonutCopy';

describe('rendering of DonutCopy Component', () => {
  it('checks if component renders when adjacency is false', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <DonutCopy
            isAdjacent={false}
            povertyBelow200Percentile={32}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('checks if component renders when adjacency is false', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <DonutCopy
            isAdjacent={true}
            povertyBelow200Percentile={32}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
