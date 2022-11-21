import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import {IndicatorValue, IndicatorValueSubText} from '../Indicator/Indicator';

import * as styles from './DonutCopy.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

export interface IDonutCopyProps {
  isAdjacent: boolean
  povertyBelow200Percentile: number | null
}

const DonutCopy = ({isAdjacent, povertyBelow200Percentile}: IDonutCopyProps) => {
  const intl = useIntl();
  const povBel200Percentile = povertyBelow200Percentile ?
    parseFloat((povertyBelow200Percentile*100).toFixed()) : null;
  const threshold = 50;

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
        <div className={styles.valueSubTextContainer}>
          <div className={
            isAdjacent && povBel200Percentile &&
            povBel200Percentile >= threshold ? styles.invert : styles.noInvert}>
            <IndicatorValue
              type={'percentile'}
              displayStat={povBel200Percentile}
            />
          </div>
          <div className={styles.subTextContainer}>
            <IndicatorValueSubText
              value={povBel200Percentile}
              isAboveThresh={povBel200Percentile && povBel200Percentile >= threshold ? true : false}
              threshold={threshold}
              type={'percentile'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutCopy;
