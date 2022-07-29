import React from 'react';
import { render } from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import TractInfo from './TractInfo';

describe('rendering of TractInfo Component', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <TractInfo />
        </LocalizedComponent>,
    );
    it('checks if component renders', () => {
      expect(asFragment()).toMatchSnapshot();
    });
});
