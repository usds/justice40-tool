import React from 'react';

import * as styles from './TractPrioritization.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

interface ITractPrioritization {
  totalCategoriesPrioritized: number
  isDonut: boolean,
  percentTractTribal: number | null,
}

/**
 * This component will return the appropriate designation for the tract's prioritization
 *
 * @param {number} totalCategoriesPrioritized
 * @param {boolean} isDonut
 * @param {number} percentTractTribal
 * @return {JSX}
 */
const TractPrioritization = (
    {totalCategoriesPrioritized, isDonut, percentTractTribal}:ITractPrioritization) => {
  if (totalCategoriesPrioritized >= 1) {
    return <h3 className={styles.invert}>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>;
  } else if (totalCategoriesPrioritized === 0 && isDonut === true) {
    return <h3 className={styles.invert}>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>;
  } else if (
    totalCategoriesPrioritized === 0 &&
    isDonut === false &&
    percentTractTribal !== null &&
    percentTractTribal >= 0) {
    return <h3>{EXPLORE_COPY.COMMUNITY.PARTIAL}</h3>;
  } else if (percentTractTribal !== null) {
    return <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>;
  } else {
    return <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>;
  }
};

export default TractPrioritization;
