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

interface IIndicatorValue {
  isPercent: boolean | undefined,
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
    <div>
      {
        isAboveThresh ?
        EXPLORE_COPY.SIDE_PANEL_VALUES.ABOVE :
        EXPLORE_COPY.SIDE_PANEL_VALUES.BELOW
      }
      {threshold ?
        <IndicatorValue isPercent={isPercent} displayStat={threshold} /> :
        <IndicatorValue isPercent={isPercent} displayStat={90} />
      }
      {` `}
      {
        isPercent ?
        EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENT :
        EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENTILE
      }
    </div>;
};

/**
 * The react-i18n library allow to add ordinal suffix (st, nd, rd, th) to indicator values.
 * The number and the suffix is a single entity. We are looking to add styling to
 * just the suffix portion if the value is a percentile. This function will add
 * a superscript styling to just the suffix portion of percentile values.
 *
 * The i18n variable named i18nOrdinalSuffix, in the IndicatorValue function defines the
 * various prefixes. The Spanish version of the i18n variable works in a similar manner,
 * however has a differnce. The superscripting is different for Spanish.
 * In Spanish, the suffix is a ".a" and ".o", where only the "a" and "o" are superscripted.
 * This function handles this case.
 *
 * Verbatim from translation team:
 * We suggest changing this to the Spanish ordinal number abbreviation, which is .o for masculine
 * and .a for feminine gendered words. ***Since this ranking applies to the communities of focus,
 * which use a feminine gender in Spanish, we recommend that the th ordinal abbreviation in English
 * be substituted with the feminine ordinal abbreviation in Spanish: .a  throughout the text.
 * E.g., 19th would be 19.a in Spanish and 65th would be 65.a
 *
 * @param {string} indicatorValueWithSuffix
 * @return {string}
 */
export const superscriptOrdinal = (indicatorValueWithSuffix:string) => {
  // Spanish case:
  if (indicatorValueWithSuffix.indexOf('.') !== -1) {
    const ordinalSuffix = indicatorValueWithSuffix.charAt(indicatorValueWithSuffix.length - 1);
    const indicatorValue = indicatorValueWithSuffix.slice(0, -1);

    return <>{indicatorValue}<sup style={{top: '-0.2em'}}>{ordinalSuffix}</sup></>;
  }

  // English case:
  const valueRegEx = /[0-9]{1,2}/;
  const suffixRegEx = /[a-z]{2}/; // ie, (st, nd, rd, th)
  const indicatorValue = valueRegEx.exec(indicatorValueWithSuffix);
  const ordinalSuffix = suffixRegEx.exec(indicatorValueWithSuffix);

  return <>{indicatorValue}<sup style={{top: '-0.2em'}}>{ordinalSuffix}</sup></>;
};

/**
 * This component will return the indicators's value with an ordinal suffix
 * or a percentage sign using i18n functions
 *
 * @return {JSX.Element | null}
 */
export const IndicatorValue = ({isPercent, displayStat}:IIndicatorValue) => {
  const intl = useIntl();

  if (displayStat === null) return <React.Fragment></React.Fragment>;

  const i18nOrdinalSuffix: string = intl.formatMessage(
      {
        id: 'explore.tool.page.side.panel.indicator.percentile.value.ordinal.suffix',
        // eslint-disable-next-line max-len
        description: `Navigate to the explore the tool page. Click on the map. The side panel will show categories. Open a category. This will define the indicator value's ordinal suffix. For example the st in 91st, the rd in 23rd, and the th in 26th, etc.`,
        defaultMessage: `
        {indicatorValue, selectordinal, 
          one {#st} 
          two {#nd}
          =3 {#rd} 
          other {#th}
      }
      `,
      },
      {
        indicatorValue: displayStat,
      },
  );

  return isPercent ?
    <span>
      {intl.formatNumber(
          displayStat,
          {
            style: 'unit',
            unit: 'percent',
            unitDisplay: 'short',
          },
      )}
    </span> : superscriptOrdinal(i18nOrdinalSuffix);
};

/**
 * This component will return the list element which will be the indicator row in the side panel
 *
 * @param {IIndicator} indicator
 * @return {JSX.Element}
 */
const Indicator = ({indicator}:IIndicator) => {
  // Convert the decimal value to a stat to display
  const displayStat = indicator.value !== null ? Math.floor(indicator.value * 100) : null;

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
              <IndicatorValue isPercent={indicator.isPercent} displayStat={displayStat}/>
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
