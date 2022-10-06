import React from 'react';

import * as styles from './TractPrioritization.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

interface ITractPrioritization {
  totalCategoriesPrioritized: number
  isAdjacencyThreshMet: boolean,
  isAdjacencyLowIncome: boolean,
  tribalCountAK: number | null,
  tribalCountUS: number | null,
  percentTractTribal: number | null,
}

/**
 * This component will return the appropriate designation for the tract's prioritization
 *
 * @param {number} totalCategoriesPrioritized
 * @param {boolean} isAdjacencyThreshMet
 * @param {boolean} isAdjacencyLowIncome
 * @param {number | null} tribalCountAK
 * @param {number | null} tribalCountUS
 * @param {number | null} percentTractTribal
 * @return {JSX}
 */
const TractPrioritization = (
    {totalCategoriesPrioritized,
      isAdjacencyThreshMet,
      isAdjacencyLowIncome,
      tribalCountAK,
      tribalCountUS,
      percentTractTribal}:ITractPrioritization) => {
  if (totalCategoriesPrioritized === 0) {
    if (isAdjacencyThreshMet && isAdjacencyLowIncome) {
      return <h3 className={styles.invert}>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>;
    } else if (percentTractTribal === null && tribalCountAK === null && tribalCountUS === null) {
      return <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>;
    } else {
      return <h3>{EXPLORE_COPY.COMMUNITY.PARTIAL}</h3>;
    }
  } else {
    return <h3 className={styles.invert}>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>;
  }
};

export default TractPrioritization;
