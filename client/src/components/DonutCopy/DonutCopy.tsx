import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './DonutCopy.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

export interface IDonutCopyProps {
  isAdjacent: boolean
  povertyBelow200Percentile: number
}

const DonutCopy = ({isAdjacent, povertyBelow200Percentile}: IDonutCopyProps) => {
  const intl = useIntl();

  return (
    <div className={styles.donutCopyContainer}>
      <div className={styles.donutRow}>
        <div className={styles.donutRowLabel}>{intl.formatMessage(EXPLORE_COPY.DONUT_COPY.COMP_SURR)}</div>
        <div className={isAdjacent ? styles.invert : ''}>
          {isAdjacent ? EXPLORE_COPY.COMMUNITY.OF_FOCUS : EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}
        </div>
      </div>
      <div className={styles.donutRow}>
        <div className={styles.donutRowLabel}>{intl.formatMessage(EXPLORE_COPY.DONUT_COPY.ADJ_LOW_INC)}</div>
        <div className={isAdjacent ? styles.invert : ''}>
          {povertyBelow200Percentile}
        </div>
      </div>
    </div>
  );
};

export default DonutCopy;
