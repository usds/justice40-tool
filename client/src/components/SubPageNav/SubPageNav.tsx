import React from 'react';
import {SideNav} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import LinkTypeWrapper from '../LinkTypeWrapper';
import {PAGES_ENDPOINTS} from '../../data/constants';
import * as COMMON_COPY from '../../data/copy/common';

// This prop is used to set which sub-page navigation is active
interface ISubPageNav {
    activeSubPageIndex?: number;
}

const SubPageNav = ({activeSubPageIndex}:ISubPageNav) => {
  const intl = useIntl();

  const subPages = [
    <LinkTypeWrapper
      key={0}
      className={activeSubPageIndex === 1 ? 'usa-current' : ''}
      url={PAGES_ENDPOINTS.METHODOLOGY}
      internal={true}
      linkText={intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
    />,
    <LinkTypeWrapper
      key={1}
      className={activeSubPageIndex === 2 ? 'usa-current' : ''}
      url={PAGES_ENDPOINTS.DOWNLOADS}
      internal={true}
      linkText={intl.formatMessage(COMMON_COPY.HEADER.DOWNLOADS)}
    />,
  ];

  return (
    <SideNav items={subPages}/>
  );
};

export default SubPageNav;
