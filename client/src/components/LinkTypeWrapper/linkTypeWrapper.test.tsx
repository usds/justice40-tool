import * as React from 'react';
import {render} from '@testing-library/react';
import LinkTypeWrapper from './index';
import {LocalizedComponent} from '../../test/testHelpers';

describe('testing all link types', () => {
  it('tests internal links', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <LinkTypeWrapper
            linkText={'test link text'}
            internal={true}
            url={'/methodology'}
            openUrlNewTab={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('tests external links same tab', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <LinkTypeWrapper
            linkText={'test link text'}
            internal={false}
            url={'www.usds.gov'}
            openUrlNewTab={true}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('tests external links new tab', () => {
    const {asFragment} = render(
        <LocalizedComponent>
          <LinkTypeWrapper
            linkText={'test link text'}
            internal={false}
            url={'www.usds.gov'}
            openUrlNewTab={false}
          />
        </LocalizedComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
