import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

// @ts-ignore
import puzzle from '../../images/sidePanelIcons/puzzle.svg';
// @ts-ignore
import bellCurve from '../../images/sidePanelIcons/bellCurve.svg';
// @ts-ignore
import pieChart from '../../images/sidePanelIcons/pieChart.svg';
// @ts-ignore
import upDown from '../../images/sidePanelIcons/upDown.svg';

import * as styles from './SidePanelInfo.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

const MapIntroduction = () => {
  const intl = useIntl();

  return (
    <aside className={styles.sidePanelInfoContainer}>

      <header tabIndex={0} className={styles.sidePanelInfoHeading}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.TITLE)}
      </header>
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1)}
      </p>
      <img tabIndex={0} className={styles.sidePanelInfoIcon}
        src={puzzle}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON1)}
      />
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2)}
      </p>
      <img tabIndex={0} className={styles.sidePanelInfoIcon}
        src={bellCurve}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON2)}
      />
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA3)}
      </p>
      <img tabIndex={0} className={styles.sidePanelInfoIcon}
        src={pieChart}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON3)}
      />
      <p tabIndex={0}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4)}
      </p>
      <img tabIndex={0} className={styles.sidePanelInfoIcon}
        src={upDown}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON4)}
      />
      <p tabIndex={0}>
        {EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE_PARA5}
      </p>
    </aside>
  );
};

export default MapIntroduction;
