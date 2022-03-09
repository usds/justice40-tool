import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import {indicatorInfo} from '../AreaDetail/AreaDetail';

import * as styles from './Indicator.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

// @ts-ignore
import downArrow from '/node_modules/uswds/dist/img/usa-icons/arrow_downward.svg';
// @ts-ignore
import upArrow from '/node_modules/uswds/dist/img/usa-icons/arrow_upward.svg';

interface IIndicator {
    indicator: indicatorInfo,
}

export const getDisplayValue = (percentile: number | null) => {
  return percentile !== null ? Math.round(percentile * 100) : EXPLORE_COPY.SIDE_PANEL_VALUES.UNAVAILABLE;
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
  const intl = useIntl();

  const indicatorPercentile = {
    value: getDisplayValue(indicator.value),
    isAvailable: getDisplayValue(indicator.value) === EXPLORE_COPY.SIDE_PANEL_VALUES.UNAVAILABLE ?
      false : true,
  };
  const displayValue = getDisplayValue(indicator.value);
  const threshold = indicator.threshold ? indicator.threshold : 90;
  const isArrowUp = indicatorPercentile.value > threshold;

  return (
    <li
      className={indicator.isDisadvagtaged ? styles.disadvantagedIndicator : styles.indicatorBoxMain}
      data-cy={'indicatorBox'}
      data-testid='indicator-box'>
      <div className={styles.indicatorRow}>
        <div className={styles.indicatorName}>
          {indicator.label}
          <div className={styles.indicatorDesc}>
            {indicator.description}
          </div>
        </div>
        <div className={styles.indicatorValueCol}>
          <div className={styles.indicatorValueRow}>
            <div className={styles.indicatorValue}>
              {displayValue}
              {indicator.isPercent ?
                <span>{`%`}</span> :
                <sup className={styles.indicatorSuperscript}>
                  <span>{getSuperscriptOrdinal(displayValue)}</span>
                </sup>
              }
            </div>
            <div className={styles.indicatorArrow}>
              {indicatorPercentile.isAvailable && (isArrowUp ?
              <img
                src={upArrow}
                alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_UP)}
              /> :
              <img
                src={downArrow}
                alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_DOWN)}
              />
              )}
            </div>
          </div>
          <div className={styles.indicatorValueSubText}>
            {indicatorPercentile.isAvailable ?
              <div>
                {isArrowUp ? EXPLORE_COPY.SIDE_PANEL_VALUES.ABOVE : EXPLORE_COPY.SIDE_PANEL_VALUES.BELOW}
                {`${indicator.threshold ? indicator.threshold : 90}`}
                {/* Todo ticket 582 */}
                {!indicator.isPercent && `th`}
              </div> :
              <div>
                {EXPLORE_COPY.SIDE_PANEL_VALUES.UNAVAILBLE_MSG}
              </div>
            }
            {indicatorPercentile.isAvailable &&
              <div>
                {indicator.isPercent ?
                  EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENT :
                  EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENTILE
                }
              </div>
            }
          </div>
        </div>
      </div>
    </li>
  );
};

export default Indicator;
