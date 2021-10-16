import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import AboutCard from './AboutCard';

describe('rendering of the AboutCard', () => {
  it('checks if small cards component renders', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <AboutCard
            imgSrc={'about:blank'}
            header={'Test Header'}
            size={'small'}
            linkText={'Test Action'}
            url={'#'}>
          Content body of the action card.
          </AboutCard>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if large cards component renders', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <AboutCard
            imgSrc={'about:blank'}
            header={'Test Header'}
            size={'large'}
            linkText={'Test Action'}
            url={'#'}>
          Content body of the action card.
          </AboutCard>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if large cards component renders in new tab', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <AboutCard
            imgSrc={'about:blank'}
            header={'Test Header'}
            size={'large'}
            linkText={'Test Action'}
            openUrlNewTab={true}
            url={'#'}>
          Content body of the action card.
          </AboutCard>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('checks if large cards component renders as internal link', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <AboutCard
            imgSrc={'about:blank'}
            header={'Test Header'}
            size={'large'}
            linkText={'Test Action'}
            openUrlNewTab={false}
            internal={true}
            url={'#'}>
          Content body of the action card.
          </AboutCard>
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
