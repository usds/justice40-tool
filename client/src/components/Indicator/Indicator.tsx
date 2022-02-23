import React from 'react';
import {indicatorInfo} from '../AreaDetail/AreaDetail';

import * as styles from './Indicator.module.scss';

interface IIndicator {
    indicator: indicatorInfo,
}

export const readablePercentile = (percentile: number | null) => {
  return percentile !== null ? Math.round(percentile * 100) : 'N/A';
};

// Todo: Add internationalization to superscript ticket #582
export const getSuperscriptOrdinal = (percentile: number | string) => {
  if (typeof percentile === 'number') {
    const englishOrdinalRules = new Intl.PluralRules('en', {
      type: 'ordinal',
    });
    const suffixes = {
      zero: 'th',
      one: 'st',
      two: 'nd',
      few: 'rd',
      many: 'th',
      other: 'th',
    };
    return suffixes[englishOrdinalRules.select(percentile)];
  }
};

const Indicator = ({indicator}:IIndicator) => {
  return (
    <li
      className={indicator.isDisadvagtaged ? styles.disadvantagedIndicator : styles.indicatorBoxMain}
      data-cy={'indicatorBox'}>
      <div className={styles.indicatorRow}>
        <div className={styles.indicatorName}>
          {indicator.label}
          <div className={styles.indicatorDesc}>
            {indicator.description}
          </div>
        </div>
        <div className={styles.indicatorValue}>
          {readablePercentile(indicator.value)}
          {indicator.isPercent ?
            <span>{`%`}</span> :
            <sup className={styles.indicatorSuperscript}>
              <span>{getSuperscriptOrdinal(readablePercentile(indicator.value))}</span>
            </sup>
          }
        </div>
      </div>
    </li>
  );
};

export default Indicator;
