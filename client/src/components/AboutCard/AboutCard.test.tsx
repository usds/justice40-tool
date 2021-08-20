import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import AboutCard from './AboutCard';

describe('rendering of the AboutCard', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <AboutCard
          imgSrc={'about:blank'}
          header={'Test Header'}
          actionText={'Test Action'}
          actionUrl={'#'}>
        Content body of the action card.
        </AboutCard>
      </LocalizedComponent>,
  );

  it('checks if component renders', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
