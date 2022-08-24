/* eslint-disable quotes */
// External Libs:
import React from 'react';
import {MessageDescriptor, useIntl} from 'gatsby-plugin-intl';
import {Accordion, Button} from '@trussworks/react-uswds';

// Components:
import Category from '../Category';
import TractDemographics from '../TractDemographics';
import DisadvantageDot from '../DisadvantageDot';
import ExceedBurden from '../ExceedBurden';
import Indicator from '../Indicator';
import TractInfo from '../TractInfo';

// Styles and constants
import * as styles from './areaDetail.module.scss';
import * as constants from '../../data/constants';
import * as EXPLORE_COPY from '../../data/copy/explore';
import * as COMMON_COPY from '../../data/copy/common';

// @ts-ignore
import mailIcon from '/node_modules/uswds/dist/img/usa-icons/mail_outline.svg';

interface IAreaDetailProps {
  properties: constants.J40Properties,
  hash: string[],
  isCensusLayerSelected: boolean,
}

/**
 * There are a 4 different indicator types. Each indicator type will render in the UI differently.
 *
 * percentile - is the majority of indicators
 * percents - a few indicators fall into this type
 * showFullBooleans - are indicators where we show the indicators when the value is true OR false
 * showTrueBooleans-  are indicators where we show the indicators when the value is true ONLY. When
 * the indicator is false or not existing, it will not show the indicator.
 */
export type indicatorType = 'percentile' | 'percent' | 'showFullBoolean' | 'showTrueBoolean';

/**
 * This interface is used as define the various fields for each indicator in the side panel
 *  label: the indicator label or title
 *  description: the description of the indicator used in the side panel
 *  type: see indicatorType above
 *  value: the number from the geoJSON tile. If tile doesn't exist it get a null value. Could be boolean also
 *  isDisadvagtaged: the flag from the geoJSON tile
 *  threshold: a custom value of threshold for certain indicators
 *  */
export interface indicatorInfo {
  label: string,
  description: string,
  type: indicatorType,
  value: number | boolean | null,
  isDisadvagtaged: boolean,
  threshold?: number,
}

/**
 * This interface is used as define the various fields for category in the side panel
 * id: distict id
 * titleText: display text for the category title
 * indicators: an array of indicators
 * socioEcIndicators: an array of socio-economic indicators
 * isDisadvagtaged: boolean to indicate if the category is disadvantaged
 * isExceed1MoreBurden: boolean to indicate if the category exceeds more than one burden
 * isExceedBothSocioBurdens: boolean to indicate if the category exceeds both socio-eco burdens
 *  */
export interface ICategory {
  id: string,
  titleText: string,
  indicators: indicatorInfo[],
  socioEcIndicators: indicatorInfo[],
  isDisadvagtaged: boolean | null,
  isExceed1MoreBurden: boolean | null,
  isExceedBothSocioBurdens: boolean | null,
}

/**
 * This filter will remove indicators from appearing in the side panel. There are a few cases:
 *
 * 1. For Historic underinvestment if the value is not true/false
 * 2. For Abandoned land mines if the value isn't true
 * 3. For FUDS if the value isn't true
 *
 * This function will return filter function (classic currying)
 *
 * @param {MessageDescriptor} label - allows to re-use this filter for all 3 indicators above
 * @return {indicatorInfo}
 */
export const indicatorFilter = (label:MessageDescriptor) => {
  const intl = useIntl();

  return (indicator:indicatorInfo) => (
    (
      indicator.label !== intl.formatMessage(label) ||
      (
        indicator.label == intl.formatMessage(label) &&
        (
          indicator.type === 'showFullBoolean' ?
          (indicator.value == true || indicator.value == false) :
          indicator.value == true
        )
      )
    )
  );
};


/**
 * This is the main component. It will render the entire side panel and show the details
 * of the area/feature that is selected.
 *
 * @param {IAreaDetailProps} {}
 * @return {void}
 */
const AreaDetail = ({properties, hash, isCensusLayerSelected}: IAreaDetailProps) => {
  const intl = useIntl();

  // console.log the properties of the census that is selected:
  console.log("Area Detail properies: ", properties);

  const score = properties[constants.SCORE_PROPERTY_HIGH] ? properties[constants.SCORE_PROPERTY_HIGH] as number : 0;
  const blockGroup = properties[constants.GEOID_PROPERTY] ? properties[constants.GEOID_PROPERTY] : "N/A";
  const population = properties[constants.TOTAL_POPULATION] ? properties[constants.TOTAL_POPULATION] : "N/A";
  const countyName = properties[constants.COUNTY_NAME] ? properties[constants.COUNTY_NAME] : "N/A";
  const stateName = properties[constants.STATE_NAME] ? properties[constants.STATE_NAME] : "N/A";
  const sidePanelState = properties[constants.SIDE_PANEL_STATE];
  const landAreaName = properties[constants.LAND_AREA_NAME];

  const isCommunityFocus = score >= constants.SCORE_BOUNDARY_THRESHOLD;

  const feedbackEmailSubject = hash ? `
    Census tract ID ${blockGroup}, ${countyName}, ${stateName}, ( z/lat/lon: #${hash.join('/')} )
  ` : `Census tract ID ${blockGroup}, ${countyName}, ${stateName}`;

  const feedbackEmailBody = intl.formatMessage(EXPLORE_COPY.SEND_FEEDBACK.EMAIL_BODY);


  /**
   * The workforce development category has some indicators who's source will vary depending on which
   * territory is selected. This function allows us to change the source of workforce development indicators
   * depending on which territory was selected
   *
   * @param {string} indicatorName
   * @return {void}
   */
  const getWorkForceIndicatorValue = (indicatorName: string) => {
    if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS) {
      if (indicatorName === 'lowMedInc') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDU_PERCENTILE_FIELD) ?
          properties[constants.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDU_PERCENTILE_FIELD] : null;
      }
      if (indicatorName === 'unemploy') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDU_PERCENTILE_FIELD) ?
          properties[constants.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDU_PERCENTILE_FIELD] : null;
      }
      if (indicatorName === 'poverty') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD) ?
          properties[constants.ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD] : null;
      }
      if (indicatorName === 'highSchool') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREAS_HS_EDU_PERCENTAGE_FIELD) ?
          properties[constants.ISLAND_AREAS_HS_EDU_PERCENTAGE_FIELD] : null;
      }
    }

    if (indicatorName === 'lowMedInc') {
      return properties.hasOwnProperty(constants
          .LOW_MEDIAN_INCOME_PERCENTILE) ?
        properties[constants.LOW_MEDIAN_INCOME_PERCENTILE] : null;
    }
    if (indicatorName === 'unemploy') {
      return properties.hasOwnProperty(constants
          .UNEMPLOYMENT_PROPERTY_PERCENTILE) ?
        properties[constants.UNEMPLOYMENT_PROPERTY_PERCENTILE] : null;
    }
    if (indicatorName === 'poverty') {
      return properties.hasOwnProperty(constants
          .POVERTY_BELOW_100_PERCENTILE) ?
        properties[constants.POVERTY_BELOW_100_PERCENTILE] : null;
    }
    if (indicatorName === 'highSchool') {
      return properties.hasOwnProperty(constants
          .HIGH_SCHOOL_PROPERTY_PERCENTILE) ?
        properties[constants.HIGH_SCHOOL_PROPERTY_PERCENTILE] : null;
    }
  };

  /**
   * The workforce development category has some indicators who's disadvantaged boolean
   * will vary depending on which territory is selected. This function allows us to change
   * the boolean of workforce development indicators depending on which territory was selected
   *
   * @param {string} indicatorName
   * @return {void}
   */
  const getWorkForceIndicatorIsDisadv = (indicatorName: string) => {
    if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS) {
      if (indicatorName === 'lowMedInc') {
        return properties.hasOwnProperty(constants
            .IS_EXCEEDS_THRESH_FOR_ISLAND_AREA_LOW_MEDIAN_INCOME) ?
          properties[constants.IS_EXCEEDS_THRESH_FOR_ISLAND_AREA_LOW_MEDIAN_INCOME] : null;
      }
      if (indicatorName === 'unemploy') {
        return properties.hasOwnProperty(constants
            .IS_EXCEEDS_THRESH_FOR_ISLAND_AREA_UNEMPLOYMENT) ?
          properties[constants.IS_EXCEEDS_THRESH_FOR_ISLAND_AREA_UNEMPLOYMENT] : null;
      }
      if (indicatorName === 'poverty') {
        return properties.hasOwnProperty(constants
            .IS_EXCEEDS_THRESH_FOR_ISLAND_AREA_BELOW_100_POVERTY) ?
          properties[constants.IS_EXCEEDS_THRESH_FOR_ISLAND_AREA_BELOW_100_POVERTY] : null;
      }
      if (indicatorName === 'highSchool') {
        return properties.hasOwnProperty(constants
            .ISLAND_AREA_LOW_HS_EDU) ?
          properties[constants.ISLAND_AREA_LOW_HS_EDU] : null;
      }
    }

    if (indicatorName === 'lowMedInc') {
      return properties.hasOwnProperty(constants
          .IS_EXCEEDS_THRESH_FOR_LOW_MEDIAN_INCOME) ?
        properties[constants.IS_EXCEEDS_THRESH_FOR_LOW_MEDIAN_INCOME] : null;
    }
    if (indicatorName === 'unemploy') {
      return properties.hasOwnProperty(constants
          .IS_EXCEEDS_THRESH_FOR_UNEMPLOYMENT) ?
        properties[constants.IS_EXCEEDS_THRESH_FOR_UNEMPLOYMENT] : null;
    }
    if (indicatorName === 'poverty') {
      return properties.hasOwnProperty(constants
          .IS_EXCEEDS_THRESH_FOR_BELOW_100_POVERTY) ?
        properties[constants.IS_EXCEEDS_THRESH_FOR_BELOW_100_POVERTY] : null;
    }
    if (indicatorName === 'highSchool') {
      return properties.hasOwnProperty(constants
          .IS_LOW_HS_EDUCATION_LOW_HIGHER_ED_PRIORITIZED) &&
        properties[constants.IS_LOW_HS_EDUCATION_LOW_HIGHER_ED_PRIORITIZED] == 1 ?
        true : false;
    }
  };

  // Define each indicator in the side panel with constants from copy file (for intl)
  // Indicators are grouped by category
  const expAgLoss: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_AG_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_AG_LOSS),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.EXP_AGRICULTURE_LOSS_PERCENTILE) ?
      properties[constants.EXP_AGRICULTURE_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_EXP_AGR_LOSS] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_EXP_AGR_LOSS] : null,
  };
  const expBldLoss: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_BLD_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_BLD_LOSS),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.EXP_BUILDING_LOSS_PERCENTILE) ?
      properties[constants.EXP_BUILDING_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_EXP_BLD_LOSS] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_EXP_BLD_LOSS] : null,
  };
  const expPopLoss: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.EXP_POP_LOSS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.EXP_POP_LOSS),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.EXP_POPULATION_LOSS_PERCENTILE) ?
      properties[constants.EXP_POPULATION_LOSS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_EXP_POP_LOSS] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_EXP_POP_LOSS] : null,
  };
  const flooding: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.FLOODING),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.FLOODING),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.FLOODING_PERCENTILE) ?
      properties[constants.FLOODING_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FLOODING] ?
      properties[constants.IS_EXCEEDS_THRESH_FLOODING] : null,
  };
  const wildfire: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.WILDFIRE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.WILDFIRE),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.WASTEWATER_PERCENTILE) ?
      properties[constants.WASTEWATER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_WILDFIRE] ?
      properties[constants.IS_EXCEEDS_THRESH_WILDFIRE] : null,
  };
  const lowInc: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LOW_INCOME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_INCOME),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.POVERTY_BELOW_200_PERCENTILE) ?
      properties[constants.POVERTY_BELOW_200_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_FEDERAL_POVERTY_LEVEL_200] ?
      properties[constants.IS_FEDERAL_POVERTY_LEVEL_200] : null,
    threshold: 65,
  };
  const higherEd: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIGH_ED),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HIGH_ED),
    type: 'percent',
    value: properties.hasOwnProperty(constants.NON_HIGHER_ED_PERCENTILE) ?
      properties[constants.NON_HIGHER_ED_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_HIGHER_ED_PERCENTILE] ?
      properties[constants.IS_HIGHER_ED_PERCENTILE] : null,
    threshold: 80,
  };

  const energyBurden: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ENERGY_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ENERGY_BURDEN),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.ENERGY_PERCENTILE) ?
      properties[constants.ENERGY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_ENERGY_BURDEN] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_ENERGY_BURDEN] : null,
  };
  const pm25: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PM_2_5),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PM_2_5),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.PM25_PERCENTILE) ?
      properties[constants.PM25_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_PM25] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_PM25] : null,
  };

  const dieselPartMatter: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIESEL_PARTICULATE_MATTER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIESEL_PARTICULATE_MATTER),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.DIESEL_MATTER_PERCENTILE) ?
      properties[constants.DIESEL_MATTER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_DIESEL_PM] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_DIESEL_PM] : null,
  };
  const barrierTransport: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.BARRIER_TRANS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.BARRIER_TRANS),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.TRAVEL_DISADV_PERCENTILE) ?
      properties[constants.TRAVEL_DISADV_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_TRAVEL_DISADV] ?
      properties[constants.IS_EXCEEDS_THRESH_TRAVEL_DISADV] : null,
  };
  const trafficVolume: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.TRAFFIC_VOLUME),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.TRAFFIC_VOLUME),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.TRAFFIC_PERCENTILE) ?
      properties[constants.TRAFFIC_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_TRAFFIC_PROX] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_TRAFFIC_PROX] : null,
  };

  const historicUnderinvest: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIST_UNDERINVEST),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HIST_UNDERINVEST),
    type: 'showFullBoolean',

    // Todo: remove internal conditional once BE is fixed:
    value: properties.hasOwnProperty(constants.HISTORIC_UNDERINVESTMENT) ?
      (properties[constants.HISTORIC_UNDERINVESTMENT] === "1" ? true : false) :
      null,

    // Todo: remove second check after BE is fixed:
    isDisadvagtaged: properties.hasOwnProperty(constants.HISTORIC_UNDERINVESTMENT) &&
    properties[constants.HISTORIC_UNDERINVESTMENT] === "1" ?
      true : false,
  };
  const houseBurden: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HOUSE_BURDEN),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HOUSE_BURDEN),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.HOUSING_BURDEN_PROPERTY_PERCENTILE) ?
      properties[constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_HOUSE_BURDEN] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_HOUSE_BURDEN] : null,
  };
  const lackGreenSpace: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LACK_GREEN_SPACE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LACK_GREEN_SPACE),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.IMPERVIOUS_PERCENTILE) ?
      properties[constants.IMPERVIOUS_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_IMPERVIOUS] ?
      properties[constants.IS_EXCEEDS_THRESH_IMPERVIOUS] : null,
  };
  const lackPlumbing: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LACK_PLUMBING),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LACK_PLUMBING),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.KITCHEN_PLUMB_PERCENTILE) ?
      properties[constants.KITCHEN_PLUMB_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_KITCHEN_PLUMB] ?
      properties[constants.IS_EXCEEDS_THRESH_KITCHEN_PLUMB] : null,
  };
  const leadPaint: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LEAD_PAINT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LEAD_PAINT),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.LEAD_PAINT_PERCENTILE) ?
      properties[constants.LEAD_PAINT_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_LEAD_PAINT_AND_MEDIAN_HOME_VAL] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_LEAD_PAINT_AND_MEDIAN_HOME_VAL] : null,
  };

  const abandonMines: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ABANDON_MINES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ABANDON_MINES),
    type: 'showTrueBoolean',

    // Todo: remove internal conditional once BE is fixed:
    value: properties.hasOwnProperty(constants.ABANDON_LAND_MINES) ?
      (properties[constants.ABANDON_LAND_MINES] === "1" ? true : false) :
      null,

    // Todo: remove second check after BE is fixed:
    isDisadvagtaged: properties.hasOwnProperty(constants.ABANDON_LAND_MINES) &&
    properties[constants.ABANDON_LAND_MINES] === "1" ?
      true : false,
  };
  const formerDefSites: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.FORMER_DEF_SITES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.FORMER_DEF_SITES),
    type: 'showTrueBoolean',

    // Todo: remove internal conditional once BE is fixed:
    value: properties.hasOwnProperty(constants.FORMER_DEF_SITES) ?
      (properties[constants.FORMER_DEF_SITES] === "1" ? true : false) :
      null,

    // Todo: remove second check after BE is fixed:
    isDisadvagtaged: properties.hasOwnProperty(constants.FORMER_DEF_SITES) &&
    properties[constants.FORMER_DEF_SITES] === "1" ?
      true : false,
  };
  const proxHaz: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_HAZ),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_HAZ),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.PROXIMITY_TSDF_SITES_PERCENTILE) ?
      properties[constants.PROXIMITY_TSDF_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_HAZARD_WASTE] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_HAZARD_WASTE] : null,
  };
  const proxNPL: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_NPL),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_NPL),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.PROXIMITY_NPL_SITES_PERCENTILE) ?
      properties[constants.PROXIMITY_NPL_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_SUPERFUND] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_SUPERFUND] : null,
  };
  const proxRMP: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.PROX_RMP),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.PROX_RMP),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.PROXIMITY_RMP_SITES_PERCENTILE) ?
      properties[constants.PROXIMITY_RMP_SITES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_RMP] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_RMP] : null,
  };

  const leakyTanks: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LEAKY_TANKS),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LEAKY_TANKS),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.LEAKY_UNDER_PERCENTILE) ?
      properties[constants.LEAKY_UNDER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_LEAKY_UNDER] ?
      properties[constants.IS_EXCEEDS_THRESH_LEAKY_UNDER] : null,
  };
  const wasteWater: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.WASTE_WATER),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.WASTE_WATER),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.WASTEWATER_PERCENTILE) ?
      properties[constants.WASTEWATER_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_WASTEWATER] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_WASTEWATER] : null,
  };

  const asthma: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ASTHMA),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.ASTHMA),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.ASTHMA_PERCENTILE) ?
      properties[constants.ASTHMA_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_ASTHMA] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_ASTHMA] : null,
  };
  const diabetes: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.DIABETES),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.DIABETES),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.DIABETES_PERCENTILE) ?
      properties[constants.DIABETES_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_DIABETES] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_DIABETES] : null,
  };
  const heartDisease: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HEART_DISEASE),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HEART_DISEASE),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.HEART_PERCENTILE) ?
      properties[constants.HEART_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_HEART_DISEASE] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_HEART_DISEASE] : null,
  };
  const lifeExpect: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LIFE_EXPECT),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_LIFE_EXPECT),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.LIFE_PERCENTILE) ?
      properties[constants.LIFE_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_LOW_LIFE_EXP] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_LOW_LIFE_EXP] : null,
  };

  const lingIso: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LING_ISO),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LING_ISO),
    type: 'percentile',
    value: properties.hasOwnProperty(constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE) ?
      properties[constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE] : null,
    isDisadvagtaged: properties[constants.IS_EXCEEDS_THRESH_FOR_LINGUISITIC_ISO] ?
      properties[constants.IS_EXCEEDS_THRESH_FOR_LINGUISITIC_ISO] : null,
  };
  const lowMedInc: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.LOW_MED_INC),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.LOW_MED_INCOME),
    type: 'percentile',
    value: getWorkForceIndicatorValue('lowMedInc'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('lowMedInc'),
  };
  const unemploy: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.UNEMPLOY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.UNEMPLOY),
    type: 'percentile',
    value: getWorkForceIndicatorValue('unemploy'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('unemploy'),
  };
  const poverty: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.POVERTY),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.POVERTY),
    type: 'percentile',
    value: getWorkForceIndicatorValue('poverty'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('poverty'),
  };
  const highSchool: indicatorInfo = {
    label: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIGH_SCL),
    description: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_INDICATOR_DESCRIPTION.HIGH_SKL),
    type: 'percent',
    value: getWorkForceIndicatorValue('highSchool'),
    isDisadvagtaged: getWorkForceIndicatorIsDisadv('highSchool'),
    threshold: 10,
  };

  /**
   * Aggregate indicators based on categories
   *
   * The indicators property must be an array with last two elements being the
   * socioeconomic burdens.
   */
  let categories:ICategory[] = [
    {
      id: 'climate-change',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLIMATE),
      indicators: [expAgLoss, expBldLoss, expPopLoss, flooding, wildfire],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_CLIMATE_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_CLIMATE_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_CLIMATE_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_CLIMATE_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'clean-energy',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_ENERGY),
      indicators: [energyBurden, pm25],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_ENERGY_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_ENERGY_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_ENERGY_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_ENERGY_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'clean-transport',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_TRANSPORT),
      indicators: [dieselPartMatter, barrierTransport, trafficVolume],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_TRANSPORT_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_TRANSPORT_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_TRANSPORT_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_TRANSPORT_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'sustain-house',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.SUSTAIN_HOUSE),
      indicators: [historicUnderinvest, houseBurden, lackGreenSpace, lackPlumbing, leadPaint],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_HOUSING_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_HOUSING_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_HOUSING_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_HOUSING_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'leg-pollute',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.LEG_POLLUTE),
      indicators: [abandonMines, formerDefSites, proxHaz, proxNPL, proxRMP],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_POLLUTION_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_POLLUTION_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_POLLUTION_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_POLLUTION_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'clean-water',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_WATER),
      indicators: [leakyTanks, wasteWater],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_WATER_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_WATER_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_WATER_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_WATER_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'health-burdens',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.HEALTH_BURDEN),
      indicators: [asthma, diabetes, heartDisease, lifeExpect],
      socioEcIndicators: [lowInc, higherEd],
      isDisadvagtaged: properties[constants.IS_HEALTH_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_HEALTH_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_HEALTH_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_HEALTH_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
    {
      id: 'work-dev',
      titleText: intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CATEGORY.WORK_DEV),
      indicators: [lingIso, lowMedInc, unemploy, poverty],
      socioEcIndicators: [highSchool, higherEd],
      isDisadvagtaged: properties[constants.IS_WORKFORCE_FACTOR_DISADVANTAGED_M] ?
        properties[constants.IS_WORKFORCE_FACTOR_DISADVANTAGED_M] : null,
      isExceed1MoreBurden: properties[constants.IS_WORKFORCE_EXCEED_ONE_OR_MORE_INDICATORS_M] ?
        properties[constants.IS_WORKFORCE_EXCEED_ONE_OR_MORE_INDICATORS_M] : null,
      isExceedBothSocioBurdens: properties[constants.IS_WORKFORCE_EXCEED_BOTH_SOCIO_INDICATORS_M] ?
        properties[constants.IS_WORKFORCE_EXCEED_BOTH_SOCIO_INDICATORS_M] : null,
    },
  ];

  /**
   * Modify the category array depending on the sidePanelState field. This field comes from the backend
   * and is called UI_EXP.
   *
   * This sidePanelState has 3 values; namely, Nation, Puerto Rico and Island Areas.
   */
  if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.PUERTO_RICO) {
    /* For Puerto Rico - only show the following indicators:
        clean energy (index 1): show all
        sustainable housing (index 2): only housing cost burden
        legacy pollution (index 3): show all
        workforce dev (index 4): remove linguistic iso
    */

    // eslint-disable-next-line max-len
    categories = categories.filter((category) => category.id === 'work-dev' || category.id === 'clean-energy' || category.id === 'leg-pollute' || category.id === 'sustain-house');
    categories[1].indicators = [houseBurden];
    categories[3].indicators = [lowMedInc, unemploy, poverty];
  }

  if (sidePanelState === constants.SIDE_PANEL_STATE_VALUES.ISLAND_AREAS) {
    // For Island Areas - only show workforce dev category
    categories = categories.filter((category) => category.id === 'work-dev');
    // For Island Areas - remove the linguistic Isolation
    categories[0].indicators = [lowMedInc, unemploy, poverty, highSchool];
  }


  // Create the AccoridionItems by mapping over the categories array. In this array we define the
  // various indicators for a specific category. This is an array which then maps over the <Indicator />
  // component to render the actual Indicator
  const categoryItems = categories.map((category) => ({
    id: category.id,

    /*
    As of trussworks 3.0.0, there were some breaking changes. This new prop of headingLevel
    is required, however, the title prop is already defining the category styling, so this
    is placed here to satisfy the requirement of the AccordionItems API, however it's not
    being used.
    */
    headingLevel: 'h4',

    title: <Category name={category.titleText} isDisadvantaged={category.isDisadvagtaged} />,
    content: (
      <>
        {/* Exceeds one or more burdens */}
        <ExceedBurden
          text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_ONE_OR_MORE}
          isBurdened={category.isExceed1MoreBurden}
        />

        {/* Indicators - filters then map */}
        {category.indicators
            .filter(indicatorFilter(EXPLORE_COPY.SIDE_PANEL_INDICATORS.HIST_UNDERINVEST))
            .filter(indicatorFilter(EXPLORE_COPY.SIDE_PANEL_INDICATORS.ABANDON_MINES))
            .filter(indicatorFilter(EXPLORE_COPY.SIDE_PANEL_INDICATORS.FORMER_DEF_SITES))
            .map((indicator: any, index: number) => {
              return <Indicator key={`ind${index}`} indicator={indicator} />;
            })}

        {/* AND */}
        <div className={styles.categorySpacer}>
          {EXPLORE_COPY.SIDE_PANEL_SPACERS.AND}
        </div>

        {/* Exceeds both socioeconomic burdens */}
        <ExceedBurden
          text={EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_BOTH_SOCIO}
          isBurdened={category.isExceedBothSocioBurdens}
        />

        {/* socio-economic indicators */}
        {category.socioEcIndicators.map((indicator: any, index: number) => {
          return <Indicator key={`ind${index}`} indicator={indicator} />;
        })}

      </>
    ),
    expanded: false,
  }));

  return (
    <aside className={styles.areaDetailContainer} data-cy={'aside'}>
      {
        isCensusLayerSelected ? (
          <>
            {/* Tract Info */}
            <TractInfo
              blockGroup={blockGroup}
              countyName={countyName}
              stateName={stateName}
              population={population}
              sidePanelState={properties[constants.SIDE_PANEL_STATE]}
            />

            {/* Demographics */}
            <TractDemographics />

            {/* Disadvantaged? */}
            <div className={styles.categorization}>

              {/* Questions asking if disadvantaged? */}
              <div className={styles.isInFocus}>
                {EXPLORE_COPY.COMMUNITY.IS_FOCUS}
              </div>

              {/* YES with Dot or NO with no Dot  */}
              <div className={styles.communityOfFocus}>
                {isCommunityFocus ?
                  <>
                    <h3>{EXPLORE_COPY.COMMUNITY.OF_FOCUS}</h3>
                    <DisadvantageDot isDisadvantaged={isCommunityFocus} />
                  </> :
                  <h3>{EXPLORE_COPY.COMMUNITY.NOT_OF_FOCUS}</h3>
                }
              </div>

              {/* Number of categories exceeded */}
              <div className={styles.showCategoriesExceed}>
                {EXPLORE_COPY.numberOfCategoriesExceeded(properties[constants.COUNT_OF_CATEGORIES_DISADV])}
              </div>

              {/* Number of thresholds exceeded */}
              {/* <div className={styles.showThresholdExceed}>
                {EXPLORE_COPY.numberOfThresholdsExceeded(properties[constants.TOTAL_NUMBER_OF_DISADVANTAGE_INDICATORS])}
              </div> */}

              {/* Send Feedback button */}
              <a
                className={styles.sendFeedbackLink}
                // The mailto string must be on a single line otherwise the email does not display subject and body
                href={`
                mailto:${COMMON_COPY.FEEDBACK_EMAIL}?subject=${feedbackEmailSubject}&body=${feedbackEmailBody}
                `}
                target={"_blank"}
                rel="noreferrer"
              >
                <Button
                  type="button"
                  className={styles.sendFeedbackBtn}
                >
                  <div className={styles.buttonContainer}>
                    <div className={styles.buttonText}>
                      {EXPLORE_COPY.COMMUNITY.SEND_FEEDBACK.TITLE}
                    </div>
                    <img
                      className={styles.buttonImage}
                      src={mailIcon}
                      alt={intl.formatMessage(EXPLORE_COPY.COMMUNITY.SEND_FEEDBACK.IMG_ICON.ALT_TAG)}
                    />
                  </div>
                </Button>
              </a>
            </div>
          </>
        ) : (
          <ul className={styles.censusRow}>
            <li>
              <span className={styles.censusLabel}>
                {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_TRIBAL_INFO.LAND_AREA_NAME)}
              </span>
              <span className={styles.censusText}>{` ${landAreaName}`}</span>
            </li>
          </ul>
        )
      }


      {/* All category accordions in this component */}
      {isCensusLayerSelected && <Accordion multiselectable={true} items={categoryItems} />}

      {/* Methodology version */}
      <div className={styles.versionInfo}>
        {EXPLORE_COPY.SIDE_PANEL_VERION.TITLE}
      </div>
    </aside>
  );
};

export default AreaDetail;
