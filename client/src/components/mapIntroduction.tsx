import React from 'react';
// @ts-ignore
import lightbulbIcon from '/node_modules/uswds/dist/img/usa-icons/lightbulb_outline.svg';
import * as styles from './mapIntroduction.module.scss';

const MapIntroduction = () => {
  return (
    <aside className={styles.mapIntroContainer}>
      <header className={styles.mapIntroHeader}>Zoom and select a census block group to view data</header>
      <div className={styles.mapIntroText}>
        <img className={styles.mapIntroLightbulb} src={lightbulbIcon} />
        <div className={styles.didYouKnowBox}>
          <div className={styles.didYouKnow}> Did you know?</div>
          <cite className={styles.didYouKnowText}>
            A census block group is generally between 600 and 3,000 people. It is the smallest geographical unit for
            which the U.S. Census Bureau publishes sample data.
          </cite>
        </div>
      </div>
    </aside>
  );
};

export default MapIntroduction;
