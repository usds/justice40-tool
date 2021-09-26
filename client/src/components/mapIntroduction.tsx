import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

// @ts-ignore
import lightbulbIcon from '/node_modules/uswds/dist/img/usa-icons/lightbulb_outline.svg';
import * as styles from './mapIntroduction.module.scss';
import * as EXPLORE_COPY from '../data/copy/explore';

const MapIntroduction = () => {
  const intl = useIntl();

  return (
    <aside className={styles.mapIntroContainer}>
      <header className={styles.mapIntroHeader}>
        {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.TITLE)}
      </header>
      <div className={styles.mapIntroText}>
        <img className={styles.mapIntroLightbulb} src={lightbulbIcon} />
        <div className={styles.didYouKnowBox}>
          <div className={styles.didYouKnow}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.DID_YOU_KNOW)}
          </div>
          <cite className={styles.didYouKnowText}>
            {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INITIAL_STATE.CBG_DEFINITION)}
          </cite>
        </div>
      </div>
    </aside>
  );
};

export default MapIntroduction;
