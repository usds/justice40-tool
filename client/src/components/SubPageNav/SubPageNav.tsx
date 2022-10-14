import React from 'react';
import {SideNav} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import LinkTypeWrapper from '../LinkTypeWrapper';
import {PAGES_ENDPOINTS} from '../../data/constants';
import * as COMMON_COPY from '../../data/copy/common';

import * as styles from './SubPageNav.module.scss';

// This prop is used to set which sub-page navigation is active
interface ISubPageNav {
    activeSubPageIndex?: number;
    endPoints: string[];
}
/**
 * This function will take in an endpoint (last segment of the app's URL) and return the appropriate
 * string to find the i18n label
 *
 * @param {string} endPoint
 * @return {string}
 */
const getPageConstant = (endPoint:string) => {
  const intl = useIntl();

  if (endPoint === PAGES_ENDPOINTS.EXPLORE) {
    return intl.formatMessage(COMMON_COPY.HEADER.EXPLORE);
  } else if (endPoint === PAGES_ENDPOINTS.METHODOLOGY) {
    return intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY);
  } else if (endPoint == PAGES_ENDPOINTS.DOWNLOADS) {
    return intl.formatMessage(COMMON_COPY.HEADER.DOWNLOADS);
  } else if (endPoint == PAGES_ENDPOINTS.TSD) {
    return intl.formatMessage(COMMON_COPY.HEADER.TSD);
  } else if (endPoint == PAGES_ENDPOINTS.ABOUT) {
    return intl.formatMessage(COMMON_COPY.HEADER.ABOUT);
  } else if (endPoint === PAGES_ENDPOINTS.FAQS) {
    return intl.formatMessage(COMMON_COPY.HEADER.FAQS);
  } else if (endPoint == PAGES_ENDPOINTS.PUBLIC_ENG) {
    return intl.formatMessage(COMMON_COPY.HEADER.PUBLIC_ENG);
  } else if (endPoint == PAGES_ENDPOINTS.CONTACT) {
    return intl.formatMessage(COMMON_COPY.HEADER.CONTACT);
  } else if (endPoint == PAGES_ENDPOINTS.PREVIOUS_VERSIONS) {
    return intl.formatMessage(COMMON_COPY.HEADER.PREVIOUS_VERSIONS);
  };
};
/**
 * The main component. It will take in an array of endpoints that the sub-nan should navigate to. It will
 * also take an optional prop that will determine which sub-nav link should be highlighted when the page
 * loads. If the activeSubPageIndex is not provided, it will default to the first index to highlight the
 * first endpoint in the array.
 *
 * @param {number} activeSubPageIndex
 * @param {string[]} endPoints
 * @return {JSX}
 */
const SubPageNav = ({activeSubPageIndex = 0, endPoints}:ISubPageNav) => {
  const subPages = endPoints.map((endPoint, index) =>
    <LinkTypeWrapper
      key={index}
      className={activeSubPageIndex === index ? 'usa-current' : ''}
      url={endPoint}
      internal={true}
      linkText={getPageConstant(endPoint)}
    />,
  );

  // const subPages = [
  //   <LinkTypeWrapper
  //     key={0}
  //     className={activeSubPageIndex === 1 ? 'usa-current' : ''}
  //     url={PAGES_ENDPOINTS.METHODOLOGY}
  //     internal={true}
  //     linkText={intl.formatMessage(COMMON_COPY.HEADER.METHODOLOGY)}
  //   />,
  //   <LinkTypeWrapper
  //     key={1}
  //     className={activeSubPageIndex === 2 ? 'usa-current' : ''}
  //     url={PAGES_ENDPOINTS.DOWNLOADS}
  //     internal={true}
  //     linkText={intl.formatMessage(COMMON_COPY.HEADER.DOWNLOADS)}
  //   />,
  // ];

  return (
    <div className={styles.subPageNavContainer}>
      <SideNav items={subPages}/>
    </div>
  );
};

export default SubPageNav;
