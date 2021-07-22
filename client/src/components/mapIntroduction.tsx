import React from 'react';
// @ts-ignore
import lightbulbIcon from '/node_modules/uswds/dist/img/usa-icons/lightbulb_outline.svg';
import * as styles from './mapIntroduction.module.scss';

const MapIntroduction = () => {
  return (
    <div className={styles.mapIntroContainer}>
      <h2>Zoom and select a census block group to view data</h2>
      <div className={styles.mapIntroText}>
        <img className={styles.mapIntroLightbulb} src={lightbulbIcon} />
        <div>
          <p> Did you know?</p>
          <p>A census block group is generally between 600 and 3,000 people. It is the smallest geographical unit for
          which the U.S. Census Bureau publishes sample data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapIntroduction;
