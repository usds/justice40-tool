import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {useWindowSize} from 'react-use';

// @ts-ignore
import plusIcon from '/node_modules/uswds/dist/img/usa-icons/add.svg';
// @ts-ignore
import searchIcon from '/node_modules/uswds/dist/img/usa-icons/search.svg';
// @ts-ignore
import locateIcon from '/node_modules/uswds/dist/img/usa-icons/my_location.svg';
// @ts-ignore
import peopleIcon from '/node_modules/uswds/dist/img/usa-icons/people.svg';
// @ts-ignore
import fileUpIcon from '/node_modules/uswds/dist/img/usa-icons/file_upload.svg';
// @ts-ignore
import checkIcon from '/node_modules/uswds/dist/img/usa-icons/check.svg';
// @ts-ignore
import puzzleIcon from '../../images/sidePanelIcons/puzzle.svg';
// @ts-ignore
import bellCurveIcon from '../../images/sidePanelIcons/bell-curve.svg';
// @ts-ignore
import censusDotIcon from '../../images/sidePanelIcons/census-tract.svg';
// @ts-ignore
// import tribalDotIcon from '../../images/sidePanelIcons/tribal-tract.svg';
// @ts-ignore
import pieChartIcon from '../../images/sidePanelIcons/pie-chart.svg';
// @ts-ignore
// import handPointIcon from '../../images/sidePanelIcons/mouse-hand-point.svg';

import * as styles from './SidePanelInfo.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';

const SidePanelInfo = () => {
  const intl = useIntl();
  const {width: windowWidth} = useWindowSize();

  return (
    <aside className={styles.sidePanelInfoContainer}>

      {/* Heading 1 */}
      <header tabIndex={0} className={styles.sidePanelInfoTitle}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.HEADING1)}
      </header>

      {/* Paragraph 1 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART1)}
        {
          windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={plusIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PLUS)}
          />
        }
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART2)}
        {
          windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={searchIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.SEARCH)}
          />
        }
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART3)}
        {
          windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={locateIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.LOCATE)}
          />
        }
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART4)}
        {/* {
          windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={handPointIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.MOUSE)}
          />
        } */}
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART5)}
      </p>

      {/* Heading 2 */}
      <p tabIndex={0} className={styles.sidePanelInfoHeading}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.HEADING2)}
      </p>

      {/* Paragraph 2 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART1)}
        {
          windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={puzzleIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.TRACT)}
          />
        }
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART2)}
        {
          windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={peopleIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PEOPLE)}
          />
        }
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART3)}
      </p>

      {/* Paragraph 3 */}
      {
        windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
        <p tabIndex={0}>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA3_PART1)}
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={censusDotIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.DAC_CIRCLE)}
          />
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA3_PART2)}
        </p>
      }

      {/* Paragraph 4 */}
      {
        windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
        <p tabIndex={0}>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART1)}
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={bellCurveIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.BELL_CURVE)}
          />
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART2)}
        </p>
      }

      {/* Paragraph 5 */}
      {
        windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
       <p tabIndex={0}>
         {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART1)}
         <img tabIndex={0} className={styles.sidePanelInfoIcon} src={fileUpIcon}
           alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.FILE_UP)}
         />
         {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART2)}
         <img tabIndex={0} className={styles.sidePanelInfoIcon} src={pieChartIcon}
           alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PIE_CHART)}
         />
         {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART3)}
         <img tabIndex={0} className={styles.sidePanelInfoIcon} src={checkIcon}
           alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.CHECK)}
         />
         {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA5_PART4)}
       </p>
      }

      {/* Paragraph 6 */}
      {
        windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG &&
        <p tabIndex={0}>
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA6_PART1)}
          <img tabIndex={0} className={styles.sidePanelInfoIcon} src={censusDotIcon}
            alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.DAC_CIRCLE)}
          />
          {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA6_PART2)}
        </p>
      }
    </aside>
  );
};

export default SidePanelInfo;
