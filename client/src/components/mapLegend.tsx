import React from 'react';
import * as styles from './mapLegend.module.scss';

const MapLegend = () => {
  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.legendHeader}>COLOR KEY</h3>
      <div className={styles.swatchContainer}>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.prioritized} />
          <span>Prioritized Community</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.threshold} />
          <span>Threshold Community</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.nonPrioritized} />
          <span>Non-Prioritized Community</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
