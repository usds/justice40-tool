import React from 'react';
import { render } from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractDemographics from './TractDemographics';

describe('rendering of TractDemographics Component', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <TractDemographics />
        </LocalizedComponent>,
    );
    it('checks if component renders', () => {
      expect(asFragment()).toMatchSnapshot();
    });
});
