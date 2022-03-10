import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import {indicatorInfo} from '../AreaDetail/AreaDetail';

import * as styles from './Indicator.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

// @ts-ignore
import downArrow from '/node_modules/uswds/dist/img/usa-icons/arrow_downward.svg';
// @ts-ignore
import upArrow from '/node_modules/uswds/dist/img/usa-icons/arrow_upward.svg';
// @ts-ignore
import unAvailable from '/node_modules/uswds/dist/img/usa-icons/do_not_disturb.svg';

interface IIndicator {
    indicator: indicatorInfo,
}

interface IIndicatorValueIcon {
  value: number | null,
  isAboveThresh: boolean,
};

interface IIndicatorValueSubText {
  isAvailable: boolean,
  isAboveThresh: boolean,
  threshold: number,
  isPercent: boolean | undefined,
}


/**
 * This component will determine what indicator's icon should be (arrowUp, arrowDown or unavailable) and
 * return the appropriate JSX.
 *
 * @param {number | null} props
 * @return {JSX.Element}
 */
export const IndicatorValueIcon = ({value, isAboveThresh}: IIndicatorValueIcon) => {
  const intl = useIntl();

  if (value) {
    return isAboveThresh ?
      <img
        src={upArrow}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_UP)}
      /> :
      <img
        src={downArrow}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_DOWN)}
      />;
  } else {
    return <img className={styles.unavailable}
      src={unAvailable}
      alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.UNAVAILABLE)}
    />;
  }
};

/**
   * This component will determine the sub-text of the indicator's value, some examples could be
   *   "above 90th percentile"
   *   "below 20 percent"
   *   "data is not available"
   *
   * @return {JSX.Element}
   */
export const IndicatorValueSubText = ({isAvailable, isAboveThresh, threshold, isPercent}:IIndicatorValueSubText) => {
  return isAvailable ?
    <React.Fragment>
      <div>
        {
          isAboveThresh ?
          EXPLORE_COPY.SIDE_PANEL_VALUES.ABOVE :
          EXPLORE_COPY.SIDE_PANEL_VALUES.BELOW
        }
        {`${threshold ? threshold : 90}`}

        {!isPercent && `th`}
      </div>
      <div>
        {
          isPercent ?
          EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENT :
          EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENTILE
        }
      </div>
    </React.Fragment> :
    <div>
      {EXPLORE_COPY.SIDE_PANEL_VALUES.UNAVAILBLE_MSG}
    </div>;
};


// Todo: Add internationalization to superscript ticket #582
export const getSuperscriptOrdinal = (percentile: number | string | null) => {
  if (percentile === null) return '';
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

/**
 * This component will return the list element which will be the indicator row in the side panel
 *
 * @param {IIndicator} indicator
 * @return {JSX.Element}
 */
const Indicator = ({indicator}:IIndicator) => {
  // Convert the decimal value to a stat to display
  const displayStat = indicator.value !== null ? Math.round(indicator.value * 100) : null;

  // Some indicators have a threshold that is not 90
  const threshold = indicator.threshold ? indicator.threshold : 90;

  /**
   * An indicator statistic (percent or percentile) object with the value, if it is available and if
   * it's above or below the threshold
   */
  const indicatorStatistic = {
    value: displayStat,
    isAvailable: displayStat ? true : false,
    isAboveThresh: displayStat && displayStat > threshold ? true : false,
  };

  return (
    <li
      className={indicator.isDisadvagtaged ? styles.disadvantagedIndicator : styles.indicatorBoxMain}
      data-cy={'indicatorBox'}
      data-testid='indicator-box'>
      <div className={styles.indicatorRow}>

        {/* Indicator name and description*/}
        <div className={styles.indicatorName}>
          {indicator.label}
          <div className={styles.indicatorDesc}>
            {indicator.description}
          </div>
        </div>

        {/* Indicator value, icon and subtext */}
        <div className={styles.indicatorValueCol}>
          <div className={styles.indicatorValueRow}>

            {/* Indicator value */}
            <div className={styles.indicatorValue}>
              {indicatorStatistic.value}
              {indicator.isPercent ?
                <span>{`%`}</span> :
                <sup className={styles.indicatorSuperscript}>
                  <span>{getSuperscriptOrdinal(indicatorStatistic.value)}</span>
                </sup>
              }
            </div>

            {/* Indicator icon - up arrow, down arrow, or unavailable */}
            <div className={styles.indicatorArrow}>
              <IndicatorValueIcon
                value={indicatorStatistic.value}
                isAboveThresh={indicatorStatistic.isAboveThresh}
              />
            </div>
          </div>

          {/* Indicator sub-text */}
          <div className={styles.indicatorValueSubText}>
            <IndicatorValueSubText
              isAvailable={indicatorStatistic.isAvailable}
              isAboveThresh={indicatorStatistic.isAboveThresh}
              threshold={threshold}
              isPercent={indicator.isPercent}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Indicator;
