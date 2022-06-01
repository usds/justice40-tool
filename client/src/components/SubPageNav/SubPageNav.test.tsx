import * as React from 'react';
import {render} from '@testing-library/react';
import {LocalizedComponent} from '../../test/testHelpers';
import SubPageNav from './SubPageNav';

describe('rendering of the SubPageNav', () => {
  const firstLinkActive = 1;
  const secondLinkIndex = 2;

  it('checks if the first link is active', () => {
    const {container} = render(
        <LocalizedComponent>
          <SubPageNav activeSubPageIndex={firstLinkActive}/>
        </LocalizedComponent>,
    );

    const firstLink = container.querySelector(`.usa-sidenav li:nth-child(${firstLinkActive}) a`);
    const secondLink = container.querySelector(`.usa-sidenav li:nth-child(${secondLinkIndex}) a`);
    expect(firstLink?.className).toBe('usa-current');
    expect(secondLink?.className).not.toBe('usa-current');
  });

  it('checks if the second link is active', () => {
    const {container} = render(
        <LocalizedComponent>
          <SubPageNav activeSubPageIndex={secondLinkIndex}/>
        </LocalizedComponent>,
    );

    const firstLink = container.querySelector(`.usa-sidenav li:nth-child(${firstLinkActive}) a`);
    const secondLink = container.querySelector(`.usa-sidenav li:nth-child(${secondLinkIndex}) a`);
    expect(secondLink?.className).toBe('usa-current');
    expect(firstLink?.className).not.toBe('usa-current');
  });
});
