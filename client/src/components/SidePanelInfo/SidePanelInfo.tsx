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
      <header className={styles.sidePanelInfoHeading}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.TITLE)}
      </header>
      <p>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA1)}
      </p>
      <img className={styles.sidePanelInfoIcon}
        src={puzzle}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON1)}
      />
      <p>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA2)}
      </p>
      <img className={styles.sidePanelInfoIcon}
        src={bellCurve}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON2)}
      />
      <p>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA3)}
      </p>
      <img className={styles.sidePanelInfoIcon}
        src={pieChart}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON3)}
      />
      <p>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.PARA4)}
      </p>
      <img className={styles.sidePanelInfoIcon}
        src={upDown}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.ALT_TEXT_ICON4)}
      />
      <p>
        {EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE_PARA5}
      </p>
    </aside>
  );
};

export default MapIntroduction;
