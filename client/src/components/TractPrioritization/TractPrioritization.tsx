import React from 'react';

import * as styles from './TractPrioritization.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

interface ITractPrioritization {
  scoreNCommunities: boolean,
  tribalCountAK: number | null,
  tribalCountUS: number | null,
  percentTractTribal: number | null,
}

/**
 * This component will return the appropriate designation for the tract's prioritization
 *
 * @param {boolean} scoreNCommunities
 * @param {number | null} tribalCountAK
 * @param {number | null} tribalCountUS
 * @param {number | null} percentTractTribal
 * @return {JSX}
 */
const TractPrioritization = (
    {scoreNCommunities,
      tribalCountAK,
      tribalCountUS,
      percentTractTribal}:ITractPrioritization) => {
  if (scoreNCommunities === true) {
    return <h3 className={styles.invert}>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>;
  } else {
    if (percentTractTribal === null && tribalCountAK === null && tribalCountUS === null) {
      return <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>;
    } else {
      return <h3 className={styles.invert}>{EXPLORE_COPY.COMMUNITY.PARTIAL}</h3>;
    }
  }
};

export default TractPrioritization;
