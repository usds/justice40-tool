import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import ReactTooltip from 'react-tooltip';

import {indicatorInfo, indicatorType} from '../AreaDetail/AreaDetail';

import * as styles from './Indicator.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';

// @ts-ignore
import infoIcon from '/node_modules/uswds/dist/img/usa-icons/info.svg';

interface IIndicator {
  indicator: indicatorInfo,
  isImpute?: boolean,
  population?: number | string,
}
interface IIndicatorValueSubText {
  type: indicatorType,
  value: number | null | boolean,
  isAboveThresh: boolean,
  threshold: number,
}

interface IIndicatorValue {
  type: indicatorType,
  displayStat: number | null,
}

/**
 * This component will render an info icon in the indicator value
 *
 * @return {JSX.Element}
 */
export const IndicatorInfoIcon = ({isImpute, population}: Omit<IIndicator, 'indicator'>) => {
  const intl = useIntl();
  let showTilde = false;

  const getToolTipCopy = () => {
    if (population === constants.MISSING_DATA_STRING) {
      return intl.formatMessage(EXPLORE_COPY.LOW_INCOME_TOOLTIP.IMP_YES_POP_NULL);
    } else if (population !== constants.MISSING_DATA_STRING && isImpute) {
      showTilde = true;
      return intl.formatMessage(EXPLORE_COPY.LOW_INCOME_TOOLTIP.IMP_YES_POP_NOT_NULL);
    } else {
      return null;
    }
  };

  /**
   * This library react-tooltip creates random DOM ID which will not allow for snapshot testing as
   * the IDs change on each build. Due to time constraints, we simply removed the AreaDetails test.
   * The AreaDetails component is made up of sub component and each sub component has tests so this
   * is low risk.
   *
   * This is a temporary solution. Some longer terms solutions may be
   * 1. Remove this library and get the USWDS tool tip to work
   * 2. Re-factor the areaDetail.tests.tsx snapshot tests to do more DOM assertions rather than snapshots
   * 3. Some combination of the two.
   */
  return (
    <>
      <ReactTooltip
        id="lowIncomeIcon"
        multiline={true}
      />
      <img
        data-for="lowIncomeIcon"
        data-tip={getToolTipCopy()}
        data-iscapture="true"
        className={styles.info}
        src={infoIcon}
        alt={intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_VALUES.IMG_ALT_TEXT.INFO)}
      />
      {showTilde && <span className={styles.infoTilde}>{ ` ~ ` }</span>}
    </>
  );
};

/**
 * This component will determine the sub-text of the indicator's value, some examples could be
 *   "above 90th percentile"
 *   "below 20 percent"
 *   "data is not available"
 *
 * @param {IIndicatorValueSubText} {}
 * @return {JSX.Element}
 */
export const IndicatorValueSubText = ({type, value, isAboveThresh, threshold}:IIndicatorValueSubText) => {
  if (value === null) {
    return (
      <div>
        {EXPLORE_COPY.SIDE_PANEL_VALUES.UNAVAILBLE_MSG}
      </div>
    );
  } else if (type === 'percent' || type === 'percentile') {
    return (
      <div>
        {
          isAboveThresh ?
          EXPLORE_COPY.SIDE_PANEL_VALUES.ABOVE :
          EXPLORE_COPY.SIDE_PANEL_VALUES.BELOW
        }
        {
          threshold ?
          <IndicatorValue type={type} displayStat={threshold}/> :
          <IndicatorValue type={type} displayStat={90}/>
        }
        {` `}
        {
          type === 'percent' ?
          EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENT :
          EXPLORE_COPY.SIDE_PANEL_VALUES.PERCENTILE
        }
      </div>
    );
  } else {
    return (<></>);
  }
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
 * This component will return the indicators's value. The value depends on the
 * indicator type. Each type renders a different UI.
 *
 * @return {JSX.Element | null}
 */
export const IndicatorValue = ({type, displayStat}:IIndicatorValue) => {
  const intl = useIntl();

  if (displayStat === null) return <>{constants.MISSING_DATA_STRING}</>;

  if (type === 'percent' || type === 'percentile') {
    // In this case we will show no value and an icon only

    if (type === 'percent') {
      // If the type is percent, return the intl percent format
      return (
        <span>
          {intl.formatNumber(
              displayStat,
              {
                style: 'unit',
                unit: 'percent',
                unitDisplay: 'short',
              },
          )}
        </span>
      );
    } else {
    // If the type is percentile, create the intl ordinal and return it as a superscript
      const i18nOrdinalSuffix: string = intl.formatMessage(
          {
            id: 'explore.map.page.side.panel.indicator.percentile.value.ordinal.suffix',
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
      return superscriptOrdinal(i18nOrdinalSuffix);
    }
  } else {
    // when the type === boolean the display stat will be either 100 (true) or 0 (false)
    return displayStat === 0 ?
      EXPLORE_COPY.SIDE_PANEL_SPACERS.NO :
      EXPLORE_COPY.SIDE_PANEL_SPACERS.YES;
  }
};

/**
 * This component will return the list element which will be the indicator row in the side panel
 *
 * @param {IIndicator} indicator
 * @return {JSX.Element}
 */
const Indicator = ({indicator, isImpute, population}:IIndicator) => {
  /**
   * The indicator value could be a number | boolean | null. In all cases we coerce to number
   * before flooring.
   *
   * In the case where indicator.value is a boolean, the displayStat will be either 100 or 0, depending
   * on if indicator.value is true or false respectively.
   *
   * Todo: The way the displayStat handles the boolean indicators should be refactored
   */
  const displayStat = indicator.value !== null ? Math.floor(Number(indicator.value) * 100) : null;

  // If the threshold exists, set it, otherwise set it to the default value
  const threshold = indicator.threshold ? indicator.threshold : constants.DEFAULT_THRESHOLD_PERCENTILE;

  // A boolean to represent if the indicator is above or below the threshold
  const isAboveThresh = displayStat !== null && displayStat >= threshold ? true : false;

  // Show an info icon on the low icome indicator if:
  const showLowIncomeInfoIcon = (
    (indicator.label === 'Low income' && (isImpute)) ||
    (indicator.label === 'Low income' && population === constants.MISSING_DATA_STRING && !isImpute)
  );

  return (
    <li
      className={styles.indicatorBoxMain}
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

            {/* Indicator info icon */}
            { showLowIncomeInfoIcon &&
              <div className={styles.indicatorInfo}>
                <IndicatorInfoIcon
                  isImpute={isImpute}
                  population={population}
                />
              </div>
            }

            {/* Indicator value */}
            <div className={indicator.isDisadvagtaged ?
              styles.disIndicatorValue : styles.indicatorValue}
            >
              <IndicatorValue
                type={indicator.type}
                displayStat={displayStat}
              />
            </div>

          </div>

          {/* Indicator sub-text */}
          <div className={styles.indicatorValueSubText}>
            <IndicatorValueSubText
              value={displayStat}
              isAboveThresh={isAboveThresh}
              threshold={threshold}
              type={indicator.type}
            />
          </div>

        </div>
      </div>
    </li>
  );
};

export default Indicator;
