import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import {indicatorInfo} from '../AreaDetail/AreaDetail';

import * as styles from './Indicator.module.scss';
import * as constants from '../../data/constants';
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
  value: number | null,
  isAboveThresh: boolean,
  threshold: number,
  isPercent: boolean | undefined,
}

interface IDisplayStatUnit {
  indicator: indicatorInfo,
  displayStat: number | null,
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

  if (value == null) {
    return <img className={styles.unavailable}
      src={unAvailable}
      alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.UNAVAILABLE)}
    />;
  } else {
    return isAboveThresh ?
      <img
        src={upArrow}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_UP)}
      /> :
      <img
        src={downArrow}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.ARROW_DOWN)}
      />;
  }
};

/**
 * This component will determine the sub-text of the indicator's value, some examples could be
 *   "above 90th percentile"
 *   "below 20 percent"
 *   "data is not available"
 *
 *  Todo: refactor into single component, add to i18n and add to tests
 *
 * @return {JSX.Element}
 */
export const IndicatorValueSubText = ({value, isAboveThresh, threshold, isPercent}:IIndicatorValueSubText) => {
  return value == null ?
    <div>
      {EXPLORE_COPY.SIDE_PANEL_VALUES.UNAVAILBLE_MSG}
    </div> :
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
    </React.Fragment>;
};

/**
 * This component will return the value suffix as either a percent or
 * ordinal value of the displayed statistic
 *
 * @return {JSX.Element}
 */
export const DisplayStatUnit = ({indicator, displayStat}:IDisplayStatUnit) => {
  if (indicator.value !== null) {
    return indicator.isPercent ?
        <span>{`%`}</span> :
        <sup className={styles.indicatorSuperscript}>
          <span>{getSuperscriptOrdinal(displayStat)}</span>
        </sup>;
  } else {
    return <React.Fragment></React.Fragment>;
  }
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

  // If the threshold exists, set it, otherwise set it to the default value
  const threshold = indicator.threshold ? indicator.threshold : constants.DEFAULT_THRESHOLD_PERCENTILE;

  // A boolean to represent if the indicator is above or below the threshold
  const isAboveThresh = displayStat !== null && displayStat >= threshold ? true : false;


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
              {displayStat}
              <DisplayStatUnit indicator={indicator} displayStat={displayStat}/>
            </div>

            {/* Indicator icon - up arrow, down arrow, or unavailable */}
            <div className={styles.indicatorArrow}>
              <IndicatorValueIcon
                value={displayStat}
                isAboveThresh={isAboveThresh}
              />
            </div>
          </div>

          {/* Indicator sub-text */}
          <div className={styles.indicatorValueSubText}>
            <IndicatorValueSubText
              value={displayStat}
              isAboveThresh={isAboveThresh}
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
