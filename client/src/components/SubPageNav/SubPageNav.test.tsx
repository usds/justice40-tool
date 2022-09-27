import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import SubPageNav from './SubPageNav';

describe('rendering of the SubPageNav', () => {
  it('checks SubPageNav renders', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <SubPageNav endPoints={[
            '/methodology',
            '/download',
          ]}/>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
