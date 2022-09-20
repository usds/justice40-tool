import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

// @ts-ignore
import plusIcon from '/node_modules/uswds/dist/img/usa-icons/add.svg';
// @ts-ignore
import searchIcon from '/node_modules/uswds/dist/img/usa-icons/search.svg';
// @ts-ignore
import locateIcon from '/node_modules/uswds/dist/img/usa-icons/my_location.svg';
// @ts-ignore
import puzzleIcon from '../../images/sidePanelIcons/puzzle.svg';
// @ts-ignore
import bellCurveIcon from '../../images/sidePanelIcons/bellCurve.svg';
// @ts-ignore
import pieChartIcon from '../../images/sidePanelIcons/pieChart.svg';
// @ts-ignore
import notAvailIcon from '/node_modules/uswds/dist/img/usa-icons/do_not_disturb.svg';

import * as styles from './SidePanelInfo.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

const SidePanelInfo = () => {
  const intl = useIntl();

  return (
    <aside className={styles.sidePanelInfoContainer}>

      {/* Heading 1 */}
      <header tabIndex={0} className={styles.sidePanelInfoTitle}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.HEADING1)}
      </header>

      {/* Paragraph 1 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART1)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={plusIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PLUS)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART2)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={searchIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.SEARCH)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART3)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={locateIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.LOCATE)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART4)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={notAvailIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.MOUSE)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1_PART5)}
      </p>

      {/* Heading 2 */}
      <p tabIndex={0} className={styles.sidePanelInfoHeading}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.HEADING2)}
      </p>

      {/* Paragraph 2 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART1)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={puzzleIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.TRACT)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2_PART2)}
      </p>

      {/* Paragraph 3 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA3_PART1)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={notAvailIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.DAC_CIRCLE)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA3_PART2)}
      </p>

      {/* Paragraph 4 */}
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART1)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={bellCurveIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.BELL_CURVE)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART2)}
        <img tabIndex={0} className={styles.sidePanelInfoIcon} src={pieChartIcon}
          alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INIT_STATE_ICON_ALT_TEXT.PIE_CHART)}
        />
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4_PART3)}
      </p>

      {/* Paragraph 5 */}
      <p tabIndex={0}>
        {EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE_PARA5}
      </p>

    </aside>
  );
};

export default SidePanelInfo;
